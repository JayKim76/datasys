"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { InquiryModal } from './InquiryModal';
import { Locale } from '@/i18n-config';

interface ContactCTAProps {
    buttonText: string;
    lang: Locale;
}

export function ContactCTA({ buttonText, lang }: ContactCTAProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <Button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 bg-primary text-white px-8 py-6 rounded-full font-semibold hover:bg-primary/90 transition-colors text-lg"
            >
                {buttonText} <ArrowRight className="h-4 w-4" />
            </Button>

            <InquiryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                lang={lang}
            />
        </>
    );
}
