import type { BrandConfig } from "@ballisticbrands/frontend-shared";

export const DRAGONREPLY: BrandConfig = {
  id: "dragonreply",
  appHost: "app.dragonreply.ai",
  appOrigin: "https://app.dragonreply.ai",
  headerLabel: "Dragon Reply",
  displayName: "Dragon Reply",
  metaDescription:
    "Dragon Reply answers your Amazon buyer messages for you — fast, on-brand, and TOS-safe.",
  supportEmail: "hello@dragonreply.ai",
  // TODO(launch): Dragon Reply has no GA4 property or Clarity project yet.
  // Empty strings are safe — injectGa4/injectClarity in main.tsx no-op on
  // falsy IDs, so no half-configured tag ships. Fill both in before launch.
  ga4MeasurementId: "",
  clarityId: "",
  // Same postMessage namespace as DragonBot — the backend sends this
  // type regardless of tenant, so every brand frontend listens for the
  // same value.
  oauthMessageType: "dragonbot-oauth-result",
};
