import { createOpenAI } from "@ai-sdk/openai";
import { generateText, Output } from "ai";
import { z } from "zod";
import { cleanImportedText } from "@/lib/clean-text";
import { studyAiFailure } from "@/lib/study-ai";
import {
  createLovableAiGatewayRunIdFetch,
  getLovableAiGatewayRunId,
  withLovableAiGatewayRunIdHeader,
} from "./run-id";

const GATEWAY_URL = "https://ai.gateway.lovable.dev/v1";
const MODEL = "openai/gpt-6-astra";

export type StudyAiKind = "mindmap" | "summary" | "notes" | "flashcards";
export type StudyAiRequestBody = {
  kind: StudyAiKind;
  notebook: string;
  notes: string;
  exclude?: string[];
};

const BASE = `Eres un docente experto y diseñador pedagógico de AulaPlus para estudiantes de secundaria y universidad.
Tu trabajo es TRANSFORMAR el material en contenido de estudio estructurado y profesional, adaptado a la asignatura y al tema concreto.

Reglas obligatorias:
- NUNCA copies ni repitas frases del material tal cual. Reformula, sintetiza, jerarquiza y conecta las ideas.
- Organiza con lógica: de lo general a lo particular, causas → consecuencias, etapas de un proceso, clasificaciones o comparaciones, según lo que pida el tema.
- Usa el vocabulario propio de la asignatura y corrige con tacto cualquier error del material.
- Si el material es escaso o no existe, construye el contenido a partir del tema del cuaderno con tu conocimiento experto.
- Ignora textos de navegación, botones, redes sociales o publicidad que se hayan colado en el material.
- Escribe siempre en español claro, con tono académico profesional pero cercano.

Rigor académico (obligatorio):
- Da fechas, nombres y datos exactos; si un dato es aproximado, dilo ("c.", "aprox."). Nunca inventes datos.
- No mezcles periodos, etapas ni procesos distintos. En Historia del Perú respeta la periodización: Perú antiguo (preíncas e incas), Conquista (1532–1572), Virreinato (desde 1542), Independencia (1821, consolidada en Ayacucho 1824), primer militarismo (1821–1845), era del guano o prosperidad falaz (1845–1872), primer civilismo (1872–1876), Guerra con Chile (1879–1883), Reconstrucción nacional y segundo militarismo (1883–1895), República Aristocrática (1895–1919), Oncenio de Leguía (1919–1930), tercer militarismo (1930–1939), gobierno militar (1968–1980) y el periodo 1980–2000.
- Responde exactamente lo que se pregunta, con contenido específico del tema; evita respuestas genéricas.

Adapta el enfoque al ÁREA del tema (dedúcela del nombre del cuaderno y del material):
- Matemáticas, física o química: definiciones formales, fórmulas en notación clara (usa $...$ para fórmulas en Markdown), unidades, pasos de resolución y un ejercicio resuelto.
- Ciencias naturales o biología: estructuras, funciones, procesos por etapas y relaciones causa-efecto.
- Historia, geografía o ciencias sociales: contexto, cronología con fechas, actores, causas y consecuencias.
- Lengua, literatura o idiomas: reglas, clasificaciones, ejemplos de uso correctos e incorrectos, autores y obras.
- Filosofía, arte, economía, tecnología u otras: conceptos, autores o corrientes, argumentos, comparaciones y aplicaciones reales.`;

