import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import KatalogImage from "@/components/KatalogImage";
import CTASection from "@/components/CTASection";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function getItem(slug: string) {
  const item = await prisma.katalogItem.findUnique({ where: { slug } });
  if (!item || !item.published) return null;
  return item;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = await getItem(slug);
  if (!item) return { title: "Katalog — Kopaseba" };
  return {
    title: `${item.nama} — Katalog Kopaseba`,
    description: item.ringkasan,
  };
}

export default async function KatalogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getItem(slug);
  if (!item) notFound();

  return (
    <>
      <section className="max-w-6xl mx-auto px-6 pt-12 pb-4">
        <Link href="/katalog" className="text-sm text-navy font-medium hover:underline">
          ← Kembali ke Katalog
        </Link>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <KatalogImage mediaId={item.imageMediaId} alt={item.nama} aspect="aspect-4/5" />

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-sky mb-3">
              {item.mitraNama ?? (item.kategori === "PRODUK_MITRA" ? "Produk Mitra" : "Layanan Unit Usaha")}
            </p>
            <h1 className="font-serif text-3xl font-medium text-navy mb-4">{item.nama}</h1>
            <p className="text-ink/70 leading-relaxed mb-6">{item.deskripsi}</p>

            <dl className="space-y-3 text-sm mb-8">
              {item.komposisi && (
                <div>
                  <dt className="text-ink/50 uppercase text-xs tracking-wide">Komposisi / Spesifikasi</dt>
                  <dd className="text-ink/80 mt-0.5">{item.komposisi}</dd>
                </div>
              )}
              {item.wilayahKetersediaan && (
                <div>
                  <dt className="text-ink/50 uppercase text-xs tracking-wide">Wilayah ketersediaan</dt>
                  <dd className="text-ink/80 mt-0.5">{item.wilayahKetersediaan}</dd>
                </div>
              )}
              {item.tampilkanHarga && item.harga && (
                <div>
                  <dt className="text-ink/50 uppercase text-xs tracking-wide">Harga</dt>
                  <dd className="text-gold-dark font-medium mt-0.5">
                    Rp {Number(item.harga).toLocaleString("id-ID")}
                  </dd>
                </div>
              )}
            </dl>

            <Link
              href="/kontak"
              className="inline-block bg-gold text-white px-7 py-3 rounded-full font-medium hover:bg-gold-dark transition"
            >
              Hubungi Kopaseba untuk info →
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Jelajahi lagi"
        title="Lihat item lain di Katalog Kopaseba."
        primary={{ label: "Lihat Katalog Lengkap", href: "/katalog" }}
        secondary={{ label: "Lihat Unit Usaha", href: "/unit-usaha" }}
      />
    </>
  );
}
