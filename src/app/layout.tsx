import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kopaseba — Koperasi Paru Sejahtera Bahagia",
  description:
    "Koperasi Paru Sejahtera Bahagia (KOPASEBA) — badan usaha milik Perhimpunan Dokter Paru Indonesia (PDPI), mewadahi kesejahteraan ekonomi dan sosial dokter spesialis paru se-Indonesia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
