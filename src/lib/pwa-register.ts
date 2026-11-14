// Registro protegido del service worker de AulaPlus (modo offline real).
// Solo se registra en la app publicada: nunca en desarrollo, dentro de un iframe
// ni en las vistas previas de Lovable, para que el caché no sirva versiones viejas.
const PREVIEW_LABEL = /^(?:id-preview|preview)(?:-[a-z0-9]+)?--.+$/;
const PREVIEW_PARENTS = [".lovable.app", ".gpt-eng.com", ".gptengineer.run"];
const DEV_LABEL = /^project--[a-z0-9-]+-dev$/;
const BLOCKED_ROOTS = ["lovableproject.com", "lovableproject-dev.com", "beta.lovable.dev"];

export function isBlockedHost(hostname: string, search = ""): boolean {
  const host = hostname.toLowerCase();
  const parent = PREVIEW_PARENTS.find((p) => host.endsWith(p));
  if (parent) {
    const label = host.slice(0, -parent.length).split(".")[0] ?? "";
    if (PREVIEW_LABEL.test(label) || DEV_LABEL.test(label)) return true;
  }
  if (BLOCKED_ROOTS.some((h) => host === h || host.endsWith(`.${h}`))) return true;
  if (new URLSearchParams(search).get("sw") === "off") return true;
  return false;
}

function isBlockedContext(): boolean {
  if (!import.meta.env.PROD) return true;
  if (typeof window === "undefined") return true;
  try {
    if (window.self !== window.top) return true;
  } catch {
    return true;
  }
  return isBlockedHost(window.location.hostname, window.location.search);
}

async function unregisterAppSw() {
  if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return;
  const regs = await navigator.serviceWorker.getRegistrations();
  await Promise.all(
    regs
      .filter((r) => [r.active, r.waiting, r.installing].some((w) => w?.scriptURL.endsWith("/sw.js")))
      .map((r) => r.unregister()),
  );
}

export async function registerPwa() {
  if (isBlockedContext()) {
    await unregisterAppSw().catch(() => {});
    return;
  }
  if (!("serviceWorker" in navigator)) return;
  const { registerSW } = await import("virtual:pwa-register");
  registerSW({
    immediate: true,
    onRegisteredSW() {
      // Precalienta la página de inicio para que abra al instante sin señal.
      void navigator.serviceWorker.ready.then(() => fetch("/", { credentials: "same-origin" }).catch(() => {}));
    },
  });
}
