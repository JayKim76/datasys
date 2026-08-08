import { getNews } from '@/lib/data';
import { Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/dictionary';
import { NewsList } from '@/components/news/NewsList';
import { AdBanner } from '@/components/ads/AdBanner';
// I'll use a simple span for category.

export default async function NewsPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);
    const newsData = await getNews(lang);

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="mb-12">
                <h1 className="text-4xl font-bold text-secondary mb-4">{dict.nav.news}</h1>
                <p className="text-muted-foreground">
                    {lang === 'ko' ? 'AI 콘텐츠 엔진이 큐레이션한 최신 업데이트 및 뉴스입니다.' : 'Updates, insights, and announcements curated by our AI content engine.'}
                </p>
            </div>

            <NewsList news={newsData} lang={lang as Locale} />

            <AdBanner
                slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_LIST}
                className="mt-12"
            />
        </div>
    );
}
