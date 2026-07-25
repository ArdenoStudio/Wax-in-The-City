"use client";

import { BRANCHES } from "@/lib/site";

function openTodayHint(): string {
  const day = new Date().getDay(); // 0 Sun … 6 Sat
  const isWeekend = day === 0 || day === 6;
  const hours = BRANCHES[0].hours;
  const window = isWeekend ? hours.weekend : hours.weekday;
  const label = isWeekend ? "Weekends" : "Weekdays";
  return `Today follows ${label.toLowerCase()} hours · ${window}`;
}

export function HoursTable() {
  const hint = openTodayHint();
  const hours = BRANCHES[0].hours;

  return (
    <div className="rounded-card border border-warm-border/80 bg-white/65 p-6">
      <p className="font-sans text-caption leading-snug font-semibold uppercase tracking-[0.1em] text-brand-action">
        Studio hours
      </p>
      <p className="tracking-[-0.011em] font-sans text-pretty mt-2.5 text-body-sm font-semibold text-warm">{hint}</p>
      <table className="tracking-[-0.011em] font-sans text-pretty mt-4 w-full text-left text-body-sm text-warm-grey">
        <tbody>
          <tr className="border-t border-warm-border/80">
            <th scope="row" className="py-2.5 pr-4 font-semibold text-warm">
              Weekdays
            </th>
            <td className="py-2.5">{hours.weekday}</td>
          </tr>
          <tr className="border-t border-warm-border/80">
            <th scope="row" className="py-2.5 pr-4 font-semibold text-warm">
              Weekends
            </th>
            <td className="py-2.5">{hours.weekend}</td>
          </tr>
          <tr className="border-t border-warm-border/80">
            <th scope="row" className="py-2.5 pr-4 font-semibold text-warm">
              Poya &amp; holidays
            </th>
            <td className="py-2.5">{hours.poya}</td>
          </tr>
        </tbody>
      </table>
      <p className="mt-3.5 font-sans text-caption leading-snug text-warm-grey">
        Closed on Poya days and public holidays. Same weekday/weekend hours at
        both branches unless WhatsApp says otherwise.
      </p>
    </div>
  );
}
