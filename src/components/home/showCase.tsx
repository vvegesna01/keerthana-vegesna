"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

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
    <span className="inline-block px-2 py-0.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-medium tracking-wide">
      {label}
    </span>
  );
}

type Tab = "projects" | "writing";

export default function ShowcaseBrief() {
  const [tab, setTab] = useState<Tab>("projects");
  const [hoveredType, setHoveredType] = useState<"project" | "writing" | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [featured, ...rest] = posts;

  // Track cursor position local to the interactive bento card component
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

  // Grid container orchestration animations
  const gridVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
  };

  return (
    <section className="max-w-4xl mx-auto px-6 py-10">
      {/* Tab Header Section */}
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
              <span className={`relative z-10 transition-colors duration-200 ${tab === t ? "text-indigo-900 font-bold" : "text-indigo-400 hover:text-indigo-600"}`}>
                {t === "projects" ? "Projects" : "Field Notes"}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Interactive Zone Boundary */}
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredType(null)}
        className="relative overflow-visible md:cursor-none"
      >
        {/* Dynamic Context Floating Target Label */}
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
              {projects.map((project, i) => (
                <motion.a
                  key={i}
                  href={project.link}
                  variants={itemVariants}
                  whileHover={{ scale: 0.99, y: -2 }}
                  onMouseEnter={() => setHoveredType("project")}
                  className={`group relative rounded-2xl overflow-hidden bg-indigo-50 border border-indigo-100 shadow-sm transition-all duration-300 ${project.colSpan} ${project.rowSpan}`}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/90 via-indigo-900/20 to-transparent opacity-70 group-hover:opacity-85 transition-opacity duration-300" />
                  <div className="absolute inset-x-0 bottom-0 p-5 z-10">
                    <p className={`text-white font-bold leading-tight ${project.large ? "text-xl md:text-2xl" : "text-sm"}`}>
                      {project.title}
                    </p>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="writing"
              variants={gridVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-4 items-start"
            >
              {/* Featured Left Card */}
              <Link href={`/blog/${featured.slug}`}>
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 0.99, y: -2 }}
                  onMouseEnter={() => setHoveredType("writing")}
                  className="group relative h-72 md:h-[376px] rounded-2xl overflow-hidden bg-indigo-100 cursor-pointer shadow-sm"
                >
                  <Image
                    src={featured.coverImage}
                    alt={featured.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/90 via-indigo-900/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 z-10">
                    <div className="flex gap-1.5 mb-2.5 flex-wrap">
                      {featured.tags.map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-medium tracking-wide backdrop-blur-md">
                          {t}
                        </span>
                      ))}
                    </div>
                    <p className="text-white font-extrabold text-lg md:text-xl leading-snug mb-1.5">{featured.title}</p>
                    <p className="font-mono text-indigo-300 text-[11px] tracking-wide">{formatDate(featured.date)}</p>
                  </div>
                </motion.div>
              </Link>

              {/* Stacked Right Column List */}
              <div className="flex flex-col gap-1.5">
                {rest.map((post, i) => (
                  <Link key={i} href={`/blog/${post.slug}`}>
                    <motion.div 
                      variants={itemVariants}
                      onMouseEnter={() => setHoveredType("writing")}
                      className="group flex items-center gap-4 py-3 px-3 rounded-xl hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-100 transition-all duration-200"
                    >
                      <div className="relative w-14 h-14 flex-shrink-0 rounded-xl overflow-hidden bg-indigo-100 border border-slate-100">
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
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
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                        </svg>
                      </span>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.div>
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
    </section>
  );
}