import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { CloudUpload, CloudDownload, LogOut, WifiOff, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { backupInfo, downloadBackup, uploadBackup, type BackupPayload } from "@/lib/cloud-sync";

const GOOGLE_G = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={18} height={18} aria-hidden="true"><path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"/><path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"/><path fill="#FBBC05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"/><path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"/></svg>
);

const fmt = (iso: string | null) =>
  iso ? new Intl.DateTimeFormat("es-ES", { dateStyle: "medium", timeStyle: "short" }).format(new Date(iso)) : "nunca";

/** Hook compartido: sesión de Google para la copia en la nube. */
export function useCloudUser() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => setUser(session?.user ?? null));
    void supabase.auth.getUser().then(({ data }) => setUser(data.user ?? null)).catch(() => {});
    return () => sub.subscription.unsubscribe();
  }, []);
  return user;
}

export function CloudSyncPanel({
  email,
  getPayload,
  applyPayload,
}: {
  email?: string | undefined;
  getPayload: () => Promise<BackupPayload>;
  applyPayload: (p: BackupPayload) => Promise<void>;
}) {
  const user = useCloudUser();
  const [busy, setBusy] = useState<"" | "up" | "down" | "login">("");
  const [last, setLast] = useState<string | null>(null);
  const [online, setOnline] = useState(true);

  useEffect(() => {
    const update = () => setOnline(navigator.onLine);
    update();
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => { window.removeEventListener("online", update); window.removeEventListener("offline", update); };
  }, []);
  useEffect(() => {
    if (!user || !online) return;
    backupInfo(user.id).then(setLast).catch(() => {});
  }, [user, online]);

  async function connect() {
    if (!online) { toast.error("Necesitas internet para conectar tu cuenta de Gmail."); return; }
    setBusy("login");
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
      extraParams: { prompt: "select_account", ...(email?.endsWith("@gmail.com") ? { login_hint: email } : {}) },
    });
    setBusy("");
    if (result.error) toast.error("No se pudo conectar con Google. Inténtalo de nuevo.");
  }

  async function upload() {
    if (!user) return;
    if (!online) { toast.error("Sin conexión: tus avances siguen guardados en este dispositivo."); return; }
    setBusy("up");
    try {
      setLast(await uploadBackup(user.id, await getPayload()));
      toast.success("¡Avances respaldados en la nube!");
    } catch {
      toast.error("No se pudo guardar en la nube. Tus avances siguen seguros en este dispositivo.");
    } finally { setBusy(""); }
  }

  async function download() {
    if (!user) return;
    if (!online) { toast.error("Necesitas internet para descargar tus avances."); return; }
    setBusy("down");
    try {
      const backup = await downloadBackup(user.id);
      if (!backup) { toast.info("Aún no tienes una copia en la nube. Pulsa «Guardar / Sincronizar» primero."); return; }
      if (!window.confirm(`Esto reemplazará los cuadernos de este dispositivo por la copia del ${fmt(backup.updatedAt)}. ¿Continuar?`)) return;
      await applyPayload(backup.payload);
      setLast(backup.updatedAt);
      toast.success("¡Avances descargados en este dispositivo!");
    } catch {
      toast.error("No se pudo descargar la copia. Inténtalo de nuevo.");
    } finally { setBusy(""); }
  }

  return (
    <div className="cloud-sync">
      <div className="cloud-sync-head">
        <ShieldCheck size={18} />
        <div>
          <strong>Copia en la nube con Gmail</strong>
          <p>Todo se guarda primero en este dispositivo y funciona sin internet. Conecta tu Gmail para llevar tus cuadernos a otro dispositivo.</p>
        </div>
      </div>
      {!online && <p className="cloud-sync-offline"><WifiOff size={14} />Sin conexión · tus avances se guardan aquí</p>}
      {user ? (
        <>
          <p className="cloud-sync-user">Conectado como <strong>{user.email}</strong><br /><small>Última copia: {fmt(last)}</small></p>
          <Button onClick={() => void upload()} disabled={busy !== ""}><CloudUpload />{busy === "up" ? "Guardando…" : "Guardar / Sincronizar mis avances"}</Button>
          <Button variant="outline" onClick={() => void download()} disabled={busy !== ""}><CloudDownload />{busy === "down" ? "Descargando…" : "Descargar en este dispositivo"}</Button>
          <Button variant="ghost" size="sm" onClick={() => void supabase.auth.signOut()}><LogOut />Desconectar Gmail</Button>
        </>
      ) : (
        <Button variant="google" onClick={() => void connect()} disabled={busy !== ""}>{GOOGLE_G}Continuar con Google</Button>
      )}
    </div>
  );
}
