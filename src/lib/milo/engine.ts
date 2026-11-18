// Motor interno de Milo: crea esquemas de llaves, resúmenes, apuntes, flashcards y respuestas de tutor
// sin IA externa, combinando la biblioteca académica (knowledge.ts) con los apuntes del cuaderno.
import { AREA_LINKS, TOPICS, type Topic, type TopicBranch } from "./knowledge";
import {
  localFlashcards,
  localMindMap,
  splitIdea,
  type AiFlashcard,
  type AiKind,
  type AiMindMap,
  type MindBranch,
  type MindPoint,
  type StudyAiResult,
} from "@/lib/study-ai";
import {
  basicTopicText,
  dataTable,
  followUps,
  keyTerms,
  makeQuiz,
  sentences,
  solveMath,
  summarize,
  webSearchMany,
} from "@/lib/tutor";

/** Versión del motor: al cambiarla, el contenido ya creado por Milo se vuelve a generar. */
export const MILO_VERSION = "|milo2";

export const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
const cap = (s = "") => (s ? s[0]!.toUpperCase() + s.slice(1) : s);
const lowerFirst = (s = "") => (s ? s[0]!.toLowerCase() + s.slice(1) : s);
const dot = (s = "") => (/[.!?…»)]$/.test(s.trim()) ? s.trim() : `${s.trim()}.`);
const clip = (s: string, max: number) => {
  const t = s.replace(/\s+/g, " ").trim();
  return t.length > max ? `${t.slice(0, max - 1).replace(/\s+\S*$/, "")}…` : t;
};
const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const joinText = (...parts: string[]) =>
  parts
    .map((p) => p.trim())
    .filter(Boolean)
    .join("\n\n");

function hits(text: string, key: string) {
  return (text.match(new RegExp(`(^|[^a-z0-9])${escapeRe(key)}`, "g")) ?? []).length;
}

/** Tema de la biblioteca que mejor encaja: el texto principal (nombre o pregunta) pesa mucho más que los apuntes. */
export function findTopic(primary: string, secondary = ""): Topic | null {
  const p = norm(primary);
  const s = norm(secondary);
  let best: Topic | null = null;
  let bestScore = 0;
  for (const t of TOPICS) {
    let score = 0;
    for (const k of t.keys) {
      if (hits(p, k)) score += 10 + k.length;
      score += Math.min(hits(s, k), 4) * 2;
    }
    if (score > bestScore) {
      best = t;
      bestScore = score;
    }
  }
  return bestScore >= 6 ? best : null;
}

const plainBranch = (b: TopicBranch): MindBranch => ({
  label: b.label,
  summary: b.summary,
  points: b.points.map((p) => ({ ...p })),
});

function notesBranch(material: string): MindBranch | null {
  const ideas = summarize(material, 3);
  if (!ideas.length) return null;
  return {
    label: "Tus apuntes",
    summary: "Ideas clave que anotaste sobre este tema",
    points: ideas.map(splitIdea),
  };
}

function frameworkBranches(topic: string): MindBranch[] {
  return [
    {
      label: "Concepto",
      summary: `Qué es ${topic} y qué abarca`,
      points: [
        {
          label: "Definición",
          detail: `Explica qué es ${topic} usando sus términos técnicos`,
          items: ["Palabras clave", "Ejemplo propio"],
        },
        {
          label: "Objeto de estudio",
          detail: "Delimita qué hechos, fenómenos o elementos incluye",
        },
      ],
    },
    {
      label: "Componentes",
      summary: "Partes, tipos o elementos que lo forman",
      points: [
        {
          label: "Clasificación",
          detail: "Agrupa los elementos según un criterio claro",
          items: ["Tipos", "Partes"],
        },
        { label: "Características", detail: "Rasgos que distinguen a cada elemento" },
      ],
    },
    {
      label: "Procesos y relaciones",
      summary: "Cómo funciona y cómo se conectan sus partes",
      points: [
        { label: "Etapas", detail: "Orden en que ocurren los procesos o los hechos" },
        { label: "Causas y efectos", detail: "Qué lo provoca y qué consecuencias tiene" },
      ],
    },
    {
      label: "Aplicaciones",
      summary: `Dónde aparece ${topic} en la vida real`,
      points: [
        { label: "Ejemplos", detail: "Casos concretos de tu entorno" },
        { label: "Conexiones", detail: "Relación con otras asignaturas" },
      ],
    },
  ];
}

// ---------- Esquema de llaves ----------
export function miloMindMap(topic: string, material: string, extra = ""): AiMindMap {
  const t = findTopic(topic, material);
  if (t) {
    const branches = t.branches.slice(0, 5).map(plainBranch);
    const mine = notesBranch(material);
    if (mine) branches.push(mine);
    return { center: t.title, branches };
  }
  const map = localMindMap(topic, joinText(material, extra));
  if (map.branches.length >= 2) return map;
  return { center: topic, branches: [...map.branches, ...frameworkBranches(topic)].slice(0, 6) };
}

