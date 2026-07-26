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
  alt: "Trilha Civil PR — guia independente do concurso, com identidade visual escura e referência abstrata ao Paraná.",
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
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: path,
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
  if (path === "/") return siteConfig.url;

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
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Início",
        item: absoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: title,
        item: absoluteUrl(path),
      },
    ],
  };
}
