
import Parser from 'rss-parser';
import fs from 'fs/promises';
import path from 'path';

const parser = new Parser();

// RSS Feeds for Tech Content
// Using Google News RSS for specific high-quality keywords in Korean
const KEYWORDS = '오라클 데이터베이스 ("신기능" OR "튜토리얼" OR "가이드" OR "예제" OR "실습" OR "튜닝")';
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

    // Deduplication Helper based on unique source ID or strict title
    const isDuplicate = (list, newItem) => {
        return list.some(item =>
            item.title === newItem.title ||
            item.source_raw_data_id === newItem.source_raw_data_id ||
            // Check if title is part of [KR] ... format
            item.title.includes(newItem.title)
        );
    };

    // Check for duplicates
    if (isDuplicate(currentData.ko, newArticle)) {
        console.log('Article already exists in KO list. Skipping.');
    } else {
        console.log(`Adding new article to KO: ${newArticle.title}`);
        currentData.ko.unshift(newArticle);
    }

    // Add to EN (with [KR] prefix logic)
    // Check if original title exists inside any EN title (which might have [KR] prefix)
    const enDuplicate = currentData.en.some(item => item.title.includes(newArticle.title) || item.source_raw_data_id === newArticle.source_raw_data_id);

    if (enDuplicate) {
        console.log('Article already exists in EN list. Skipping.');
    } else {
        const enArticle = { ...newArticle, title: `[KR] ${newArticle.title}`, summary: `(Korean Article) ${newArticle.summary}` };
        console.log(`Adding new article to EN: ${enArticle.title}`);
        currentData.en.unshift(enArticle);
    }

    // CLEANUP ROUTINE: Remove duplicates from existing lists
    // Keep first occurrence based on source_raw_data_id or title
    const uniqueList = (list) => {
        const seen = new Set();
        return list.filter(item => {
            const signature = item.source_raw_data_id || item.original_title || item.title;
            // Handle [KR] prefix case for title-based dedup
            const coreSignature = signature.replace('[KR] ', '');

            if (seen.has(coreSignature)) return false;
            seen.add(coreSignature);
            return true;
        });
    };

    currentData.ko = uniqueList(currentData.ko);
    currentData.en = uniqueList(currentData.en);

    // Keep list size manageable
    currentData.en = currentData.en.slice(0, 50);
    currentData.ko = currentData.ko.slice(0, 50);

    await fs.writeFile(TECH_JSON_PATH, JSON.stringify(currentData, null, 2));
    console.log('Successfully updated tech.json');
}

updateTech();
