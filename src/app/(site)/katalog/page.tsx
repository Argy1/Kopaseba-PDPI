import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import KatalogImage from "@/components/KatalogImage";
import CTASection from "@/components/CTASection";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/generated/prisma/client";

export const metadata: Metadata = {
  title: "Katalog — Kopaseba",
  description: "Katalog produk mitra kerja sama dan layanan unit usaha Koperasi Paru Sejahtera Bahagia.",
};

export const dynamic = "force-dynamic";

const kategoriTabs = [
  { value: undefined, label: "Semua" },
  { value: "PRODUK_MITRA", label: "Produk Mitra" },
  { value: "LAYANAN_UNIT_USAHA", label: "Layanan Unit Usaha" },
] as const;

export default async function KatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ kategori?: string; q?: string }>;
}) {
  const { kategori, q } = await searchParams;

  const where: Prisma.KatalogItemWhereInput = { published: true };
  if (kategori === "PRODUK_MITRA" || kategori === "LAYANAN_UNIT_USAHA") {
    where.kategori = kategori;
  }
  if (q) {
    where.OR = [
      { nama: { contains: q } },
      { mitraNama: { contains: q } },
      { ringkasan: { contains: q } },
    ];
  }

  const items = await prisma.katalogItem.findMany({
    where,
    orderBy: [{ kategori: "asc" }, { urutan: "asc" }],
  });

  function tabHref(value?: string) {
    const params = new URLSearchParams();
    if (value) params.set("kategori", value);
    if (q) params.set("q", q);
    const qs = params.toString();
    return qs ? `/katalog?${qs}` : "/katalog";
  }

  return (
    <>
      <PageHeader
        eyebrow="Katalog"
        title="Produk mitra & layanan unit usaha Kopaseba."
        description="Jelajahi produk co-marketing bersama mitra strategis dan layanan unit usaha koperasi."
      />

      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div className="flex gap-2">
            {kategoriTabs.map((tab) => {
              const isActive = (kategori ?? undefined) === tab.value;
              return (
                <Link
                  key={tab.label}
                  href={tabHref(tab.value)}
                  className={`text-sm px-4 py-2 rounded-full border transition ${
                    isActive
                      ? "bg-navy text-paper border-navy"
                      : "border-ink/15 text-ink/70 hover:border-navy hover:text-navy"
                  }`}
                >
                  {tab.label}
                </Link>
              );
            })}
          </div>

          <form action="/katalog" method="get" className="flex gap-2">
            {kategori && <input type="hidden" name="kategori" value={kategori} />}
            <input
              type="search"
              name="q"
              defaultValue={q ?? ""}
              placeholder="Cari produk atau layanan..."
              className="text-sm px-4 py-2 rounded-full border border-ink/15 focus:outline-none focus:border-navy w-56"
            />
          </form>
        </div>

        {items.length === 0 ? (
          <p className="text-ink/60 text-center py-16">Belum ada item yang cocok.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {items.map((item) => (
              <Link
                key={item.id}
                href={`/katalog/${item.slug}`}
                className="bg-white rounded-2xl border border-ink/10 overflow-hidden hover:border-navy/40 transition-colors"
              >
                <div className="p-4 pb-0">
                  <KatalogImage mediaId={item.imageMediaId} alt={item.nama} />
                </div>
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-wide text-sky mb-2">
                    {item.mitraNama ?? (item.kategori === "PRODUK_MITRA" ? "Produk Mitra" : "Layanan Unit Usaha")}
                  </p>
                  <h3 className="font-serif text-lg font-medium text-navy mb-2">{item.nama}</h3>
                  <p className="text-sm text-ink/65 leading-relaxed line-clamp-3">{item.ringkasan}</p>
                  {item.tampilkanHarga && item.harga && (
                    <p className="text-sm font-medium text-gold-dark mt-3">
                      Rp {Number(item.harga).toLocaleString("id-ID")}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <CTASection
        eyebrow="Selanjutnya"
        title="Ingin tahu lebih jauh soal unit usaha Kopaseba?"
        primary={{ label: "Lihat Unit Usaha", href: "/unit-usaha" }}
        secondary={{ label: "Hubungi Kopaseba", href: "/kontak" }}
      />
    </>
  );
}
