import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Locale, i18n } from '@/i18n-config';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DATASYS | Intelligent Data Solutions",
  description: "Next-generation AI and data infrastructure for enterprise.",
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <html lang={lang} className="scroll-smooth">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Navbar lang={lang as Locale} />
          <main className="flex-1">
            {children}
          </main>
          <Footer lang={lang as Locale} />
        </div>
      </body>
    </html>
  );
}
