"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const posts = [
    {
    slug: "1_walkingallofnycinaday",
    title: "Walking all of NYC in a Day",
    date: "2025-06-08",
    tags: ["storytime"],
    coverImage: "/images/blog/nycstrava.png",
  },
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
    slug: "typinggame",
    title: "How fast can you type?",
    date: "2026-04-27",
    tags: ["coding-projects"],
    coverImage: "/images/blog/keyboard.jpg",
  },
  {
    slug: "agentvsapi",
    title: "Building AI Agents vs API Design",
    date: "2025-01-15",
    tags: ["technical-learnings"],
    coverImage: "/images/blog/aivsapi.jpeg",
  },
];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// Tag pill — keeps the colour consistent with the indigo palette
function Tag({ label }: { label: string }) {
  return (
    <span className="inline-block px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-500 text-[10px] font-medium tracking-wide">
      {label}
    </span>
  );
}

export default function BlogBrief() {
  const [featured, ...rest] = posts;

  return (
    <section className="max-w-4xl mx-auto px-6 py-10">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-indigo-900 hover:text-purple-500 transition mb-1">
            <Link href="/blog">🗒 Field Notes</Link>
          </h2>
          <p className="text-gray-400 text-sm italic">
            What I&apos;ve been thinking and writing about.
          </p>
        </div>
        <Link href="/blog" className="text-xs text-indigo-400 hover:text-indigo-600 transition font-medium">
          All posts →
        </Link>
      </div>

      {/*
        Magazine layout:
        Left — large featured card (cover image fills it, title overlaid)
        Right — compact text list of the remaining posts
      */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-4 items-start">

        {/* Featured post — image-dominant card */}
        <Link href={`/blog/${featured.slug}`}>
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="group relative h-72 md:h-80 rounded-2xl overflow-hidden bg-indigo-100 cursor-pointer"
          >
            <Image
              src={featured.coverImage}
              alt={featured.title}
              fill
              className="object-cover transition-transform opacity-90 duration-500 group-hover:scale-105"
            />

            {/* Gradient scrim so text is readable over any image */}
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/85 via-indigo-900/20 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-5">
              <div className="flex gap-1.5 mb-2 flex-wrap">
                {featured.tags.map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded-full bg-white/20 text-white text-[10px] tracking-wide backdrop-blur-sm">
                    {t}
                  </span>
                ))}
              </div>
              <p className="text-white font-bold text-base leading-snug mb-1">
                {featured.title}
              </p>
              <p className="font-mono text-indigo-300 text-[11px] tracking-wide">
                {formatDate(featured.date)}
              </p>
            </div>
          </motion.div>
        </Link>

        {/* Remaining posts — compact text rows */}
        <div className="flex flex-col divide-y divide-indigo-50">
          {rest.map((post, i) => (
            <Link key={i} href={`/blog/${post.slug}`}>
              <div className="
                group flex items-center gap-3
                py-3 px-2 -mx-2 rounded-lg
                hover:bg-indigo-50
                transition-colors duration-200
              ">
                {/* Thumbnail — small, square */}
                <div className="relative w-14 h-14 flex-shrink-0 rounded-lg overflow-hidden bg-indigo-100">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-indigo-900 leading-snug line-clamp-2 group-hover:text-purple-600 transition-colors">
                    {post.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="font-mono text-[10px] text-indigo-300">{formatDate(post.date)}</span>
                    {post.tags[0] && <Tag label={post.tags[0]} />}
                  </div>
                </div>

                {/* Arrow — appears on hover */}
                <span className="
                  text-indigo-300 text-sm flex-shrink-0
                  opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0
                  transition-all duration-200
                ">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}