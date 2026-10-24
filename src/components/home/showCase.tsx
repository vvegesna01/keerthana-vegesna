"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import Section from "@/components/layout/Section";
import Tag from "@/components/ui/Tag";
import { PROJECTS } from "@/data/projects";

// ── Data ────────────────────────────────────────────────────────────

// Same shape your blog loader returns. Map to this in the server page
// (see the usage snippet) so this component never touches the filesystem.
export interface ShowcasePost {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  coverImage?: string;
  featured?: boolean;
}

// Single source of truth: whatever is `pinned` on the Projects page shows here.
const PINNED = PROJECTS.filter((p) => p.pinned);

// How many smaller posts sit beside the lead post
const SIDE_POSTS = 4;

function formatDate(dateStr: string) {
  // timeZone: "UTC" because "2026-10-16" parses as UTC midnight; formatting in
  // a negative-offset local zone would otherwise show the previous day.
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

// A post flagged `featured` leads; otherwise the newest one does.
// The rest follow newest-first.
function pickPosts(posts: ShowcasePost[]) {
  const sorted = [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const lead = sorted.find((p) => p.featured) ?? sorted[0];
  const rest = sorted.filter((p) => p !== lead).slice(0, SIDE_POSTS);
  return { lead, rest };
}

// Bento layout (3 columns, 180px rows) that adapts to however many projects are pinned:
//  - the first project is the big 2x2 card
//  - the next two stack beside it, completing a clean 3x2 block
//  - any further projects fill rows below; a short last row stretches its
//    final card so the grid never has holes
// (Tailwind needs full class names, so these stay as literal strings.)
function projectSpan(i: number, n: number): string {
  if (n === 1) return "md:col-span-3 md:row-span-2";
  if (n === 2) return i === 0 ? "md:col-span-2 md:row-span-2" : "md:row-span-2";
  if (i === 0) return "md:col-span-2 md:row-span-2";
  const extra = n - 3;
  if (extra > 0 && i === n - 1) {
    const orphans = extra % 3;
    if (orphans === 1) return "md:col-span-3";
    if (orphans === 2) return "md:col-span-2";
  }
  return "";
}

// Posts without a cover image get a soft gradient instead of a broken <Image>
function PostCover({ post }: { post: ShowcasePost }) {
  if (!post.coverImage) {
    return <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-indigo-200" />;
  }
  return (
    <Image
      src={post.coverImage}
      alt={post.title}
      fill
      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
    />
  );
}

type Tab = "projects" | "writing";

// ── Component ───────────────────────────────────────────────────────

export default function ShowcaseBrief({ posts }: { posts: ShowcasePost[] }) {
  const [tab, setTab] = useState<Tab>("projects");
  const [hoveredType, setHoveredType] = useState<"project" | "writing" | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { lead, rest } = pickPosts(posts);

  // Cursor position local to the interactive zone
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.6 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const gridVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } },
  };

  return (
    <Section className="py-10">
      {/* Tab header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-indigo-900 mb-1">
            {tab === "projects" ? "What I've built" : "What I've been writing"}
          </h2>
          <p className="text-gray-400 text-sm italic">
            {tab === "projects"
              ? "Things I've built for fun, curiosity, and exploration."
              : "Notes on what I've been thinking about and learning."}
          </p>
        </div>

        <div className="inline-flex bg-indigo-50 rounded-full p-1 self-start sm:self-auto shadow-inner">
          {(["projects", "writing"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="relative px-4 py-1.5 text-sm font-semibold rounded-full focus:outline-none"
            >
              {tab === t && (
                <motion.span
                  layoutId="showcase-tab-pill"
                  className="absolute inset-0 bg-white rounded-full shadow-sm"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span
                className={`relative z-10 transition-colors duration-200 ${
                  tab === t ? "text-indigo-900 font-bold" : "text-indigo-400 hover:text-indigo-600"
                }`}
              >
                {t === "projects" ? "Projects" : "Field Notes"}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Interactive zone */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredType(null)}
        className="relative overflow-visible md:cursor-none"
      >
        {/* Floating cursor label */}
        <AnimatePresence>
          {hoveredType && (
            <motion.div
              style={{
                left: cursorX,
                top: cursorY,
                translateX: "-50%",
                translateY: "-50%",
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute pointer-events-none z-40 hidden md:flex items-center justify-center font-mono font-bold text-[11px] uppercase tracking-wider text-white bg-indigo-950 px-4 py-2 rounded-full shadow-xl border border-indigo-800/30 backdrop-blur-sm"
            >
              {hoveredType === "project" ? "Explore Project →" : "Read Note ↗"}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {tab === "projects" ? (
            <motion.div
              key="projects"
              variants={gridVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-3 auto-rows-[180px]"
            >
              {PINNED.map((project, i) => (
                // The Link is the grid child (it carries the span classes);
                // the motion.div inside fills it. Link also avoids the full
                // page reload the old <a> caused.
                <Link
                  key={project.title}
                  href="/projects"
                  className={`block ${projectSpan(i, PINNED.length)}`}
                >
                  <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 0.99, y: -2 }}
                    onMouseEnter={() => setHoveredType("project")}
                    className="group relative h-full rounded-2xl overflow-hidden bg-indigo-50 border border-indigo-100 shadow-sm transition-all duration-300"
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/90 via-indigo-900/20 to-transparent opacity-70 group-hover:opacity-85 transition-opacity duration-300" />
                    <div className="absolute inset-x-0 bottom-0 p-5 z-10">
                      <p
                        className={`text-white font-bold leading-tight ${
                          i === 0 ? "text-xl md:text-2xl" : "text-sm"
                        }`}
                      >
                        {project.title}
                      </p>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </motion.div>
          ) : (
            lead && (
              <motion.div
                key="writing"
                variants={gridVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-4 items-start"
              >
                {/* Lead post */}
                <Link href={`/blog/${lead.slug}`}>
                  <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 0.99, y: -2 }}
                    onMouseEnter={() => setHoveredType("writing")}
                    className="group relative h-72 md:h-[376px] rounded-2xl overflow-hidden bg-indigo-100 cursor-pointer shadow-sm"
                  >
                    <PostCover post={lead} />
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/90 via-indigo-900/20 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6 z-10">
                      <div className="flex gap-1.5 mb-2.5 flex-wrap">
                        {lead.tags.map((t) => (
                          <Tag key={t} label={t} variant="featured" />
                        ))}
                      </div>
                      <p className="text-white font-extrabold text-lg md:text-xl leading-snug mb-1.5">
                        {lead.title}
                      </p>
                      <p className="font-mono text-indigo-300 text-[11px] tracking-wide">
                        {formatDate(lead.date)}
                      </p>
                    </div>
                  </motion.div>
                </Link>

                {/* Recent posts */}
                <div className="flex flex-col gap-1.5">
                  {rest.map((post) => (
                    <Link key={post.slug} href={`/blog/${post.slug}`}>
                      <motion.div
                        variants={itemVariants}
                        onMouseEnter={() => setHoveredType("writing")}
                        className="group flex items-center gap-4 py-3 px-3 rounded-xl hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-100 transition-all duration-200"
                      >
                        <div className="relative w-14 h-14 flex-shrink-0 rounded-xl overflow-hidden bg-indigo-100 border border-slate-100">
                          <PostCover post={post} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-indigo-950 leading-snug line-clamp-2 group-hover:text-indigo-600 transition-colors">
                            {post.title}
                          </p>
                          <div className="flex items-center gap-2.5 mt-1 flex-wrap">
                            <span className="font-mono text-[10px] text-gray-400">{formatDate(post.date)}</span>
                            {post.tags[0] && <Tag label={post.tags[0]} />}
                          </div>
                        </div>
                        <span className="text-indigo-400 bg-indigo-50 group-hover:bg-indigo-950 group-hover:text-white p-2 rounded-full text-xs transform transition-all duration-300 group-hover:translate-x-0.5">
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.5}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                            />
                          </svg>
                        </span>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>

      <div className="mt-6 text-right">
        <Link
          href={tab === "projects" ? "/projects" : "/blog"}
          className="text-xs text-indigo-500 hover:text-indigo-700 transition font-mono font-bold tracking-tight"
        >
          {tab === "projects" ? "All Projects →" : "All Writing →"}
        </Link>
      </div>
    </Section>
  );
}