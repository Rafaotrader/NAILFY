import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nailfy - Gestão para Nail Designers",
  description: "O app de gestão para nail designers e manicures",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-[#0a0a0a] text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
