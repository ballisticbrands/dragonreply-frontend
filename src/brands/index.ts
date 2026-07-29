// Single-brand registry for dragonreply-frontend.
//
// This repo only builds the Dragon Reply app (deployed at
// app.dragonreply.ai). Sibling repos dragonbot-frontend and
// dragonrefunds-frontend build their apps the same way with their
// own brand files.
//
// The BrandConfig type is owned by @ballisticbrands/frontend-shared —
// consumers import it from there, and pass their brand into the
// shared BrandProvider + configureShared({ brand }).

import { DRAGONREPLY } from "./dragonreply";

export type { BrandConfig } from "@ballisticbrands/frontend-shared";
export { DRAGONREPLY };

/** The one brand this repo builds. */
export function activeBrand() {
  return DRAGONREPLY;
}
