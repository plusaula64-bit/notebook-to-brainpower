import { describe, expect, it } from "vitest";
import {
  findTopic,
  miloFlashcards,
  miloMindMap,
  miloNotes,
  miloReply,
  miloSummary,
} from "@/lib/milo/engine";
import { TOPICS } from "@/lib/milo/knowledge";
import { aiPaused, pauseAi, resumeAi } from "@/lib/ai-availability";

describe("biblioteca de Milo", () => {
  it("cada tema tiene al menos 3 apartados con 2 o más ideas", () => {
    for (const t of TOPICS) {
      expect(t.branches.length, t.id).toBeGreaterThanOrEqual(3);
      for (const b of t.branches)
        expect(b.points.length, `${t.id} · ${b.label}`).toBeGreaterThanOrEqual(2);
    }
  });

  it("reconoce el tema por el nombre del cuaderno y prefiere el más específico", () => {
    expect(findTopic("Anatomía")?.id).toBe("anatomia");
    expect(findTopic("Anatomía: sistema óseo")?.id).toBe("sistema-oseo");
    expect(findTopic("Mi cuaderno")).toBeNull();
  });
});

describe("contenido de estudio sin IA externa", () => {
  it("el esquema de llaves de Anatomía incluye las ramas de la anatomía", () => {
    const map = miloMindMap("Anatomía", "");
    expect(map.branches.map((b) => b.label)).toContain("Ramas de la anatomía");
    expect(map.branches.length).toBeGreaterThanOrEqual(3);
  });

  it("añade una rama con los apuntes del estudiante cuando existen", () => {
    const map = miloMindMap(
      "Anatomía",
      "La histología estudia los tejidos del cuerpo humano. El fémur es el hueso más largo.",
    );
    expect(map.branches.at(-1)?.label).toBe("Tus apuntes");
  });

  it("el resumen tiene todas las secciones de estudio", () => {
    const md = miloSummary("Fotosíntesis", "");
    for (const h of [
      "## Idea central",
      "## Conceptos clave",
      "## Esquema lógico",
      "## Ejemplo práctico",
      "## Para recordar",
      "## Pregunta de repaso",
    ])
      expect(md).toContain(h);
  });

  it("con un tema desconocido usa los apuntes del cuaderno", () => {
    const notes =
      "La termodinámica estudia el calor y la energía. La entropía mide el desorden de un sistema. La entropía siempre aumenta en un sistema aislado.";
    expect(miloSummary("Termo", notes)).toMatch(/entrop/i);
    expect(miloNotes("Termo", notes)).toContain("## Preguntas de autoestudio");
  });

  it("nunca deja el resumen vacío, aunque no haya apuntes ni tema conocido", () => {
    expect(miloSummary("Tema nuevo", "").length).toBeGreaterThan(200);
  });
});

describe("flashcards de Milo", () => {
  it("crea un mazo de 14 tarjetas con al menos 4 tipos distintos", () => {
    const deck = miloFlashcards("Sistema nervioso", "");
    expect(deck).toHaveLength(14);
    expect(new Set(deck.map((c) => c.type)).size).toBeGreaterThanOrEqual(4);
  });

  it("un mazo nuevo no repite las preguntas del anterior", () => {
    const first = miloFlashcards("Revolución Francesa", "", "", [], 1);
    const next = miloFlashcards(
      "Revolución Francesa",
      "",
      "",
      first.map((c) => c.question),
      2,
    );
    const before = new Set(first.map((c) => c.question));
    expect(next.filter((c) => before.has(c.question))).toHaveLength(0);
  });
});

describe("tutor Milo", () => {
  it("explica las ramas de la anatomía con encabezados y ejemplo", () => {
    const r = miloReply("¿Cuáles son las ramas de la anatomía?", "", "Anatomía");
    expect(r.text).toContain("## Ramas de la anatomía");
    expect(r.text).toContain("Anatomía microscópica");
    expect(r.text).toContain("### Ejemplo práctico");
    expect(r.needsWeb).toBeFalsy();
  });

  it("responde un concepto concreto aunque el cuaderno sea de otra materia", () => {
    const r = miloReply("¿Qué es la mitocondria?", "", "Mis apuntes");
    expect(r.text).toMatch(/ATP/);
  });

  it("usa los apuntes cuando el tema no está en la biblioteca", () => {
    const r = miloReply(
      "¿Qué es la entropía?",
      "La entropía mide el desorden de un sistema físico.",
      "Termo",
    );
    expect(r.text).toMatch(/desorden/);
    expect(r.needsWeb).toBeFalsy();
  });

  it("pide buscar en la web solo cuando no hay nada en la biblioteca ni en los apuntes", () => {
    expect(miloReply("¿Qué es el blockchain?", "", "Varios").needsWeb).toBe(true);
  });
});

describe("pausa de la IA externa", () => {
  it("tras quedarse sin créditos, se pausa y vuelve sola al terminar el plazo", () => {
    resumeAi();
    pauseAi(15 * 60_000, 1_000);
    expect(aiPaused(1_000 + 60_000)).toBe(true);
    expect(aiPaused(1_000 + 15 * 60_000 + 1)).toBe(false);
    resumeAi();
  });
});

