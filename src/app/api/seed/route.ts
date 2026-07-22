import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { runSeed } from "@/lib/seed";

// Fallback untuk menjalankan seed awal database saat deploy pertama ke
// Hostinger, dipakai HANYA jika akses SSH/terminal tidak tersedia di paket
// hosting (lihat DEPLOYMENT.md). Dilindungi token via env var SEED_TOKEN.
// Aman dipanggil berulang kali — tiap tabel di-skip otomatis jika sudah
// terisi (lihat src/lib/seed.ts).
export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token");
  const expected = process.env.SEED_TOKEN;

  if (!expected) {
    return new NextResponse("SEED_TOKEN belum diset di environment variables.", { status: 503 });
  }
  if (!token || token !== expected) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const logs: string[] = [];
  try {
    await runSeed(prisma, (msg) => logs.push(msg));
    return NextResponse.json({ ok: true, logs });
  } catch (error) {
    return NextResponse.json(
      { ok: false, logs, error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
