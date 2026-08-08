import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy | DATASYS',
    description: 'DATASYS privacy policy — how we collect, use, and protect your personal information.',
};

interface Section {
    heading: string;
    body: string[];
}

// 사이트가 실제로 처리하는 정보 기준으로 작성:
// 문의 폼(이름/이메일/전화번호/내용) 저장 및 이메일 전송, Google AdSense 쿠키, 쿠팡 파트너스 링크.
// 수집 항목이나 처리 방식이 바뀌면 이 문서도 함께 갱신해야 한다.
const CONTENT: Record<string, { title: string; effective: string; intro: string; sections: Section[] }> = {
    ko: {
        title: '개인정보처리방침',
        effective: '시행일: 2026년 8월 8일',
        intro:
            'DATASYS(이하 "회사")는 「개인정보 보호법」 등 관련 법령을 준수하며, 이용자의 개인정보를 보호하기 위해 다음과 같이 개인정보처리방침을 수립·공개합니다.',
        sections: [
            {
                heading: '1. 수집하는 개인정보의 항목 및 방법',
                body: [
                    '회사는 웹사이트의 "문의하기" 기능을 통해 다음 정보를 수집합니다.',
                    '· 필수 항목: 이름, 이메일 주소, 문의 내용',
                    '· 선택 항목: 전화번호',
                    '수집 방법: 이용자가 문의 폼에 직접 입력하여 제출하는 방식으로 수집됩니다.',
                ],
            },
            {
                heading: '2. 개인정보의 수집 및 이용 목적',
                body: [
                    '수집한 개인정보는 다음 목적으로만 이용됩니다.',
                    '· 문의 사항에 대한 확인, 답변 및 상담 처리',
                    '· 서비스 관련 안내 및 커뮤니케이션',
                ],
            },
            {
                heading: '3. 개인정보의 보유 및 이용 기간',
                body: [
                    '문의 처리 목적이 달성된 후에는 지체 없이 파기하는 것을 원칙으로 합니다. 다만, 소비자 불만 또는 분쟁 처리에 관한 기록은 관련 법령(전자상거래 등에서의 소비자보호에 관한 법률)에 따라 3년간 보관할 수 있습니다.',
                ],
            },
            {
                heading: '4. 개인정보의 제3자 제공',
                body: [
                    '회사는 이용자의 개인정보를 원칙적으로 제3자에게 제공하지 않습니다. 다만, 이용자가 사전에 동의한 경우 또는 법령에 의해 요구되는 경우는 예외로 합니다.',
                ],
            },
            {
                heading: '5. 개인정보 처리의 위탁',
                body: [
                    '회사는 서비스 운영을 위해 문의 내용의 이메일 전송에 이메일 발송 서비스(SMTP)를 이용할 수 있습니다. 위탁 시 관련 법령에 따라 개인정보가 안전하게 관리되도록 필요한 조치를 취합니다.',
                ],
            },
            {
                heading: '6. 쿠키(Cookie) 및 온라인 맞춤형 광고',
                body: [
                    '본 웹사이트는 Google AdSense를 통해 광고를 게재할 수 있습니다. Google을 포함한 제3자 광고 사업자는 쿠키를 사용하여 이용자의 본 웹사이트 및 다른 웹사이트 방문 기록을 기반으로 맞춤형 광고를 게재할 수 있습니다.',
                    '이용자는 Google 광고 설정(https://adssettings.google.com)에서 맞춤형 광고를 비활성화할 수 있으며, 브라우저 설정을 통해 쿠키 저장을 거부할 수 있습니다. 쿠키 저장을 거부할 경우 일부 서비스 이용에 제한이 있을 수 있습니다.',
                    'Google의 광고 관련 데이터 처리에 대한 자세한 내용은 Google 광고 정책(https://policies.google.com/technologies/ads)을 참고하시기 바랍니다.',
                ],
            },
            {
                heading: '7. 제휴 링크 안내',
                body: [
                    '본 웹사이트의 일부 게시물에는 쿠팡 파트너스 등 제휴 마케팅 링크가 포함될 수 있으며, 해당 링크를 통한 구매 발생 시 회사가 일정액의 수수료를 제공받을 수 있습니다. 제휴 링크 클릭 시 해당 외부 사이트의 개인정보처리방침이 적용됩니다.',
                ],
            },
            {
                heading: '8. 이용자의 권리와 행사 방법',
                body: [
                    '이용자는 언제든지 자신의 개인정보에 대한 열람, 정정, 삭제, 처리정지를 요구할 수 있습니다. 권리 행사는 아래 개인정보 보호책임자에게 이메일로 요청하실 수 있으며, 회사는 지체 없이 조치합니다.',
                ],
            },
            {
                heading: '9. 개인정보의 파기 절차 및 방법',
                body: [
                    '보유 기간이 경과하거나 처리 목적이 달성된 개인정보는 재생이 불가능한 방법으로 지체 없이 파기합니다. 전자적 파일 형태의 정보는 복구할 수 없는 기술적 방법으로 삭제합니다.',
                ],
            },
            {
                heading: '10. 개인정보 보호책임자',
                body: [
                    '개인정보 처리에 관한 문의, 불만 처리, 피해 구제 등은 아래로 연락 주시기 바랍니다.',
                    '· 이메일: datasys@datasys.co.kr',
                    '· 주소: 서울특별시 강서구 마곡중앙1로 14, M밸리 W TOWER Ⅳ 8층 801호',
                ],
            },
            {
                heading: '11. 개인정보처리방침의 변경',
                body: [
                    '이 개인정보처리방침은 법령, 정책 또는 서비스 변경에 따라 개정될 수 있으며, 개정 시 웹사이트를 통해 공지합니다.',
                ],
            },
        ],
    },
    en: {
        title: 'Privacy Policy',
        effective: 'Effective date: August 8, 2026',
        intro:
            'DATASYS ("the Company") complies with applicable privacy laws, including the Personal Information Protection Act of Korea, and has established this Privacy Policy to protect the personal information of its users.',
        sections: [
            {
                heading: '1. Information We Collect',
                body: [
                    'The Company collects the following information through the "Contact Us" feature on this website.',
                    '· Required: name, email address, message',
                    '· Optional: phone number',
                    'Collection method: information is provided directly by the user when submitting the contact form.',
                ],
            },
            {
                heading: '2. Purpose of Collection and Use',
                body: [
                    'Collected personal information is used solely for the following purposes:',
                    '· Reviewing and responding to inquiries',
                    '· Service-related communication',
                ],
            },
            {
                heading: '3. Retention Period',
                body: [
                    'Personal information is destroyed without delay once the purpose of the inquiry has been fulfilled. However, records related to consumer complaints or dispute resolution may be retained for 3 years in accordance with applicable law.',
                ],
            },
            {
                heading: '4. Disclosure to Third Parties',
                body: [
                    'The Company does not provide personal information to third parties, except with the prior consent of the user or where required by law.',
                ],
            },
            {
                heading: '5. Outsourcing of Processing',
                body: [
                    'The Company may use an email delivery service (SMTP) to forward inquiry contents. When outsourcing, the Company takes necessary measures to ensure personal information is managed securely in accordance with applicable law.',
                ],
            },
            {
                heading: '6. Cookies and Personalized Advertising',
                body: [
                    'This website may display advertisements through Google AdSense. Third-party vendors, including Google, use cookies to serve ads based on your prior visits to this website or other websites.',
                    'You may opt out of personalized advertising by visiting Google Ads Settings (https://adssettings.google.com), and you may refuse cookies through your browser settings. Refusing cookies may limit the use of some features.',
                    'For details on how Google processes advertising data, please refer to Google\'s advertising policies (https://policies.google.com/technologies/ads).',
                ],
            },
            {
                heading: '7. Affiliate Links',
                body: [
                    'Some posts on this website may contain affiliate marketing links (e.g., Coupang Partners), and the Company may earn a commission from qualifying purchases made through these links. When you click an affiliate link, the privacy policy of the external site applies.',
                ],
            },
            {
                heading: '8. Your Rights',
                body: [
                    'You may at any time request access to, correction of, deletion of, or suspension of the processing of your personal information by contacting the privacy officer below. The Company will act on such requests without delay.',
                ],
            },
            {
                heading: '9. Destruction of Personal Information',
                body: [
                    'Personal information whose retention period has expired or whose purpose has been fulfilled is destroyed without delay using irreversible methods. Electronic files are deleted using technical means that prevent recovery.',
                ],
            },
            {
                heading: '10. Privacy Officer',
                body: [
                    'For inquiries, complaints, or remedies regarding the processing of personal information, please contact:',
                    '· Email: datasys@datasys.co.kr',
                    '· Address: Room 801, 8th Floor, M-Valley W Tower IV, 14 Magokjungang 1-ro, Gangseo-gu, Seoul',
                ],
            },
            {
                heading: '11. Changes to This Policy',
                body: [
                    'This Privacy Policy may be revised in response to changes in laws, policies, or services. Any revisions will be announced on this website.',
                ],
            },
        ],
    },
};

export default async function PrivacyPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const content = CONTENT[lang] ?? CONTENT.en;

    return (
        <div className="container mx-auto px-4 py-16 max-w-3xl">
            <h1 className="text-4xl font-bold text-secondary mb-2">{content.title}</h1>
            <p className="text-sm text-muted-foreground mb-8">{content.effective}</p>

            <p className="text-muted-foreground leading-relaxed mb-10">{content.intro}</p>

            <div className="space-y-8">
                {content.sections.map((section) => (
                    <section key={section.heading}>
                        <h2 className="text-xl font-semibold text-secondary mb-3">{section.heading}</h2>
                        <div className="space-y-2">
                            {section.body.map((paragraph, idx) => (
                                <p key={idx} className="text-muted-foreground leading-relaxed">
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
}
