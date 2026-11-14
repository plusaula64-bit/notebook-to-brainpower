import { describe, expect, it } from "vitest";
import { isBlockedHost } from "@/lib/pwa-register";

describe("Offline mode only on the published app", () => {
  it("blocks the Lovable editor preview", () =>
    expect(isBlockedHost("id-preview--59b0923f-0301-4f74-b640-d16fc1a4a162.lovable.app")).toBe(true));
  it("blocks branch previews", () => expect(isBlockedHost("preview-abc--aulaplus-app.lovable.app")).toBe(true));
  it("blocks lovableproject.com hosts", () => expect(isBlockedHost("x.lovableproject.com")).toBe(true));
  it("allows the published app", () => expect(isBlockedHost("aulaplus-app.lovable.app")).toBe(false));
  it("allows a custom domain that looks like a preview", () =>
    expect(isBlockedHost("preview-v2--shop.example.com")).toBe(false));
  it("honours the ?sw=off kill switch", () => expect(isBlockedHost("aulaplus-app.lovable.app", "?sw=off")).toBe(true));
});