const PROMPTS: Record<StudyAiKind, string> = {
  mindmap: `${BASE}

Tarea: crea un ESQUEMA DE LLAVES (cuadro sinóptico jerárquico) que se lee de izquierda a derecha: Tema { Apartados { Ideas { Detalles.
- "center": el tema central (máximo 6 palabras).
- "branches": entre 3 y 6 apartados principales que dividan el tema con UN criterio claro (tipos, partes, etapas, causas/consecuencias, características…) sin solaparse.
  - "label": nombre del apartado (1 a 4 palabras, sustantivo o término técnico).
  - "summary": una frase propia (máximo 18 palabras) que explique el apartado.
  - "points": de 2 a 4 ideas que desglosan el apartado.
    - "label": término o idea clave (1 a 5 palabras).
    - "detail": explicación breve y precisa (máximo 16 palabras).
    - "items": de 0 a 3 sub-detalles muy cortos (máximo 8 palabras cada uno): ejemplos, datos, fechas, fórmulas o subtipos. Usa [] cuando no aporten.
- Las etiquetas deben ser cortas: el esquema de llaves se basa en palabras clave, no en frases largas.`,
  summary: `${BASE}

Tarea: crea un RESUMEN DE ESTUDIO en Markdown con exactamente estas secciones:
## Idea central
(2–3 frases propias que expliquen de qué trata el tema y por qué importa)
## Conceptos clave
(4–6 viñetas con el formato "- **Concepto:** explicación breve y precisa")
## Esquema lógico
(lista numerada que muestre la estructura del tema: proceso, causas y consecuencias, clasificación o comparación; usa subviñetas cuando ayuden)
## Ejemplo práctico
(un ejemplo concreto adaptado a un estudiante)
## Para recordar
(3 viñetas muy cortas tipo repaso rápido)
## Pregunta de repaso
(una pregunta que obligue a pensar, no a memorizar)
No añadas texto fuera de estas secciones.`,
  notes: `${BASE}

Tarea: convierte el material en APUNTES ASISTIDOS bien organizados en Markdown:
# (título del tema)
## 1. … (secciones numeradas en orden lógico, 3 a 6 secciones)
- viñetas con ideas propias; usa subviñetas para detalles y **negritas** para términos clave
- incluye definiciones con el formato "**Término:** definición" cuando corresponda
## Palabras clave
(términos clave separados por " · ")
## Resumen en 3 líneas
## Preguntas de autoestudio
(3 preguntas numeradas)
No añadas texto fuera de esta estructura.`,
  flashcards: `${BASE}

Tarea: crea un MAZO DE FLASHCARDS de estudio activo (entre 12 y 16 tarjetas) sobre el contenido del cuaderno.
- Cada tarjeta evalúa UNA idea concreta del material; cubre todo el tema sin repetir ideas entre tarjetas.
- Varía el tipo de tarjeta ("type") y mezcla el orden; usa al menos 5 tipos distintos:
  - "concepto": pide definir o explicar un término clave.
  - "causa": pregunta por qué ocurre algo o qué consecuencia tiene.
  - "proceso": pide ordenar o describir etapas o pasos.
  - "comparacion": diferencias o semejanzas entre dos ideas.
  - "aplicacion": un caso o situación concreta donde aplicar lo aprendido.
  - "completar": una afirmación propia con un hueco "_____" para el término clave.
  - "verdadero_falso": una afirmación propia (a veces falsa) que el estudiante debe juzgar; la respuesta empieza por "Verdadero." o "Falso." y lo justifica.
- "question": pregunta clara y específica del tema (máximo 30 palabras). Prohibido preguntas genéricas como "¿Qué recuerdas de…?".
- "answer": respuesta precisa y propia en 1–3 frases (máximo 45 palabras), sin copiar el material.
- "hint": una pista breve que ayude a recordar sin revelar la respuesta (máximo 14 palabras).
- Ajusta la dificultad de forma progresiva: primero recordar, luego comprender y al final aplicar.
- Adapta el contenido al área: en ciencias exactas incluye tarjetas de cálculo o fórmula; en historia, de fechas y causas; en lengua, de reglas con ejemplos.
- Si se te da una lista de preguntas ya usadas, crea preguntas NUEVAS sobre otros aspectos o desde otro ángulo; nunca las repitas ni las parafrasees.`,
};

const mindMapSchema = z.object({
  center: z.string().describe("Concepto central, máximo 6 palabras"),
  branches: z
    .array(
      z.object({
        label: z.string().describe("Nombre de la rama, 2 a 4 palabras"),
        summary: z.string().describe("Frase propia que explica la rama"),
        points: z
          .array(
            z.object({
              label: z.string().describe("Término o idea clave, 1 a 5 palabras"),
              detail: z.string().describe("Explicación breve, máximo 16 palabras"),
              items: z.array(z.string()).describe("0 a 3 sub-detalles muy cortos"),
            }),
          )
          .describe("2 a 4 ideas que desglosan el apartado"),
      }),
    )
    .describe("3 a 6 apartados principales"),
});

