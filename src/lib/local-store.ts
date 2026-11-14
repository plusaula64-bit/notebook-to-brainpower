// Almacenamiento local prioritario de AulaPlus (IndexedDB, con respaldo en localStorage).
// Todo funciona sin internet: la nube es solo una copia opcional.
import { createStore, get, set, del, entries } from "idb-keyval";

export const STATE_KEY = "aulaplus:v1";
const CHAT_PREFIX = "aulaplus-chat-v1:";

let store: ReturnType<typeof createStore> | null = null;
function idb() {
  if (typeof indexedDB === "undefined") return null;
  try {
    store ??= createStore("aulaplus", "kv");
    return store;
  } catch {
    return null;
  }
}

async function readRaw<T>(key: string): Promise<T | null> {
  const s = idb();
  if (s) {
    try {
      const v = await get<T>(key, s);
      if (v !== undefined) return v;
    } catch { /* IndexedDB bloqueado: usar localStorage */ }
  }
  try {
    const raw = localStorage.getItem(key);
    if (raw == null) return null;
    const parsed = JSON.parse(raw) as T;
    // Migración automática desde la versión anterior (localStorage → IndexedDB).
    if (s) void set(key, parsed, s).then(() => localStorage.removeItem(key)).catch(() => {});
    return parsed;
  } catch {
    return null;
  }
}

async function writeRaw(key: string, value: unknown) {
  const s = idb();
  if (s) {
    try { await set(key, value, s); return; } catch { /* sigue con localStorage */ }
  }
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* almacenamiento lleno */ }
}

export const loadState = <T>() => readRaw<T>(STATE_KEY);
export const saveState = (value: unknown) => writeRaw(STATE_KEY, value);

export type StoredChat = { id: string; role: "user" | "assistant"; text: string; chips?: string[]; webQuery?: string }[];
export const loadChat = async (notebookId: string) => (await readRaw<StoredChat>(CHAT_PREFIX + notebookId)) ?? [];
export const saveChat = (notebookId: string, list: StoredChat) => writeRaw(CHAT_PREFIX + notebookId, list.slice(-80));

/** Borra la conversación de un cuaderno eliminado. */
export async function deleteChat(notebookId: string) {
  const s = idb();
  if (s) await del(CHAT_PREFIX + notebookId, s).catch(() => {});
  try { localStorage.removeItem(CHAT_PREFIX + notebookId); } catch { /* ignorar */ }
}

/** Todas las conversaciones guardadas, para la copia en la nube. */
export async function loadAllChats(): Promise<Record<string, StoredChat>> {
  const out: Record<string, StoredChat> = {};
  const s = idb();
  if (s) {
    try {
      for (const [k, v] of await entries<string, StoredChat>(s))
        if (typeof k === "string" && k.startsWith(CHAT_PREFIX)) out[k.slice(CHAT_PREFIX.length)] = v;
    } catch { /* ignorar */ }
  }
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k?.startsWith(CHAT_PREFIX) && !out[k.slice(CHAT_PREFIX.length)])
        out[k.slice(CHAT_PREFIX.length)] = JSON.parse(localStorage.getItem(k) ?? "[]");
    }
  } catch { /* ignorar */ }
  return out;
}

export async function replaceAllChats(chats: Record<string, StoredChat>) {
  const current = await loadAllChats();
  const s = idb();
  for (const id of Object.keys(current)) {
    if (!(id in chats)) {
      if (s) await del(CHAT_PREFIX + id, s).catch(() => {});
      try { localStorage.removeItem(CHAT_PREFIX + id); } catch { /* ignorar */ }
    }
  }
  for (const [id, list] of Object.entries(chats)) await saveChat(id, list);
}
