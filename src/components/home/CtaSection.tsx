"use client";

import { ContactCTA } from './ContactCTA';
import { Locale } from '@/i18n-config';

interface CtaSectionProps {
    dict: any; // Using any for simplicity as dict structure is complex, or define interface
    lang: Locale;
}

export function CtaSection({ dict, lang }: CtaSectionProps) {

    return (
        <section id="cta" className="container mx-auto px-4">
            <div className="bg-secondary rounded-2xl p-12 text-center text-white relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-3xl font-bold mb-6">{dict.cta.title}</h2>
                    <p className="text-slate-300 max-w-2xl mx-auto mb-8">
                        {dict.cta.description}
                    </p>

                    <ContactCTA buttonText={dict.cta.button} lang={lang} />
                </div>

                {/* Decorative circles */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            </div>
        </section>
    );
}
