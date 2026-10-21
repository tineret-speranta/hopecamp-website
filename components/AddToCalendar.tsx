"use client";

import { upcomingEditions } from "@/lib/constants";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Edition = (typeof upcomingEditions)[number];

// Format YYYYMMDD pentru evenimente de o zi intreaga
const toCalendarDate = (date: Date): string =>
  `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;

// In calendare, data de final a unui eveniment de o zi intreaga este exclusiva
const dayAfter = (date: Date): Date => {
  const next = new Date(date);
  next.setDate(next.getDate() + 1);
  return next;
};

const getEventDetails = (edition: Edition) => ({
  title: `${edition.name} #${edition.number}`,
  location: `${edition.location.name}, ${edition.location.addressLine}`,
  description: "Tabăra Tineret Speranța Oradea - hopecamp.ro",
  start: toCalendarDate(edition.startDate),
  end: toCalendarDate(dayAfter(edition.endDate)),
});

const openGoogleCalendar = (edition: Edition) => {
  const event = getEventDetails(edition);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${event.start}/${event.end}`,
    location: event.location,
    details: event.description,
  });
  window.open(`https://calendar.google.com/calendar/render?${params}`, "_blank", "noopener,noreferrer");
};

// Descarca un fisier .ics (Apple Calendar, Outlook etc.)
const downloadIcs = (edition: Edition) => {
  const event = getEventDetails(edition);
  const escape = (text: string) => text.replace(/[\\,;]/g, (c) => `\\${c}`);
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Tineret Speranta Oradea//Hope Camp//RO",
    "BEGIN:VEVENT",
    `UID:${event.start}-${edition.name.replace(/\s+/g, "-").toLowerCase()}@hopecamp.ro`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
    `DTSTART;VALUE=DATE:${event.start}`,
    `DTEND;VALUE=DATE:${event.end}`,
    `SUMMARY:${escape(event.title)}`,
    `LOCATION:${escape(event.location)}`,
    `DESCRIPTION:${escape(event.description)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = `${event.title.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}.ics`;
  link.click();
  URL.revokeObjectURL(url);
};

// Iconita mini calendar cu plus
const CalendarPlusIcon = ({ className }: { className: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11v6m-3-3h6" />
  </svg>
);

export default function AddToCalendar({ edition }: { edition: Edition }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#FFD600]/20 text-[#1a1a1a] text-[11px] font-semibold hover:bg-[#FFD600]/40 transition-colors">
        <CalendarPlusIcon className="w-3.5 h-3.5" />
        Adaugă în calendar
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem onSelect={() => openGoogleCalendar(edition)}>Google Calendar</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => downloadIcs(edition)}>Apple Calendar / Outlook</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
