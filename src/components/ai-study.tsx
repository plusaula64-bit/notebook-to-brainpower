// Vistas de contenido generado por IA: mapa mental, resumen y apuntes asistidos.
import { useEffect, useRef, useState } from "react";
import { Sparkles, RefreshCw, Plus, Copy } from "lucide-react";
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
  requestStudyAi,
  StudyAiError,
  type AiEngine,
  type AiKind,
  type AiMindMap,
  type AiFlashcard,
  type MindPoint,
  type StudyAiResult,
} from "@/lib/study-ai";
import { MILO_VERSION, miloMindMap, miloStudy, miloSummary } from "@/lib/milo/engine";
import { aiPaused, isOnline, pauseAi } from "@/lib/ai-availability";

type Value<K extends AiKind> = K extends "mindmap" ? AiMindMap : K extends "flashcards" ? AiFlashcard[] : string;

/**
 * Contenido de estudio: intenta la IA de AulaPlus y, si no está disponible (sin internet, sin créditos,
 * ocupada o con error), lo crea el motor interno de Milo sin mostrar errores al estudiante.
 */
export function useStudyAi<K extends AiKind>(n: Notebook, update: ((n: Notebook) => void) | undefined, kind: K, auto: boolean) {
  const latest = useRef(n);
  latest.current = n;
  const material = studyMaterial(n);
  const key = KIND_VERSION[kind] + contentKey(n.name, material);
  const miloKey = key + MILO_VERSION;
  const cached = n.studio?.ai?.[kind];
  const fresh = cached ? cached.key === (cached.engine === "milo" ? miloKey : key) : false;
  const [loading, setLoading] = useState(false);
  const tried = useRef<string | null>(null);
  const busy = useRef(false);

  async function generate() {
    if (busy.current) return;
    busy.current = true;
    setLoading(true);
    // Al regenerar flashcards se envían las preguntas actuales para que el mazo nuevo sea distinto.
    const prev = kind === "flashcards" && cached && "data" in cached ? (cached.data as AiFlashcard[]).map((c) => c.question) : [];
    let result: StudyAiResult;
    let engine: AiEngine = "ai";
    try {
      if (!isOnline() || aiPaused()) throw new StudyAiError("unavailable", "IA externa en pausa");
      result = await requestStudyAi(kind, n.name, material, prev);
    } catch (error) {
      const code = error instanceof StudyAiError ? error.code : "unavailable";
      if (code === "credits") pauseAi(15 * 60_000);
      else if (code === "rate_limit") pauseAi(60_000);
      result = await miloStudy(kind, n.name, material, { exclude: prev, online: isOnline() });
      engine = "milo";
    }
    const cur = latest.current;
    const k = engine === "milo" ? miloKey : key;
    const entry = kind === "mindmap" ? { key: k, data: result.map!, engine } : kind === "flashcards" ? { key: k, data: result.cards!, engine } : { key: k, markdown: result.markdown!, engine };
    // Un mazo nuevo empieza de cero: el progreso anterior apuntaba a otras tarjetas.
    const progress = kind === "flashcards" ? { known: [], review: [], card: 0 } : {};
    update?.({ ...cur, studio: { ...cur.studio, ...progress, ai: { ...cur.studio?.ai, [kind]: entry } } });
    busy.current = false;
    setLoading(false);
  }

  useEffect(() => {
    if (!auto || fresh || tried.current === key) return;
    tried.current = key;
    void generate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, auto, fresh]);

  const aiValue = cached ? ("data" in cached ? cached.data : cached.markdown) : undefined;
  const engine: AiEngine = cached?.engine ?? "ai";
  return { aiValue: aiValue as Value<K> | undefined, engine, fresh, loading, generate, material };
}

export function AiStatus({ engine, ready, fresh, loading, onGenerate, label, regenerateLabel = "Regenerar" }: { engine: AiEngine; ready: boolean; fresh: boolean; loading: boolean; onGenerate: () => void; label: string; regenerateLabel?: string }) {
  const name = engine === "milo" || !ready ? "Creado por Milo" : "Generado con IA";
  return (
    <div className="ai-status">
      <span className="pill lilac"><Sparkles size={12} />{ready && !fresh ? `${name} · tus apuntes cambiaron` : name}</span>
      <Button size="sm" variant="outline" disabled={loading} onClick={onGenerate}>
        <RefreshCw className={loading ? "animate-spin" : ""} />
        {ready ? regenerateLabel : label}
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
  const ready = Boolean(ai.aiValue);
  const map: AiMindMap = (ai.aiValue && sanitizeMindMap(ai.aiValue, n.name)) || miloMindMap(n.name, ai.material);
  if (ai.loading && !ready) return <div className="ai-loading"><Shimmer>Milo está construyendo tu esquema de llaves…</Shimmer></div>;
  return (
    <div className="brace-map-wrap">
      <AiStatus engine={ai.engine} ready={ready} fresh={ai.fresh} loading={ai.loading} onGenerate={() => void ai.generate()} label="Crear esquema" />
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
  const ready = Boolean(ai.aiValue);
  const markdown = ai.aiValue ?? miloSummary(n.name, ai.material);
  if (ai.loading && !ready) return <div className="ai-loading"><Shimmer>Milo está preparando tu resumen…</Shimmer></div>;
  return (
    <>
      <AiStatus engine={ai.engine} ready={ready} fresh={ai.fresh} loading={ai.loading} onGenerate={() => void ai.generate()} label="Crear resumen" />
      <div className="ai-doc"><MessageResponse>{markdown}</MessageResponse></div>
    </>
  );
}

export function AiNotesAssist({ notebook: n, update, onInsert }: { notebook: Notebook; update: (n: Notebook) => void; onInsert: (text: string) => void }) {
  const ai = useStudyAi(n, update, "notes", false);
  const markdown = ai.aiValue ?? "";
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
          {fromAi ? "Reorganizar con Milo" : "Organizar con Milo"}
        </Button>
      </div>
      {ai.loading && !fromAi && <Shimmer>Milo está organizando tus apuntes…</Shimmer>}
      {markdown && (
        <>
          <span className="pill lilac"><Sparkles size={12} />{ai.engine === "milo" ? "Creado por Milo" : "Generado con IA"}{ai.fresh ? "" : " · tus apuntes cambiaron"}</span>
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
