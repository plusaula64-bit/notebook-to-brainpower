// Vistas de contenido generado por IA: mapa mental, resumen y apuntes asistidos.
import { useEffect, useRef, useState } from "react";
import { Sparkles, RefreshCw, WifiOff, Plus, Copy } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { MessageResponse } from "@/components/ai-elements/message";
import { Shimmer } from "@/components/ai-elements/shimmer";
import type { Notebook } from "@/lib/aulaplus";
import {
  contentKey,
  KIND_VERSION,
  sanitizeMindMap,
  studyMaterial,
  localMindMap,
  localNotesMarkdown,
  localSummaryMarkdown,
  requestStudyAi,
  StudyAiError,
  type AiKind,
  type AiMindMap,
  type AiFlashcard,
  type MindPoint,
} from "@/lib/study-ai";

type Value<K extends AiKind> = K extends "mindmap" ? AiMindMap : K extends "flashcards" ? AiFlashcard[] : string;

export function useStudyAi<K extends AiKind>(n: Notebook, update: ((n: Notebook) => void) | undefined, kind: K, auto: boolean) {
  const latest = useRef(n);
  latest.current = n;
  const material = studyMaterial(n);
  const key = KIND_VERSION[kind] + contentKey(n.name, material);
  const cached = n.studio?.ai?.[kind];
  const fresh = cached?.key === key;
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const tried = useRef<string | null>(null);

  async function generate() {
    if (loading) return;
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      setFailed(true);
      toast.info("Sin conexión: te muestro un esquema local. Vuelve a intentarlo con internet.");
      return;
    }
    setLoading(true);
    setFailed(false);
    try {
      // Al regenerar flashcards se envían las preguntas actuales para que el mazo nuevo sea distinto.
      const prev = kind === "flashcards" && cached && "data" in cached ? (cached.data as AiFlashcard[]).map((c) => c.question) : [];
      const r = await requestStudyAi(kind, n.name, material, prev);
      const cur = latest.current;
      const entry = kind === "mindmap" ? { key, data: r.map! } : kind === "flashcards" ? { key, data: r.cards! } : { key, markdown: r.markdown! };
      // Un mazo nuevo empieza de cero: el progreso anterior apuntaba a otras tarjetas.
      const progress = kind === "flashcards" ? { known: [], review: [], card: 0 } : {};
      update?.({ ...cur, studio: { ...cur.studio, ...progress, ai: { ...cur.studio?.ai, [kind]: entry } } });
    } catch (error) {
      setFailed(true);
      const code = error instanceof StudyAiError ? error.code : "unavailable";
      if (code === "credits") toast.warning("La IA de AulaPlus se quedó sin créditos por ahora. Te muestro un esquema local con tus apuntes.", { id: "ai-credits" });
      else if (code === "rate_limit") toast.info("La IA está ocupada. Espera un momento y pulsa «Regenerar con IA».", { id: "ai-busy" });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!auto || fresh || tried.current === key) return;
    tried.current = key;
    if (typeof navigator !== "undefined" && !navigator.onLine) { setFailed(true); return; }
    void generate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, auto, fresh]);

  const aiValue = cached ? ("data" in cached ? cached.data : cached.markdown) : undefined;
  return { aiValue: aiValue as Value<K> | undefined, fresh, loading, failed, generate, material };
}

export function AiStatus({ fromAi, fresh, loading, failed, onGenerate, label, regenerateLabel = "Regenerar con IA" }: { fromAi: boolean; fresh: boolean; loading: boolean; failed: boolean; onGenerate: () => void; label: string; regenerateLabel?: string }) {
  return (
    <div className="ai-status">
      {fromAi ? (
        <span className="pill lilac"><Sparkles size={12} />{fresh ? "Generado con IA" : "Generado con IA · tus apuntes cambiaron"}</span>
      ) : (
        <span className="pill peach">{failed ? <WifiOff size={12} /> : <Sparkles size={12} />}{failed ? "Esquema local (sin IA por ahora)" : "Esquema local"}</span>
      )}
      <Button size="sm" variant="outline" disabled={loading} onClick={onGenerate}>
        <RefreshCw className={loading ? "animate-spin" : ""} />
        {fromAi ? regenerateLabel : label}
      </Button>
    </div>
  );
}

/** Llave «{» que se estira a la altura de sus hijos. */
function Brace() {
  return (
    <span className="brace" aria-hidden="true">
      <i className="brace-cap-top" />
      <i className="brace-stem" />
      <i className="brace-tip-top" />
      <i className="brace-tip-bottom" />
      <i className="brace-stem" />
      <i className="brace-cap-bottom" />
    </span>
  );
}

function BracePoint({ p }: { p: MindPoint }) {
  return (
    <div className="brace-row brace-point">
      <div className="brace-node level-3">
        <strong>{p.label}</strong>
        {p.detail && <span>{p.detail}</span>}
      </div>
      {p.items && p.items.length > 0 && (
        <>
          <Brace />
          <ul className="brace-children level-4">
            {p.items.map((it, i) => <li key={`${it}-${i}`} className="brace-node level-4">{it}</li>)}
          </ul>
        </>
      )}
    </div>
  );
}

