import { describe, expect, it } from "vitest";
import { contentKey, localFlashcards, localMindMap, sanitizeFlashcards, sanitizeMindMap, studyAiFailure, studyMaterial } from "@/lib/study-ai";

describe("contenido de estudio con IA", () => {
  it("cambia la huella cuando cambian los apuntes, para regenerar el contenido", () => {
    expect(contentKey("Biología", "La célula")).toBe(contentKey("Biología", "La célula"));
    expect(contentKey("Biología", "La célula")).not.toBe(contentKey("Biología", "La célula vegetal"));
  });

  it("rechaza un mapa mental con menos de dos ramas válidas", () => {
    expect(sanitizeMindMap({ center: "X", branches: [{ label: "A", summary: "a", points: [] }] }, "X")).toBeNull();
    expect(sanitizeMindMap("texto plano", "X")).toBeNull();
  });

  it("limita el mapa mental a 7 ramas y 5 subideas por rama", () => {
    const branches = Array.from({ length: 10 }, (_, i) => ({ label: `Rama ${i}`, summary: "Resumen", points: ["1", "2", "3", "4", "5", "6"] }));
    const map = sanitizeMindMap({ center: "Tema", branches }, "Tema")!;
    expect(map.branches).toHaveLength(7);
    expect(map.branches[0]!.points).toHaveLength(5);
  });

  it("el esquema local no repite la misma frase en dos ramas", () => {
    const text = "La fotosíntesis ocurre en los cloroplastos de las plantas verdes. La clorofila captura la energía de la luz solar. Los cloroplastos contienen clorofila y producen glucosa. La glucosa es energía para la planta y libera oxígeno al ambiente.";
    const map = localMindMap("Biología", text);
    const all = map.branches.flatMap((b) => [b.summary, ...b.points.map((p) => p.label)]);
    expect(new Set(all).size).toBe(all.length);
  });
});

describe("esquema de llaves", () => {
  it("convierte ideas en texto del formato antiguo en nodos con etiqueta", () => {
    const map = sanitizeMindMap({ center: "Célula", branches: [
      { label: "Partes", summary: "Estructuras", points: ["Núcleo", "Membrana"] },
      { label: "Tipos", summary: "Clases", points: ["Procariota"] },
    ] }, "Célula")!;
    expect(map.branches[0]!.points).toEqual([{ label: "Núcleo" }, { label: "Membrana" }]);
  });

  it("conserva el cuarto nivel (sub-detalles) y lo limita a 4 por idea", () => {
    const map = sanitizeMindMap({ center: "Célula", branches: [
      { label: "Partes", summary: "s", points: [{ label: "Núcleo", detail: "Guarda el ADN", items: ["a", "b", "c", "d", "e", ""] }] },
      { label: "Tipos", summary: "s", points: [{ label: "Eucariota", detail: "Con núcleo", items: [] }] },
    ] }, "Célula")!;
    expect(map.branches[0]!.points[0]).toEqual({ label: "Núcleo", detail: "Guarda el ADN", items: ["a", "b", "c", "d"] });
    expect(map.branches[1]!.points[0]).toEqual({ label: "Eucariota", detail: "Con núcleo" });
  });

  it("el material para la IA incluye las ideas de las fuentes del cuaderno", () => {
    const text = studyMaterial({ notes: "Mis apuntes", sources: [{ title: "Libro", points: ["La mitosis tiene 4 fases"] }] });
    expect(text).toContain("Mis apuntes");
    expect(text).toContain("La mitosis tiene 4 fases");
  });
});

describe("fallos de la IA de estudio", () => {
  it("sin créditos (402) responde 402 con código credits, no 502", () => {
    expect(studyAiFailure(402, false)).toMatchObject({ status: 402, code: "credits" });
  });
  it("demasiadas peticiones (429) responde 429", () => {
    expect(studyAiFailure(429, false)).toMatchObject({ status: 429, code: "rate_limit" });
  });
  it("una petición cancelada por el usuario no se trata como error del servidor", () => {
    expect(studyAiFailure(undefined, true)).toMatchObject({ status: 408, code: "aborted" });
  });
  it("cualquier otro fallo nunca devuelve un status 5xx", () => {
    expect(studyAiFailure(500, false).status).toBeLessThan(500);
    expect(studyAiFailure(undefined, false).status).toBeLessThan(500);
  });
});

describe("flashcards inteligentes", () => {
  const text = "La fotosíntesis ocurre en los cloroplastos de las plantas verdes. La clorofila captura la energía de la luz solar. Los cloroplastos contienen clorofila y producen glucosa. La glucosa es energía para la planta y libera oxígeno al ambiente. El oxígeno sale por los estomas de las hojas.";

  it("descarta tarjetas vacías y preguntas repetidas del mazo de la IA", () => {
    const cards = sanitizeFlashcards({ cards: [
      { type: "concepto", question: "¿Qué es la clorofila?", answer: "Un pigmento verde." },
      { type: "concepto", question: "¿Qué es la clorofila?", answer: "Repetida." },
      { type: "causa", question: "¿Por qué las hojas son verdes?", answer: "" },
      { type: "aplicacion", question: "¿Qué pasa a una planta sin luz?", answer: "No produce glucosa." },
      { type: "raro", question: "¿Dónde ocurre la fotosíntesis?", answer: "En los cloroplastos." },
    ] })!;
    expect(cards.map((c) => c.question)).toEqual(["¿Qué es la clorofila?", "¿Qué pasa a una planta sin luz?", "¿Dónde ocurre la fotosíntesis?"]);
    expect(cards[2]!.type).toBe("concepto");
  });

  it("rechaza un mazo de la IA con menos de 3 tarjetas válidas", () => {
    expect(sanitizeFlashcards({ cards: [{ type: "concepto", question: "¿Qué es X?", answer: "Algo." }] })).toBeNull();
  });

  it("limita el mazo de la IA a 20 tarjetas", () => {
    const cards = Array.from({ length: 30 }, (_, i) => ({ type: "concepto", question: `¿Pregunta número ${i}?`, answer: "Respuesta" }));
    expect(sanitizeFlashcards({ cards })).toHaveLength(20);
  });

  it("el mazo local mezcla varios tipos de tarjeta y no usa preguntas genéricas", () => {
    const cards = localFlashcards("Biología", text);
    expect(new Set(cards.map((c) => c.type)).size).toBeGreaterThanOrEqual(2);
    expect(cards.some((c) => /qué recuerdas/i.test(c.question))).toBe(false);
  });
});
