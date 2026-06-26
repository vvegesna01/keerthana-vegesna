"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const projects = [
  { title: "Where Does Your Data Go?", image: "/images/projects/datago.png", link: "/projects", colSpan: "md:col-span-2", rowSpan: "md:row-span-2", large: true },
  { title: "Investogram", image: "/images/projects/investogram_profile.png", link: "/projects", colSpan: "", rowSpan: "", large: false },
  { title: "Book Club Dashboard", image: "/images/projects/krachbooks.gif", link: "/projects", colSpan: "", rowSpan: "", large: false },
  { title: "Eras Tour Tracker", image: "/images/projects/eras_tour.png", link: "/projects", colSpan: "md:col-span-2", rowSpan: "", large: false },
  { title: "Jot - Thought Capture Tool", image: "/images/projects/jot_triage.gif", link: "/projects", colSpan: "", rowSpan: "", large: false },
];

const posts = [
  { slug: "q1_books", title: "Quarterly Reading Recap", date: "2025-03-31", tags: ["books", "personal-essay"], coverImage: "/images/blog/babel.jpg" },
  { slug: "3_wheredoesyourdatago", title: "Where Does Your Data Go?", date: "2026-04-24", tags: ["coding-projects", "technical-learnings"], coverImage: "/images/blog/photo_upload.jpg" },
  { slug: "1_walkingallofnycinaday", title: "Walking all of NYC in a Day", date: "2025-06-08", tags: ["storytime"], coverImage: "/images/blog/nycstrava.png" },
  { slug: "typinggame", title: "How fast can you type?", date: "2026-04-27", tags: ["coding-projects"], coverImage: "/images/blog/keyboard.jpg" },
  { slug: "agentvsapi", title: "Building AI Agents vs API Design", date: "2025-01-15", tags: ["technical-learnings"], coverImage: "/images/blog/aivsapi.jpeg" },
];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

function Tag({ label }: { label: string }) {
  return (
    <span className="inline-block px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-500 text-[10px] font-medium tracking-wide">
      {label}
    </span>
  );
}

type Tab = "projects" | "writing";

export default function ShowcaseBrief() {
  const [tab, setTab] = useState<Tab>("projects");
  const [featured, ...rest] = posts;

  return (
    <section className="max-w-4xl mx-auto px-6 py-10">
      {/* Shared header — one heading governs both views, copy changes with the tab */}
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

        {/* Tab switch — sliding pill via framer-motion layoutId, so the
            highlight glides between buttons instead of just toggling color */}
        <div className="inline-flex bg-indigo-50 rounded-full p-1 self-start sm:self-auto">
          {(["projects", "writing"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="relative px-4 py-1.5 text-sm font-semibold rounded-full"
            >
              {tab === t && (
                <motion.span
                  layoutId="showcase-tab-pill"
                  className="absolute inset-0 bg-white rounded-full shadow-sm"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className={`relative z-10 ${tab === t ? "text-indigo-900" : "text-indigo-400"}`}>
                {t === "projects" ? "Projects" : "Field Notes"}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* AnimatePresence + mode="wait" so the outgoing view fully fades out
          before the incoming one fades in — prevents the two grids briefly
          overlapping mid-transition, which looks broken with layouts this different */}
      <AnimatePresence mode="wait">
        {tab === "projects" ? (
          <motion.div
            key="projects"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-3 auto-rows-[180px]"
          >
            {projects.map((project, i) => (
              <motion.a
                key={i}
                href={project.link}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className={`group relative rounded-2xl overflow-hidden bg-indigo-50 border border-indigo-100 ${project.colSpan} ${project.rowSpan}`}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/80 via-indigo-900/10 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className={`text-white font-semibold leading-tight ${project.large ? "text-lg" : "text-sm"}`}>
                    {project.title}
                  </p>
                  <p className="text-indigo-300 text-xs mt-1 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200">
                    View project →
                  </p>
                </div>
              </motion.a>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="writing"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-4 items-start"
          >
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
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/85 via-indigo-900/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="flex gap-1.5 mb-2 flex-wrap">
                    {featured.tags.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded-full bg-white/20 text-white text-[10px] tracking-wide backdrop-blur-sm">
                        {t}
                      </span>
                    ))}
                  </div>
                  <p className="text-white font-bold text-base leading-snug mb-1">{featured.title}</p>
                  <p className="font-mono text-indigo-300 text-[11px] tracking-wide">{formatDate(featured.date)}</p>
                </div>
              </motion.div>
            </Link>

            <div className="flex flex-col divide-y divide-indigo-50">
              {rest.map((post, i) => (
                <Link key={i} href={`/blog/${post.slug}`}>
                  <div className="group flex items-center gap-3 py-3 px-2 -mx-2 rounded-lg hover:bg-indigo-50 transition-colors duration-200">
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
                    <span className="text-indigo-300 text-sm flex-shrink-0 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200">→</span>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-6 text-right">
        <Link
          href={tab === "projects" ? "/projects" : "/blog"}
          className="text-xs text-indigo-400 hover:text-indigo-600 transition font-medium"
        >
          {tab === "projects" ? "All projects →" : "All posts →"}
        </Link>
      </div>
    </section>
  );
}