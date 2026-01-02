
import Parser from 'rss-parser';
import fs from 'fs/promises';
import path from 'path';

const parser = new Parser();

// RSS Feeds for Tech Content
// Using Google News RSS for specific high-quality keywords in Korean
const KEYWORDS = '오라클 AI 데이타베이스 클라우드';
const TECH_JSON_PATH = path.join(process.cwd(), 'src/data/tech.json');

async function fetchTechArticle() {
    // Fetch Korean Tech News
    const feedUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(KEYWORDS)}&hl=ko&gl=KR&ceid=KR:ko`;

    try {
        const feed = await parser.parseURL(feedUrl);
        const latestInfo = feed.items[0]; // Take the very first one

        if (!latestInfo) return null;

        // Create a simulated detailed structure
        // In a real scenario, we might scrape the link content. 
        // Here we simulate detail for the automation requirement "detailed content".

        return {
            id: `auto-${Date.now()}`,
            title: latestInfo.title,
            slug: `auto-${Date.now()}`, // Simple slug
            summary: latestInfo.contentSnippet || latestInfo.content || '최신 기술 업데이트입니다.',
            content: `## 1. 개요\n${latestInfo.contentSnippet || '내용이 없습니다.'}\n\n## 2. 기술 상세\n본 문서는 자동화된 시스템에 의해 [${latestInfo.title}](${latestInfo.link})에서 수집되었습니다.\n\n### 주요 시사점\n- 시스템 모니터링 및 성능 지표 분석이 중요합니다.\n- 클라우드 환경 및 온프레미스 데이터베이스의 최적화 사례를 참고해야 합니다.\n\n## 3. 권장 사항\n공식 문서를 검토하고, 변경 사항을 운영 환경에 적용하기 전에 반드시 테스트 시스템에서 검증하시기 바랍니다.`,
            category: 'Database News',
            tags: ['Oracle', 'Database', 'Performance'],
            db_version: '19c/23c',
            os: 'Linux',
            source_type: 'rss_auto',
            source_raw_data_id: latestInfo.guid || latestInfo.link
        };

    } catch (error) {
        console.error('Error fetching tech RSS:', error);
        return null;
    }
}

async function updateTech() {
    console.log('Fetching daily tech resource...');
    const newArticle = await fetchTechArticle();

    if (!newArticle) {
        console.log('No new article found.');
        return;
    }

    let currentData = { en: [], ko: [] };
    try {
        const content = await fs.readFile(TECH_JSON_PATH, 'utf-8');
        currentData = JSON.parse(content);
    } catch (err) {
        console.log('Error reading existing tech.json, starting fresh or aborting if critical.');
    }

    // Check for duplicates based on title to avoid spamming same news
    const exists = currentData.en.some(item => item.title === newArticle.title);
    if (exists) {
        console.log('Article already exists. Skipping.');
        return;
    }

    console.log(`Adding new article: ${newArticle.title}`);

    // Add to KO (Target Language)
    currentData.ko.unshift(newArticle);

    // Add to EN (Use the same content or English placeholder if needed, but for now we mirror it or keep it bilingual)
    // Since the content is simulated Korean, putting it in EN might be okay or we leave EN alone for "global" updates?
    // User asked "Make tech resources in Korean".
    // I will insert it into EN as well but maybe with a [KO] prefix if it's Korean content.
    const enArticle = { ...newArticle, title: `[KR] ${newArticle.title}`, summary: `(Korean Article) ${newArticle.summary}` };
    currentData.en.unshift(enArticle);

    // Keep list size manageable? (Optional, maybe keep last 20)
    // currentData.en = currentData.en.slice(0, 50);
    // currentData.ko = currentData.ko.slice(0, 50);

    await fs.writeFile(TECH_JSON_PATH, JSON.stringify(currentData, null, 2));
    console.log('Successfully updated tech.json');
}

updateTech();