// ---------- Resumen ----------
function interleavePoints(t: Topic, max: number) {
  const out: { b: TopicBranch; p: MindPoint }[] = [];
  for (let i = 0; out.length < max && i < 4; i++)
    for (const b of t.branches)
      if (b.points[i] && out.length < max) out.push({ b, p: b.points[i]! });
  return out;
}

function topicSummary(t: Topic, material: string) {
  const mine = summarize(material, 3);
  return [
    "## Idea central",
    t.intro,
    "## Conceptos clave",
    ...interleavePoints(t, 6).map(({ p }) => `- **${p.label}:** ${dot(cap(p.detail))}`),
    "## Esquema lógico",
    ...t.branches.map((b, i) =>
      [
        `${i + 1}. **${b.label}:** ${dot(b.summary)}`,
        ...b.points.map(
          (p) => `   - ${p.label}${p.items?.length ? ` (${p.items.slice(0, 2).join(", ")})` : ""}`,
        ),
      ].join("\n"),
    ),
    ...(mine.length ? ["## Desde tus apuntes", ...mine.map((s) => `- ${clip(s, 220)}`)] : []),
    "## Ejemplo práctico",
    t.example,
    "## Para recordar",
    ...t.branches
      .slice(0, 3)
      .map((b) => `- **${b.label}:** ${b.points.map((p) => p.label).join(" · ")}`),
    "## Pregunta de repaso",
    t.question,
  ].join("\n");
}

function textSummary(topic: string, text: string) {
  const all = sentences(text);
  const terms = keyTerms(text, 6);
  const map = localMindMap(topic, text);
  const a = cap(terms[0] ?? topic);
  const b = cap(terms[1] ?? terms[0] ?? topic);
  const example = all.find((s) => /por ejemplo|ejemplo|como cuando|se observa|se usa/i.test(s));
  return [
    "## Idea central",
    summarize(text, 2)
      .map((s) => clip(s, 220))
      .join(" "),
    "## Conceptos clave",
    ...terms
      .map((t) => ({ t, s: all.find((x) => x.toLowerCase().includes(t)) }))
      .filter((c) => c.s)
      .map((c) => `- **${cap(c.t)}:** ${clip(c.s!, 170)}`),
    "## Esquema lógico",
    ...map.branches.map((br, i) =>
      [
        `${i + 1}. **${br.label}:** ${clip(br.summary, 160)}`,
        ...br.points.map((p) => `   - ${p.detail ? `${p.label}: ${p.detail}` : p.label}`),
      ].join("\n"),
    ),
    "## Ejemplo práctico",
    example
      ? clip(example, 260)
      : `Piensa en una situación de tu vida diaria donde intervenga **${a}**: describe qué ocurre y qué papel cumple **${b}** en ella.`,
    "## Para recordar",
    ...map.branches.slice(0, 3).map((br) => `- **${br.label}:** ${clip(br.summary, 90)}`),
    "## Pregunta de repaso",
    `¿Cómo se relacionan **${a}** y **${b}** en ${topic}? Justifica con un ejemplo.`,
  ].join("\n");
}

function frameworkSummary(topic: string) {
  return [
    "## Idea central",
    `Para dominar **${topic}** necesitas tres cosas: saber definirlo con precisión, reconocer sus partes o tipos y explicar cómo funciona o por qué ocurre. Agrega tus apuntes o una fuente y este resumen se completará con el contenido de tu clase.`,
    "## Conceptos clave",
    ...frameworkBranches(topic).map((b) => `- **${b.label}:** ${dot(b.summary)}`),
    "## Esquema lógico",
    ...frameworkBranches(topic).map(
      (b, i) =>
        `${i + 1}. **${b.label}**\n${b.points.map((p) => `   - ${p.label}: ${p.detail}`).join("\n")}`,
    ),
    "## Ejemplo práctico",
    `Explica ${topic} a un compañero en dos minutos usando un ejemplo de tu vida diaria; si te trabas, ahí está lo que debes repasar.`,
    "## Para recordar",
    "- Define, clasifica y relaciona.",
    "- Usa ejemplos propios.",
    "- Repasa en días distintos.",
    "## Pregunta de repaso",
    `¿Qué parte de ${topic} te resultaría más difícil explicar sin mirar tus apuntes, y por qué?`,
  ].join("\n");
}

export function miloSummary(topic: string, material: string, extra = "") {
  const t = findTopic(topic, material);
  if (t) return topicSummary(t, material);
  const text = joinText(material, extra);
  if (sentences(text).length >= 2) return textSummary(topic, text);
  return frameworkSummary(topic);
}

