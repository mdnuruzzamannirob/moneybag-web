import {
  FeatureIcon,
  MarketingCard,
  PageHero,
  Stars,
  TrialCta,
} from '@/components/public/public-ui';
import { BriefcaseBusiness, HeartHandshake, UserRound, Users } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Customers',
  description: 'Stories from people, couples, families, and freelancers using MoneyBag.',
};

const featuredStories = [
  {
    initials: 'SM',
    name: 'Sarah Mitchell & James Rivera',
    plan: 'Couple · Berlin & Austin · Pro Yearly',
    title: '“We saved $4,200 in our first year.”',
    quote:
      'We used to argue about money every month. Once we had pooled budgets and one shared view, those conversations became calm and practical. We reached our savings goal six months early.',
  },
  {
    initials: 'FK',
    name: 'Fatima Khan',
    plan: 'Freelance designer · Dubai · Pro Monthly',
    title: '“I finally know where my money goes.”',
    quote:
      'Tracking income across clients was a nightmare. CSV import gave me one source of truth, and the reports helped me save 25% of every invoice without another spreadsheet.',
  },
] as const;

const testimonials = [
  [
    'DR',
    'David Reyes',
    'Engineer · San Francisco',
    'Switched from Mint. Cleaner UI, better budgets, no ads. Worth every month.',
  ],
  [
    'LP',
    'Lisa Park',
    'Caregiver · Toronto',
    'I manage money for my elderly parents. Family sharing is a lifesaver.',
  ],
  [
    'AT',
    'Ahmed Tariq',
    'Developer · Karachi',
    'Bought Lifetime. Best $100 I have spent on a finance tool.',
  ],
] as const;

const useCases = [
  {
    icon: UserRound,
    label: 'Individuals',
    share: '42%',
    text: 'Tracking solo and budgeting smarter.',
    tone: 'primary' as const,
  },
  {
    icon: HeartHandshake,
    label: 'Couples',
    share: '31%',
    text: 'Sharing expenses and splitting bills.',
    tone: 'accent' as const,
  },
  {
    icon: Users,
    label: 'Families',
    share: '19%',
    text: 'Pooled budgets for up to five people.',
    tone: 'success' as const,
  },
  {
    icon: BriefcaseBusiness,
    label: 'Freelancers',
    share: '8%',
    text: 'Multi-income, tax-ready reporting.',
    tone: 'info' as const,
  },
] as const;

export default function CustomersPage() {
  return (
    <>
      <PageHero
        description="Real stories from freelancers, couples, and families who took control of their money."
        eyebrow="CUSTOMERS"
        icon={<HeartHandshake className="size-3.5" />}
        title={
          <>
            Loved by <span className="text-primary">10,000+ people</span>
          </>
        }
      />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            ['10,247', 'Active users'],
            ['$2.1M', 'Tracked monthly'],
            ['4.8 ★', 'Average rating'],
            ['42', 'Countries'],
          ].map(([value, label]) => (
            <MarketingCard className="text-center" key={label} padding="md">
              <p className="text-3xl font-bold text-primary">{value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{label}</p>
            </MarketingCard>
          ))}
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {featuredStories.map((story) => (
            <MarketingCard key={story.name}>
              <Stars />
              <h2 className="mt-4 text-xl font-bold">{story.title}</h2>
              <blockquote className="mt-3 text-sm leading-7 text-muted-foreground">
                “{story.quote}”
              </blockquote>
              <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                <span className="grid size-12 place-items-center rounded-full bg-primary text-sm font-bold text-white">
                  {story.initials}
                </span>
                <div>
                  <p className="font-bold">{story.name}</p>
                  <p className="text-xs text-muted-foreground">{story.plan}</p>
                </div>
              </div>
            </MarketingCard>
          ))}
        </div>

        <h2 className="mb-6 mt-16 text-2xl font-bold lg:mt-20">More love from our users</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map(([initials, name, role, quote]) => (
            <MarketingCard key={name}>
              <Stars />
              <blockquote className="mt-3 text-sm leading-7">“{quote}”</blockquote>
              <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                <span className="grid size-9 place-items-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  {initials}
                </span>
                <div>
                  <p className="text-sm font-bold">{name}</p>
                  <p className="text-xs text-muted-foreground">{role}</p>
                </div>
              </div>
            </MarketingCard>
          ))}
        </div>

        <h2 className="mb-6 mt-16 text-2xl font-bold lg:mt-20">Who uses MoneyBag?</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {useCases.map(({ icon: Icon, label, share, text, tone }) => (
            <MarketingCard className="text-center" key={label} padding="md">
              <FeatureIcon className="mx-auto" tone={tone}>
                <Icon />
              </FeatureIcon>
              <p className="mt-3 text-2xl font-bold text-primary">{share}</p>
              <h3 className="mt-1 text-sm font-bold">{label}</h3>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">{text}</p>
            </MarketingCard>
          ))}
        </div>
      </section>
      <TrialCta title="Join 10,000+ people building calmer money habits." />
    </>
  );
}
