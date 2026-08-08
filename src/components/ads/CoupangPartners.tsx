import affiliateData from '@/data/affiliate.json';
import { ExternalLink } from 'lucide-react';

interface AffiliateItem {
    title: string;
    url: string;
    description?: string;
}

const items = affiliateData as AffiliateItem[];

// 쿠팡 파트너스 추천 상품 섹션.
// src/data/affiliate.json 에 항목을 추가하면 표시된다.
// 공정위 지침상 대가성 고지는 필수이므로 항상 함께 렌더링한다.
export function CoupangPartners({ lang }: { lang: string }) {
    if (items.length === 0) return null;

    const isKo = lang === 'ko';

    return (
        <div className="mt-8 p-6 bg-muted/30 rounded-lg border">
            <h2 className="text-lg font-bold text-secondary mb-4">
                {isKo ? '📚 함께 보면 좋은 추천 상품' : '📚 Recommended Products'}
            </h2>
            <ul className="space-y-3">
                {items.map((item) => (
                    <li key={item.url}>
                        <a
                            href={item.url}
                            target="_blank"
                            rel="sponsored nofollow noopener noreferrer"
                            className="group flex items-start gap-2 text-primary hover:underline"
                        >
                            <ExternalLink className="h-4 w-4 mt-1 shrink-0" />
                            <span>
                                <span className="font-medium">{item.title}</span>
                                {item.description && (
                                    <span className="block text-sm text-muted-foreground group-hover:no-underline">
                                        {item.description}
                                    </span>
                                )}
                            </span>
                        </a>
                    </li>
                ))}
            </ul>
            <p className="mt-4 text-xs text-muted-foreground">
                {isKo
                    ? '이 게시물은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.'
                    : 'This post contains affiliate links. As a Coupang Partners member, we earn a commission from qualifying purchases.'}
            </p>
        </div>
    );
}
