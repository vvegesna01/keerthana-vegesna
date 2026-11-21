"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
  const { lead, rest } = pickPosts(posts);

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
    <Section className="pt-2 pb-6 md:pt-4 md:pb-10">
      {/* Tab header */}
      <div className="mb-6 flex flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-heading tracking-tight">
            {tab === "projects" ? "Selected Projects" : "Field Notes"}
          </h2>
        </div>

        <div className="inline-flex bg-surface-alt rounded-full p-0.5 self-start sm:self-auto shadow-inner">
          {(["projects", "writing"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="relative px-3.5 py-1.5 text-xs font-semibold rounded-full focus:outline-none transition-colors"
            >
              {tab === t && (
                <motion.span
                  layoutId="showcase-tab-pill"
                  className="absolute inset-0 bg-surface rounded-full shadow-sm"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span
                className={`relative z-10 transition-colors duration-200 ${
                  tab === t ? "text-heading font-bold" : "text-muted hover:text-heading"
                }`}
              >
                {t === "projects" ? "Projects" : "Writing"}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main showcase zone */}
      <div className="relative overflow-visible">
        <AnimatePresence mode="wait">
          {tab === "projects" ? (
            <motion.div
              key="projects"
              variants={gridVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-flow-col grid-rows-[repeat(2,20.5rem)] auto-cols-[72%] overflow-x-scroll snap-x snap-mandatory scroll-px-6 gap-3.5 -mx-6 px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:px-0 md:pb-0 md:overflow-visible md:grid-flow-row md:grid-rows-none md:grid-cols-3 md:auto-cols-auto md:auto-rows-[190px]"
            >
              {PINNED.map((project, i) => {
                const primaryLink = project.links[0]?.href ?? "/projects";
                const isExternal = primaryLink.startsWith("http");

                return (
                  <Link
                    key={project.title}
                    href={primaryLink}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className={`block snap-start group cursor-pointer ${projectSpan(i, PINNED.length)}`}
                  >
                    <motion.div
                      variants={itemVariants}
                      whileHover={{ scale: 0.995, y: -2 }}
                      className="relative h-full rounded-2xl overflow-hidden bg-surface-alt border border-line shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/95 via-indigo-950/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                      <div className="absolute inset-x-0 bottom-0 p-5 z-10">
                        <div className="flex items-center justify-between gap-2">
                          <p
                            className={`text-white font-bold leading-tight ${
                              i === 0 ? "text-xl md:text-2xl" : "text-base"
                            }`}
                          >
                            {project.title}
                          </p>
                          <span className="text-white/70 group-hover:text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-sm font-semibold">
                            ↗
                          </span>
                        </div>

                        {i === 0 && (
                          <p className="mt-1.5 text-xs text-indigo-100/80 line-clamp-2 max-w-md hidden sm:block">
                            {project.summary}
                          </p>
                        )}

                        <div className="flex flex-wrap gap-1 mt-2.5">
                          {project.tags.slice(0, i === 0 ? 3 : 2).map((t) => (
                            <span
                              key={t}
                              className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-white/15 text-white/90 backdrop-blur-sm"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                );
              })}
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
                    className="group relative h-72 md:h-[376px] rounded-2xl overflow-hidden bg-surface-strong cursor-pointer shadow-sm hover:shadow-md transition-all duration-300"
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
                      <p className="font-mono text-accent-soft text-[11px] tracking-wide">
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
                        className="group flex items-center gap-4 py-3 px-3 rounded-xl hover:bg-surface hover:shadow-sm border border-transparent hover:border-line transition-all duration-200 cursor-pointer"
                      >
                        <div className="relative w-14 h-14 flex-shrink-0 rounded-xl overflow-hidden bg-surface-strong border border-line">
                          <PostCover post={post} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-heading leading-snug line-clamp-2 group-hover:text-accent transition-colors">
                            {post.title}
                          </p>
                          <div className="flex items-center gap-2.5 mt-1 flex-wrap">
                            <span className="font-mono text-[10px] text-subtle">{formatDate(post.date)}</span>
                            {post.tags[0] && <Tag label={post.tags[0]} />}
                          </div>
                        </div>
                        <span className="text-accent-soft bg-surface-alt group-hover:bg-brand group-hover:text-white p-2 rounded-full text-xs transform transition-all duration-300 group-hover:translate-x-0.5">
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

      {tab === "projects" && (
        <p className="md:hidden mt-2 text-[11px] font-mono text-subtle">swipe →</p>
      )}

      <div className="mt-6 text-right">
        <Link
          href={tab === "projects" ? "/projects" : "/blog"}
          className="text-xs text-accent hover:text-accent transition font-mono font-bold tracking-tight"
        >
          {tab === "projects" ? "All Projects →" : "All Writing →"}
        </Link>
      </div>
    </Section>
  );
}