"use client";
import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
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

function FilterTag({
  label,
  active,
  count,
  onClick,
}: {
  label: string;
  active: boolean;
  count: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest rounded-full px-3 py-1.5
        border transition-all duration-200 cursor-pointer
        ${
          active
            ? "bg-indigo-900 text-white border-indigo-900 shadow-sm"
            : "bg-white text-indigo-500 border-indigo-200 hover:border-indigo-400 hover:text-indigo-700"
        }
      `}
    >
      {label}
      <span
        className={`text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center ${
          active ? "bg-indigo-700 text-white" : "bg-indigo-100 text-indigo-400"
        }`}
      >
        {count}
      </span>
    </button>
  );
}

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

  return (
    <>
      {/* Tag filter bar */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-2">
          {/* All pill */}
          <button
            onClick={() => setActiveTag(null)}
            className={`
              inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest rounded-full px-3 py-1.5
              border transition-all duration-200 cursor-pointer
              ${
                activeTag === null
                  ? "bg-indigo-900 text-white border-indigo-900 shadow-sm"
                  : "bg-white text-indigo-500 border-indigo-200 hover:border-indigo-400 hover:text-indigo-700"
              }
            `}
          >
            All
            <span
              className={`text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center ${
                activeTag === null ? "bg-indigo-700 text-white" : "bg-indigo-100 text-indigo-400"
              }`}
            >
              {posts.length}
            </span>
          </button>

          {tagCounts.map(([tag, count]) => (
            <FilterTag
              key={tag}
              label={tag}
              active={activeTag === tag}
              count={count}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            />
          ))}
        </div>

        <AnimatePresence>
          {activeTag && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="mt-3 text-sm text-indigo-400"
            >
              Showing {filteredPosts.length} post{filteredPosts.length !== 1 ? "s" : ""} tagged{" "}
              <span className="font-semibold text-indigo-600">{activeTag}</span>
              {" · "}
              <button
                onClick={() => setActiveTag(null)}
                className="underline underline-offset-2 hover:text-indigo-800 transition-colors"
              >
                Clear filter
              </button>
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Post cards */}
      <div className="flex flex-col gap-4">
        <AnimatePresence mode="popLayout">
          {filteredPosts.map((post) => (
            <motion.div
              key={post.slug}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12, transition: { duration: 0.2 } }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <PostCard post={post} />
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredPosts.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-400 py-12"
          >
            No posts match this tag.
          </motion.p>
        )}
      </div>
    </>
  );
}