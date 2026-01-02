import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Newspaper } from 'lucide-react';
import { Locale } from '@/i18n-config';

interface NewsItem {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    link: string;
    category: string;
}

interface NewsSectionProps {
    news: NewsItem[];
    lang: Locale;
}

export function NewsSection({ news, lang }: NewsSectionProps) {
    const dict = {
        en: {
            title: 'Latest News',
            description: 'Stay updated with the latest industry trends and company announcements.',
            read_more: 'Read more',
            view_all: 'View All News'
        },
        ko: {
            title: '최신 뉴스',
            description: '최신 산업 트렌드와 회사 소식을 확인하세요.',
            read_more: '더 보기',
            view_all: '뉴스 전체보기'
        }
    };

    const t = dict[lang] || dict.en;

    return (
        <section className="container mx-auto px-4 py-16">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-secondary mb-4 flex items-center gap-2">
                        <Newspaper className="h-8 w-8 text-primary" />
                        {t.title}
                    </h2>
                    <p className="text-muted-foreground max-w-2xl">
                        {t.description}
                    </p>
                </div>
                <Link href={`/${lang}/news`}>
                    <Button variant="outline" className="gap-2">
                        {t.view_all} <ArrowRight className="h-4 w-4" />
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {news
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .slice(0, 3)
                    .map((item) => (
                        <Link href={item.link} key={item.id} target="_blank" rel="noopener noreferrer" className="block group h-full">
                            <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-t-4 border-t-transparent hover:border-t-primary">
                                <CardHeader>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full">
                                            {item.category}
                                        </span>
                                        <span className="text-xs text-muted-foreground">{item.date}</span>
                                    </div>
                                    <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                                        {item.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="line-clamp-3">
                                        {item.excerpt}
                                    </CardDescription>
                                    <div className="mt-4 flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                                        {t.read_more} <ArrowRight className="ml-1 h-3 w-3" />
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
            </div>
        </section>
    );
}