// ---------- Apuntes asistidos ----------
export function miloNotes(topic: string, material: string, extra = "") {
  const t = findTopic(topic, material);
  if (t) {
    const mine = summarize(material, 4);
    const sections = t.branches.flatMap((b, i) => [
      `## ${i + 1}. ${b.label}`,
      `- ${dot(b.summary)}`,
      ...b.points.map(
        (p) =>
          `  - **${p.label}:** ${dot(cap(p.detail))}${p.items?.length ? ` _Ej.: ${p.items.join(", ")}._` : ""}`,
      ),
    ]);
    if (mine.length)
      sections.push(
        `## ${t.branches.length + 1}. Desde tus apuntes`,
        ...mine.map((s) => `- ${clip(s, 220)}`),
      );
    const [b0, b1] = t.branches;
    return [
      `# ${t.title}`,
      ...sections,
      "## Palabras clave",
      t.branches
        .flatMap((b) => b.points.map((p) => `**${p.label}**`))
        .slice(0, 10)
        .join(" · "),
      "## Resumen en 3 líneas",
      `- ${t.intro.split(/(?<=\.)\s+/)[0]}`,
      ...t.branches.slice(0, 2).map((b) => `- **${b.label}:** ${dot(b.summary)}`),
      "## Preguntas de autoestudio",
      `1. ${t.question}`,
      `2. ¿Qué diferencia hay entre **${b0?.points[0]?.label ?? t.title}** y **${b0?.points[1]?.label ?? b1?.label ?? t.title}**?`,
      `3. ${t.apply[0]?.[0] ?? `Explica con un ejemplo propio qué es **${b1?.points[0]?.label ?? t.title}**.`}`,
    ].join("\n");
  }
  const text = joinText(material, extra);
  let map = localMindMap(topic, text);
  if (map.branches.length < 2)
    map = { center: topic, branches: [...map.branches, ...frameworkBranches(topic)].slice(0, 6) };
  const terms = keyTerms(text, 8);
  const lines = summarize(text, 3);
  return [
    `# ${topic}`,
    ...map.branches.flatMap((b, i) => [
      `## ${i + 1}. ${b.label}`,
      `- ${dot(b.summary)}`,
      ...b.points.map((p) => `  - ${p.detail ? `**${p.label}:** ${dot(p.detail)}` : dot(p.label)}`),
    ]),
    "## Palabras clave",
    (terms.length ? terms.map(cap) : map.branches.map((b) => b.label))
      .map((x) => `**${x}**`)
      .join(" · "),
    "## Resumen en 3 líneas",
    ...(lines.length
      ? lines.map((s) => `- ${clip(s, 200)}`)
      : map.branches.slice(0, 3).map((b) => `- **${b.label}:** ${dot(b.summary)}`)),
    "## Preguntas de autoestudio",
    `1. ¿Qué es **${cap(terms[0] ?? map.branches[0]!.label)}** y por qué es importante en ${topic}?`,
    `2. ¿Cómo se relacionan **${cap(terms[1] ?? map.branches[1]?.label ?? topic)}** y **${cap(terms[2] ?? map.branches[0]!.label)}**?`,
    `3. Propón un ejemplo de la vida diaria donde se aplique ${topic}.`,
  ].join("\n");
}

// ---------- Flashcards ----------
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function shuffle<T>(list: T[], rand: () => number) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}
/** Intercala tipos de tarjeta para que el mazo nunca tenga muchas seguidas del mismo tipo. */
function mixTypes(cards: AiFlashcard[], rand: () => number) {
  const groups = new Map<string, AiFlashcard[]>();
  for (const c of cards) groups.set(c.type, [...(groups.get(c.type) ?? []), c]);
  const order = shuffle([...groups.keys()], rand);
  const out: AiFlashcard[] = [];
  while (out.length < cards.length)
    for (const k of order) {
      const next = groups.get(k)!.shift();
      if (next) out.push(next);
    }
  return out;
}

