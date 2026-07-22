import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import MapEmbed from "@/components/MapEmbed";
import CTASection from "@/components/CTASection";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Kontak — Kopaseba",
  description: "Alamat sekretariat dan email resmi Koperasi Paru Sejahtera Bahagia.",
};

export const dynamic = "force-dynamic";

export default async function KontakPage() {
  const settings = await prisma.siteSettings.findUniqueOrThrow({ where: { id: 1 } });

  return (
    <>
      <PageHeader
        eyebrow="Kontak"
        title="Hubungi sekretariat Kopaseba."
        description="Sampaikan pertanyaan seputar keanggotaan, unit usaha, atau kerja sama melalui sekretariat."
      />

      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid sm:grid-cols-2 gap-8 mb-8">
          <div className="bg-sky-light rounded-2xl p-8">
            <h3 className="font-medium text-navy mb-2">Alamat sekretariat</h3>
            <p className="text-sm text-ink/70 leading-relaxed">{settings.kontakAlamat}</p>
          </div>
          <div className="bg-sky-light rounded-2xl p-8">
            <h3 className="font-medium text-navy mb-2">Email</h3>
            <a href={`mailto:${settings.kontakEmail}`} className="text-sm text-navy hover:underline">
              {settings.kontakEmail}
            </a>
          </div>
        </div>

        <MapEmbed src={settings.kontakMapEmbedUrl} />
      </section>

      <CTASection
        eyebrow="Langkah selanjutnya"
        title="Siap menjadi bagian dari Kopaseba?"
        primary={{ label: "Ajukan Keanggotaan", href: "/keanggotaan" }}
        secondary={{ label: "Lihat unit usaha & mitra", href: "/unit-usaha" }}
      />
    </>
  );
}
