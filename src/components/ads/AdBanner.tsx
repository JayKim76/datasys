'use client';

import { useEffect, useRef } from 'react';

const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

declare global {
    interface Window {
        adsbygoogle?: unknown[];
    }
}

interface AdBannerProps {
    /** AdSense ad unit slot id (숫자 문자열). 미설정이면 렌더링하지 않음 */
    slot?: string;
    format?: string;
    className?: string;
}

export function AdBanner({ slot, format = 'auto', className }: AdBannerProps) {
    const pushed = useRef(false);

    useEffect(() => {
        if (!ADSENSE_CLIENT || !slot || pushed.current) return;
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            pushed.current = true;
        } catch {
            // AdSense script blocked or not loaded yet — fail silently
        }
    }, [slot]);

    if (!ADSENSE_CLIENT || !slot) return null;

    return (
        <div className={className}>
            <ins
                className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client={ADSENSE_CLIENT}
                data-ad-slot={slot}
                data-ad-format={format}
                data-full-width-responsive="true"
            />
        </div>
    );
}
