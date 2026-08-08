import Script from 'next/script';

const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

// Injects the Google AdSense loader once per page.
// Renders nothing until NEXT_PUBLIC_ADSENSE_CLIENT (e.g. "ca-pub-1234567890123456") is set.
export function AdSenseScript() {
    if (!ADSENSE_CLIENT) return null;

    return (
        <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
        />
    );
}
