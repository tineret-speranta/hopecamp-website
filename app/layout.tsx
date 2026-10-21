import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "sonner";
import { AuthProvider } from "@/contexts/auth-context";

import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  // Inscrierile nu sunt deschise inca - titlul generic pana la urmatoarea editie
  // title: `${title}: ${editionName} - Tineret Speranta Oradea`,
  title: "Hope Camp - Tineret Speranta Oradea",
  description:
    "Tabăra de vară de la Tineret Speranta Oradea pentru tineri creștini care caută să își întărească relațiile cu Dumnezeu și cu cei din jur",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {children}
          <Toaster richColors position="top-center" />
        </AuthProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
