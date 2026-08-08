import { ContactForm } from '@/components/public/contact-form';
import { FeatureIcon, MarketingCard, PageHero } from '@/components/public/public-ui';
import { Clock3, LifeBuoy, Mail, MapPin, MessageSquare } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Send a message to the MoneyBag team or find the right support channel.',
};

const contactOptions = [
  { icon: Mail, label: 'Email', text: 'hello@moneybag.app', tone: 'primary' as const },
  {
    icon: LifeBuoy,
    label: 'Live chat',
    text: 'Priority support for Pro members',
    tone: 'accent' as const,
  },
  {
    icon: Clock3,
    label: 'Response time',
    text: 'Usually within 2–4 hours on weekdays',
    tone: 'success' as const,
  },
  {
    icon: MapPin,
    label: 'Headquarters',
    text: 'Remote team · Berlin, Germany',
    tone: 'warning' as const,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        compact
        description="Questions, feedback, partnership ideas, or support requests—send us a note and the right person will reply."
        eyebrow="CONTACT"
        icon={<MessageSquare className="size-3.5" />}
        title="We'd love to hear from you"
      />
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-5 lg:px-8 lg:py-20">
        <MarketingCard className="lg:col-span-3" padding="lg">
          <h2 className="text-2xl font-bold">Send a message</h2>
          <p className="mb-7 mt-2 text-sm leading-6 text-muted-foreground">
            Fill out the form and we will route your message to the right team.
          </p>
          <ContactForm />
        </MarketingCard>

        <div className="lg:col-span-2">
          <h2 className="mb-6 text-2xl font-bold">Other ways to reach us</h2>
          <div className="space-y-4">
            {contactOptions.map(({ icon: Icon, label, text, tone }) => (
              <MarketingCard className="flex items-start gap-4" key={label} padding="md">
                <FeatureIcon tone={tone}>
                  <Icon className="size-5" />
                </FeatureIcon>
                <div>
                  <h3 className="font-bold">{label}</h3>
                  {label === 'Email' ? (
                    <a
                      className="mt-1 block text-sm text-primary hover:underline"
                      href="mailto:hello@moneybag.app"
                    >
                      {text}
                    </a>
                  ) : (
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{text}</p>
                  )}
                  {label === 'Live chat' ? (
                    <Link
                      className="mt-1 block text-xs font-semibold text-primary hover:underline"
                      href="/pricing"
                    >
                      Upgrade to Pro →
                    </Link>
                  ) : null}
                </div>
              </MarketingCard>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
