"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navPrimary = [
  { label: "Beranda", href: "/" },
  { label: "Katalog", href: "/katalog" },
  { label: "Unit Usaha", href: "/unit-usaha" },
  { label: "Tentang", href: "/tentang" },
  { label: "Kontak", href: "/kontak" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur border-b border-ink/10">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/logo-kopaseba.jpeg"
            alt="Lambang Koperasi Indonesia"
            width={910}
            height={999}
            className="h-10 w-auto"
            priority
          />
          <span className="flex flex-col justify-center">
            <span className="font-serif text-xl font-semibold uppercase tracking-tight text-navy leading-none">
              Kopaseba
            </span>
            <span className="text-[10px] font-medium uppercase tracking-wider text-ink/45 mt-1">
              Koperasi Paru Sejahtera Bahagia
            </span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-ink/70">
          {navPrimary.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-navy transition">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/login"
            className="hidden sm:inline-block bg-navy text-paper text-sm font-medium px-5 py-2.5 rounded-full hover:bg-navy-dark transition"
          >
            Login
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
          {navPrimary.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-navy transition"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/admin/login"
            className="sm:hidden text-navy font-semibold hover:text-navy-dark transition"
            onClick={() => setOpen(false)}
          >
            Login
          </Link>
        </nav>
      )}
    </header>
  );
}
