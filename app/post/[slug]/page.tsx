import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllSlugs, getPostBySlug } from "@/lib/posts";
import { PageContainer } from "@/components/PageContainer";
import { Markdown } from "@/components/Markdown";

export const dynamicParams = false;

export function generateStaticParams() {
  const slugs = getAllSlugs();

  if (slugs.length === 0) return [{ slug: "no-posts-yet" }];
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.meta.title,
    description: post.meta.description,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();
  const { meta, content } = post;

  return (
    <PageContainer>
      <article lang="ko">
        <header className="mb-10">
          <Link href="/post" className="back-link">
            &larr; back to posts
          </Link>
          <h1 className="page-title mb-2">{meta.title}</h1>
          <time className="text-sm subtitle">{meta.date}</time>
        </header>
        <Markdown content={content} />
      </article>
    </PageContainer>
  );
}
