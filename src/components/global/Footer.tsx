import Link from "next/link";
import Image from "next/image";
import { InstagramIcon, FacebookIcon, WhatsappIcon } from "@/components/icons";
import { SITE, NAV_LINKS, BRANCHES, whatsappLink } from "@/lib/site";
import { IMAGES } from "@/lib/images";

export function Footer() {
  const year = new Date().getFullYear();

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
            <p className="mt-4 max-w-xs font-serif text-h4 text-brand-light text-pretty">
              {SITE.tagline}
            </p>
            <p className="mt-3 max-w-xs text-body-sm text-cream/60 text-pretty">
              Ladies only waxing &amp; beauty care across two Colombo branches.
            </p>

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

          {/* Nav */}
          <div>
            <h3 className="text-caption font-semibold uppercase tracking-[0.12em] text-cream/50 text-balance">
              Explore
            </h3>
            <ul className="mt-3 space-y-1">
              <li>
                <Link href="/" className="inline-flex min-h-10 min-w-10 items-center rounded-pill px-2 text-body-sm transition-colors hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream/50 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-footer">
                  Home
                </Link>
              </li>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-10 min-w-10 items-center rounded-pill px-2 text-body-sm transition-colors hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream/50 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-footer"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/book" className="inline-flex min-h-10 min-w-10 items-center rounded-pill px-2 text-body-sm transition-colors hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream/50 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-footer">
                  Book Your Visit
                </Link>
              </li>
            </ul>
          </div>

          {/* Branches */}
          <div>
            <h3 className="text-caption font-semibold uppercase tracking-[0.12em] text-cream/50 text-balance">
              Our Branches
            </h3>
            <div className="mt-4 grid gap-6 sm:grid-cols-2">
              {BRANCHES.map((b) => (
                <div key={b.slug}>
                  <p className="font-serif text-h4 text-cream text-pretty">{b.name}</p>
                  <p className="mt-1 text-body-sm text-cream/60 text-pretty">{b.area}</p>
                  <a
                    href={`tel:${b.phone.replace(/\s/g, "")}`}
                    className="mt-1 inline-block text-body-sm text-cream/60 hover:text-cream hover:underline"
                  >
                    {b.phone}
                  </a>
                  <p className="mt-2 text-body-sm text-cream/60 text-pretty">{b.hours.weekday}</p>
                  <p className="text-caption text-cream/70 text-pretty">{b.hours.poya}</p>
                  <a
                    href={whatsappLink(`Hi! I'd like to book at your ${b.name} branch.`, b.whatsapp)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex min-h-10 items-center rounded-pill px-2 text-body-sm text-brand-light underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream/50 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-footer"
                  >
                    WhatsApp {b.name}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-cream/10 pt-6 text-caption text-cream/60 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-pretty">© {year} {SITE.name}. All rights reserved.</p>
          <p className="text-pretty">
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
      className="flex h-11 w-11 items-center justify-center rounded-pill border border-cream/15 text-cream/70 transition-colors hover:border-brand-light hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream/50 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-footer"
    >
      {children}
    </a>
  );
}
