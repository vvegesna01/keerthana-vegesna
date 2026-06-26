import { getAllPosts } from "@/lib/blog";
import BlogClientPage from "./BlogClientPage";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="max-w-4xl mx-auto px-6 pt-16 pb-10">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl leading-10 font-extrabold text-indigo-900 hover:text-purple-500 transition-colors duration-300 mb-3">
          My Field Notes
        </h1>
        <p className="text-gray-500 leading-8 text-lg max-w-2xl">
          Notes, ideas, and things I keep thinking about, pulled from my Obsidian vault.
        </p>
      </div>

      <BlogClientPage posts={posts} />

    </main>
  );
}