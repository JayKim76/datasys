"use client";

import { useState } from 'react';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Locale } from '@/i18n-config';
import { Loader2 } from 'lucide-react';

interface InquiryModalProps {
    isOpen: boolean;
    onClose: () => void;
    lang: Locale;
}

export function InquiryModal({ isOpen, onClose, lang }: InquiryModalProps) {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const dict = {
        en: {
            title: 'Sales Team Inquiry',
            name: 'Name',
            email: 'Email',
            phone: 'Phone',
            message: 'Message',
            submit: 'Submit Inquiry',
            submitting: 'Sending...',
            success: 'Inquiry sent successfully! We will contact you soon.',
            error: 'Failed to send inquiry. Please try again.',
            close: 'Close'
        },
        ko: {
            title: '영업팀 문의',
            name: '이름',
            email: '이메일',
            phone: '연락처',
            message: '문의 내용',
            submit: '문의하기',
            submitting: '전송 중...',
            success: '문의가 접수되었습니다! 곧 연락드리겠습니다.',
            error: '전송에 실패했습니다. 다시 시도해 주세요.',
            close: '닫기'
        }
    };

    const t = dict[lang] || dict.en;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!response.ok) throw new Error('Failed to send');

            setSuccess(true);
            setFormData({ name: '', email: '', phone: '', message: '' });
            setTimeout(() => {
                setSuccess(false);
                onClose();
            }, 3000);
        } catch (err) {
            setError(t.error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2 className="text-2xl font-bold mb-6 text-foreground">{t.title}</h2>

            {success ? (
                <div className="text-center py-8">
                    <div className="text-green-600 font-semibold text-lg mb-4">{t.success}</div>
                    <Button onClick={onClose}>{t.close}</Button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">{t.name}</label>
                        <input
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 rounded-md border border-input bg-background focus:ring-2 focus:ring-ring outline-none transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">{t.email}</label>
                        <input
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 rounded-md border border-input bg-background focus:ring-2 focus:ring-ring outline-none transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">{t.phone}</label>
                        <input
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full p-2 rounded-md border border-input bg-background focus:ring-2 focus:ring-ring outline-none transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">{t.message}</label>
                        <textarea
                            name="message"
                            required
                            rows={4}
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full p-2 rounded-md border border-input bg-background focus:ring-2 focus:ring-ring outline-none transition-all resize-none"
                        />
                    </div>

                    {error && <div className="text-red-500 text-sm">{error}</div>}

                    <div className="flex justify-end pt-4">
                        <Button type="submit" disabled={loading} className="w-full sm:w-auto">
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {loading ? t.submitting : t.submit}
                        </Button>
                    </div>
                </form>
            )}
        </Modal>
    );
}
