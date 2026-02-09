import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Code2 } from 'lucide-react';
import { Locale } from '@/i18n-config';

interface TechItem {
    id: string;
    title: string;
    slug: string;
    summary: string;
    category: string;
    tags: string[];
}

interface TechSectionProps {
    tech: TechItem[];
    lang: Locale;
}

export function TechSection({ tech, lang }: TechSectionProps) {
    const dict = {
        en: {
            title: 'Technical Resources',
            description: 'Deep dives into engineering challenges and solutions.',
            read_article: 'Read Article',
            view_all: 'View All Resources'
        },
        ko: {
            title: '기술 자료',
            description: '엔지니어링 챌린지와 솔루션에 대한 심층 분석.',
            read_article: '글 읽기',
            view_all: '전체 자료 보기'
        }
    };

    const t = dict[lang] || dict.en;

    return (
        <section className="py-16 relative">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div>
                        <h2 className="text-3xl font-bold text-foreground mb-4 flex items-center gap-2">
                            <Code2 className="h-8 w-8 text-primary" />
                            {t.title}
                        </h2>
                        <p className="text-muted-foreground max-w-2xl">
                            {t.description}
                        </p>
                    </div>
                    <Link href={`/${lang}/tech`}>
                        <Button variant="outline" className="gap-2 bg-transparent text-foreground border-foreground/20 hover:bg-foreground/10">
                            {t.view_all} <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tech.slice(0, 3).map((item) => (
                        <Link href={`/${lang}/tech/${item.slug}`} key={item.id} className="block group h-full">
                            <Card className="glass-card h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                <CardHeader>
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {item.tags.slice(0, 2).map(tag => (
                                            <span key={tag} className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                    <CardTitle className="group-hover:text-primary transition-colors text-foreground">
                                        {item.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="line-clamp-3 mb-4 text-muted-foreground">
                                        {item.summary}
                                    </CardDescription>
                                    <div className="flex items-center text-sm font-medium text-primary">
                                        {t.read_article} <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
