export interface NewsItem {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    category: string;
    link?: string;
}

import techData from '@/data/tech.json';

export interface TechResource {
    id: string;
    title: string;
    slug: string;
    summary: string;
    content: string;
    category: '장애사례' | '성능튜닝' | '백업복구' | 'RAC/HA' | '점검리포트' | '기타';
    tags: string[];
    db_version: string;
    os: string;
    source_type: 'manual' | 'ai';
    source_raw_data_id: string;
    lastUpdated?: string; // Optional if not in JSON
    version?: string; // Optional if not in JSON
    type?: string; // Optional or mapped from category
}

import newsData from '@/data/news.json';

export const getNews = async (locale: string) => {
    // Type assertion to ensure type safety if needed, or rely on TS inference from JSON
    const data = newsData as Record<string, NewsItem[]>;
    const items = data[locale] || data['en'];

    return items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getTechResources = async (locale: string) => {
    const data = techData as Record<string, TechResource[]>;
    return data[locale] || data['en'];
};
