import Link from "next/link";
import Image from "next/image";
import { InstagramIcon, FacebookIcon, WhatsappIcon } from "@/components/icons";
import {
  SITE,
  NAV_LINKS,
  BRANCHES,
  whatsappLink,
  isAddressPending,
} from "@/lib/site";
import { IMAGES } from "@/lib/images";

export function Footer() {
  const year = new Date().getFullYear();
  const phoneHref = `tel:${BRANCHES[0].phone.replace(/\s/g, "")}`;

  return (
    <footer className="relative overflow-hidden bg-brand-footer text-cream/80">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(255,255,255,0.22) 0 1px, transparent 1px 100%), linear-gradient(180deg, rgba(255,255,255,0.08), transparent)",
          backgroundSize: "32px 32px, 100% 100%",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 pb-28 pt-16 md:py-16 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr_1.4fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <span className="relative block h-16 w-16 rounded-pill border border-cream/10 bg-brand p-1">
                <Image
                  src={IMAGES.wordmark}
                  alt={SITE.name}
                  fill
                  sizes="64px"
                  loading="eager"
                  className="object-contain"
                />
              </span>
            </div>
            <p className="mt-4 max-w-xs font-display text-h4 text-brand-light">
              {SITE.tagline}
            </p>
            <p className="mt-3 max-w-xs text-body-sm text-cream-muted">
              Ladies-only waxing &amp; beauty care across two Colombo branches.
            </p>
            <a
              href={phoneHref}
              className="mt-3 inline-flex min-h-10 items-center text-body-sm text-cream/80 transition-colors hover:text-cream"
            >
              {BRANCHES[0].phone}
            </a>

            <a
              href={whatsappLink("Hi! I'd like to book via WhatsApp.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-pill border border-cream/18 bg-cream/8 px-4 py-2 text-body-sm font-medium text-cream transition-colors hover:border-brand-light hover:bg-cream/12"
            >
              <WhatsappIcon className="h-4 w-4" />
              Book via WhatsApp
            </a>

            <div className="mt-6 flex items-center gap-3">
              <SocialIcon href={SITE.instagram} label="Instagram">
                <InstagramIcon className="h-5 w-5" />
              </SocialIcon>
              <SocialIcon href={SITE.facebook} label="Facebook">
                <FacebookIcon className="h-5 w-5" />
              </SocialIcon>
              <SocialIcon
                href={whatsappLink("Hi! I'd like to ask about a booking.")}
                label="WhatsApp"
              >
                <WhatsappIcon className="h-5 w-5" />
              </SocialIcon>
            </div>
          </div>

          {/* Nav — FAQ & Contact via NAV_LINKS */}
          <div>
            <h3 className="text-caption font-semibold uppercase tracking-[0.12em] text-cream-muted">
              Explore
            </h3>
            <ul className="mt-3 space-y-1">
              <li>
                <Link href="/" className="inline-flex min-h-10 min-w-10 items-center text-body-sm transition-colors hover:text-cream">
                  Home
                </Link>
              </li>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-10 min-w-10 items-center text-body-sm transition-colors hover:text-cream"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/book" className="inline-flex min-h-10 min-w-10 items-center text-body-sm transition-colors hover:text-cream">
                  Book Your Visit
                </Link>
              </li>
            </ul>
          </div>

          {/* Branches */}
          <div>
            <h3 className="text-caption font-semibold uppercase tracking-[0.12em] text-cream-muted">
              Our Branches
            </h3>
            <div className="mt-4 grid gap-6 sm:grid-cols-2">
              {BRANCHES.map((b) => (
                <div key={b.slug}>
                  <Link
                    href={`/locations/${b.slug}`}
                    className="font-display text-h4 text-cream transition-colors hover:text-brand-light"
                  >
                    {b.name}
                  </Link>
                  <p className="mt-1 text-body-sm text-cream-muted">{b.area}</p>
                  {isAddressPending(b) && (
                    <p className="mt-1 text-caption text-cream-muted">
                      Exact street address pending confirmation — WhatsApp for
                      directions.
                    </p>
                  )}
                  <p className="mt-2 text-body-sm text-cream/70">
                    Weekdays: {b.hours.weekday}
                  </p>
                  <p className="text-body-sm text-cream/70">
                    Weekends: {b.hours.weekend}
                  </p>
                  <p className="text-caption text-cream-muted">{b.hours.poya}</p>
                  <a
                    href={whatsappLink(`Hi! I'd like to book at your ${b.name} branch.`, b.whatsapp)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex min-h-10 items-center text-body-sm text-brand-light underline-offset-4 hover:underline"
                  >
                    WhatsApp {b.name}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-cream/10 pt-6 text-caption text-cream-muted sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <p>© {year} {SITE.name}. All rights reserved.</p>
            <a href={phoneHref} className="transition-colors hover:text-cream">
              {BRANCHES[0].phone}
            </a>
            <Link href="/contact" className="transition-colors hover:text-cream">
              Contact
            </Link>
            <Link href="/faq" className="transition-colors hover:text-cream">
              FAQ
            </Link>
            <Link
              href="/contact#privacy"
              className="transition-colors hover:text-cream"
            >
              Privacy
            </Link>
          </div>
          <p>
            Crafted by{" "}
            <span className="text-cream/60">Ardeno Studio</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="pressable micro-lift flex h-11 w-11 items-center justify-center rounded-pill border border-cream/15 text-cream/70 transition-colors hover:border-gold/55 hover:text-cream"
    >
      {children}
    </a>
  );
}
