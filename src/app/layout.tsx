import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { ogBase, SITE_URL, profile } from "@/data/profile";

const description = profile.summary;

export const metadata: Metadata = {
  metadataBase: new URL(`${SITE_URL}/`),
  title: {
    default: `${profile.name} | ${profile.role}`,
    template: `${profile.name} | %s`,
  },
  description,
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: {
    ...ogBase,
    url: `${SITE_URL}/`,
    title: `${profile.name} | ${profile.role}`,
    description,
  },
  twitter: {
    card: "summary",
    title: `${profile.name} | ${profile.role}`,
    description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
