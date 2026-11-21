import { getAllPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import PageContainer from "@/components/layout/PageContainer";
import Tag from "@/components/ui/Tag";

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
    <PageContainer size="narrow" className="pt-16 pb-16">
      {/* Back */}
      <Link
        href="/blog"
        className="text-sm text-accent hover:text-accent-soft transition mb-6 inline-block"
      >
        ← Back to notes
      </Link>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-heading mb-2">
          {post.title}
        </h1>

        <div className="flex items-center gap-3 text-sm text-subtle">
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
          <Tag
            key={tag}
            label={tag}
            variant="blog-detail"
          />
        ))}
      </div>

      {/* Content */}
      <article
        className="prose max-w-none text-muted
                   prose-headings:text-heading
                   prose-headings:font-extrabold
                   prose-h1:text-3xl
                   prose-h2:text-2xl
                   prose-h3:text-xl
                   prose-h2:mt-10 prose-h2:mb-3
                   prose-h3:mt-6 prose-h3:mb-2
                   prose-p:leading-7
                   prose-p:mb-4
                   prose-li:mb-1
                   prose-a:text-accent
                   prose-strong:text-heading"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </PageContainer>
  );
}
