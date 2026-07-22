import { prisma } from "@/lib/prisma";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ListEditor } from "@/components/admin/ListEditor";
import { TentangTextForm } from "@/components/admin/TentangTextForm";
import { SejarahEditor } from "@/components/admin/SejarahEditor";

export default async function AdminTentangPage() {
  const [fungsiPeran, sejarah, settings] = await Promise.all([
    prisma.listItem.findMany({ where: { section: "FUNGSI_PERAN" }, orderBy: { urutan: "asc" } }),
    prisma.sejarahTimeline.findMany({ orderBy: { urutan: "asc" } }),
    prisma.siteSettings.findUniqueOrThrow({ where: { id: 1 } }),
  ]);

  return (
    <div>
      <h1 className="font-serif text-2xl font-medium text-navy mb-1">Tentang</h1>
      <p className="text-sm text-muted-foreground mb-6">Sejarah, landasan, asas, tujuan, dan fungsi &amp; peran.</p>

      <Tabs defaultValue="sejarah">
        <TabsList>
          <TabsTrigger value="sejarah">Sejarah</TabsTrigger>
          <TabsTrigger value="teks">Landasan & Tujuan</TabsTrigger>
          <TabsTrigger value="fungsi">Fungsi & Peran</TabsTrigger>
        </TabsList>
        <TabsContent value="sejarah">
          <SejarahEditor items={sejarah} />
        </TabsContent>
        <TabsContent value="teks">
          <div className="max-w-lg">
            <TentangTextForm initial={settings} />
          </div>
        </TabsContent>
        <TabsContent value="fungsi">
          <ListEditor section="FUNGSI_PERAN" items={fungsiPeran} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
