import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
};

const socialImage = {
  url: siteConfig.socialImage,
  width: 1200,
  height: 630,
  alt: "Edital no Controle — plataforma independente de guias visuais para concursos públicos.",
};

export function createPageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
}: PageMetadataOptions): Metadata {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: absoluteUrl(path),
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(path),
      siteName: siteConfig.name,
      locale: "pt_BR",
      type: "website",
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [siteConfig.socialImage],
    },
  };
}

export function absoluteUrl(path: string) {
  return new URL(path, siteConfig.url).toString();
}

export function createWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "pt-BR",
    isAccessibleForFree: true,
  };
}

export function createWebPageJsonLd(title: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: absoluteUrl(path),
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    inLanguage: "pt-BR",
  };
}

export function createBreadcrumbJsonLd(title: string, path: string) {
  const labels: Record<string, string> = {
    concursos: "Concursos",
    "pc-pr-2026": "PC-PR 2026",
    "pm-sp": "PM-SP",
    "pc-rs": "PC-RS",
  };
  const segments = path.split("/").filter(Boolean);
  const items = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Início",
      item: absoluteUrl("/"),
    },
    ...segments.map((segment, index) => {
      const segmentPath = `/${segments.slice(0, index + 1).join("/")}`;
      return {
        "@type": "ListItem",
        position: index + 2,
        name: index === segments.length - 1 ? title : labels[segment] || segment,
        item: absoluteUrl(segmentPath),
      };
    }),
  ];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
}
