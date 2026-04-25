import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="max-w-4xl mx-auto px-6 pt-16 pb-10">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-indigo-900 mb-3">
          Keerthana&apos;s Field Notes
        </h1>
        <p className="text-gray-600 leading-7 max-w-2xl">
          Notes, ideas, and things I keep thinking about, pulled from my Obsidian vault.
        </p>
      </div>

      {/* Posts */}
      <div className="flex flex-col gap-6">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <div className="group border border-gray-100 rounded-lg p-5 hover:bg-indigo-50 transition">

              <p className="text-xs text-gray-400 mb-1">
                {post.date}
              </p>

              <h2 className="text-lg font-semibold text-indigo-900 group-hover:text-purple-500 transition">
                {post.title}
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                {post.description}
              </p>

            </div>
          </Link>
        ))}
      </div>

    </main>
  );
}