describe("Estudio+ y Autoevaluación con Milo", () => {
  it("el cuestionario de un cuaderno sin apuntes tiene 5 preguntas con la respuesta entre 4 opciones", async () => {
    const { miloQuiz } = await import("@/lib/milo/engine");
    const quiz = miloQuiz("Sistema digestivo", "");
    expect(quiz).toHaveLength(5);
    for (const q of quiz) {
      expect(q.options).toHaveLength(4);
      expect(q.options).toContain(q.answer);
    }
  });
  it("el audio y la tabla nunca quedan vacíos", async () => {
    const { miloAudioLines, miloTable } = await import("@/lib/milo/engine");
    expect(miloAudioLines("Incas", "").length).toBeGreaterThanOrEqual(3);
    expect(miloTable("Incas", "").length).toBeGreaterThanOrEqual(4);
  });
});

describe("Historia del Perú con etapas precisas", () => {
  it("un cuaderno «Historia del Perú» usa la periodización del Perú, no la historia general", () => {
    expect(findTopic("Historia del Perú")?.id).toBe("historia-peru");
    const md = miloSummary("Historia del Perú", "");
    expect(md).toContain("Primer militarismo (1821–1845)");
    expect(md).toContain("Guerra con Chile (1879–1883)");
    expect(md).toContain("Oncenio de Leguía (1919–1930)");
  });

  it("distingue los tres militarismos con sus fechas", () => {
    const r = miloReply("¿Qué fue el militarismo?", "", "Historia del Perú");
    for (const d of ["1821–1845", "1883–1895", "1930–1939"]) expect(r.text).toContain(d);
  });

  it("el segundo militarismo no se mezcla con el primero ni con el tercero", () => {
    const r = miloReply("¿Qué fue el segundo militarismo?", "", "Historia del Perú");
    expect(r.text).toContain("Contrato Grace");
    expect(r.text).not.toContain("Santa Cruz");
    expect(r.text).not.toContain("Sánchez Cerro");
  });

  it("la Guerra con Chile no se responde con la independencia", () => {
    const r = miloReply("¿Qué pasó en la Guerra con Chile?", "", "Historia del Perú");
    expect(r.text).toContain("Tratado de Ancón");
    expect(r.text).not.toContain("San Martín");
  });

  it("responde por personajes y fechas concretas", () => {
    expect(miloReply("¿Quién fue Miguel Grau?", "", "Historia del Perú").text).toContain("Angamos");
    expect(miloReply("¿Qué fue la prosperidad falaz?", "", "Historia del Perú").text).toContain(
      "1845–1872",
    );
    expect(miloReply("¿Qué hizo Manuel Pardo?", "", "Historia del Perú").text).toMatch(
      /primer presidente civil/i,
    );
  });

  it("al preguntar por las etapas de la república da la visión completa", () => {
    const r = miloReply("¿Cuáles son las etapas de la república?", "", "Historia del Perú");
    expect(r.text).toContain("República en el siglo XIX");
    expect(r.text).toContain("República en el siglo XX");
  });
});

describe("flashcards de historia sin preguntas ambiguas", () => {
  it("ninguna tarjeta queda con huecos vacíos ni pregunta por «Fin» o «Contexto» sin su etapa", () => {
    for (const topic of ["Historia del Perú", "Los militarismos en el Perú", "Guerra con Chile"]) {
      for (const seed of [1, 2, 3, 4]) {
        for (const c of miloFlashcards(topic, "", "", [], seed)) {
          expect(c.question).not.toContain("«»");
          expect(c.question).not.toMatch(/«(Fin|Contexto|Causas|Gobernantes)»/);
        }
      }
    }
  });

  it("en el siglo XX, después del tercer militarismo no se salta a 1968", async () => {
    const { topicCards } = await import("@/lib/milo/engine");
    const peru = TOPICS.find((t) => t.id === "historia-peru")!;
    const card = topicCards(peru).find((c) =>
      c.question.includes("después de «Tercer militarismo"),
    );
    expect(card?.answer).toContain("1939 a 1968");
  });
});

describe("Autoevaluación de Historia del Perú", () => {
  it("pregunta por etapas con su descripción, aunque ya exista un resumen generado", async () => {
    const { miloQuiz, miloSummary, toolsMaterial } = await import("@/lib/milo/engine");
    const generated = toolsMaterial("", [miloSummary("Historia del Perú", "")]);
    const quiz = miloQuiz("Historia del Perú", "", 5, generated);
    expect(quiz).toHaveLength(5);
    for (const q of quiz) {
      expect(q.question).toMatch(/^¿Qué concepto corresponde a esta descripción\?/);
      expect(q.options).toContain(q.answer);
    }
  });

  it("al completar frases de los apuntes, nunca corta una palabra por la mitad", async () => {
    const { makeQuiz } = await import("@/lib/tutor");
    const text =
      "Los primeros pobladores llegaron hace miles de años. El primer horizonte fue Chavín y el horizonte medio fue Wari. Los pobladores del horizonte tardío fueron los incas. El primer imperio andino fue Wari según varios autores.";
    for (const q of makeQuiz(text)) expect(q.question).not.toMatch(/_____[a-záéíóúñ]/i);
  });
});
