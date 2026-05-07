import { getAllPosts } from "@/lib/blog";
import PostCard from "./PostCard";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="max-w-4xl mx-auto px-6 pt-16 pb-10">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-indigo-900 mb-3">
          My Field Notes
        </h1>
        <p className="text-gray-600 leading-7 max-w-2xl">
          Notes, ideas, and things I keep thinking about, pulled from my Obsidian vault.
        </p>
      </div>

      {/* Posts */}
      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

    </main>
  );
}