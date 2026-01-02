import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { i18n } from './i18n-config';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

function getLocale(request: NextRequest): string | undefined {
    // Negotiator expects plain object so we need to transform headers
    const negotiatorHeaders: Record<string, string> = {};
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

    // @ts-ignore locales are readonly
    const locales: string[] = i18n.locales;

    // Use negotiator and intl-localematcher to get best locale
    let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
        locales
    );

    const locale = matchLocale(languages, locales, i18n.defaultLocale);

    return locale;
}

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Check if there is any supported locale in the pathname
    const pathnameIsMissingLocale = i18n.locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    // Basic Auth for Admin
    if (pathname.includes('/admin')) {
        const basicAuth = request.headers.get('authorization');

        if (basicAuth) {
            const authValue = basicAuth.split(' ')[1];
            const [user, pwd] = atob(authValue).split(':');

            // Default credentials: admin / password123
            // In production, use environment variables
            if (user === 'admin' && pwd === 'password123') {
                // extend lock: authorized, proceed to locale check
            } else {
                return new NextResponse('Auth Required', {
                    status: 401,
                    headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },
                });
            }
        } else {
            return new NextResponse('Auth Required', {
                status: 401,
                headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },
            });
        }
    }

    // Redirect if there is no locale and path is not an asset/api
    if (pathnameIsMissingLocale) {
        // Exclude next internal files and assets
        if (
            pathname.startsWith('/_next') ||
            pathname.startsWith('/api') ||
            pathname.includes('.') // file extension (e.g. .svg, .png)
        ) {
            return;
        }

        const locale = getLocale(request);

        // e.g. incoming request is /products
        // The new URL is now /en/products
        return NextResponse.redirect(
            new URL(
                `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
                request.url
            )
        );
    }
}

export const config = {
    // Matcher ignoring `/_next/` and `/api/`
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
