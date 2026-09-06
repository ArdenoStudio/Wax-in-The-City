import Link from "next/link";
import Image from "next/image";
import { InstagramIcon, FacebookIcon, WhatsappIcon } from "@/components/icons";
import { SITE, BRANCHES, whatsappLink } from "@/lib/site";
import { WhatsAppBranchPicker } from "@/components/sections/WhatsAppBranchPicker";
import { ArdenoProductionCredit } from "./ArdenoProductionCredit";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[#0e0407] text-cream/80">
      {/* Ambient Velvet Glow Backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[550px] w-[900px] rounded-full bg-gradient-to-b from-brand-action/25 to-transparent blur-3xl opacity-70"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-gradient-to-t from-gold/10 to-transparent blur-3xl opacity-50"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 pb-32 pt-16 md:pb-16 md:pt-20 lg:px-8 lg:pb-20 lg:pt-24">
        {/* Luxury Pre-Footer Reservation Banner */}
        <div className="relative mb-16 overflow-hidden rounded-3xl border border-cream/12 bg-gradient-to-b from-white/[0.06] to-white/[0.015] p-8 md:p-12 shadow-[0_24px_60px_rgba(27,14,16,0.4)] backdrop-blur-xl">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1 text-caption font-semibold uppercase tracking-[0.22em] text-gold">
                <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" aria-hidden />
                Private Sanctuary · Colombo
              </div>
              <h2 className="mt-4 font-serif text-3xl md:text-4xl text-cream tracking-tight font-normal leading-tight">
                An appointment in quiet perfection.
              </h2>
              <p className="mt-3 text-sm md:text-base text-cream/70 leading-relaxed font-light">
                Indulge in Colombo&apos;s dedicated ladies only private studios. Single-use spatulas, hospital-grade sterilization, and world-class Lycon Australia &amp; Italian Rica formulations.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <Link
                href="/book"
                className="inline-flex items-center justify-center rounded-pill bg-brand-action hover:bg-brand-action/90 text-cream px-7 py-3.5 text-sm font-medium transition-all duration-300 shadow-[0_12px_32px_rgba(162,15,55,0.35)] hover:shadow-[0_16px_40px_rgba(162,15,55,0.5)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream/50"
              >
                Reserve Your Visit
              </Link>
              <WhatsAppBranchPicker
                className="inline-flex items-center justify-center gap-2 rounded-pill border border-cream/20 hover:border-brand-light/50 bg-white/[0.04] hover:bg-white/[0.08] text-cream px-6 py-3.5 text-sm font-medium transition-all duration-300 backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream/50"
              >
                <WhatsappIcon className="h-4 w-4 text-brand-light" />
                <span>WhatsApp Concierge</span>
              </WhatsAppBranchPicker>
            </div>
          </div>
        </div>

        {/* 4-Column Luxury Architecture */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.9fr_0.9fr_1.3fr] lg:gap-10">
          {/* Column 1: Brand Heritage & Seal */}
          <div className="flex flex-col">
            <Link
              href="/"
              aria-label={`${SITE.name} home`}
              className="group inline-flex items-center gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream/50 rounded-2xl w-fit"
            >
              <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-cream/15 bg-white/[0.04] p-3 shadow-[0_8px_30px_rgba(27,14,16,0.35)] backdrop-blur-xl transition-all duration-500 group-hover:border-gold/40 group-hover:shadow-[0_12px_35px_rgba(217,179,95,0.2)]">
                <Image
                  src="/images/witc-logo-white.png"
                  alt={SITE.name}
                  width={140}
                  height={140}
                  loading="eager"
                  className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div>
                <span className="block font-serif text-xl md:text-2xl font-normal tracking-[0.14em] text-cream uppercase leading-snug">
                  Wax In The City
                </span>
                <span className="block text-caption uppercase tracking-[0.28em] text-brand-light/80 font-sans mt-0.5">
                  Private Ladies Sanctuary · Colombo
                </span>
              </div>
            </Link>

            <p className="mt-5 text-sm text-cream/70 leading-relaxed font-light max-w-sm">
              Private waxing and skincare quietly perfected across two boutique Colombo studios. Discreet, serene, and uncompromising in hygiene.
            </p>

            {/* Hallmarks of Excellence */}
            <div className="mt-6 flex flex-col gap-2.5">
              <div className="flex items-center gap-2.5 text-xs text-cream/75 font-light">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold text-xs" aria-hidden>
                  ✦
                </span>
                <span>Zero Double Dipping &amp; Single-Use Spatulas</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-cream/75 font-light">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold text-xs" aria-hidden>
                  ✦
                </span>
                <span>Authentic Lycon Australia &amp; Rica Italy Wax</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-cream/75 font-light">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold text-xs" aria-hidden>
                  ✦
                </span>
                <span>Confidential, Ladies Only Private Suites</span>
              </div>
            </div>

            {/* Social Channels */}
            <div className="mt-7 flex items-center gap-3">
              <SocialLink
                href={SITE.instagram}
                label="Follow on Instagram"
                handle="@waxinthecitylk"
                icon={<InstagramIcon className="h-4 w-4" />}
              />
              <SocialIcon href={SITE.facebook} label="Facebook">
                <FacebookIcon className="h-4 w-4" />
              </SocialIcon>
              <WhatsAppBranchPicker
                aria-label="WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/15 text-cream/70 transition-all duration-300 hover:border-gold/50 hover:text-cream hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream/50"
              >
                <WhatsappIcon className="h-4 w-4" />
              </WhatsAppBranchPicker>
            </div>
          </div>

          {/* Column 2: Treatment Menu */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-gold/90 mb-5">
              Treatments &amp; Rituals
            </h3>
            <ul className="space-y-3 text-sm font-light">
              <li>
                <Link
                  href="/services/waxing"
                  className="group flex items-center justify-between text-cream/75 hover:text-cream transition-colors duration-200"
                >
                  <span>Stripless Hot Waxing <span className="text-caption text-brand-light/70 ml-1">· Lycon</span></span>
                  <span className="text-cream/30 group-hover:text-gold transition-colors duration-200 text-xs">&rarr;</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/services/waxing"
                  className="group flex items-center justify-between text-cream/75 hover:text-cream transition-colors duration-200"
                >
                  <span>Liposoluble Strip Wax <span className="text-caption text-brand-light/70 ml-1">· Rica</span></span>
                  <span className="text-cream/30 group-hover:text-gold transition-colors duration-200 text-xs">&rarr;</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/services/facials"
                  className="group flex items-center justify-between text-cream/75 hover:text-cream transition-colors duration-200"
                >
                  <span>Bespoke Facial Care</span>
                  <span className="text-cream/30 group-hover:text-gold transition-colors duration-200 text-xs">&rarr;</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/services/moroccan"
                  className="group flex items-center justify-between text-cream/75 hover:text-cream transition-colors duration-200"
                >
                  <span>Moroccan Bath Rituals</span>
                  <span className="text-cream/30 group-hover:text-gold transition-colors duration-200 text-xs">&rarr;</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/services/hydra-facial"
                  className="group flex items-center justify-between text-cream/75 hover:text-cream transition-colors duration-200"
                >
                  <span>Hydra-Facial Infusion</span>
                  <span className="text-cream/30 group-hover:text-gold transition-colors duration-200 text-xs">&rarr;</span>
                </Link>
              </li>
              <li className="pt-2">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-brand-light hover:text-cream transition-colors underline-offset-4 hover:underline"
                >
                  <span>View Full Treatment Menu</span>
                  <span>&rarr;</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: The Sanctuary */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-gold/90 mb-5">
              The Sanctuary
            </h3>
            <ul className="space-y-3 text-sm font-light">
              <li>
                <Link href="/about" className="text-cream/75 hover:text-cream transition-colors duration-200">
                  Our Philosophy &amp; Story
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-cream/75 hover:text-cream transition-colors duration-200">
                  Studio Suites &amp; Ambience
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-cream/75 hover:text-cream transition-colors duration-200">
                  Hygiene &amp; First-Visit FAQ
                </Link>
              </li>
              <li>
                <Link href="/locations" className="text-cream/75 hover:text-cream transition-colors duration-200">
                  Studio Locations &amp; Map
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-cream/75 hover:text-cream transition-colors duration-200">
                  Direct Studio Inquiries
                </Link>
              </li>
              <li className="pt-2">
                <Link
                  href="/book"
                  className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-gold hover:text-cream transition-colors underline-offset-4 hover:underline"
                >
                  <span>Online Reservation</span>
                  <span>&rarr;</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Private Ateliers */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-gold/90 mb-5">
              Private Ateliers
            </h3>
            <div className="flex flex-col gap-4">
              {BRANCHES.map((b) => (
                <div
                  key={b.slug}
                  className="group relative overflow-hidden rounded-2xl border border-cream/12 bg-white/[0.03] p-4 transition-all duration-300 hover:border-gold/35 hover:bg-white/[0.05] hover:shadow-[0_8px_25px_rgba(27,14,16,0.3)]"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-serif text-base text-cream font-medium">
                          {b.name} Studio
                        </h4>
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-caption font-medium text-emerald-400 border border-emerald-500/25">
                          <span className="h-1 w-1 rounded-full bg-emerald-400 animate-pulse" aria-hidden />
                          Open Daily
                        </span>
                      </div>
                      <p className="text-xs text-cream/60 mt-0.5">{b.area}</p>
                    </div>
                  </div>

                  <div className="mt-3 text-xs text-cream/70 space-y-0.5 tabular-nums font-light">
                    <p>Mon–Sun: {b.hours.weekday}</p>
                    <p className="text-cream/50 text-caption">{b.hours.poya}</p>
                  </div>

                  <div className="mt-3.5 flex flex-wrap items-center gap-2 pt-3 border-t border-cream/10">
                    <a
                      href={`tel:${b.phone.replace(/\s/g, "")}`}
                      className="inline-flex items-center gap-1 rounded-full border border-cream/15 bg-white/[0.02] hover:bg-white/[0.08] hover:border-cream/30 px-3 py-1.5 text-xs text-cream/80 hover:text-cream transition-all duration-200"
                    >
                      <span aria-hidden>📞</span>
                      <span>{b.phone}</span>
                    </a>
                    <a
                      href={whatsappLink(`Hi! I'd like to book an appointment at your ${b.name} studio.`, b.whatsapp)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-brand-action/40 bg-brand-action/15 hover:bg-brand-action/30 hover:border-brand-action px-3 py-1.5 text-xs text-brand-light hover:text-cream transition-all duration-200"
                    >
                      <WhatsappIcon className="h-3.5 w-3.5 text-brand-light" />
                      <span>WhatsApp {b.name}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hairline Shimmer Divider */}
        <div className="mt-16 h-px w-full bg-gradient-to-r from-transparent via-cream/15 to-transparent" />

        {/* Bottom Copyright & Protocol Bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 text-xs font-light text-cream/60 sm:flex-row">
          <p className="text-center sm:text-left">
            &copy; {year} {SITE.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-5 text-caption uppercase tracking-wider text-cream/50">
            <Link href="/about" className="hover:text-cream transition-colors">
              Privacy Protocol
            </Link>
            <span aria-hidden>&bull;</span>
            <Link href="/faq" className="hover:text-cream transition-colors">
              Hygiene Standard
            </Link>
            <span aria-hidden>&bull;</span>
            <Link href="/locations" className="hover:text-cream transition-colors">
              Colombo &bull; Battaramulla
            </Link>
          </div>
        </div>

        {/* Ardeno Production Credit */}
        <ArdenoProductionCredit color="#fff7f9" />
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  handle,
  icon,
}: {
  href: string;
  label: string;
  handle: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="group inline-flex items-center gap-2 rounded-full border border-cream/15 bg-white/[0.03] hover:bg-white/[0.08] hover:border-gold/40 px-3.5 py-2 text-xs text-cream/80 hover:text-cream transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream/50"
    >
      <span className="text-gold group-hover:scale-110 transition-transform duration-300">
        {icon}
      </span>
      <span className="font-light tracking-wide">{handle}</span>
    </a>
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
      className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/15 text-cream/70 transition-all duration-300 hover:border-gold/50 hover:text-cream hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream/50"
    >
      {children}
    </a>
  );
}
