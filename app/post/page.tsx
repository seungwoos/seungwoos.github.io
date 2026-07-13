import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { PageContainer } from "@/components/PageContainer";

export const metadata = {
  title: "Post",
  description: "List of posts",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <PageContainer>
      <h1 className="page-title mb-12">Posts</h1>
      {posts.length === 0 ? (
        <p className="subtitle">Posts will be updated soon.</p>
      ) : (
        <ul className="post-list">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/post/${post.slug}`} className="post-item">
                <span className="post-item-title">{post.title}</span>
                <span className="post-item-date">{post.date}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </PageContainer>
  );
}
