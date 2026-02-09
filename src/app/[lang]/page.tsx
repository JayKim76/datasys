import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BarChart3, Database, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/dictionary';
import { NewsSection } from '@/components/home/NewsSection';
import { TechSection } from '@/components/home/TechSection';
import { CtaSection } from '@/components/home/CtaSection';
import newsData from '@/data/news.json';
import techData from '@/data/tech.json';

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const news = newsData[lang as keyof typeof newsData] || [];
  const tech = techData[lang as keyof typeof techData] || [];

  return (
    <div className="flex flex-col gap-16 pb-16">

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/10 to-transparent pt-20 pb-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-secondary mb-6">
            {dict.hero.title_start} <span className="text-primary">{dict.hero.title_end}</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            {dict.hero.description}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="h-12 px-8 text-lg rounded-full">
              {dict.hero.get_started}
            </Button>
            <Button className="h-12 px-8 text-lg rounded-full border-2 border-primary bg-transparent hover:bg-primary/5 text-primary">
              {dict.hero.view_solutions}
            </Button>
          </div>
        </div>

        {/* Abstract Background Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[800px] h-[800px] bg-blue-400/20 rounded-full blur-3xl opacity-30" />
      </section>

      {/* Services Section */}
      <section id="services" className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-secondary mb-4">{dict.services.title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {dict.services.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ServiceCard
            icon={<Database className="h-10 w-10 text-primary" />}
            title={dict.services.bigdata.title}
            description={dict.services.bigdata.desc}
          />
          <ServiceCard
            icon={<Zap className="h-10 w-10 text-primary" />}
            title={dict.services.ai.title}
            description={dict.services.ai.desc}
          />
          <ServiceCard
            icon={<ShieldCheck className="h-10 w-10 text-primary" />}
            title={dict.services.security.title}
            description={dict.services.security.desc}
          />
          <ServiceCard
            icon={<BarChart3 className="h-10 w-10 text-primary" />}
            title={dict.services.analytics.title}
            description={dict.services.analytics.desc}
          />
        </div>
      </section>

      {/* News Section */}
      <NewsSection news={news} lang={lang as Locale} />

      {/* Tech Resources Section */}
      <TechSection tech={tech} lang={lang as Locale} />

      {/* Clients Section */}
      <section id="clients" className="bg-slate-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-8">
            {dict.clients.title}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-80 hover:opacity-100 transition-opacity duration-300">
            {[
              { name: "Papa John's", src: '/clients/papajohns.png' },
              { name: 'Moms Touch', src: '/clients/momstouch.svg' },
              { name: 'Eyesvision', src: '/clients/eyesvision.svg' },
              { name: 'Monami', src: '/clients/monami.svg' },
              { name: 'People Power Party', src: '/clients/ppp.svg' },
              { name: 'Woongji Tax Univ', src: '/clients/woongji.png' },
              { name: 'Myongji St Marys', src: '/clients/myongji.svg' },
              { name: 'Shinhan Financial Plus', src: '/clients/shinhan.svg' },
              { name: 'Youngpoong', src: '/clients/youngpoong.svg' },
              { name: 'Welcos', src: '/clients/welcos.svg' },
              { name: 'Alvogen', src: '/clients/alvogen.svg' },
              { name: 'Playtong', src: '/clients/playtong.svg' },
            ].map((client) => (
              <div key={client.name} className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm border border-slate-100 w-full h-24 hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="relative w-full h-full">
                  <Image
                    src={client.src}
                    alt={`${client.name} logo`}
                    fill
                    className="object-contain p-2 grayscale group-hover:grayscale-0 transition-all duration-300"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16vw"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CtaSection dict={dict} lang={lang as Locale} />

    </div>
  );
}

function ServiceCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card className="hover:shadow-lg transition-shadow border-t-4 border-t-transparent hover:border-t-primary">
      <CardHeader>
        <div className="mb-4">{icon}</div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
