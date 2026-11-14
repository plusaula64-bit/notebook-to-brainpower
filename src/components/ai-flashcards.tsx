// Flashcards generadas por IA a partir del cuaderno (con mazo local sin conexión).
import { useState } from "react";
import { Check, ChevronLeft, ChevronRight, Lightbulb, RotateCcw, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Shimmer } from "@/components/ai-elements/shimmer";
import type { Notebook } from "@/lib/aulaplus";
import { FLASHCARD_LABELS, localFlashcards } from "@/lib/study-ai";
import { AiStatus, useStudyAi } from "./ai-study";

export function AiFlashcards({ notebook: n, update }: { notebook: Notebook; update: (n: Notebook) => void }) {
  const ai = useStudyAi(n, update, "flashcards", true);
  const [flipped, setFlipped] = useState(false);
  const [hintFor, setHintFor] = useState<number | null>(null);
  const fromAi = Boolean(ai.aiValue?.length);
  const cards = fromAi ? ai.aiValue! : localFlashcards(n.name, ai.material);

  if (ai.loading && !fromAi) return <div className="ai-loading"><Shimmer>Milo está creando tus flashcards…</Shimmer></div>;
  if (!cards.length)
    return (
      <div className="tools-empty">
        <h3>Aún no hay tarjetas</h3>
        <p className="text-muted-foreground">Añade apuntes o fuentes al cuaderno. Con internet, la IA también puede crear tarjetas a partir del tema.</p>
        <Button onClick={() => void ai.generate()}><Sparkles />Crear flashcards con IA</Button>
      </div>
    );

  const card = n.studio?.card ?? 0;
  const cur = card % cards.length;
  const known = (n.studio?.known ?? []).filter((i) => i < cards.length);
  const review = (n.studio?.review ?? []).filter((i) => i < cards.length);
  const c = cards[cur]!;
  const goCard = (i: number) => { setFlipped(false); setHintFor(null); update({ ...n, studio: { ...n.studio, card: (i + cards.length) % cards.length } }); };
  const mark = (kind: "known" | "review") => {
    const k = known.filter((x) => x !== cur), r = review.filter((x) => x !== cur);
    (kind === "known" ? k : r).push(cur);
    setFlipped(false);
    setHintFor(null);
    update({ ...n, studio: { ...n.studio, known: k, review: r, card: (cur + 1) % cards.length } });
    toast.success(kind === "known" ? "¡Genial! Tarjeta dominada 💚" : "La repasaremos pronto 📌");
  };
  const reviewNext = () => {
    const next = review.find((i) => i > cur) ?? review[0];
    if (next !== undefined) goCard(next);
  };

  return (
    <div className="flash-studio">
      <AiStatus fromAi={fromAi} fresh={ai.fresh} loading={ai.loading} failed={ai.failed} onGenerate={() => void ai.generate()} label="Crear con IA" regenerateLabel="Nuevo mazo con IA" />
      <div className="flash-meta">
        <span className="pill lilac">Tarjeta {cur + 1} de {cards.length}</span>
        <span className="pill mint"><Check size={14} />Lo sé: {known.length}</span>
        <span className="pill peach">Repasar: {review.length}</span>
      </div>
      <div className="flash-progress" aria-label="Progreso"><span style={{ width: `${Math.round(((known.length + review.length) / cards.length) * 100)}%` }} /></div>
      <button type="button" className={`flip-card ${flipped ? "flipped" : ""}`} onClick={() => setFlipped((v) => !v)} aria-label="Voltear tarjeta">
        <span className="flip-inner">
          <span className="flip-face front">
            <span className="flash-type">{FLASHCARD_LABELS[c.type]}</span>
            <small>PREGUNTA</small>
            <strong>{c.question}</strong>
            {hintFor === cur && c.hint && <span className="flash-hint"><Lightbulb size={14} />{c.hint}</span>}
            <em><RotateCcw size={14} /> Toca para voltear</em>
          </span>
          <span className="flip-face back">
            <span className="flash-type">{FLASHCARD_LABELS[c.type]}</span>
            <small>RESPUESTA</small>
            <strong className="flash-answer">{c.answer}</strong>
            <em><RotateCcw size={14} /> Toca para volver</em>
          </span>
        </span>
      </button>
      {c.hint && !flipped && hintFor !== cur && (
        <Button variant="ghost" size="sm" className="justify-self-center" onClick={() => setHintFor(cur)}><Lightbulb />Ver pista</Button>
      )}
      <div className="flash-nav">
        <Button variant="outline" size="icon" aria-label="Tarjeta anterior" onClick={() => goCard(cur - 1)}><ChevronLeft /></Button>
        <Button variant="outline" className="flash-review" onClick={() => mark("review")}>Necesita repaso</Button>
        <Button className="flash-known" onClick={() => mark("known")}><Check />Lo sé</Button>
        <Button variant="outline" size="icon" aria-label="Siguiente tarjeta" onClick={() => goCard(cur + 1)}><ChevronRight /></Button>
      </div>
      {known.length + review.length > 0 && (
        <div className="flex justify-center gap-2 flex-wrap">
          {review.length > 0 && <Button variant="outline" size="sm" onClick={reviewNext}><RotateCcw />Ir a una tarjeta por repasar</Button>}
          <Button variant="ghost" size="sm" onClick={() => update({ ...n, studio: { ...n.studio, known: [], review: [], card: 0 } })}><RotateCcw />Reiniciar mazo</Button>
        </div>
      )}
    </div>
  );
}
