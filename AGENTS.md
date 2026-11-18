<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

- AulaPlus uses a browser-safe domain module for notebook scoring and grouping so the same rules are unit tested.
- Student and teacher views are prototype modes, not authorization roles; feedback affects fictional demo students only.
- The tutor chat streams from Lovable AI Gateway via the server route src/routes/api/public/tutor.ts (handler in src/lib/ai/tutor.server.ts, model openai/gpt-6-astra on Responses, ai@7 requires `instructions` instead of system messages); when the gateway fails, is offline or paused (src/lib/ai-availability.ts after 402/429), Milo's internal engine answers instead (src/lib/milo).
- All imported text (web sources, files, notebook notes sent to the AI) passes through cleanImportedText in src/lib/clean-text.ts: HTML entity decoding plus web-junk line filtering; junk patterns must be line-anchored so educational lines mentioning "compartir" survive.
- Classroom workspaces own notebooks, activities, student rosters and announcements; all updates target the active classroom ID so classes cannot leak changes into each other.
- Pet model rendering, appearance controls and classroom controls live in focused components; shared classroom and pet types remain in the browser-safe domain module so isolation can be unit tested.
- App state lives on the device first: src/lib/local-store.ts writes one versioned key plus per-notebook chats to IndexedDB (localStorage fallback, auto-migrates the old key) so the app works fully offline.
- Cloud backup is optional and manual: Google sign-in (Lovable Cloud) plus one progress_backups row per user holding the whole local state JSON; upload/download only on user action, local data always wins until the user restores.
- Offline PWA: vite-plugin-pwa generateSW with outDir/globDirectory dist/client (the published static root; otherwise precache URLs get a client/ prefix and the SW never installs), registered only from src/lib/pwa-register.ts (blocked in dev, iframes and Lovable previews). SSR has no /index.html, so the SW precaches the home HTML at /?pwa-shell=1 (own URL so precache never intercepts "/") and navigations use NetworkFirst with precacheFallback to it; /~oauth and /api are never cached.
- AI study content (brace-diagram "mapa mental", summary, assisted notes, flashcards) comes from src/routes/api/public/study-ai.ts (handler src/lib/ai/study-ai.server.ts, structured output for the 4-level brace tree and flashcard deck; regenerating a deck sends the previous questions as `exclude` and resets known/review progress because those store card indexes). The AI input is studyMaterial(notebook) = notes + source ideas. Results are cached in notebook.studio.ai keyed by KIND_VERSION[kind] + a hash of name+material (bump the version prefix when a format changes so cached content regenerates); sanitizeMindMap also normalizes old cached maps. src/lib/study-ai.ts builds a local outline when the AI is unreachable. Braces are pure CSS borders (no SVG) so tips stay crisp at any height; deeper levels collapse under their parent via container queries when space is short.
- Deleting a notebook is immediate with a 6-second "Deshacer" toast; the notebook chat is only purged when the toast closes without undo.
- Milo's internal engine (src/lib/milo: knowledge.ts topic library in a compact `# Apartado | resumen` / `- Idea: detalle > ej; ej` format, engine.ts generators) produces mind maps, summaries, notes, flashcards, tutor replies and the Estudio+/Autoevaluación quiz, audio and table without external AI; results are cached like AI output with `engine: "milo"` so the UI never shows AI errors.
