import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, BookOpen, Clock3 } from 'lucide-react';
import { notFound } from 'next/navigation';
import { PageHero, TrialCta } from '@/components/public/public-ui';
import { blogPosts } from '@/lib/public-content';

export function generateStaticParams() {
  return blogPosts.map(({ slug }) => ({ slug }));
}
type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  return post ? { title: post.title, description: post.excerpt } : { title: 'Article not found' };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) notFound();
  const related = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 2);
  return (
    <>
      <article>
        <PageHero
          compact
          description={post.excerpt}
          eyebrow={post.category.toUpperCase()}
          icon={<BookOpen className="size-3.5" />}
          title={post.title}
        >
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <span>{post.date}</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock3 className="size-4" />
              {post.readTime}
            </span>
            <Link
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary"
              href="/blog"
            >
              <ArrowLeft className="size-4" />
              Back to the journal
            </Link>
          </div>
        </PageHero>
        <div
          className={`relative mx-4 mt-12 h-64 overflow-hidden rounded-lg border border-border bg-linear-to-br shadow-lg sm:mx-auto sm:mt-14 sm:h-96 sm:max-w-5xl ${post.color}`}
        >
          <Image
            alt="Illustration for this MoneyBag article"
            className="size-full object-cover opacity-90 mix-blend-multiply"
            fill
            sizes="(min-width: 1024px) 1024px, 100vw"
            src="/images/blog/finance-cover.png"
          />
        </div>
        <div className="[&_h2]:mb-3 [&_h2]:mt-10 [&_h2]:scroll-mt-24 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-[-0.01em] [&_h3]:mb-2 [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-semibold [&_p]:mb-4 [&_p]:leading-[1.8] [&_p]:text-muted-foreground [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:text-muted-foreground [&_li]:mb-1.5 [&_li]:leading-[1.7] [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-[3px] mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-20">
          {post.sections.map((section, index) => (
            <section key={section.heading ?? index}>
              {section.heading && <h2>{section.heading}</h2>}
              {section.paragraphs.map((paragraph) => (
                <p className="text-base" key={paragraph}>
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
          <div className="mt-12 rounded-lg border border-primary/20 bg-primary/5 p-6">
            <p className="font-semibold">Put the idea into practice</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              MoneyBag gives you one calm place to track the numbers, review what changed, and make
              your next plan.
            </p>
          </div>
        </div>
      </article>
      <section className="border-y border-border bg-card">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:py-20">
          <h2 className="text-2xl font-bold">Keep reading</h2>
          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            {related.map((item) => (
              <Link
                className="rounded-lg border border-border bg-card p-6 transition-shadow hover:shadow-md"
                href={`/blog/${item.slug}`}
                key={item.slug}
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  {item.category}
                </p>
                <h3 className="mt-2 text-lg font-semibold">{item.title}</h3>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  Read article <ArrowRight className="size-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <TrialCta title="Make the next month feel clearer." />
    </>
  );
}
