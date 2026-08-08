import Link from 'next/link';
import Image from 'next/image';
import { Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/dictionary';

export async function Footer({ lang }: { lang: Locale }) {
    const dict = await getDictionary(lang);

    return (
        <footer className="bg-secondary text-secondary-foreground py-12">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="space-y-4">
                    <div className="flex items-center gap-2 font-bold text-2xl text-white">
                        <Image src="/logo.png" alt="DATASYS" width={180} height={50} className="h-12 w-auto brightness-0 invert" />
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        {dict.footer.description}
                    </p>
                </div>

                <div>
                    <h3 className="font-semibold text-lg mb-4 text-white">{dict.footer.services}</h3>
                    <ul className="space-y-2 text-slate-400">
                        <li><Link href="#" className="hover:text-white transition-colors">{dict.footer.links.data_analytics}</Link></li>
                        <li><Link href="#" className="hover:text-white transition-colors">{dict.footer.links.ai_infra}</Link></li>
                        <li><Link href="#" className="hover:text-white transition-colors">{dict.footer.links.cloud_migration}</Link></li>
                        <li><Link href="#" className="hover:text-white transition-colors">{dict.footer.links.security_audit}</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold text-lg mb-4 text-white">{dict.footer.company}</h3>
                    <ul className="space-y-2 text-slate-400">
                        <li><Link href="#" className="hover:text-white transition-colors">{dict.footer.links.about}</Link></li>
                        <li><Link href="#" className="hover:text-white transition-colors">{dict.footer.links.careers}</Link></li>
                        <li><Link href="#" className="hover:text-white transition-colors">{dict.footer.links.blog}</Link></li>
                        <li><Link href="#" className="hover:text-white transition-colors">{dict.footer.links.contact}</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold text-lg mb-4 text-white">{dict.footer.connect}</h3>
                    <p className="text-slate-400 mb-4 whitespace-pre-line">
                        {dict.footer.address}
                    </p>
                    <a href={`mailto:${dict.footer.email}`} className="text-primary hover:underline">{dict.footer.email}</a>
                </div>
            </div>
            <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-500 text-sm space-y-2">
                <div>
                    <Link href={`/${lang}/privacy`} className="hover:text-white transition-colors underline underline-offset-4">
                        {dict.footer.privacy}
                    </Link>
                </div>
                <div>© {new Date().getFullYear()} {dict.footer.copyright}</div>
            </div>
        </footer>
    );
}
