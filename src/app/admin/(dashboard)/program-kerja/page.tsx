import { prisma } from "@/lib/prisma";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ListEditor } from "@/components/admin/ListEditor";
import { ProgramKerjaTextForm } from "@/components/admin/ProgramKerjaTextForm";

export default async function AdminProgramKerjaPage() {
  const [jangkaPendek, jangkaPanjang, skemaBagiHasil, settings] = await Promise.all([
    prisma.listItem.findMany({ where: { section: "PROGRAM_JANGKA_PENDEK" }, orderBy: { urutan: "asc" } }),
    prisma.listItem.findMany({ where: { section: "PROGRAM_JANGKA_PANJANG" }, orderBy: { urutan: "asc" } }),
    prisma.listItem.findMany({ where: { section: "PROGRAM_SKEMA_BAGI_HASIL_POIN" }, orderBy: { urutan: "asc" } }),
    prisma.siteSettings.findUniqueOrThrow({ where: { id: 1 } }),
  ]);

  return (
    <div>
      <h1 className="font-serif text-2xl font-medium text-navy mb-1">Program Kerja</h1>
      <p className="text-sm text-muted-foreground mb-6">Rencana jangka pendek, panjang, dan skema bagi hasil.</p>

      <Tabs defaultValue="pendek">
        <TabsList>
          <TabsTrigger value="pendek">Jangka Pendek</TabsTrigger>
          <TabsTrigger value="panjang">Jangka Panjang</TabsTrigger>
          <TabsTrigger value="skema">Skema Bagi Hasil</TabsTrigger>
          <TabsTrigger value="teks">Judul & Deskripsi</TabsTrigger>
        </TabsList>
        <TabsContent value="pendek">
          <ListEditor section="PROGRAM_JANGKA_PENDEK" items={jangkaPendek} />
        </TabsContent>
        <TabsContent value="panjang">
          <ListEditor section="PROGRAM_JANGKA_PANJANG" items={jangkaPanjang} />
        </TabsContent>
        <TabsContent value="skema">
          <ListEditor section="PROGRAM_SKEMA_BAGI_HASIL_POIN" items={skemaBagiHasil} />
        </TabsContent>
        <TabsContent value="teks">
          <div className="max-w-lg">
            <ProgramKerjaTextForm initial={settings} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
