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
