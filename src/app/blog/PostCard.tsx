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
      <div className="group relative border border-slate-100 bg-white rounded-2xl p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
        
        {/* Decorative left brand identity line */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-l-2xl" />

        <div className="flex items-center gap-5">
          
          {/* Enhanced Image Frame Panel */}
          {post.coverImage && (
            <div className="relative w-24 h-24 shrink-0 rounded-xl border border-slate-100 bg-slate-50 overflow-hidden hidden sm:block">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className={`object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] ${imgLoaded ? "opacity-100" : "opacity-0"}`}
                onLoad={() => setImgLoaded(true)}
              />
            </div>
          )}

          {/* Information Block */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-1">
              <span className="font-mono text-[10px] text-slate-400 font-medium">
                {new Date(post.date).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </span>
              <span className="text-slate-300 text-xs hidden sm:inline">·</span>
              <span className="font-mono text-[10px] text-slate-400">{post.readingTime} min read</span>
            </div>

            <h2 className="text-sm sm:text-base font-bold text-indigo-950 group-hover:text-indigo-600 transition-colors duration-200 leading-snug line-clamp-1 tracking-tight">
              {post.title}
            </h2>
            
            <p className="text-xs text-slate-500 line-clamp-2 mt-0.5 max-w-2xl font-normal leading-relaxed">
              {post.description}
            </p>

            {/* Tags Inline Code Block tags */}
            <div className="flex flex-wrap gap-1 mt-2">
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-1.5 py-0.5 font-mono text-[9px] rounded bg-indigo-50/50 border border-indigo-100/30 text-indigo-600 font-medium tracking-wide uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Slide Arrow Reveal Indicator */}
          <span className="text-indigo-400 bg-indigo-50/60 group-hover:bg-indigo-950 group-hover:text-white p-2 rounded-full text-xs transform opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 flex-shrink-0 hidden sm:block">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
            </svg>
          </span>

        </div>
      </div>
    </Link>
  );
}