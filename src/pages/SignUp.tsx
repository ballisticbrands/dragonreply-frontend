import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Input,
  Label,
  Turnstile,
  useBrand,
  useSignUpForm,
} from "@ballisticbrands/frontend-shared";
import { ArrowRight, CheckCircle, ExternalLink, Shield } from "@/components/ui/icons";

const APPSTORE_URL =
  "https://sellercentral.amazon.com/selling-partner-appstore/dp/amzn1.sp.solution.d78b7343-017b-4e68-92e4-a1defb51aa6f";

const VALUE_PROPS = [
  "100% TOS-compliant by design",
  "AI-drafted replies in your brand voice",
  "Every store & marketplace in one inbox",
];

/**
 * DragonReply sign-up — a two-column pitch + form. The presentation pitches
 * buyer-message automation (replacing the reimbursement estimate inherited on
 * the dragonrefunds fork); the account itself is still created by
 * `useSignUpForm` from the shared package, so the auth flow stays identical to
 * the sibling brand apps. Confirm-password is local — the shared hook owns
 * name/email/password only, so we block the submit before the hook sees it.
 */
export function SignUp() {
  const navigate = useNavigate();
  const brand = useBrand();

  const [confirm, setConfirm] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const form = useSignUpForm({
    onSuccess: () => {
      // The `sign_up` GA4/Clarity event is fired by the shared
      // identifyUserAcrossPlatforms() after the post-signup /me lookup, so we
      // only navigate here to avoid double-counting the conversion.
      navigate("/dashboard", { replace: true });
    },
  });

  useEffect(() => {
    document.title = `Create your account — ${brand.displayName}`;
  }, [brand.displayName]);

  const mismatch = confirm.length > 0 && confirm !== form.password;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setSubmitted(true);
    if (form.password !== confirm) {
      e.preventDefault();
      return;
    }
    form.onSubmit(e);
  };

  const showMismatch = mismatch || (submitted && form.password !== confirm);

  return (
    <div className="grid items-center gap-10 sm:grid-cols-2">
      {/* left — pitch */}
      <div>
        <span
          className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] font-medium"
          style={{
            backgroundColor: "color-mix(in srgb, var(--brand-green) 12%, transparent)",
            color: "var(--brand-green)",
          }}
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--brand-green-light)]" />
          Start free
        </span>
        <h1 className="mt-5 text-3xl font-extrabold leading-[1.1] tracking-[-0.03em] sm:text-4xl">
          Reply in seconds.
          <br />
          Stay TOS-safe.
        </h1>
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[var(--muted-foreground)]">
          The fast, intuitive inbox sellers love — finally on Amazon. Create your account and start
          drafting replies in minutes.
        </p>
        <ul className="mt-7 space-y-3">
          {VALUE_PROPS.map((text) => (
            <li key={text} className="flex items-center gap-3 text-[15px]">
              <CheckCircle className="h-5 w-5 shrink-0 text-[var(--brand-green)]" />
              {text}
            </li>
          ))}
        </ul>
        <div className="mt-8 flex items-center gap-5">
          <div>
            <div className="text-2xl font-extrabold leading-none">10 years</div>
            <div className="mt-1 text-[11px] uppercase tracking-[0.15em] text-[var(--muted-foreground)]">
              on Amazon
            </div>
          </div>
          <div
            className="h-9 w-px"
            style={{ backgroundColor: "color-mix(in srgb, var(--foreground) 15%, transparent)" }}
          />
          <div>
            <div className="text-2xl font-extrabold leading-none">8 figures</div>
            <div className="mt-1 text-[11px] uppercase tracking-[0.15em] text-[var(--muted-foreground)]">
              sold
            </div>
          </div>
        </div>
      </div>

      {/* right — form */}
      <div className="rounded-2xl border bg-[var(--card)] p-6 shadow-sm sm:p-7">
        <h2 className="text-xl font-extrabold tracking-[-0.02em]">Create your account</h2>
        <p className="mt-1 text-[13.5px] text-[var(--muted-foreground)]">
          Start free — no credit card required.
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1.5">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              autoComplete="name"
              value={form.name}
              onChange={(e) => form.setName(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">Work email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={form.email}
              onChange={(e) => form.setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              value={form.password}
              onChange={(e) => form.setPassword(e.target.value)}
            />
            <p className="text-xs text-[var(--muted-foreground)]">At least 8 characters.</p>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="confirm-password">Confirm password</Label>
            <Input
              id="confirm-password"
              name="confirm-password"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
            {showMismatch && <p className="text-xs text-[var(--danger)]">Passwords don't match.</p>}
          </div>

          <Turnstile onToken={form.onTurnstileToken} onExpired={form.onTurnstileExpired} />
          {form.error && <p className="text-sm text-[var(--danger)]">{form.error}</p>}

          <Button
            type="submit"
            disabled={form.pending || !form.turnstileToken}
            className="flex w-full items-center justify-center gap-2"
          >
            {form.pending ? "Creating account…" : "Start free"}
            {!form.pending && <ArrowRight className="h-4 w-4" />}
          </Button>

          <p className="text-center text-[11px] leading-relaxed text-[var(--muted-foreground)]">
            By continuing you agree to our{" "}
            <a
              href="https://dragonreply.ai/tos"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-2"
            >
              Terms
            </a>{" "}
            and{" "}
            <a
              href="https://dragonreply.ai/privacy"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-2"
            >
              Privacy Policy
            </a>
            .
          </p>
        </form>

        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t pt-5 text-[12px] font-medium">
          <a
            href={APPSTORE_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-[var(--brand-green)] hover:opacity-70"
          >
            <CheckCircle className="h-3.5 w-3.5" />
            <span className="underline underline-offset-2">Amazon approved</span>
            <ExternalLink className="h-3 w-3 opacity-60" />
          </a>
          <span className="flex items-center gap-1.5 text-[var(--muted-foreground)]">
            <Shield className="h-3.5 w-3.5 text-[var(--brand-green)]" />
            Amazon ToS compliant
          </span>
        </div>

        <p className="mt-5 text-center text-sm text-[var(--muted-foreground)]">
          Already have an account?{" "}
          <Link to="/sign-in" className="font-medium text-[var(--foreground)] hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
