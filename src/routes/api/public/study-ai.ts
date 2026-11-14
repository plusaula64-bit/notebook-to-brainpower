import { createFileRoute } from "@tanstack/react-router";
import { handleStudyAiRequest, type StudyAiRequestBody } from "@/lib/ai/study-ai.server";

const KINDS = new Set(["mindmap", "summary", "notes", "flashcards"]);

export const Route = createFileRoute("/api/public/study-ai")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: StudyAiRequestBody;
        try {
          body = (await request.json()) as StudyAiRequestBody;
        } catch {
          return Response.json({ error: "Petición inválida." }, { status: 400 });
        }
        if (!KINDS.has(body?.kind) || typeof body.notebook !== "string" || typeof body.notes !== "string") {
          return Response.json({ error: "Faltan datos." }, { status: 400 });
        }
        return handleStudyAiRequest(request, body);
      },
    },
  },
});
