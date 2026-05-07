import { getAllPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";
import Link from "next/link";

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const posts = getAllPosts();
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) return notFound();

  // ✅ Correct markdown processing (ONLY here)
  const processedContent = await remark()
    .use(remarkGfm)
    .use(html, { sanitize: false })
    .process(post.content);

  const contentHtml = processedContent.toString();

  return (
    <main className="max-w-3xl mx-auto px-6 pt-16 pb-16">
      {/* Back */}
      <Link
        href="/blog"
        className="text-sm text-indigo-600 hover:text-purple-500 transition mb-6 inline-block"
      >
        ← Back to notes
      </Link>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-indigo-900 mb-2">
          {post.title}
        </h1>

        <div className="flex items-center gap-3 text-sm text-gray-400">
          <span>
            {new Date(post.date).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
          <span>•</span>
          <span>{post.readingTime} min read</span>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-8">
        {post.tags.map((tag: string) => (
          <span
            key={tag}
            className="text-xs px-2 py-1 bg-indigo-50 text-indigo-700 rounded-md"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Content */}
      <article
        className="prose max-w-none text-gray-700
                   prose-headings:text-indigo-900
                   prose-headings:font-extrabold
                   prose-h1:text-3xl
                   prose-h2:text-2xl
                   prose-h3:text-xl
                   prose-h2:mt-10 prose-h2:mb-3
                   prose-h3:mt-6 prose-h3:mb-2
                   prose-p:leading-7
                   prose-p:mb-4
                   prose-li:mb-1
                   prose-a:text-indigo-600
                   prose-strong:text-indigo-900"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </main>
  );
}
