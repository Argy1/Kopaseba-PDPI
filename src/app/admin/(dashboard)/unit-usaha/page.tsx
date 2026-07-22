import { prisma } from "@/lib/prisma";
import { UnitUsahaPillarForm } from "@/components/admin/UnitUsahaPillarForm";

export default async function AdminUnitUsahaPage() {
  const pillars = await prisma.unitUsahaPillar.findMany({ orderBy: { urutan: "asc" } });

  return (
    <div>
      <h1 className="font-serif text-2xl font-medium text-navy mb-1">Unit Usaha</h1>
      <p className="text-sm text-muted-foreground mb-6">
        3 kartu pilar overview yang tampil di halaman /unit-usaha. Untuk produk & layanan detail, kelola di Katalog.
      </p>
      <div className="grid md:grid-cols-3 gap-4">
        {pillars.map((pillar) => (
          <UnitUsahaPillarForm key={pillar.id} pillar={pillar} />
        ))}
      </div>
    </div>
  );
}
