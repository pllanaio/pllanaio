import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://pllana.io"),
  title: {
    default: "Leon Pllana IT-Solutions | Innovation in every Step.",
    template: "%s | Leon Pllana IT-Solutions"
  },
  description:
    "Strategischer Digitalisierungspartner für Unternehmen: Prozessanalyse, IT-Strategie, Cloud, Cyber Security, Automatisierung, KI und nachhaltige digitale Unternehmensentwicklung.",
  keywords: [
    "Digitalisierung", "IT-Strategie", "Prozessoptimierung", "Automatisierung", "Microsoft 365", "Cloud", "Cyber Security", "KI im Unternehmen"
  ],
  openGraph: {
    title: "Leon Pllana IT-Solutions | Innovation in every Step.",
    description: "Technologie folgt dem Prozess. Wir entwickeln Unternehmen nachhaltig weiter.",
    url: "https://pllana.io",
    siteName: "Leon Pllana IT-Solutions",
    locale: "de_DE",
    type: "website"
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body className={`${inter.variable} noise font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
