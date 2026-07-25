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
    <div className="rounded-card border border-warm-border/80 bg-white/58 p-5">
      <p className="text-caption font-semibold uppercase tracking-[0.14em] text-brand-action">
        Studio hours
      </p>
      <p className="mt-2 text-body-sm font-medium text-warm">{hint}</p>
      <table className="mt-4 w-full text-left text-body-sm text-warm-grey">
        <tbody>
          <tr className="border-t border-warm-border/70">
            <th scope="row" className="py-2.5 pr-4 font-medium text-warm">
              Weekdays
            </th>
            <td className="py-2.5">{hours.weekday}</td>
          </tr>
          <tr className="border-t border-warm-border/70">
            <th scope="row" className="py-2.5 pr-4 font-medium text-warm">
              Weekends
            </th>
            <td className="py-2.5">{hours.weekend}</td>
          </tr>
          <tr className="border-t border-warm-border/70">
            <th scope="row" className="py-2.5 pr-4 font-medium text-warm">
              Poya &amp; holidays
            </th>
            <td className="py-2.5">{hours.poya}</td>
          </tr>
        </tbody>
      </table>
      <p className="mt-3 text-caption text-warm-grey">
        Same hours at both branches unless WhatsApp says otherwise.
      </p>
    </div>
  );
}
