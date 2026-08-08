# 수익화 설정 가이드 (AdSense + 쿠팡 파트너스)

이 사이트에는 Google AdSense 광고와 쿠팡 파트너스 제휴 링크 기능이 코드로 준비되어 있습니다.
**계정 발급과 환경변수 설정은 사이트 소유자가 직접 해야 하며**, 설정 전까지는 광고/제휴 관련 UI가 전혀 표시되지 않습니다 (심사나 사용자 경험에 영향 없음).

## 1. Google AdSense

### 1-1. 가입 및 심사

1. [Google AdSense](https://adsense.google.com)에 가입하고 사이트 도메인을 등록합니다.
2. 발급받은 클라이언트 ID(`ca-pub-XXXXXXXXXXXXXXXX`)를 환경변수에 설정합니다:

   ```bash
   NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX
   ```

3. 재빌드/배포하면 자동으로 적용됩니다:
   - 모든 페이지 `<head>`에 AdSense 스크립트 삽입 (`src/components/ads/AdSenseScript.tsx`)
   - `https://<도메인>/ads.txt` 자동 서빙 (`src/app/ads.txt/route.ts`) — 심사에 필요
4. AdSense 심사는 보통 수일~수주 소요됩니다. **콘텐츠가 충분히 쌓여 있고 개인정보처리방침 페이지가 있으면 통과율이 올라갑니다.**

### 1-2. 광고 단위 배치

심사 통과 후 AdSense 대시보드에서 "광고 단위"를 만들고 슬롯 ID(숫자)를 환경변수에 설정합니다:

```bash
NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE=1234567890   # 기술 문서 상세 페이지 하단
NEXT_PUBLIC_ADSENSE_SLOT_LIST=0987654321      # 기술 목록 / 뉴스 페이지 하단
```

현재 배치 위치:

| 위치 | 슬롯 환경변수 |
|---|---|
| 기술 문서 상세 (`/[lang]/tech/[slug]`) 본문 하단 | `NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE` |
| 기술 목록 (`/[lang]/tech`) 하단 | `NEXT_PUBLIC_ADSENSE_SLOT_LIST` |
| 뉴스 (`/[lang]/news`) 하단 | `NEXT_PUBLIC_ADSENSE_SLOT_LIST` |

배치를 추가하려면 원하는 페이지에 `<AdBanner slot={...} />`를 넣으면 됩니다.

## 2. 쿠팡 파트너스

1. [쿠팡 파트너스](https://partners.coupang.com)에 가입합니다 (승인 필요).
2. 파트너스 대시보드에서 상품 링크를 생성합니다.
3. `src/data/affiliate.json`에 항목을 추가합니다:

   ```json
   [
     {
       "title": "Oracle 데이터베이스 튜닝 가이드 (도서)",
       "url": "https://link.coupang.com/a/XXXXXX",
       "description": "DBA 실무자를 위한 튜닝 입문서"
     }
   ]
   ```

4. 재배포하면 기술 문서 상세 페이지 하단에 "추천 상품" 섹션이 표시됩니다.

**법적 필수 사항**: 공정거래위원회 지침에 따라 대가성 고지가 필수입니다.
`CoupangPartners` 컴포넌트가 "쿠팡 파트너스 활동의 일환으로 수수료를 제공받습니다" 문구를 항상 함께 표시하므로 별도 조치는 필요 없습니다. 이 문구를 제거하면 안 됩니다.

## 3. 현실적인 기대치

- AdSense 수익은 트래픽에 비례합니다. 대략 방문자 1,000명당 수천 원 수준이 일반적이므로, 의미 있는 수익을 내려면 검색 유입을 늘리는 것이 우선입니다 (SEO, 콘텐츠 품질).
- 쿠팡 파트너스는 클릭 후 24시간 내 구매 발생 시 약 3% 수수료를 받습니다. 콘텐츠와 관련성 높은 상품(기술 서적, 장비 등)을 연결할수록 전환율이 올라갑니다.
- AdSense 정책상 자기 광고 클릭, 클릭 유도 문구는 계정 정지 사유이므로 절대 금지입니다.