const flashcardsSchema = z.object({
  cards: z
    .array(
      z.object({
        type: z.enum([
          "concepto",
          "causa",
          "proceso",
          "comparacion",
          "aplicacion",
          "completar",
          "verdadero_falso",
        ]),
        question: z.string().describe("Pregunta específica del tema"),
        answer: z.string().describe("Respuesta precisa en 1 a 3 frases"),
        hint: z.string().describe("Pista breve que no revela la respuesta"),
      }),
    )
    .describe("12 a 16 tarjetas variadas"),
});

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });

export async function handleStudyAiRequest(request: Request, body: StudyAiRequestBody) {
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) return json({ error: "La IA no está configurada todavía." }, 500);

  const notes = cleanImportedText(body.notes).slice(0, 14000);
  const topic = body.notebook.trim().slice(0, 120) || "Tema de estudio";
  const exclude = Array.isArray(body.exclude)
    ? body.exclude
        .filter((q): q is string => typeof q === "string")
        .map((q) => q.slice(0, 240))
        .slice(0, 30)
    : [];
  const base = notes
    ? `Cuaderno / asignatura: "${topic}".\n\nMATERIAL DEL ESTUDIANTE (base principal):\n"""\n${notes}\n"""`
    : `Cuaderno / asignatura: "${topic}". El estudiante aún no tiene apuntes: crea el contenido a partir del tema.`;
  const prompt =
    body.kind === "flashcards" && exclude.length
      ? `${base}\n\nPREGUNTAS YA USADAS (no las repitas):\n${exclude.map((q) => `- ${q}`).join("\n")}`
      : base;

  const runIdFetch = createLovableAiGatewayRunIdFetch(getLovableAiGatewayRunId(request));
  const provider = createOpenAI({
    baseURL: GATEWAY_URL,
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    fetch: runIdFetch.fetch,
  });
  const providerOptions = { openai: { store: false } } as const;

  try {
    if (body.kind === "mindmap") {
      const result = await generateText({
        model: provider.responses(MODEL),
        instructions: PROMPTS.mindmap,
        prompt,
        output: Output.object({ schema: mindMapSchema }),
        abortSignal: request.signal,
        providerOptions,
      });
      return withLovableAiGatewayRunIdHeader(json({ map: result.output }), runIdFetch);
    }
    if (body.kind === "flashcards") {
      const result = await generateText({
        model: provider.responses(MODEL),
        instructions: PROMPTS.flashcards,
        prompt,
        output: Output.object({ schema: flashcardsSchema }),
        abortSignal: request.signal,
        providerOptions,
      });
      return withLovableAiGatewayRunIdHeader(json({ cards: result.output.cards }), runIdFetch);
    }
    const result = await generateText({
      model: provider.responses(MODEL),
      instructions: PROMPTS[body.kind],
      prompt,
      abortSignal: request.signal,
      providerOptions,
    });
    return withLovableAiGatewayRunIdHeader(json({ markdown: result.text }), runIdFetch);
  } catch (error) {
    const failure = studyAiFailure(upstreamStatus(error), request.signal.aborted);
    console.error(`study-ai error (${failure.code})`, error);
    return json({ error: failure.message, code: failure.code }, failure.status);
  }
}

/** Status HTTP del Gateway, incluso cuando el SDK lo envuelve en un error de reintentos. */
function upstreamStatus(error: unknown): number | undefined {
  let e: unknown = error;
  for (let i = 0; i < 4 && e && typeof e === "object"; i++) {
    const x = e as { statusCode?: unknown; lastError?: unknown; cause?: unknown };
    if (typeof x.statusCode === "number") return x.statusCode;
    e = x.lastError ?? x.cause;
  }
  return undefined;
}
