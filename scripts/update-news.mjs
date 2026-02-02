import Parser from 'rss-parser';
import fs from 'fs/promises';
import path from 'path';

const parser = new Parser();

const EN_KEYWORDS = 'Oracle AI "Market" OR "Business" OR "Stock" OR "Trend"';
const KO_KEYWORDS = '오라클 AI "시장" OR "사업" OR "주식" OR "동향" OR "전망"';
const NEWS_JSON_PATH = path.join(process.cwd(), 'src/data/news.json');

async function fetchNews(lang, gl, hl, keywords) {
    const feedUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(keywords)}&hl=${hl}&gl=${gl}&ceid=${gl}:${hl}`;
    try {
        const feed = await parser.parseURL(feedUrl);
        return feed.items.slice(0, 6).map((item, index) => ({ // Take top 6
            id: `${lang}-${Date.now()}-${index}`,
            title: item.title,
            excerpt: item.contentSnippet || item.content || 'Click to read more...',
            date: new Date(item.pubDate).toISOString().split('T')[0],
            link: item.link,
            category: 'Industry News' // Default category for automated news
        }));
    } catch (error) {
        console.error(`Error fetching ${lang} news:`, error);
        return [];
    }
}

async function updateNews() {
    console.log('Fetching news...');

    // Fetch English News (US)
    const enNews = await fetchNews('en', 'US', 'en-US', EN_KEYWORDS);
    console.log(`Fetched ${enNews.length} English articles.`);

    // Fetch Korean News (KR)
    const koNews = await fetchNews('ko', 'KR', 'ko', KO_KEYWORDS);
    console.log(`Fetched ${koNews.length} Korean articles.`);

    // Read existing data first to enable accumulation and proper filtering
    let existingData = { en: [], ko: [] };
    try {
        const fileContent = await fs.readFile(NEWS_JSON_PATH, 'utf-8');
        existingData = JSON.parse(fileContent);
    } catch (e) {
        // ignore if file doesn't exist
    }

    // Helper to merge, filter by date (1 month retention), and sort
    const processNews = (newItems, oldItems) => {
        // 1. Merge: Create a map by link/id to deduplicate
        const itemMap = new Map();

        // Add old items first
        oldItems.forEach(item => itemMap.set(item.title, item));
        // Overwrite/Add new items (fresh details prefered)
        newItems.forEach(item => itemMap.set(item.title, item));

        // 2. Filter: Retention Policy (1 Month)
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        const cutoffDate = oneMonthAgo.toISOString().split('T')[0];

        const filteredItems = Array.from(itemMap.values()).filter(item => {
            return item.date >= cutoffDate;
        });

        // 3. Sort: Newest first
        return filteredItems.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    };

    const finalData = {
        en: processNews(enNews, existingData.en),
        ko: processNews(koNews, existingData.ko)
    };

    // Safety check: if fetch completely failed (empty), we might have stale data from existing.
    // The merge logic handles this (newItems empty -> returns filtered oldItems).

    await fs.writeFile(NEWS_JSON_PATH, JSON.stringify(finalData, null, 2));
    console.log(`Updated news.json successfully. Retention applied. Total items - EN: ${finalData.en.length}, KO: ${finalData.ko.length}`);
}

updateNews();
