import { Link } from "react-router-dom";
import { config } from "@/lib/config";
import { useBrand } from "@ballisticbrands/frontend-shared";

/**
 * `width` sizes the content column. "sm" is the default narrow auth card
 * (sign-in, forgot-password); "lg" is the older two-column width; "xl" is
 * for /sign-up, whose pitch panel bleeds off the left edge of the viewport
 * and needs the room.
 */
const WIDTHS = {
  sm: "max-w-sm",
  lg: "max-w-3xl",
  xl: "max-w-6xl",
} as const;

export function AuthLayout({
  children,
  width = "sm",
}: {
  children: React.ReactNode;
  width?: keyof typeof WIDTHS;
}) {
  const brand = useBrand();
  return (
    // overflow-x-hidden only on the wide variant: /sign-up's pitch panel
    // paints a background that runs past the left edge, and without a
    // clipping ancestor that background becomes horizontal page scroll.
    // The narrow auth cards don't do this, so they keep the default.
    <div className={`min-h-screen flex flex-col ${width === "xl" ? "overflow-x-hidden" : ""}`}>
      <header className="flex items-center justify-between px-6 py-5">
        {/* Logo lockup mirrors dragonreply-lp's Navbar: the fire mark at h-9
            with its own aspect ratio (not the squared-off, rounded
            DragonBot-logo.png this used to use), and the wordmark in Clash
            Display. The LP hardcodes #1A1A1A; --foreground here is #0a0a0a,
            an imperceptible difference that keeps the app's theming intact. */}
        <Link to="/" className="flex items-center gap-2.5">
          <img src="/logos/dragonbot_fire.png" alt={brand.displayName} className="h-9 w-auto" />
          <span
            className="font-clash text-xl font-bold tracking-tight"
            style={{ lineHeight: "1", paddingTop: "2px" }}
          >
            {brand.headerLabel}
          </span>
        </Link>
        <a
          href={config.docsUrl}
          target="_blank"
          rel="noreferrer"
          className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
        >
          Docs
        </a>
      </header>
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className={`w-full ${WIDTHS[width]}`}>{children}</div>
      </main>
      <footer className="px-6 py-6 text-xs text-[var(--muted-foreground)] flex gap-4">
        <a href={config.docsUrl} target="_blank" rel="noreferrer">
          Docs
        </a>
        <a href={`mailto:${brand.supportEmail}`}>Support</a>
      </footer>
    </div>
  );
}