export function topicCards(t: Topic): AiFlashcard[] {
  const cards: AiFlashcard[] = [];
  const title = t.title;
  t.branches.forEach((b) => {
    const causal = /causa|consecuencia|funci|importancia|factor/i.test(b.label);
    b.points.forEach((p, j) => {
      const ex = p.items?.length ? ` Ejemplos: ${p.items.join(", ")}.` : "";
      const answer = `${dot(cap(p.detail))}${ex}`;
      if (causal) {
        const question = /consecuencia/i.test(b.label)
          ? `¿Qué consecuencia tuvo ${title} en el ámbito «${p.label}»?`
          : /causa|factor/i.test(b.label)
            ? `¿Cómo influyó «${p.label}» en ${title}?`
            : /funci/i.test(b.label)
              ? `¿Por qué es importante la función de «${p.label}» en ${title}?`
              : `¿Por qué ${title} es clave en relación con «${p.label}»?`;
        cards.push({ type: "causa", question, answer, hint: `Piensa en «${b.label}».` });
      } else {
        const question = [
          `¿Qué es «${p.label}» en ${title}?`,
          `Define «${p.label}» dentro de «${b.label}».`,
          `Explica qué caracteriza a «${p.label}».`,
        ][j % 3]!;
        cards.push({ type: "concepto", question, answer, hint: `Forma parte de «${b.label}».` });
      }
      cards.push({
        type: "completar",
        question: `Completa con el concepto correcto: _____ → ${dot(p.detail)}`,
        answer: p.label,
        hint: `Pertenece a «${b.label}» y empieza por «${p.label[0]}».`,
      });
      const other = b.points[(j + 1) % b.points.length];
      if (j % 2 === 1 && other && other !== p) {
        cards.push({
          type: "verdadero_falso",
          question: `¿Verdadero o falso? «${p.label}»: ${dot(other.detail)}`,
          answer: `Falso. Eso corresponde a «${other.label}». «${p.label}»: ${dot(p.detail)}`,
        });
      } else {
        cards.push({
          type: "verdadero_falso",
          question: `¿Verdadero o falso? «${p.label}»: ${dot(p.detail)}`,
          answer: `Verdadero. Forma parte de «${b.label}»: ${dot(lowerFirst(b.summary))}`,
        });
      }
      if (j === 0 && p.items?.length) {
        cards.push({
          type: "aplicacion",
          question: `Menciona un ejemplo concreto de «${p.label}» y explica por qué lo es.`,
          answer: `${p.items.join(", ")}. ${dot(cap(p.detail))}`,
          hint: `Recuerda qué define a «${p.label}».`,
        });
      }
    });
    for (let j = 0; j + 1 < b.points.length; j += 2) {
      const A = b.points[j]!,
        B = b.points[j + 1]!;
      cards.push({
        type: "comparacion",
        question: `¿Qué diferencia hay entre «${A.label}» y «${B.label}»?`,
        answer: `«${A.label}»: ${dot(A.detail)} En cambio, «${B.label}»: ${dot(B.detail)}`,
        hint: `Ambos forman parte de «${b.label}».`,
      });
    }
    if (b.ordered && b.points.length >= 3) {
      const labels = b.points.map((p) => p.label);
      cards.push({
        type: "proceso",
        question: `Ordena correctamente (${b.label}): ${[...labels].reverse().join(" · ")}`,
        answer: labels.join(" → "),
        hint: `Empieza por «${labels[0]}».`,
      });
      b.points.slice(0, -1).forEach((p, j) => {
        const next = b.points[j + 1]!;
        cards.push({
          type: "proceso",
          question: `En «${b.label}», ¿qué viene después de «${p.label}»?`,
          answer: `«${next.label}»: ${dot(next.detail)}`,
        });
      });
    }
  });
  for (const [q, a] of t.apply)
    cards.push({
      type: "aplicacion",
      question: q,
      answer: a,
      hint: `Usa lo que sabes de ${title}.`,
    });
  return cards;
}

function frameworkCards(topic: string): AiFlashcard[] {
  return frameworkBranches(topic).flatMap((b) => [
    {
      type: "concepto" as const,
      question: `¿Qué debes poder explicar sobre «${b.label}» de ${topic}?`,
      answer: `${dot(b.summary)} ${b.points.map((p) => `${p.label}: ${dot(p.detail)}`).join(" ")}`,
    },
    {
      type: "aplicacion" as const,
      question: `Da un ejemplo propio relacionado con «${b.label}» de ${topic}.`,
      answer: `Un buen ejemplo muestra ${lowerFirst(b.summary)}. Compáralo con tus apuntes o fuentes para comprobarlo.`,
    },
  ]);
}

