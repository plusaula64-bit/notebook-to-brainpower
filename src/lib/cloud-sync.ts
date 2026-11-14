// Copia opcional en la nube (cuenta de Google). Lo local siempre manda: la app nunca
// depende de esta copia para funcionar.
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";

export type BackupPayload = { version: 1; state: unknown; chats: Record<string, unknown> };

export async function uploadBackup(userId: string, payload: BackupPayload) {
  const updated_at = new Date().toISOString();
  const { error } = await supabase.from("progress_backups").upsert({
    user_id: userId,
    data: payload as unknown as Json,
    device: typeof navigator !== "undefined" ? navigator.userAgent.slice(0, 160) : null,
    updated_at,
  });
  if (error) throw error;
  return updated_at;
}

export async function downloadBackup(userId: string) {
  const { data, error } = await supabase
    .from("progress_backups")
    .select("data, updated_at")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) throw error;
  if (!data) return null;
  return { payload: data.data as unknown as BackupPayload, updatedAt: data.updated_at };
}

export async function backupInfo(userId: string) {
  const { data, error } = await supabase
    .from("progress_backups")
    .select("updated_at")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) throw error;
  return data?.updated_at ?? null;
}
