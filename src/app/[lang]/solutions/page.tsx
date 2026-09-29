import { Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/dictionary';
import { Server, Shield, Database, Activity, Monitor, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function SolutionsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  
  if (!dict.solutions) return null;

  const images = [
    "https://db.optimon.co.kr/imgs/dbmon_main.webp",
    "https://db.optimon.co.kr/imgs/dbmon_backup.webp",
    "https://db.optimon.co.kr/imgs/dbmon_snep.webp",
    "https://db.optimon.co.kr/imgs/dbmon_pl.webp",
    "https://db.optimon.co.kr/imgs/dbmon_desh.webp"
  ];

  return (
    <div className="flex flex-col min-h-screen pt-24 pb-16">
      {/* Header */}
      <section className="container mx-auto px-4 text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-secondary mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          {dict.solutions.title}
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          {dict.solutions.description}
        </p>
      </section>

      {/* Feature Details */}
      <section className="container mx-auto px-4">
        <div className="space-y-32">
          {dict.solutions.features.map((feature: any, index: number) => (
            <div key={index} className={`flex flex-col lg:flex-row gap-12 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              {/* Image Side */}
              <div className="w-full lg:w-1/2 flex justify-center">
                <div className="relative w-full aspect-video rounded-xl bg-slate-100 shadow-2xl overflow-hidden group hover:shadow-primary/20 hover:shadow-3xl transition-all duration-500 border border-slate-200">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 pointer-events-none"></div>
                  <img 
                    src={images[index % images.length]} 
                    alt={feature.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute bottom-4 left-4 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-bold text-lg shadow-lg">
                    {index + 1}
                  </div>
                </div>
              </div>

              {/* Content Side */}
              <div className="w-full lg:w-1/2 space-y-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary font-bold text-xl mb-2">
                  0{index + 1}
                </div>
                <h2 className="text-3xl font-bold text-secondary">{feature.title}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {feature.desc}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
                  {feature.details?.map((detail: any, dIndex: number) => (
                    <div key={dIndex} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-secondary mb-2">{detail.title}</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">{detail.text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="container mx-auto px-4 mt-24 text-center">
        <Link href={`/${lang}`}>
          <Button variant="outline" className="h-12 px-8 rounded-full">
            {dict.nav.home}
          </Button>
        </Link>
      </section>
    </div>
  );
}
