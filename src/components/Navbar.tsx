"use client";

import Link from "next/link";
import { useState } from "react";
import { nav } from "@/data/content";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur border-b border-ink/10">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <svg width="34" height="34" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="19" stroke="#14335C" strokeWidth="1.5" />
            <path
              d="M20 10c-4 3-6 7-6 11a6 6 0 0012 0c0-4-2-8-6-11z"
              stroke="#B8923F"
              strokeWidth="1.5"
              fill="none"
            />
            <path d="M20 21v9" stroke="#14335C" strokeWidth="1.5" />
          </svg>
          <span className="font-serif text-xl font-semibold tracking-tight text-navy">
            Kopaseba
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-ink/70">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-navy transition">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/keanggotaan"
            className="hidden sm:inline-block bg-navy text-paper text-sm font-medium px-5 py-2.5 rounded-full hover:bg-navy-dark transition"
          >
            Gabung Jadi Anggota
          </Link>
          <button
            aria-label="Buka menu"
            className="lg:hidden w-9 h-9 flex items-center justify-center border border-ink/15 rounded-full"
            onClick={() => setOpen(!open)}
          >
            <span className="text-lg">{open ? "×" : "≡"}</span>
          </button>
        </div>
      </div>

      {open && (
        <nav className="lg:hidden border-t border-ink/10 bg-paper px-6 py-4 flex flex-col gap-4 text-sm font-medium text-ink/70">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-navy transition"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
