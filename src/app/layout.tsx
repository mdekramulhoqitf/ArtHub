import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ArtHub — Buy & Sell Original Art",
    template: "%s | ArtHub",
  },
  description:
    "Discover and collect original artworks from independent artists worldwide. Open your shop and sell your art to a global audience.",
  keywords: ["art", "marketplace", "buy art", "sell art", "original artwork", "paintings", "sculptures"],
  openGraph: {
    title: "ArtHub — Buy & Sell Original Art",
    description: "Discover and collect original artworks from independent artists worldwide.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
