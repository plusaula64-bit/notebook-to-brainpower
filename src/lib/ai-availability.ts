// Pausa temporal de la IA externa: tras un fallo de créditos o de límite, Milo responde con su motor
// interno al instante en lugar de esperar otro rechazo del servidor.
let pausedUntil = 0;

export function aiPaused(now = Date.now()) {
  return now < pausedUntil;
}

export function pauseAi(ms: number, now = Date.now()) {
  pausedUntil = Math.max(pausedUntil, now + ms);
}

export function resumeAi() {
  pausedUntil = 0;
}

export const isOnline = () => typeof navigator === "undefined" || navigator.onLine !== false;
