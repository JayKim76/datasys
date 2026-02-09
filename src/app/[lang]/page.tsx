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
      <section className="relative pt-32 pb-40 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] z-0 pointer-events-none" />
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[100px] animate-float opacity-40 -z-10" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/20 rounded-full blur-[80px] animate-float opacity-30 -z-10" style={{ animationDelay: '2s' }} />

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-8 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
            AI-Powered Enterprise Solutions
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-secondary mb-8 drop-shadow-sm animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            {dict.hero.title_start} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-accent relative pb-2">
              {dict.hero.title_end}
              <svg className="absolute w-full h-3 bottom-0 left-0 text-primary/20 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
              </svg>
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400">
            {dict.hero.description}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-600">
            <Button className="h-14 px-10 text-lg rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:-translate-y-1">
              {dict.hero.get_started} <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" className="h-14 px-10 text-lg rounded-full border-2 hover:bg-secondary/5 transition-all hover:-translate-y-1">
              {dict.hero.view_solutions}
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-secondary mb-6">{dict.services.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {dict.services.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <ServiceCard
            icon={<Database className="h-12 w-12 text-primary" />}
            title={dict.services.bigdata.title}
            description={dict.services.bigdata.desc}
            delay={0}
          />
          <ServiceCard
            icon={<Zap className="h-12 w-12 text-accent" />}
            title={dict.services.ai.title}
            description={dict.services.ai.desc}
            delay={100}
          />
          <ServiceCard
            icon={<ShieldCheck className="h-12 w-12 text-primary" />}
            title={dict.services.security.title}
            description={dict.services.security.desc}
            delay={200}
          />
          <ServiceCard
            icon={<BarChart3 className="h-12 w-12 text-accent" />}
            title={dict.services.analytics.title}
            description={dict.services.analytics.desc}
            delay={300}
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
              { name: 'Moms Touch', src: '/clients/momstouch.png' },
              { name: 'Eyesvision', src: '/clients/eyesvision.jpg' },
              { name: 'Monami', src: '/clients/monami.jpg' },
              { name: 'People Power Party', src: '/clients/ppp.png' },
              { name: 'Woongji Tax Univ', src: '/clients/woongji.png' },
              { name: 'Myongji St Marys', src: '/clients/myongji.jpg' },
              { name: 'Shinhan Financial Plus', src: '/clients/shinhan.png' },
              { name: 'Youngpoong', src: '/clients/youngpoong.png' },
              { name: 'Welcos', src: '/clients/welcos.png' },
              { name: 'Alvogen', src: '/clients/alvogen.png' },
              { name: 'Playtong', src: '/clients/playtong.png' },
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

function ServiceCard({ icon, title, description, delay = 0 }: { icon: React.ReactNode, title: string, description: string, delay?: number }) {
  return (
    <Card
      className="glass-card hover:shadow-xl transition-all duration-300 border-t-4 border-t-transparent hover:border-t-primary hover:-translate-y-2 group"
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardHeader>
        <div className="mb-4 p-3 bg-slate-50 rounded-2xl w-fit group-hover:bg-primary/10 transition-colors duration-300">
          {icon}
        </div>
        <CardTitle className="text-xl font-bold text-slate-800">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base leading-relaxed text-slate-600">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
