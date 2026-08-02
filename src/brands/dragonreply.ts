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
  ga4MeasurementId: "G-879PTERL8X",
  clarityId: "xw1ytjo41g",
  // Same postMessage namespace as DragonBot — the backend sends this
  // type regardless of tenant, so every brand frontend listens for the
  // same value.
  oauthMessageType: "dragonbot-oauth-result",
};

/**
 * Meta Pixel (dataset) ID for Dragon Reply — its own dataset, not
 * DragonBot's or DragonRefunds'.
 *
 * Deliberately NOT a BrandConfig field: that type is owned by
 * @ballisticbrands/frontend-shared and has no `metaPixelId`, so adding one
 * would mean publishing the shared package and bumping every sibling repo.
 * This repo builds exactly one brand, so a local export is sufficient.
 * Promote it into BrandConfig when a second brand needs an app-side pixel.
 *
 * Why this has to exist at all: the shared lib's Meta calls are guarded by
 * `typeof window.fbq === "function"`. With no base snippet loaded, every
 * Meta event on app.dragonreply.ai silently no-ops — no error, just
 * nothing. Creating the dataset in Business Manager is not enough.
 */
export const META_PIXEL_ID = "1730066011572745";
