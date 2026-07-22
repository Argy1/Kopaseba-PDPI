import { prisma } from "@/lib/prisma";
import { KontakForm } from "@/components/admin/KontakForm";

export default async function AdminKontakPage() {
  const settings = await prisma.siteSettings.findUniqueOrThrow({ where: { id: 1 } });

  return (
    <div className="max-w-xl">
      <h1 className="font-serif text-2xl font-medium text-navy mb-1">Kontak</h1>
      <p className="text-sm text-muted-foreground mb-6">Alamat, email, dan peta lokasi sekretariat.</p>
      <KontakForm
        initial={{
          kontakAlamat: settings.kontakAlamat,
          kontakEmail: settings.kontakEmail,
          kontakMapEmbedUrl: settings.kontakMapEmbedUrl,
        }}
      />
    </div>
  );
}
