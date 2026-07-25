"use client";

import {
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { FAQ_GROUPS, type FaqGroup } from "@/lib/faq";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { AnimatedSection } from "@/components/global/AnimatedSection";
import { cn } from "@/lib/utils";

interface FAQAccordionProps {
  groups?: FaqGroup[];
  /** Accordion item value to open by default, e.g. `"0-0"`. */
  defaultOpen?: string;
  /** Sticky category jumps, search, and ?q=/hash deep-links (full FAQ page). */
  enhanced?: boolean;
}

function slugifyQuestion(question: string): string {
  return question
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function itemValue(groupIndex: number, itemIndex: number): string {
  return `${groupIndex}-${itemIndex}`;
}

export function FAQAccordion({
  groups = FAQ_GROUPS,
  defaultOpen,
  enhanced = false,
}: FAQAccordionProps) {
  if (enhanced) {
    return <FAQAccordionEnhanced groups={groups} defaultOpen={defaultOpen} />;
  }

  return (
    <div className="space-y-10">
      {groups.map((group, gi) => (
        <AnimatedSection key={group.category} variant="fadeUp" delay={gi * 0.05}>
          {groups.length > 1 && (
            <h2 className="text-balance mb-4 font-display text-h3 font-semibold tracking-display text-warm">
              {group.category}
            </h2>
          )}
          <Accordion
            type="single"
            collapsible
            defaultValue={defaultOpen}
            className="space-y-2.5"
            aria-label={`${group.category} questions`}
          >
            {group.items.map((item, i) => (
              <AccordionItem key={i} value={`${gi}-${i}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </AnimatedSection>
      ))}
    </div>
  );
}

function FAQAccordionEnhanced({
  groups,
  defaultOpen,
}: {
  groups: FaqGroup[];
  defaultOpen?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());
  const [openValue, setOpenValue] = useState<string | undefined>(defaultOpen);

  const totalCount = useMemo(
    () => groups.reduce((sum, g) => sum + g.items.length, 0),
    [groups]
  );

  const flatItems = useMemo(
    () =>
      groups.flatMap((group, gi) =>
        group.items.map((item, i) => ({
          gi,
          i,
          value: itemValue(gi, i),
          slug: slugifyQuestion(item.question),
          item,
        }))
      ),
    [groups]
  );

  const filteredGroups = useMemo(() => {
    if (!deferredQuery) return groups;
    return groups
      .map((group) => ({
        ...group,
        items: group.items.filter(
          (item) =>
            item.question.toLowerCase().includes(deferredQuery) ||
            item.answer.toLowerCase().includes(deferredQuery)
        ),
      }))
      .filter((group) => group.items.length > 0);
  }, [deferredQuery, groups]);

  const matchCount = useMemo(
    () => filteredGroups.reduce((sum, g) => sum + g.items.length, 0),
    [filteredGroups]
  );

  useEffect(() => {
    const qParam = searchParams.get("q");
    const hash =
      typeof window !== "undefined"
        ? window.location.hash.replace(/^#/, "")
        : "";
    const needle = (qParam ?? hash).trim().toLowerCase();
    if (!needle) return;

    const match = flatItems.find(
      ({ item, slug }) =>
        slug === needle ||
        item.question.toLowerCase() === needle ||
        item.question.toLowerCase().includes(needle) ||
        slug.includes(needle.replace(/\s+/g, "-"))
    );
    if (!match) return;

    // Deep-link open from ?q= / hash — sync with URL search params.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpenValue(match.value);
    if (qParam && !query) setQuery(qParam);

    requestAnimationFrame(() => {
      document
        .getElementById(`faq-${match.slug}`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }, [searchParams, flatItems, query]);

  const onOpenChange = (value: string) => {
    setOpenValue(value || undefined);
    if (!value) {
      router.replace(pathname, { scroll: false });
      return;
    }
    const match = flatItems.find((entry) => entry.value === value);
    if (!match) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("q", match.slug);
    router.replace(`${pathname}?${params.toString()}#${match.slug}`, {
      scroll: false,
    });
  };

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 shrink-0 -translate-y-1/2 text-brand-action/70"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search hygiene, waxing, booking…"
            aria-label="Search FAQ questions"
            className="text-pretty field-surface h-12 w-full rounded-card border border-warm-border/80 bg-white/90 pl-11 pr-11 font-sans text-body text-warm outline-none transition-[border-color,box-shadow] placeholder:text-warm-grey/62 focus:border-brand-action/70 focus:ring-4 focus:ring-brand-action/12"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="ease-[var(--ease-apple)] absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-pill text-warm-grey transition-colors duration-300 hover:bg-brand-mist hover:text-brand-action"
            >
              <X className="h-4 w-4 shrink-0" />
            </button>
          )}
        </div>
        <p className="field-helper" aria-live="polite">
          {deferredQuery
            ? `${matchCount} match${matchCount === 1 ? "" : "es"} for “${query.trim()}”`
            : `${totalCount} questions across ${groups.length} topics`}
        </p>
      </div>

      <nav
        aria-label="FAQ categories"
        className="sticky top-20 z-20 -mx-1 overflow-x-auto px-1 py-2.5 backdrop-blur-xl"
      >
        <ul className="flex min-w-max gap-1.5">
          {groups.map((group) => {
            const id = `faq-cat-${slugifyQuestion(group.category)}`;
            const visible = filteredGroups.some(
              (g) => g.category === group.category
            );
            const count = group.items.length;
            return (
              <li key={group.category}>
                <a
                  href={`#${id}`}
                  className={cn(
                    "ease-[var(--ease-apple)] text-pretty font-sans inline-flex h-9 items-center gap-1.5 rounded-pill border px-3.5 text-body-sm font-semibold transition-colors duration-300",
                    visible
                      ? "chip-active hover:bg-brand-mist"
                      : "pointer-events-none border-warm-border/45 bg-white/35 text-warm-grey/40"
                  )}
                >
                  {group.category}
                  <span
                    className={cn(
                      "font-sans text-caption tabular-nums",
                      visible ? "text-brand-action/65" : "text-warm-grey/35"
                    )}
                  >
                    {count}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {filteredGroups.length === 0 ? (
        <div className="studio-plate rounded-card px-6 py-10 text-center">
          <p className="text-balance font-display text-h4 font-semibold tracking-display text-warm">
            Nothing matched that search.
          </p>
          <p className="font-sans mx-auto mt-2 max-w-sm text-pretty text-body-sm text-warm-grey">
            Try one word — hygiene, waxing, or booking — or clear the search to
            browse every answer.
          </p>
          <button
            type="button"
            onClick={() => setQuery("")}
            className="text-pretty font-sans pressable mt-5 inline-flex h-10 items-center rounded-pill border border-brand-action/30 px-5 text-body-sm font-semibold text-brand-action hover:bg-brand-mist"
          >
            Clear search
          </button>
        </div>
      ) : (
        <div className="space-y-10">
          {filteredGroups.map((group) => {
            const gi = groups.findIndex((g) => g.category === group.category);
            const catId = `faq-cat-${slugifyQuestion(group.category)}`;
            return (
              <AnimatedSection
                key={group.category}
                variant="fadeUp"
                delay={gi * 0.04}
              >
                <div className="mb-3.5 flex items-baseline justify-between gap-3">
                  <h2
                    id={catId}
                    className="text-balance scroll-mt-36 font-display text-h3 font-semibold tracking-display text-warm"
                  >
                    {group.category}
                  </h2>
                  <span className="font-sans text-caption tabular-nums text-warm-grey">
                    {group.items.length}
                  </span>
                </div>
                <Accordion
                  type="single"
                  collapsible
                  value={openValue}
                  onValueChange={onOpenChange}
                  className="space-y-2.5"
                  aria-label={`${group.category} questions`}
                >
                  {group.items.map((item) => {
                    const i = groups[gi].items.findIndex(
                      (faq) => faq.question === item.question
                    );
                    const value = itemValue(gi, i);
                    const slug = slugifyQuestion(item.question);
                    return (
                      <AccordionItem
                        key={value}
                        value={value}
                        id={`faq-${slug}`}
                        className="scroll-mt-36"
                      >
                        <AccordionTrigger>{item.question}</AccordionTrigger>
                        <AccordionContent>{item.answer}</AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </AnimatedSection>
            );
          })}
        </div>
      )}
    </div>
  );
}