export function AiMindMapView({ notebook: n, update }: { notebook: Notebook; update?: ((n: Notebook) => void) | undefined }) {
  const ai = useStudyAi(n, update, "mindmap", true);
  const fromAi = Boolean(ai.aiValue);
  const map: AiMindMap = (ai.aiValue && sanitizeMindMap(ai.aiValue, n.name)) || localMindMap(n.name, ai.material);
  if (ai.loading && !fromAi) return <div className="ai-loading"><Shimmer>Milo está construyendo tu esquema de llaves…</Shimmer></div>;
  if (!map.branches.length)
    return <div className="tools-empty"><h3>Primero agrega fuentes o apuntes</h3><p className="text-muted-foreground">Con internet, la IA puede crear el esquema a partir del tema. Pulsa el botón para intentarlo.</p><Button onClick={() => void ai.generate()}><Sparkles />Crear esquema de llaves con IA</Button></div>;
  return (
    <div className="brace-map-wrap">
      <AiStatus fromAi={fromAi} fresh={ai.fresh} loading={ai.loading} failed={ai.failed} onGenerate={() => void ai.generate()} label="Crear con IA" />
      <div className="brace-scroll" role="figure" aria-label={`Esquema de llaves de ${map.center}`}>
        <div className={`brace-map tone-${n.tone}`}>
          <div className="brace-row">
            <div className="brace-node level-1">{map.center}</div>
            <Brace />
            <div className="brace-children level-2">
              {map.branches.map((b, i) => (
                <div className="brace-row brace-branch" key={`${b.label}-${i}`}>
                  <div className="brace-node level-2">
                    <strong>{b.label}</strong>
                    {b.summary && <span>{b.summary}</span>}
                  </div>
                  {b.points.length > 0 && (
                    <>
                      <Brace />
                      <div className="brace-children level-3">
                        {b.points.map((p, j) => <BracePoint key={`${p.label}-${j}`} p={p} />)}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AiSummaryView({ notebook: n, update }: { notebook: Notebook; update: (n: Notebook) => void }) {
  const ai = useStudyAi(n, update, "summary", true);
  const markdown = ai.aiValue ?? localSummaryMarkdown(n.name, ai.material);
  const fromAi = Boolean(ai.aiValue);
  if (ai.loading && !fromAi) return <div className="ai-loading"><Shimmer>Milo está preparando tu resumen…</Shimmer></div>;
  if (!markdown)
    return (
      <>
        <p className="subtitle">Añade apuntes a este cuaderno para reunir tus ideas más importantes.</p>
        <Button className="mt-4" onClick={() => void ai.generate()}><Sparkles />Crear resumen del tema con IA</Button>
      </>
    );
  return (
    <>
      <AiStatus fromAi={fromAi} fresh={ai.fresh} loading={ai.loading} failed={ai.failed} onGenerate={() => void ai.generate()} label="Crear con IA" />
      <div className="ai-doc"><MessageResponse>{markdown}</MessageResponse></div>
    </>
  );
}

export function AiNotesAssist({ notebook: n, update, onInsert }: { notebook: Notebook; update: (n: Notebook) => void; onInsert: (text: string) => void }) {
  const ai = useStudyAi(n, update, "notes", false);
  const markdown = ai.aiValue ?? (ai.failed && !ai.loading ? localNotesMarkdown(n.name, ai.material) : "");
  const fromAi = Boolean(ai.aiValue);
  return (
    <section className="ai-notes">
      <div className="section-heading">
        <div>
          <h3><Sparkles size={16} /> Apuntes asistidos por IA</h3>
          <p className="text-muted-foreground text-sm">Milo ordena tus apuntes guardados en un esquema claro con secciones, términos clave y preguntas.</p>
        </div>
        <Button size="sm" disabled={ai.loading} onClick={() => void ai.generate()}>
          <RefreshCw className={ai.loading ? "animate-spin" : ""} />
          {fromAi ? "Reorganizar con IA" : "Organizar con IA"}
        </Button>
      </div>
      {ai.loading && !fromAi && <Shimmer>Milo está organizando tus apuntes…</Shimmer>}
      {markdown && (
        <>
          {!fromAi && <span className="pill peach"><WifiOff size={12} />Esquema local (sin IA por ahora)</span>}
          {fromAi && !ai.fresh && <span className="pill lilac"><Sparkles size={12} />Tus apuntes cambiaron · puedes reorganizar</span>}
          <div className="ai-doc"><MessageResponse>{markdown}</MessageResponse></div>
          <div className="flex gap-2 flex-wrap">
            <Button size="sm" onClick={() => { onInsert(markdown); toast.success("Esquema añadido a tus apuntes"); }}><Plus />Añadir a mis apuntes</Button>
            <Button size="sm" variant="outline" onClick={() => { void navigator.clipboard?.writeText(markdown); toast.success("Copiado"); }}><Copy />Copiar</Button>
          </div>
        </>
      )}
    </section>
  );
}
