import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { profile } from "@/lib/profile";
import { PageContainer } from "@/components/PageContainer";

function InlineLinks({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    parts.push(
      <a
        key={match.index}
        href={match[2]}
        className="underline underline-offset-4 hover:text-neutral-500 dark:hover:text-neutral-400 transition-colors"
      >
        {match[1]}
      </a>,
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return <>{parts}</>;
}

export default function Home() {
  const recentPosts = getAllPosts().slice(0, profile.maxBlogPosts);
  const recentNews = [...profile.news]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, profile.maxNewsItems);

  return (
    <PageContainer>
      <section>
        <h1 className="text-3xl font-bold tracking-tight">{profile.name}</h1>
        <ul className="mt-3 flex flex-wrap items-center font-mono text-sm text-neutral-600 dark:text-neutral-400">
          {profile.links.map((link, i) => (
            <li key={link.label} className="flex items-center">
              {i > 0 && (
                <span aria-hidden className="px-2">
                  |
                </span>
              )}
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-1 font-mono text-sm text-neutral-600 dark:text-neutral-400">
          {profile.email}
        </p>
      </section>

      <section className="mt-10 flex flex-col-reverse items-center gap-8 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1 space-y-4 text-[15px] leading-relaxed text-neutral-700 dark:text-neutral-300">
          {profile.bio.map((paragraph) => (
            <p key={paragraph}>
              <InlineLinks text={paragraph} />
            </p>
          ))}
        </div>
        {profile.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={profile.image}
            alt={profile.name}
            className="h-44 w-44 shrink-0 rounded-full object-cover"
          />
        )}
      </section>

      {profile.news.length > 0 && (
        <section className="mt-16">
          <h2 className="border-b border-neutral-200 pb-3 text-xl font-bold tracking-tight dark:border-neutral-800">
            News
          </h2>
          <ul className="mt-6 space-y-3 text-[15px] leading-relaxed text-neutral-700 dark:text-neutral-300">
            {recentNews.map((item) => (
              <li key={item.date + item.text} className="flex gap-4">
                <span className="w-20 shrink-0 font-mono text-sm leading-relaxed text-neutral-400 dark:text-neutral-500">
                  {item.date}
                </span>
                <span>
                  <InlineLinks text={item.text} />
                  {item.tag && <span> ({item.tag})</span>}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-16">
        <div className="flex items-baseline justify-between border-b border-neutral-200 pb-3 dark:border-neutral-800">
          <h2 className="text-xl font-bold tracking-tight">Blog Posts</h2>
          <Link href="/post" className="subtle-link">
            all posts &rarr;
          </Link>
        </div>
        {recentPosts.length === 0 && (
          <p className="mt-6 subtitle text-[15px]">
            Posts will be updated soon.
          </p>
        )}
        <div className="mt-8 space-y-8">
          {recentPosts.map((post) => (
            <article key={post.slug}>
              <h3 className="font-semibold">
                <Link
                  href={`/post/${post.slug}`}
                  className="hover:text-neutral-500 dark:hover:text-neutral-400 transition-colors"
                >
                  {post.title}
                </Link>
              </h3>
              <time className="mt-1 block text-[11px] font-semibold uppercase tracking-wide text-neutral-400 dark:text-neutral-500">
                {post.date}
              </time>
              {post.description && (
                <p className="mt-1.5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {post.description}
                </p>
              )}
            </article>
          ))}
        </div>
      </section>
    </PageContainer>
  );
}
