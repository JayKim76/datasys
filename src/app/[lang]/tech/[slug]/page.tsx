import { getTechResources } from '@/lib/data';
import { Locale } from '@/i18n-config';
import { notFound } from 'next/navigation';
import { Badge } from 'lucide-react'; // Placeholder only, using text badges
import { Button } from '@/components/ui/button';
import { AdBanner } from '@/components/ads/AdBanner';
import { CoupangPartners } from '@/components/ads/CoupangPartners';
import Link from 'next/link';

export async function generateStaticParams() {
    // Generate params for known slugs in both languages
    // Simple implementation: fetch all and map
    // Ideally we filter by lang but generateStaticParams expects generic params
    const enResources = await getTechResources('en');
    const koResources = await getTechResources('ko');

    // We need to return an array of { lang, slug }
    const enParams = enResources.map(r => ({ lang: 'en', slug: r.slug }));
    const koParams = koResources.map(r => ({ lang: 'ko', slug: r.slug }));

    return [...enParams, ...koParams];
}

export default async function TechDetailPage({
    params
}: {
    params: Promise<{ lang: string; slug: string }>
}) {
    const { lang, slug } = await params;
    const resources = await getTechResources(lang);
    const resource = resources.find(r => r.slug === slug);

    if (!resource) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            <div className="mb-8">
                <Link href={`/${lang}/tech`} className="text-sm text-muted-foreground hover:text-primary mb-4 block">
                    &larr; {lang === 'ko' ? '목록으로 돌아가기' : 'Back to List'}
                </Link>

                <div className="flex items-center gap-2 mb-4 text-sm">
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded-full font-semibold">
                        {resource.category}
                    </span>
                    <span className="text-muted-foreground">|</span>
                    <span className="text-muted-foreground">{resource.db_version}</span>
                    <span className="text-muted-foreground">|</span>
                    <span className="text-muted-foreground">{resource.os}</span>
                </div>

                <h1 className="text-4xl font-bold text-secondary mb-4">{resource.title}</h1>
                <p className="text-xl text-muted-foreground border-l-4 border-primary pl-4 py-2 bg-muted/30">
                    {resource.summary}
                </p>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none bg-background p-8 rounded-lg shadow-sm border">
                {/* 
                  Security Note: Using slightly dangerous dangerouslySetInnerHTML if content is trusted HTML.
                  Since this is internal/mock data, it's fine. For Markdown, we'd need a parser.
                  For now, assuming content is just plain text or simple markdown-like text we render as PRE or just text.
                  Let's split by newline to simulate paragraphs for simple rendering without a heavy markdown lib.
                */}
                {resource.content.split('\n').map((paragraph, idx) => (
                    <p key={idx} className="mb-4 whitespace-pre-line">
                        {paragraph}
                    </p>
                ))}
            </div>

            <AdBanner
                slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE}
                className="mt-8"
            />

            <CoupangPartners lang={lang} />

            <div className="mt-8 pt-8 border-t flex flex-wrap gap-2">
                {resource.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-muted rounded-full text-sm text-muted-foreground">
                        #{tag}
                    </span>
                ))}
            </div>

            <div className="mt-4 text-xs text-muted-foreground text-right">
                Source: {resource.source_type} {resource.source_raw_data_id && `(${resource.source_raw_data_id})`}
            </div>
        </div>
    );
}
