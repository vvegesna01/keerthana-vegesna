"use client";
import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import PostCard from "./PostCard";

type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime: number;
  coverImage: string | null;
};

export default function BlogClientPage({ posts }: { posts: Post[] }) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const post of posts) {
      for (const tag of post.tags) {
        counts[tag] = (counts[tag] ?? 0) + 1;
      }
    }
    return Object.entries(counts).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }, [posts]);

  const filteredPosts = useMemo(
    () => (activeTag ? posts.filter((p) => p.tags.includes(activeTag)) : posts),
    [activeTag, posts]
  );

  // Split out the very latest posts for the editorial top grid layout
  const [featuredPost, secondPost, thirdPost, ...historicalPosts] = posts;
  const displayGrid = !activeTag && posts.length >= 3;
  const listPosts = displayGrid ? historicalPosts : filteredPosts;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-10">
      
      {/* ── Dynamic Spring Tag Navigation Bar ── */}
      <div className="border-b border-slate-200/60 pb-6">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setActiveTag(null)}
            className="relative px-3.5 py-1.5 text-xs font-bold rounded-xl focus:outline-none transition-colors duration-200"
          >
            {activeTag === null && (
              <motion.span
                layoutId="blog-tag-pill"
                className="absolute inset-0 bg-indigo-950 rounded-xl"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className={`relative z-10 flex items-center gap-1.5 ${activeTag === null ? "text-white" : "text-slate-400 hover:text-slate-600"}`}>
              All 
              <span className={`text-[10px] font-mono px-1 rounded ${activeTag === null ? "bg-indigo-800 text-indigo-200" : "bg-slate-100 text-slate-400"}`}>
                {posts.length}
              </span>
            </span>
          </button>

          {tagCounts.map(([tag, count]) => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className="relative px-3.5 py-1.5 text-xs font-bold rounded-xl focus:outline-none transition-colors duration-200"
            >
              {activeTag === tag && (
                <motion.span
                  layoutId="blog-tag-pill"
                  className="absolute inset-0 bg-indigo-950 rounded-xl"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className={`relative z-10 flex items-center gap-1.5 uppercase tracking-wider ${activeTag === tag ? "text-white" : "text-slate-400 hover:text-slate-600"}`}>
                {tag}
                <span className={`text-[10px] font-mono px-1 rounded ${activeTag === tag ? "bg-indigo-800 text-indigo-200" : "bg-slate-100 text-slate-400"}`}>
                  {count}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Asymmetric Editorial Top Grid (Shows only on primary feed) ── */}
      {displayGrid && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Main Huge Cover Feature */}
          <Link href={`/blog/${featuredPost.slug}`} className="lg:col-span-2 group relative h-96 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/40 shadow-sm hover:shadow-xl transition-all duration-300">
            {featuredPost.coverImage && (
              <Image src={featuredPost.coverImage} alt={featuredPost.title} fill className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 z-10 text-white">
              <span className="font-mono text-[10px] uppercase tracking-widest text-indigo-300 font-bold block mb-2">Latest Feature · {featuredPost.readingTime} min read</span>
              <h2 className="text-xl md:text-2xl font-black tracking-tight mb-2 group-hover:text-indigo-200 transition-colors">{featuredPost.title}</h2>
              <p className="text-slate-300 text-sm line-clamp-2 font-normal max-w-xl">{featuredPost.description}</p>
              <span className="font-mono text-[10px] text-slate-400 block mt-3 uppercase tracking-wider">{formatDate(featuredPost.date)}</span>
            </div>
          </Link>

          {/* Secondary Columns Stack */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {[secondPost, thirdPost].map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group relative h-[184px] rounded-2xl overflow-hidden bg-slate-900 border border-slate-200/40 p-5 flex flex-col justify-end shadow-sm hover:shadow-lg transition-all duration-300">
                {post.coverImage && (
                  <Image src={post.coverImage} alt={post.title} fill className="object-cover opacity-35 group-hover:opacity-45 transition-opacity duration-500" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <div className="relative z-10 text-white">
                  <span className="font-mono text-[9px] text-indigo-300 font-bold uppercase block mb-1">{post.readingTime} min read</span>
                  <h3 className="text-sm font-bold tracking-tight line-clamp-2 leading-snug mb-1 group-hover:text-indigo-200 transition-colors">{post.title}</h3>
                  <span className="font-mono text-[9px] text-slate-400 tracking-wider uppercase">{formatDate(post.date)}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ── Bottom Chronological / Filtered Timeline Stream ── */}
      <div className="space-y-4">
        {displayGrid && (
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
            Historical Archive
          </h3>
        )}

        <div className="flex flex-col gap-3">
          <AnimatePresence mode="popLayout">
            {listPosts.map((post) => (
              <motion.div
                key={post.slug}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <PostCard post={post} />
              </motion.div>
            ))}
          </AnimatePresence>

          {listPosts.length === 0 && (
            <p className="text-center text-sm font-mono text-slate-400 py-12 bg-white border border-dashed border-slate-200 rounded-2xl">
              No index matches found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}