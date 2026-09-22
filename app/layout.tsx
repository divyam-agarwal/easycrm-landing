import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const title = "EasyCRM — CRM for chemical, mineral & industrial distributors";
const description =
  "Quotations, grade specs, batch-linked orders and repeat-buyer follow-ups in one place. For industrial distributors handling tonnage, COAs and 90-day terms.";

export const metadata: Metadata = {
  metadataBase: new URL("https://crm.saatvikminchem.com"),
  title: { default: title, template: "%s — EasyCRM" },
  description,
  alternates: { canonical: "/" },
  keywords: [
    "chemical distributor CRM",
    "minerals trading software",
    "industrial distributor CRM",
    "manufacturing sales CRM",
    "quotation management",
    "B2B industrial CRM",
  ],
  openGraph: {
    title,
    description,
    url: "https://crm.saatvikminchem.com",
    siteName: "EasyCRM",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
