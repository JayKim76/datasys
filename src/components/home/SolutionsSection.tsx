import { Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/dictionary';
import { Server, Shield, Database, Activity, Monitor } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export async function SolutionsSection({ lang }: { lang: Locale }) {
  const dict = await getDictionary(lang);

  return (
    <section id="solutions" className="container mx-auto px-4 py-16 relative">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-secondary mb-6">{dict.solutions?.title || 'DB_optimon Solutions'}</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {dict.solutions?.description || 'Ultra-lightweight precise database monitoring solution'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <SolutionCard
          icon={<Server className="h-10 w-10 text-primary" />}
          title={dict.solutions?.features?.[0]?.title || 'Standalone Execution'}
          description={dict.solutions?.features?.[0]?.desc || 'Ultra-lightweight standalone build (<50MB) with no external server required.'}
          delay={0}
        />
        <SolutionCard
          icon={<Database className="h-10 w-10 text-accent" />}
          title={dict.solutions?.features?.[1]?.title || 'Integrated Backup'}
          description={dict.solutions?.features?.[1]?.desc || 'Flexible backup scheduling with Oracle specific RMAN and DataPump support.'}
          delay={100}
        />
        <SolutionCard
          icon={<Shield className="h-10 w-10 text-primary" />}
          title={dict.solutions?.features?.[2]?.title || 'Closed Network Security'}
          description={dict.solutions?.features?.[2]?.desc || 'Enterprise-grade security designed specifically for air-gapped networks.'}
          delay={200}
        />
        <SolutionCard
          icon={<Activity className="h-10 w-10 text-accent" />}
          title={dict.solutions?.features?.[3]?.title || 'Processor Lock'}
          description={dict.solutions?.features?.[3]?.desc || 'Instantly blocks unauthorized processes and prevents resource exhaustion.'}
          delay={300}
        />
        <SolutionCard
          icon={<Monitor className="h-10 w-10 text-primary" />}
          title={dict.solutions?.features?.[4]?.title || 'One Page Viewer'}
          description={dict.solutions?.features?.[4]?.desc || 'Intuitive dashboard aggregating all core monitoring metrics seamlessly.'}
          delay={400}
        />
      </div>

      <div className="flex justify-center mt-12">
        <Link href={`/${lang}/solutions`}>
          <Button className="h-12 px-8 rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:-translate-y-1">
            {dict.hero?.view_solutions || 'Learn More'}
          </Button>
        </Link>
      </div>
    </section>
  );
}

function SolutionCard({ icon, title, description, delay = 0 }: { icon: React.ReactNode, title: string, description: string, delay?: number }) {
  return (
    <Card
      className="glass-card hover:shadow-xl transition-all duration-300 border-t-4 border-t-transparent hover:border-t-primary hover:-translate-y-2 group bg-slate-50/50"
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardHeader>
        <div className="mb-4 p-3 bg-white/50 rounded-2xl w-fit group-hover:bg-primary/10 transition-colors duration-300">
          {icon}
        </div>
        <CardTitle className="text-xl font-bold text-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base leading-relaxed text-muted-foreground">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
