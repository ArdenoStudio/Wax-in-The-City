"use client";

import {
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
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
    <div className="space-y-12">
      {groups.map((group, gi) => (
        <AnimatedSection key={group.category} variant="fadeUp" delay={gi * 0.05}>
          {groups.length > 1 && (
            <h2 className="mb-5 font-serif text-h3 text-warm">{group.category}</h2>
          )}
          <Accordion
            type="single"
            collapsible
            defaultValue={defaultOpen}
            className="space-y-3"
            aria-label={`${group.category} questions`}
          >
            {group.items.map((item, i) => (
              <AccordionItem key={i} value={`${gi}-${i}`}>
                <AccordionTrigger className="text-h4 sm:text-h4">
                  {item.question}
                </AccordionTrigger>
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
    <div className="space-y-10">
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-action/70"
          aria-hidden
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search questions…"
          aria-label="Search FAQ questions"
          className="h-12 w-full rounded-card border border-warm-border/80 bg-white/86 pl-11 pr-4 text-body text-warm shadow-[inset_0_1px_0_rgba(255,255,255,0.76)] outline-none transition-[border-color,box-shadow] placeholder:text-warm-grey/62 focus:border-brand-action/70 focus:ring-4 focus:ring-brand-action/12"
        />
      </div>

      <nav
        aria-label="FAQ categories"
        className="sticky top-20 z-20 -mx-1 overflow-x-auto px-1 py-2 backdrop-blur-md"
      >
        <ul className="flex min-w-max gap-2">
          {groups.map((group) => {
            const id = `faq-cat-${slugifyQuestion(group.category)}`;
            const visible = filteredGroups.some(
              (g) => g.category === group.category
            );
            return (
              <li key={group.category}>
                <a
                  href={`#${id}`}
                  className={cn(
                    "inline-flex h-10 items-center rounded-pill border px-4 text-body-sm font-medium transition-colors",
                    visible
                      ? "border-brand-action/30 bg-brand-mist/80 text-brand-action hover:bg-brand-mist"
                      : "pointer-events-none border-warm-border/50 bg-white/40 text-warm-grey/45"
                  )}
                >
                  {group.category}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {filteredGroups.length === 0 ? (
        <div className="studio-plate rounded-card px-6 py-10 text-center">
          <p className="font-serif text-h4 text-warm">Nothing matched that search.</p>
          <p className="mx-auto mt-2 max-w-sm text-body-sm text-warm-grey">
            Try one word — hygiene, waxing, or booking — or clear the search to
            browse every answer.
          </p>
        </div>
      ) : (
        <div className="space-y-12">
          {filteredGroups.map((group) => {
            const gi = groups.findIndex((g) => g.category === group.category);
            const catId = `faq-cat-${slugifyQuestion(group.category)}`;
            return (
              <AnimatedSection
                key={group.category}
                variant="fadeUp"
                delay={gi * 0.05}
              >
                <h2
                  id={catId}
                  className="mb-5 scroll-mt-36 font-serif text-h3 text-warm"
                >
                  {group.category}
                </h2>
                <Accordion
                  type="single"
                  collapsible
                  value={openValue}
                  onValueChange={onOpenChange}
                  className="space-y-3"
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
                        <AccordionTrigger className="text-h4 sm:text-h4">
                          {item.question}
                        </AccordionTrigger>
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
