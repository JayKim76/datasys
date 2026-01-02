"use client";

import { useState } from 'react';
import { InquiryModal } from '@/components/home/InquiryModal';
import { Locale } from '@/i18n-config';

interface NavbarContactBtnProps {
    text: string;
    lang: Locale;
}

export function NavbarContactBtn({ text, lang }: NavbarContactBtnProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors"
            >
                {text}
            </button>

            <InquiryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                lang={lang}
            />
        </>
    );
}
