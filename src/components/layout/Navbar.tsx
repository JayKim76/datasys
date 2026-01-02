import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/dictionary';
import { NavbarContactBtn } from '@/components/layout/NavbarContactBtn';

export async function Navbar({ lang }: { lang: Locale }) {
    const dict = await getDictionary(lang);

    return (
        <nav className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href={`/${lang}`} className="flex items-center gap-2 font-bold text-2xl text-primary">
                    <Image src="/logo.png" alt="DATASYS" width={180} height={50} priority className="h-10 w-auto" />
                </Link>

                <div className="hidden md:flex items-center gap-8 font-medium text-muted-foreground">
                    <Link href={`/${lang}`} className="hover:text-primary transition-colors">{dict.nav.home}</Link>
                    <Link href={`/${lang}/#services`} className="hover:text-primary transition-colors">{dict.nav.services}</Link>
                    <Link href={`/${lang}/#clients`} className="hover:text-primary transition-colors">{dict.nav.clients}</Link>
                    <Link href={`/${lang}/news`} className="hover:text-primary transition-colors">{dict.nav.news}</Link>
                    <Link href={`/${lang}/tech`} className="hover:text-primary transition-colors">{dict.nav.tech}</Link>
                </div>

                <div className="hidden md:flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm font-medium">
                        <Link href="/en" className={cn("hover:text-primary", lang === 'en' ? 'text-primary' : 'text-muted-foreground')}>EN</Link>
                        <span className="text-muted-foreground">/</span>
                        <Link href="/ko" className={cn("hover:text-primary", lang === 'ko' ? 'text-primary' : 'text-muted-foreground')}>KO</Link>
                    </div>
                    <NavbarContactBtn text={dict.nav.contact} lang={lang} />
                </div>
            </div>
        </nav>
    );
}
