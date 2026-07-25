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
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(255,255,255,0.18) 0 1px, transparent 1px 100%), linear-gradient(180deg, rgba(255,255,255,0.06), transparent 42%)",
          backgroundSize: "28px 28px, 100% 100%",
        }}
      />

      <div className="relative section-shell pb-28 pt-16 md:py-16 lg:py-20">
        {/* HyperUI-style top band: brand + primary action */}
        <div className="flex flex-col gap-6 border-b border-cream/10 pb-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-md">
            <div className="flex items-center gap-3">
              <span className="relative block h-14 w-14 rounded-pill border border-cream/12 bg-brand p-1">
                <Image
                  src={IMAGES.wordmark}
                  alt={SITE.name}
                  fill
                  sizes="56px"
                  loading="eager"
                  className="object-contain"
                />
              </span>
              <p className="font-display text-[1.35rem] font-semibold tracking-tight-display text-cream">
                {SITE.shortName}
              </p>
            </div>
            <p className="text-balance mt-4 font-display text-h4 font-semibold tracking-display text-brand-light">
              {SITE.tagline}
            </p>
            <p className="font-sans mt-2 max-w-sm text-pretty text-body-sm text-cream-muted">
              Ladies-only waxing &amp; beauty care across two Colombo branches —
              private rooms, reviewed bookings, clear after-care.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={phoneHref}
              className="ease-[var(--ease-apple)] text-pretty font-sans inline-flex min-h-11 items-center justify-center rounded-pill border border-cream/16 px-5 text-body-sm text-cream/85 transition-colors duration-300 hover:border-cream/30 hover:text-cream"
            >
              {BRANCHES[0].phone}
            </a>
            <a
              href={whatsappLink("Hi! I'd like to book via WhatsApp.")}
              target="_blank"
              rel="noopener noreferrer"
              className="ease-[var(--ease-apple)] text-pretty font-sans pressable inline-flex min-h-11 items-center justify-center gap-2 rounded-pill border border-cream/18 bg-cream/10 px-5 text-body-sm font-semibold text-cream transition-colors duration-300 hover:border-brand-light hover:bg-cream/14"
            >
              <WhatsappIcon className="h-4 w-4 shrink-0" />
              Book via WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1fr_1.5fr]">
          {/* Explore */}
          <div>
            <h3 className="eyebrow-label-light text-cream-muted">Explore</h3>
            <ul className="mt-4 space-y-0.5">
              <li>
                <Link href="/" className="footer-link">
                  Home
                </Link>
              </li>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/book" className="footer-link font-medium text-cream/90">
                  Book Your Visit
                </Link>
              </li>
            </ul>

            <div className="mt-7 flex items-center gap-2.5">
              <SocialIcon href={SITE.instagram} label="Instagram">
                <InstagramIcon className="h-5 w-5 shrink-0" />
              </SocialIcon>
              <SocialIcon href={SITE.facebook} label="Facebook">
                <FacebookIcon className="h-5 w-5 shrink-0" />
              </SocialIcon>
              <SocialIcon
                href={whatsappLink("Hi! I'd like to ask about a booking.")}
                label="WhatsApp"
              >
                <WhatsappIcon className="h-5 w-5 shrink-0" />
              </SocialIcon>
            </div>
          </div>

          {/* Quick help */}
          <div>
            <h3 className="eyebrow-label-light text-cream-muted">Help</h3>
            <ul className="mt-4 space-y-0.5">
              <li>
                <Link href="/faq" className="footer-link">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="footer-link">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/contact#privacy" className="footer-link">
                  Privacy note
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="footer-link">
                  Gallery
                </Link>
              </li>
              <li>
                <a
                  href={whatsappLink("Hi! I have a quick question before booking.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  WhatsApp a question
                </a>
              </li>
            </ul>
          </div>

          {/* Branches */}
          <div>
            <h3 className="eyebrow-label-light text-cream-muted">Our Branches</h3>
            <div className="mt-4 grid gap-6 sm:grid-cols-2">
              {BRANCHES.map((b) => (
                <div key={b.slug} className="rounded-card border border-cream/10 bg-cream/[0.03] p-4">
                  <Link
                    href={`/locations/${b.slug}`}
                    className="ease-[var(--ease-apple)] text-balance font-display text-h4 font-semibold tracking-display text-cream transition-colors duration-300 hover:text-brand-light"
                  >
                    {b.name}
                  </Link>
                  <p className="text-pretty font-sans mt-1 text-body-sm text-cream-muted">{b.area}</p>
                  {isAddressPending(b) && (
                    <p className="mt-1.5 font-sans text-caption text-cream-muted">
                      Exact street address pending — WhatsApp for directions.
                    </p>
                  )}
                  <dl className="text-pretty font-sans mt-3 space-y-1 text-body-sm text-cream/78">
                    <div className="flex justify-between gap-3">
                      <dt className="text-cream-muted">Weekdays</dt>
                      <dd className="text-right">{b.hours.weekday}</dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt className="text-cream-muted">Weekends</dt>
                      <dd className="text-right">{b.hours.weekend}</dd>
                    </div>
                  </dl>
                  <p className="mt-1.5 font-sans text-caption text-cream-muted">{b.hours.poya}</p>
                  <a
                    href={whatsappLink(
                      `Hi! I'd like to book at your ${b.name} branch.`,
                      b.whatsapp
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pretty font-sans mt-3 inline-flex min-h-10 items-center text-body-sm font-medium text-brand-light underline-offset-4 hover:underline"
                  >
                    WhatsApp {b.name}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-cream/10 pt-6 font-sans text-caption text-cream-muted sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4 sm:gap-y-1">
            <p>
              © {year} {SITE.name}. All rights reserved.
            </p>
            <a href={phoneHref} className="ease-[var(--ease-apple)] transition-colors duration-300 hover:text-cream">
              {BRANCHES[0].phone}
            </a>
            <Link href="/contact" className="ease-[var(--ease-apple)] transition-colors duration-300 hover:text-cream">
              Contact
            </Link>
            <Link href="/faq" className="ease-[var(--ease-apple)] transition-colors duration-300 hover:text-cream">
              FAQ
            </Link>
            <Link href="/contact#privacy" className="ease-[var(--ease-apple)] transition-colors duration-300 hover:text-cream">
              Privacy
            </Link>
          </div>
          <p>
            Crafted by <span className="text-cream/65">Ardeno Studio</span>
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
      className="ease-[var(--ease-apple)] pressable micro-lift flex h-11 w-11 items-center justify-center rounded-pill border border-cream/14 text-cream/76 transition-colors duration-300 hover:border-gold/50 hover:text-cream"
    >
      {children}
    </a>
  );
}
