"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime: number;
  coverImage: string | null;
};

export default function PostCard({ post }: { post: Post }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <Link href={`/blog/${post.slug}`}>
      <div className="group relative border border-gray-100 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden bg-white">

        {/* Left accent bar */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-l-xl" />

        <div className="flex">

          {/* Cover image panel */}
          {post.coverImage && (
            <div className="relative w-40 shrink-0 bg-indigo-50 overflow-hidden">
              {!imgLoaded && (
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-indigo-50 animate-pulse" />
              )}
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                  imgLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setImgLoaded(true)}
              />
              <div className="absolute inset-0 bg-indigo-900/0 group-hover:bg-indigo-900/10 transition-all duration-300" />
            </div>
          )}

          {/* Content */}
          <div className="flex-1 p-5 flex flex-col justify-between gap-3 min-w-0">
            <div>
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-2">
                {post.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="inline-block bg-indigo-50 border border-indigo-100 text-indigo-500 text-xs font-semibold uppercase tracking-widest rounded-full px-3 py-0.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h2 className="text-lg font-extrabold text-indigo-900 group-hover:text-purple-500 transition-colors duration-300 leading-tight mb-1">
                {post.title}
              </h2>

              {/* Description */}
              <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                {post.description}
              </p>
            </div>

            {/* Meta */}
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <span>
                {new Date(post.date).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </span>
              <span>·</span>
              <span>{post.readingTime} min read</span>
            </div>
          </div>

        </div>
      </div>
    </Link>
  );
}