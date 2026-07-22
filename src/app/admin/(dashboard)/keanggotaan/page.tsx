import { prisma } from "@/lib/prisma";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ListEditor } from "@/components/admin/ListEditor";
import { FAQEditor } from "@/components/admin/FAQEditor";

export default async function AdminKeanggotaanPage() {
  const [syarat, hak, kewajiban, prosedur, faq] = await Promise.all([
    prisma.listItem.findMany({ where: { section: "SYARAT_ANGGOTA" }, orderBy: { urutan: "asc" } }),
    prisma.listItem.findMany({ where: { section: "HAK_ANGGOTA" }, orderBy: { urutan: "asc" } }),
    prisma.listItem.findMany({ where: { section: "KEWAJIBAN_ANGGOTA" }, orderBy: { urutan: "asc" } }),
    prisma.listItem.findMany({ where: { section: "PROSEDUR_PENDAFTARAN" }, orderBy: { urutan: "asc" } }),
    prisma.keanggotaanFAQ.findMany({ orderBy: { urutan: "asc" } }),
  ]);

  return (
    <div>
      <h1 className="font-serif text-2xl font-medium text-navy mb-1">Keanggotaan</h1>
      <p className="text-sm text-muted-foreground mb-6">Syarat, hak, kewajiban, prosedur pendaftaran, dan FAQ.</p>

      <Tabs defaultValue="syarat">
        <TabsList>
          <TabsTrigger value="syarat">Syarat</TabsTrigger>
          <TabsTrigger value="hak">Hak</TabsTrigger>
          <TabsTrigger value="kewajiban">Kewajiban</TabsTrigger>
          <TabsTrigger value="prosedur">Prosedur</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>
        <TabsContent value="syarat">
          <ListEditor section="SYARAT_ANGGOTA" items={syarat} />
        </TabsContent>
        <TabsContent value="hak">
          <ListEditor section="HAK_ANGGOTA" items={hak} />
        </TabsContent>
        <TabsContent value="kewajiban">
          <ListEditor section="KEWAJIBAN_ANGGOTA" items={kewajiban} />
        </TabsContent>
        <TabsContent value="prosedur">
          <ListEditor section="PROSEDUR_PENDAFTARAN" items={prosedur} />
        </TabsContent>
        <TabsContent value="faq">
          <FAQEditor items={faq} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
