import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock3 } from 'lucide-react';
import { PageHero } from '@/components/public/public-ui';
import { blogPosts } from '@/lib/public-content';

const categoryStyles: Record<string, string> = {
  Budgeting: 'bg-primary/10 text-primary',
  'Family finance': 'bg-brand-accent-soft text-brand-accent',
  Saving: 'bg-success-soft text-success',
  'Money habits': 'bg-warning-soft text-warning',
};

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Practical guides for calmer personal and family finances.',
};
export default function BlogPage() {
  const [featured, ...posts] = blogPosts;
  return (
    <>
      <PageHero
        compact
        eyebrow="BLOG"
        title={
          <>
            Money talks, <span className="text-primary">we listen.</span>
          </>
        }
        description="Tips, guides, and stories about personal finance."
      />
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mb-8 max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-wider text-primary">Featured story</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            Practical ideas for a calmer financial life
          </h2>
          <p className="mt-3 leading-7 text-muted-foreground">
            Start with our latest guide, then explore straightforward advice for budgeting, saving,
            and managing money together.
          </p>
        </div>
        <Link
          href={`/blog/${featured.slug}`}
          className="group grid overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-shadow hover:shadow-lg lg:grid-cols-2"
        >
          <div className="relative min-h-64 overflow-hidden bg-card sm:min-h-72">
            <Image
              alt="Illustration of a calm personal finance plan"
              className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              src="/images/blog/finance-cover.png"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800">
              Featured article
            </div>
          </div>
          <div className="flex flex-col justify-center p-7 sm:p-10">
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider">
              <span
                className={`rounded-md px-2 py-1 ${categoryStyles[featured.category] ?? 'bg-primary/10 text-primary'}`}
              >
                {featured.category}
              </span>
              <span className="text-muted-foreground">{featured.date}</span>
            </div>
            <h3 className="mt-3 text-3xl font-bold leading-tight tracking-tight group-hover:text-primary">
              {featured.title}
            </h3>
            <p className="mt-4 leading-7 text-muted-foreground">{featured.excerpt}</p>
            <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Clock3 className="size-4" />
                {featured.readTime}
              </span>
            </div>
            <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary">
              Read article <ArrowRight className="size-4" />
            </span>
          </div>
        </Link>
        <div className="mb-7 mt-16">
          <h2 className="text-2xl font-bold tracking-tight">Latest articles</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            More guides and stories from the MoneyBag team.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <article
              className="group overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-md"
              key={post.slug}
            >
              <Link href={`/blog/${post.slug}`}>
                <div
                  className={`relative h-40 overflow-hidden bg-linear-to-br sm:h-44 ${post.color}`}
                >
                  <Image
                    alt=""
                    className="size-full object-cover opacity-90 mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    src="/images/blog/finance-cover.png"
                  />
                </div>
                <div className="p-6">
                  <p
                    className={`inline-flex rounded px-1 py-0.5 text-[9px] font-bold uppercase tracking-wider ${categoryStyles[post.category] ?? 'bg-primary/10 text-primary'}`}
                  >
                    {post.category}
                  </p>
                  <h3 className="mt-2 text-xl font-bold leading-snug">{post.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{post.excerpt}</p>
                  <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
