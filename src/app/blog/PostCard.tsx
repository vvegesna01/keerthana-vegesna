"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import Tag from "@/components/ui/Tag";

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
      <div className="group relative border border-line bg-surface rounded-2xl p-4 hover:border-indigo-300 transition-colors duration-300">
        
        <div className="flex items-center gap-5">
          
          {/* Enhanced Image Frame Panel */}
          {post.coverImage && (
            <div className="relative w-24 h-24 shrink-0 rounded-xl border border-line bg-slate-50 overflow-hidden hidden sm:block">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className={`object-cover transition-transform duration-500 ease-out ${imgLoaded ? "opacity-100" : "opacity-0"}`}
                onLoad={() => setImgLoaded(true)}
              />
            </div>
          )}

          {/* Information Block */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-1">
              <span className="font-mono text-[10px] text-subtle font-medium">
                {new Date(post.date).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </span>
              <span className="text-subtle text-xs hidden sm:inline">·</span>
              <span className="font-mono text-[10px] text-subtle">{post.readingTime} min read</span>
            </div>

            <h2 className="text-sm sm:text-base font-bold text-heading group-hover:text-accent transition-colors duration-200 leading-snug line-clamp-1 tracking-tight">
              {post.title}
            </h2>
            
            <p className="text-xs text-muted line-clamp-2 mt-0.5 max-w-2xl font-normal leading-relaxed">
              {post.description}
            </p>

            {/* Tags Inline Code Block tags */}
            <div className="flex flex-wrap gap-1 mt-2">
              {post.tags.map((tag: string) => (
                <Tag
                  key={tag}
                  label={tag}
                  variant="mono"
                />
              ))}
            </div>
          </div>

          {/* Slide Arrow Reveal Indicator */}
          <span className="text-accent-soft opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0 hidden sm:block">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
            </svg>
          </span>

        </div>
      </div>
    </Link>
  );
}