export function miloFlashcards(
  topic: string,
  material: string,
  extra = "",
  exclude: string[] = [],
  seed = 1,
): AiFlashcard[] {
  const t = findTopic(topic, material);
  let pool = [
    ...(t ? topicCards(t) : []),
    ...localFlashcards(t?.title ?? topic, joinText(material, extra)),
  ];
  if (pool.length < 6) pool = [...pool, ...frameworkCards(topic)];
  const seen = new Set<string>();
  pool = pool.filter((c) => {
    const k = norm(c.question).trim();
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
  const rand = mulberry32(seed);
  const ex = new Set(exclude.map((q) => norm(q).trim()));
  const fresh = pool.filter((c) => !ex.has(norm(c.question).trim()));
  const used = pool.filter((c) => ex.has(norm(c.question).trim()));
  return [...mixTypes(shuffle(fresh, rand), rand), ...mixTypes(shuffle(used, rand), rand)].slice(
    0,
    14,
  );
}

// ---------- Generación completa (con fuentes web opcionales) ----------
export function miloStudySync(
  kind: AiKind,
  topic: string,
  material: string,
  extra = "",
  exclude: string[] = [],
  seed = 1,
): StudyAiResult {
  if (kind === "mindmap") return { map: miloMindMap(topic, material, extra) };
  if (kind === "flashcards")
    return { cards: miloFlashcards(topic, material, extra, exclude, seed) };
  if (kind === "summary") return { markdown: miloSummary(topic, material, extra) };
  return { markdown: miloNotes(topic, material, extra) };
}

async function webText(topic: string) {
  const timeout = new Promise<[]>((resolve) => setTimeout(() => resolve([]), 5000));
  const hitsList = await Promise.race([webSearchMany(topic, 3), timeout]);
  return hitsList.map((h) => h.text).join("\n\n");
}

/** Si el tema no está en la biblioteca y hay pocos apuntes, con internet completa el material con Wikipedia. */
export async function miloStudy(
  kind: AiKind,
  topic: string,
  material: string,
  opts: { exclude?: string[]; seed?: number; online?: boolean } = {},
): Promise<StudyAiResult> {
  const extra =
    opts.online && !findTopic(topic, material) && sentences(material).length < 3
      ? await webText(topic)
      : "";
  return miloStudySync(kind, topic, material, extra, opts.exclude ?? [], opts.seed ?? Date.now());
}

// ---------- Tutor ----------
export type MiloReply = { text: string; chips: string[]; needsWeb?: boolean };

const STOP = new Set(
  norm(
    "que como cual cuales para por sobre entre explica explicame dime define definir definicion significa significado quiero saber puedes podrias ayudame tema cosa cosas tiene tienen sirve esta este estos estas donde cuando porque mucho bien hola gracias favor sobre acerca seria cuenta cuentame habla hablame exploramos principales importante funciona hace hacen",
  ).split(" "),
);
const stem = (w: string) =>
  w.length > 5 && w.endsWith("es")
    ? w.slice(0, -2)
    : w.length > 4 && w.endsWith("s")
      ? w.slice(0, -1)
      : w;
const words = (s: string) =>
  (norm(s).match(/[a-z0-9]{4,}/g) ?? []).filter((w) => !STOP.has(w)).map(stem);
const same = (a: string, b: string) =>
  a === b || (Math.min(a.length, b.length) >= 5 && (a.startsWith(b) || b.startsWith(a)));
const matchCount = (tokens: string[], text: string) => {
  const ws = words(text);
  return tokens.filter((t) => ws.some((w) => same(t, w))).length;
};

type Focus = { topic: Topic; branch: TopicBranch; point?: MindPoint; item?: string; score: number };
/** Apartado o idea que pregunta el estudiante. Si dos apartados empatan (p. ej. «etapas»), devuelve null para dar la visión general. */
function findFocus(tokens: string[], list: Topic[], bonus?: Topic | null): Focus | null {
  let best: Focus | null = null;
  let tie = false;
  const consider = (f: Focus) => {
    if (!best || f.score > best.score) {
      best = f;
      tie = false;
    } else if (f.score === best.score && !f.point && !best.point && f.topic === best.topic)
      tie = true;
  };
  for (const topic of list) {
    const extra = bonus && topic.id === bonus.id ? 1 : 0;
    for (const branch of topic.branches) {
      const bs = matchCount(tokens, branch.label) * 5;
      if (bs) consider({ topic, branch, score: bs + extra });
      for (const point of branch.points) {
        const ps = matchCount(tokens, point.label) * 4;
        const item = (point.items ?? []).find((it) => matchCount(tokens, it) > 0);
        const score = ps + (item ? 2 : 0);
        if (score)
          consider({
            topic,
            branch,
            point,
            ...(item && !ps ? { item } : {}),
            score: score + extra,
          });
      }
    }
  }
  const found = best as Focus | null;
  return found && found.score >= 2 && !tie ? found : null;
}

function notesLine(tokens: string[], notes: string) {
  if (!tokens.length) return "";
  const rel = sentences(notes)
    .filter((s) => matchCount(tokens, s) > 0)
    .slice(0, 2);
  return rel.length ? `\n📒 **En tus apuntes:** _${rel.map((s) => clip(s, 200)).join(" ")}_` : "";
}

function overviewAnswer(t: Topic, tokens: string[], notes: string) {
  const b0 = t.branches[0]!;
  return [
    `## ${t.title}`,
    t.intro,
    "",
    "### Lo esencial",
    ...t.branches.map(
      (b) =>
        `- **${b.label}** — ${lowerFirst(b.summary)}: ${b.points.map((p) => p.label).join(", ")}.`,
    ),
    "",
    `### Profundicemos: ${b0.label}`,
    ...b0.points.map(
      (p) =>
        `- **${p.label}:** ${dot(cap(p.detail))}${p.items?.length ? ` _Ej.: ${p.items.join(", ")}._` : ""}`,
    ),
    "",
    "### Ejemplo práctico",
    t.example,
    notesLine(tokens, notes),
    "",
    "### Para repasar",
    t.question,
  ].join("\n");
}

function branchAnswer(t: Topic, b: TopicBranch, tokens: string[], notes: string) {
  const [p0, p1] = b.points;
  return [
    `## ${b.label} · ${t.title}`,
    `${dot(b.summary)}${b.ordered ? ` Sigue este orden: ${b.points.map((p) => `**${p.label}**`).join(" → ")}.` : ""}`,
    "",
    "### Ideas clave",
    ...b.points.map(
      (p, i) =>
        `${i + 1}. **${p.label}:** ${dot(cap(p.detail))}${p.items?.length ? ` _Ej.: ${p.items.join(", ")}._` : ""}`,
    ),
    "",
    "### Ejemplo práctico",
    t.example,
    notesLine(tokens, notes),
    "",
    "### Para repasar",
    p0 && p1
      ? `¿Qué diferencia hay entre **${p0.label}** y **${p1.label}**? Explícalo con un ejemplo.`
      : t.question,
  ].join("\n");
}

function pointAnswer(f: Focus, tokens: string[], notes: string) {
  const { topic: t, branch: b } = f;
  const p = f.point!;
  const siblings = b.points.filter((x) => x !== p).slice(0, 3);
  const apply = t.apply.find(([q]) => matchCount(words(p.label), q) > 0);
  return [
    `## ${f.item ?? p.label}`,
    f.item
      ? `**${f.item}** es un ejemplo de **${p.label}**, dentro de **${b.label}** (${t.title}).`
      : `**${p.label}** forma parte de **${b.label}** en ${t.title}: ${dot(lowerFirst(b.summary))}`,
    "",
    "### Qué debes saber",
    `- **${p.label}:** ${dot(cap(p.detail))}`,
    ...(p.items?.length ? [`- **Ejemplos:** ${p.items.join(", ")}.`] : []),
    "",
    ...(siblings.length
      ? [
          "### Cómo se relaciona con lo demás",
          ...siblings.map((s) => `- **${s.label}:** ${dot(cap(s.detail))}`),
          "",
        ]
      : []),
    "### Ejemplo práctico",
    apply ? `${apply[0]}\n\n**Respuesta:** ${apply[1]}` : t.example,
    notesLine(tokens, notes),
    "",
    "### Para repasar",
    siblings[0] ? `¿En qué se diferencia **${p.label}** de **${siblings[0].label}**?` : t.question,
  ].join("\n");
}

function topicChips(t: Topic, skip?: TopicBranch) {
  const b = t.branches.find((x) => x !== skip) ?? t.branches[0]!;
  return [`Explícame «${b.label}»`, "Hazme una pregunta de práctica", `Resume ${t.title}`];
}

function practiceAnswer(title: string, notes: string) {
  const deck = miloFlashcards(title, notes, "", [], Date.now() % 100000).slice(0, 3);
  return [
    `## 🎯 Práctica: ${title}`,
    "Responde en tu cuaderno o en voz alta y luego revisa las respuestas:",
    "",
    ...deck.map((c, i) => `**${i + 1}. ${c.question}**`),
    "",
    "### Respuestas",
    ...deck.map((c, i) => `${i + 1}. ${c.answer}`),
  ].join("\n");
}

const TIPS =
  "## Consejos para estudiar mejor 📚\n\n1. **Recuperación activa:** cierra el cuaderno y ponte a prueba con flashcards; es más eficaz que releer.\n2. **Repaso espaciado:** repasa hoy, mañana y en una semana.\n3. **Pomodoro:** 25 minutos de estudio y 5 de descanso.\n4. **Explícalo con tus palabras**, como si enseñaras a un amigo.\n5. **Duerme bien:** el cerebro consolida lo aprendido mientras descansas.\n6. Estudia con el celular lejos 📵.";

/** Respuesta del tutor sin IA externa: biblioteca académica + apuntes del cuaderno. */
export function miloReply(
  question: string,
  notes: string,
  subject: string,
  firstName = "",
): MiloReply {
  const q = norm(question.trim());
  const nbTopic = findTopic(subject, notes);
  if (!q) return { text: "¡Escríbeme tu duda y la resolvemos juntos! 😊", chips: [] };
  if (/^(hola|buenas|hey|buenos|holi)/.test(q) && q.length < 30) {
    const ideas = nbTopic
      ? ` Por ejemplo: ${nbTopic.branches
          .slice(0, 3)
          .map((b) => `**${lowerFirst(b.label)}**`)
          .join(", ")}.`
      : "";
    return {
      text: `¡Hola${firstName ? `, ${firstName}` : ""}! 👋 Soy **Milo**, tu tutor. Estoy listo para ayudarte con **${subject}**.${ideas}\n\nPuedo explicarte conceptos, resumir tus apuntes, hacerte preguntas de práctica o resolver ejercicios. ¿Por dónde empezamos?`,
      chips: nbTopic ? topicChips(nbTopic) : followUps(question, subject),
    };
  }
  const math = solveMath(question);
  if (math) {
    return {
      text: `## Resolvamos el cálculo 🧮\n\n**${math.expr} = ${math.result}**\n\n### Cómo se resuelve\n1. Primero se resuelven los paréntesis.\n2. Luego las potencias.\n3. Después las multiplicaciones y divisiones, de izquierda a derecha.\n4. Por último, las sumas y restas.\n\n¿Probamos otro ejercicio parecido?`,
      chips: followUps(question, subject),
    };
  }
  if (/consejo|tip|como estudiar|concentr|memoriz/.test(q))
    return { text: TIPS, chips: ["Hazme una pregunta de práctica", `Resume ${subject}`] };
  if (/^(gracias|muchas gracias)/.test(q))
    return {
      text: "¡De nada! 💚 Sigue así: cada pregunta te acerca a dominar el tema.",
      chips: ["Hazme una pregunta de práctica"],
    };

  const qTopic = findTopic(question);
  const t = qTopic ?? nbTopic;
  const title = t?.title ?? subject;
  if (/resum/.test(q))
    return {
      text: `Aquí tienes un resumen de **${title}** 📚\n\n${miloSummary(qTopic ? qTopic.title : subject, notes)}`,
      chips: t ? topicChips(t) : followUps(question, subject),
    };
  if (/esquema|mapa mental|organiza|ordena mis apuntes/.test(q))
    return {
      text: miloNotes(qTopic ? qTopic.title : subject, notes),
      chips: t ? topicChips(t) : followUps(question, subject),
    };
  if (
    /pregunta de practica|preguntas de practica|ponme a prueba|evaluame|examiname|quiz|practicar/.test(
      q,
    )
  )
    return {
      text: practiceAnswer(title, notes),
      chips: ["Otra pregunta de práctica", t ? `Resume ${t.title}` : `Resume ${subject}`],
    };
  if (t && /relaciona|otras areas|otras asignaturas|conecta/.test(q)) {
    return {
      text: `## ${t.title} y otras áreas\n\n${t.links ?? AREA_LINKS[t.area]}\n\n### Para pensar\n¿En qué otra asignatura que llevas este año aparece algo de ${t.title}?`,
      chips: topicChips(t),
    };
  }

  let tokens = words(question);
  if (qTopic) {
    const titleWords = words(qTopic.title);
    tokens = tokens.filter((w) => !titleWords.some((tw) => same(w, tw)));
    const f = tokens.length ? findFocus(tokens, [qTopic]) : null;
    if (f?.point)
      return { text: pointAnswer(f, tokens, notes), chips: topicChips(f.topic, f.branch) };
    if (f)
      return {
        text: branchAnswer(f.topic, f.branch, tokens, notes),
        chips: topicChips(f.topic, f.branch),
      };
    return { text: overviewAnswer(qTopic, words(question), notes), chips: topicChips(qTopic) };
  }
  const f = tokens.length
    ? findFocus(
        tokens,
        nbTopic ? [nbTopic, ...TOPICS.filter((x) => x !== nbTopic)] : TOPICS,
        nbTopic,
      )
    : null;
  if (f?.point)
    return { text: pointAnswer(f, tokens, notes), chips: topicChips(f.topic, f.branch) };
  if (f)
    return {
      text: branchAnswer(f.topic, f.branch, tokens, notes),
      chips: topicChips(f.topic, f.branch),
    };

  const basic = basicTopicText(question);
  if (basic)
    return {
      text: `${basic}${notesLine(tokens, notes)}\n\n### Para repasar\nExplica esta idea con tus palabras y piensa en un ejemplo de tu vida diaria.`,
      chips: followUps(question, subject),
    };

  const rel = sentences(notes)
    .filter((s) => matchCount(tokens, s) > 0)
    .slice(0, 4);
  if (rel.length) {
    const terms = keyTerms(rel.join(" "), 3).map(cap);
    return {
      text: [
        `## ${cap(clip(question.replace(/[¿?]/g, ""), 70))}`,
        `Según tus apuntes de **${subject}**:`,
        "",
        ...rel.map((s) => {
          const p = splitIdea(s);
          return p.detail ? `- **${p.label}:** ${p.detail}` : `- ${p.label}`;
        }),
        "",
        "### Cómo entenderlo mejor",
        terms.length >= 2
          ? `Fíjate en cómo se relacionan **${terms[0]}** y **${terms[1]}**: explica esa relación con tus palabras y busca un ejemplo de tu vida diaria.`
          : "Explica estas ideas con tus palabras y busca un ejemplo de tu vida diaria.",
        "",
        "### Para repasar",
        "¿Cuál de estas ideas te parece más importante y por qué?",
      ].join("\n"),
      chips: nbTopic ? topicChips(nbTopic) : followUps(question, subject),
    };
  }

  return {
    needsWeb: true,
    chips: nbTopic ? topicChips(nbTopic) : followUps(question, subject),
    text: [
      `## ${cap(clip(question.replace(/[¿?]/g, ""), 70))}`,
      `Ese tema todavía no está en mi biblioteca sin conexión ni en tus apuntes de **${subject}**. Mientras tanto, así puedes abordarlo:`,
      "",
      "1. **Define** el concepto con tus palabras y anota los términos técnicos.",
      "2. **Divide** el tema en partes, tipos o etapas.",
      `3. **Relaciónalo** con lo que ya sabes de ${subject}.`,
      "4. **Ponte a prueba** con una pregunta que te harían en un examen.",
      "",
      "Cuando tengas internet, vuelve a preguntarme y buscaré la información por ti 🌐.",
    ].join("\n"),
  };
}

// ---------- Estudio+ y Autoevaluación (audio, cuestionario, tabla) ----------
const stripMd = (md: string) =>
  md
    .split("\n")
    .map((l) =>
      l
        .replace(/^#+\s*/, "")
        .replace(/^\s*(?:[-*]|\d+\.)\s+/, "")
        .replace(/[*_]/g, "")
        .trim(),
    )
    .filter((l) => l.length > 0)
    .map((l) => dot(l))
    .join("\n");

/** Material para las herramientas: apuntes, fuentes y el resumen o los apuntes ya generados (IA o Milo). */
export function toolsMaterial(material: string, generated: (string | undefined)[] = []) {
  return joinText(material, ...generated.filter((g): g is string => Boolean(g)).map(stripMd));
}

export type MiloQuizItem = { question: string; options: string[]; answer: string };

export function miloQuiz(topic: string, material: string, count = 5): MiloQuizItem[] {
  const own = makeQuiz(material, count);
  if (own.length >= 3) return own;
  const t = findTopic(topic, material);
  const branches: MindBranch[] = t ? t.branches : frameworkBranches(topic);
  const all = branches.flatMap((b) => b.points.map((p) => ({ b, p })));
  const labels = all.map((x) => x.p.label);
  const rand = mulberry32(7);
  const extra = shuffle(all, rand)
    .slice(0, count - own.length)
    .map(({ b, p }) => {
      const near = b.points.map((x) => x.label).filter((l) => l !== p.label);
      const far = shuffle(
        labels.filter((l) => l !== p.label && !near.includes(l)),
        rand,
      );
      const options = [p.label, ...[...near, ...far].slice(0, 3)].sort((a, c) =>
        a.localeCompare(c),
      );
      return {
        question: `¿Qué concepto corresponde a esta descripción? «${dot(cap(p.detail))}»`,
        options,
        answer: p.label,
      };
    });
  return [...own, ...extra];
}

export function miloAudioLines(topic: string, material: string) {
  const own = summarize(material, 5);
  if (own.length >= 3) return own;
  const t = findTopic(topic, material);
  if (!t) return [...own, ...frameworkBranches(topic).map((b) => `${b.label}: ${dot(b.summary)}`)];
  return [
    stripMd(t.intro).split("\n")[0]!,
    ...t.branches.map(
      (b) =>
        `${b.label}: ${lowerFirst(b.summary)}. Incluye ${b.points.map((p) => p.label.toLowerCase()).join(", ")}.`,
    ),
    ...own,
  ];
}

export function miloTable(topic: string, material: string) {
  const own = dataTable(material).filter((r) => r.context);
  if (own.length >= 4) return own;
  const t = findTopic(topic, material);
  const points = (t ? t.branches : frameworkBranches(topic)).flatMap((b) => b.points);
  const text = norm(material);
  const rows = points.slice(0, 10).map((p) => ({
    term: p.label,
    count: Math.max(1, hits(text, norm(p.label))),
    context: dot(cap(p.detail)),
  }));
  return [...own, ...rows.filter((r) => !own.some((o) => norm(o.term) === norm(r.term)))];
}
