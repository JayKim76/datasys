"use client";

import { NewsItem } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Modal } from '@/components/ui/modal';
import { useState } from 'react';
import { ArrowUpRight, Calendar, Tag } from 'lucide-react';
import { Locale } from '@/i18n-config';
import { Button } from '@/components/ui/button';

interface NewsListProps {
    news: NewsItem[];
    lang: Locale;
}

export function NewsList({ news, lang }: NewsListProps) {
    const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

    const t = {
        readMore: lang === 'ko' ? '기사 전문 읽기' : 'Read Full Article',
        close: lang === 'ko' ? '닫기' : 'Close',
    };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {news.map((item) => (
                    <Card
                        key={item.id}
                        className="hover:shadow-md transition-shadow cursor-pointer group"
                        onClick={() => setSelectedNews(item)}
                    >
                        <CardHeader>
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full">
                                    {item.category}
                                </span>
                                <span className="text-sm text-muted-foreground">{item.date}</span>
                            </div>
                            <CardTitle className="mb-2 leading-tight group-hover:text-primary transition-colors">
                                {item.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="line-clamp-3">
                                {item.excerpt}
                            </CardDescription>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Modal isOpen={!!selectedNews} onClose={() => setSelectedNews(null)}>
                {selectedNews && (
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                            <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {selectedNews.date}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1"><Tag className="h-3 w-3" /> {selectedNews.category}</span>
                        </div>

                        <h2 className="text-2xl font-bold text-foreground">
                            {selectedNews.title}
                        </h2>

                        <div className="text-muted-foreground leading-relaxed my-2">
                            {/* If excerpt is short, we might just show it. 
                  Ideally, fetch full content if available, but for now excerpt is all we have. */}
                            {selectedNews.excerpt}
                        </div>

                        <div className="flex justify-end pt-4 gap-2">
                            <Button variant="outline" onClick={() => setSelectedNews(null)}>
                                {t.close}
                            </Button>
                            {selectedNews.link && (
                                <a href={selectedNews.link} target="_blank" rel="noopener noreferrer">
                                    <Button className="gap-2">
                                        {t.readMore} <ArrowUpRight className="h-4 w-4" />
                                    </Button>
                                </a>
                            )}
                        </div>
                    </div>
                )}
            </Modal>
        </>
    );
}
