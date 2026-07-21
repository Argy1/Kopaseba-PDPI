import Link from "next/link";
import { kontak, nav } from "@/data/content";

export default function Footer() {
  return (
    <footer className="bg-navy-dark text-paper">
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-10">
        <div>
          <span className="font-serif text-xl font-semibold">Kopaseba</span>
          <p className="text-paper/60 text-sm mt-4 leading-relaxed">
            Koperasi Paru Sejahtera Bahagia — badan usaha milik Perhimpunan Dokter
            Paru Indonesia (PDPI).
          </p>
          <nav className="mt-6 flex flex-col gap-2 text-sm text-paper/60">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-paper transition w-fit">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="text-sm text-paper/70 leading-relaxed">
          <p className="text-paper font-medium mb-3">Sekretariat</p>
          <p>{kontak.alamat}</p>
        </div>
        <div className="text-sm text-paper/70 leading-relaxed">
          <p className="text-paper font-medium mb-3">Kontak</p>
          <p>{kontak.email}</p>
          <div className="flex gap-4 mt-5">
            <a
              href="#"
              className="w-9 h-9 rounded-full border border-paper/25 flex items-center justify-center hover:border-paper/60 transition text-xs"
            >
              IG
            </a>
            <a
              href="#"
              className="w-9 h-9 rounded-full border border-paper/25 flex items-center justify-center hover:border-paper/60 transition text-xs"
            >
              WA
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-paper/10 py-6 text-center text-xs text-paper/45">
        © {new Date().getFullYear()} Koperasi Paru Sejahtera Bahagia (KOPASEBA). Seluruh hak
        cipta dilindungi.
      </div>
    </footer>
  );
}
