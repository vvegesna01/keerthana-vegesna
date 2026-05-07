"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const posts = [
  {
    slug: "smallsoftware",
    title: "The Joy of Building Small, Personal Software",
    date: "2026-05-05",
    tags: ["coding-projects", "personal-essay"],
    coverImage: "/images/blog/jot_triage.png",
  },
  {
    slug: "3_wheredoesyourdatago",
    title: "Where Does Your Data Go?",
    date: "2026-04-24",
    tags: ["coding-projects"],
    coverImage: "/images/blog/photo_upload.jpg",
  },
  {
    slug:"typinggame",
    title:"How fast can you type?",
    date: "2026-04-27",
    tags: ["coding-projects"],
    coverImage: "/images/blog/keyboard.jpg",
  },
  {
    slug: "1_walkingallofnycinaday",
    title: "Walking all of NYC in a Day",
    date: "2025-06-08",
    tags: ["storytime"],
    coverImage: "/images/blog/nycstrava.png",
  },
];

export default function BlogBrief() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-10">

      {/* Header */}
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-indigo-900 hover:text-purple-500 transition mb-2">
            <Link href="/blog">Field Notes</Link>
          </h2>
          <p className="text-gray-500 text-sm">
            What I&apos;ve been thinking and writing about.
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="flex gap-4 overflow-x-auto pb-2">
        {posts.map((post, i) => (
          <Link key={i} href={`/blog/${post.slug}`}>
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="min-w-[200px] bg-indigo-50 border border-indigo-100 rounded-lg p-4 flex flex-col gap-3"
            >
              {/* Cover image */}
              {post.coverImage && (
                <div className="relative w-full h-24 bg-white rounded-md overflow-hidden">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {/* Post info */}
              <div>
                <p className="text-xs text-indigo-400 uppercase tracking-widest">
                  {new Date(post.date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
                <p className="text-sm font-semibold text-indigo-900 mt-1 line-clamp-2">
                  {post.title}
                </p>
                {post.tags.length > 0 && (
                  <p className="text-xs text-indigo-400 mt-1">
                    {post.tags[0]}
                  </p>
                )}
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

    </section>
  );
}