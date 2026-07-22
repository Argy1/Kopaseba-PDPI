import Link from "next/link";
import { Package, Users, FileText, Building2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AdminDashboardPage() {
  const [katalogCount, katalogPublished, pengurusCount, legalitasCount, unitUsahaCount] = await Promise.all([
    prisma.katalogItem.count(),
    prisma.katalogItem.count({ where: { published: true } }),
    prisma.pengurus.count(),
    prisma.legalitasDoc.count(),
    prisma.unitUsahaPillar.count(),
  ]);

  const cards = [
    {
      href: "/admin/katalog",
      label: "Katalog",
      value: katalogCount,
      hint: `${katalogPublished} tayang publik`,
      icon: Package,
    },
    { href: "/admin/pengurus", label: "Pengurus", value: pengurusCount, hint: "seluruh kategori", icon: Users },
    {
      href: "/admin/unit-usaha",
      label: "Unit Usaha",
      value: unitUsahaCount,
      hint: "kartu pilar",
      icon: Building2,
    },
    { href: "/admin/legalitas", label: "Legalitas", value: legalitasCount, hint: "dokumen", icon: FileText },
  ];

  return (
    <div>
      <h1 className="font-serif text-2xl font-medium text-navy mb-1">Ringkasan</h1>
      <p className="text-sm text-muted-foreground mb-6">Gambaran singkat konten yang dikelola di situs.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Link key={card.href} href={card.href}>
            <Card className="hover:border-primary/40 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{card.label}</CardTitle>
                <card.icon className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-serif text-navy">{card.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{card.hint}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
