// Serves /ads.txt for Google AdSense site verification.
// AdSense client id는 "ca-pub-XXXXXXXXXXXXXXXX" 형식이며,
// ads.txt에는 "pub-" 이후 부분만 들어간다.
export function GET() {
    const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

    if (!client) {
        return new Response('Not Found', { status: 404 });
    }

    const publisherId = client.replace(/^ca-/, '');
    const body = `google.com, ${publisherId}, DIRECT, f08c47fec0942fa0\n`;

    return new Response(body, {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
}
