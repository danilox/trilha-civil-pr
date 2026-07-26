import type { Metadata } from "next";
import "./globals.css";
import { JsonLd } from "@/components/seo/json-ld";
import { createWebsiteJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: siteConfig.titleTemplate,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  creator: siteConfig.name,
  category: "Informação",
  keywords: [
    "concurso Polícia Civil Paraná",
    "concurso PC-PR 2026",
    "edital PC-PR",
    "etapas concurso PC-PR",
    "TAF PC-PR",
  ],
  alternates: {
    canonical: "/",
    languages: {
      "pt-BR": "/",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    type: "website",
    locale: "pt_BR",
    siteName: siteConfig.name,
    url: "/",
    images: [
      {
        url: siteConfig.socialImage,
        width: 1200,
        height: 630,
        alt: "Trilha Civil PR — guia independente do concurso, com identidade visual escura e referência abstrata ao Paraná.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.socialImage],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
  },
  formatDetection: {
    address: false,
    email: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <JsonLd data={createWebsiteJsonLd()} />
        {children}
      </body>
    </html>
  );
}
