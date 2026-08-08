import { getTechResources } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/dictionary';
import { FileText, Database, Settings, Shield, Activity, Wrench, MoreHorizontal } from 'lucide-react';
import { AdBanner } from '@/components/ads/AdBanner';
import Link from 'next/link';

const getCategoryIcon = (category: string) => {
    switch (category) {
        case 'RAC/HA': return <Activity className="h-8 w-8 text-primary" />;
        case '백업복구': return <Shield className="h-8 w-8 text-primary" />;
        case '성능튜닝': return <Settings className="h-8 w-8 text-primary" />;
        case '장애사례': return <Wrench className="h-8 w-8 text-primary" />;
        case '점검리포트': return <FileText className="h-8 w-8 text-primary" />;
        default: return <Database className="h-8 w-8 text-primary" />;
    }
};

export default async function TechPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);
    const resources = await getTechResources(lang);

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="mb-12">
                <h1 className="text-4xl font-bold text-secondary mb-4">{dict.nav.tech}</h1>
                <p className="text-muted-foreground">
                    {lang === 'ko' ? '데이터베이스 전문가를 위한 기술 문서 및 튜닝 가이드입니다.' : 'Technical documentation and tuning guides for database professionals.'}
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {resources.map((resource) => (
                    <Card key={resource.id} className="hover:shadow-md transition-shadow">
                        <CardHeader>
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full">
                                        {resource.category}
                                    </span>
                                    <span className="text-xs text-muted-foreground border px-2 py-1 rounded-full">
                                        {resource.db_version}
                                    </span>
                                </div>
                                <span className={`text-xs px-2 py-0.5 rounded ${resource.source_type === 'ai' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}>
                                    {resource.source_type}
                                </span>
                            </div>
                            <div className="flex items-center gap-4 mt-2">
                                {getCategoryIcon(resource.category)}
                                <div>
                                    <CardTitle className="leading-tight mb-1">
                                        <Link href={`/${lang}/tech/${resource.slug}`} className="hover:underline">
                                            {resource.title}
                                        </Link>
                                    </CardTitle>
                                    <CardDescription>{resource.summary}</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardFooter className="flex justify-between items-center border-t pt-4 bg-muted/5">
                            <div className="flex gap-2">
                                {resource.tags.map(tag => (
                                    <span key={tag} className="text-xs text-muted-foreground bg-background px-2 py-1 rounded border">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                            <Link href={`/${lang}/tech/${resource.slug}`}>
                                <Button variant="ghost" size="sm">
                                    {lang === 'ko' ? '자세히 보기' : 'View Details'}
                                </Button>
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            <AdBanner
                slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_LIST}
                className="mt-12"
            />
        </div>
    );
}
