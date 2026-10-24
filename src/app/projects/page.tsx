"use client";
import React, { useState, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useInView, useMotionValue, useSpring } from "framer-motion";
import PageContainer from "@/components/layout/PageContainer";
import PageHeader from "@/components/layout/PageHeader";
import Tag from "@/components/ui/Tag";
import Button from "@/components/ui/Button";
import { CATEGORIES, PROJECTS, OLD_PORTFOLIO, type Category, type Project } from "@/data/projects";
// // ── Data ────────────────────────────────────────────────────────────

// // What kind of thing is it? Filters use this instead of tech tags, since a
// // reader scanning a portfolio wants "is this serious?", not "does it use React?".
// // Tech tags still show on each card.
// type Category = "Products" | "Tools" | "Data viz" | "Coursework";
// const CATEGORIES: Category[] = ["Products", "Tools", "Data viz", "Coursework"];

// interface Project {
//   title: string;
//   image: string;
//   category: Category;
//   // Pinned projects get the large stacked cards at the top. Everything else
//   // goes in the compact grid under "More things I've built".
//   pinned?: boolean;
//   // Honest in-progress label instead of a dead "coming soon" button.
//   status?: string;
//   description: string[];
//   tags: string[];
//   links: { label: string; href: string }[];
//   accent?: string;
// }

// const PROJECTS: Project[] = [
//   {
//     title: "AfterWord",
//     image: "/images/projects/aw_mockup.jpeg",
//     category: "Products",
//     pinned: true,
//     tags: ["React", "TypeScript", "FastAPI", "PostgreSQL", "Mobile App"],
//     accent: "#eef2ff",
//     description: [
//       "AI-powered reading companion that transforms Kindle highlights into a searchable personal knowledge platform",
//       "Semantic retrieval, vector search, AI-generated insights, reading analytics, and scalable ingestion pipelines",
//     ],
//     links: [
//       { label: "Get AfterWord", href: "https://getafterword.vercel.app/" },
//       { label: "Blog Post", href: "/blog/devlog2" },
//     ],
//   },
//   {
//     title: "Pigeon Post",
//     image: "/images/projects/pigeon_post.png", 
//     category: "Tools",
//     pinned: true,
//     tags: ["HTML/CSS/JS", "Local-first", "Email"],
//     accent: "#f5f0e8",
//     description: [
//       "Journaling tool that turns diary entries into styled letters you email to yourself, making your inbox a searchable archive",
//       "11 email templates, a perforated postage-stamp maker, and sign-off icons, built as a single zero-backend HTML file with local-only storage and .eml export",
//     ],
//     links: [
//       { label: "Try Pigeon Post", href: "https://pigeon-poster.vercel.app/" },
//       { label: "Source Code", href: "https://github.com/vvegesna01/Pigeon-Post" },
//       { label: "Blog Post", href: "/blog/pigeonpost" },
//     ],
//   },
//   {
//     title: "KrachBooks",
//     image: "/images/projects/krachbooks_mockup1.png",
//     category: "Products",
//     pinned: true,
//     tags: ["Python", "Streamlit", "Data Viz", "Dashboard"],
//     accent: "#fff7ed",
//     description: [
//       "Stats dashboard and badge tracker for a friend group book club",
//       "Parses monthly CSV exports, Plotly charts, per-member badges, and a spin-wheel curator picker",
//     ],
//     links: [
//       { label: "Check it out!", href: "/blog/krachbooks" },
//       { label: "Source Code", href: "https://github.com/vvegesna01/KrachBooks" },
//     ],
//   },
//   {
//     title: "Jot",
//     image: "/images/projects/jot_triage.gif",
//     category: "Tools",
//     pinned: true,
//     status: "Mac download coming soon",
//     tags: ["Electron", "macOS"],
//     accent: "#fefce8",
//     description: [
//       "Global hotkey summons a minimal floating input — capture thoughts without breaking flow",
//       "Inline syntax (#folder, !priority, due:date) parsed in real time with a full triage window",
//     ],
//     links: [{ label: "Blog Post", href: "/blog/smallsoftware" }],
//   },
//     {
//     title: "Where Does Your Data Go?",
//     image: "/images/projects/datago_mockup.png",
//     category: "Data viz",
//     tags: ["Python", "Streamlit", "Data Viz"],
//     accent: "#f0fdf4",
//     description: [
//       "Visualizes the real-time journey of your data across CDNs, load balancers, servers, and storage",
//       "Four animated scenarios: photo upload, message, search, and video stream",
//     ],
//     links: [
//       { label: "Visit Live App", href: "https://where-does-your-data-go.streamlit.app/" },
//       { label: "Source Code", href: "https://github.com/vvegesna01/Where-Does-Your-Data-Go" },
//       // Slug matches the blog index (3_wheredoesyourdatago). The old link
//       // pointed at /blog/wheredoesyourdatago, which doesn't exist there.
//       { label: "Blog Post", href: "/blog/3_wheredoesyourdatago" },
//     ],
//   },
//   {
//     title: "Obsidian Movie Vault",
//     image: "/images/projects/add_movie.gif",
//     category: "Tools",
//     status: "Tutorial coming soon",
//     tags: ["Obsidian"],
//     accent: "#fdf4ff",
//     description: [
//       "Personal movie database inside Obsidian — IMDb API pulls metadata, Dataview handles dynamic queries",
//       "Sort and filter by genre, rating, or watch status; a lightweight local alternative to tracking apps",
//     ],
//     links: [],
//   },
//   {
//     title: "Design Detective 🔎",
//     image: "/images/projects/font_detective.gif",
//     category: "Tools",
//     tags: ["HTML/CSS/JS", "Browser Extension"],
//     accent: "#fffbeb",
//     description: [
//       "Hover over any font or color on any website and copy the font name or hex code instantly",
//     ],
//     links: [{ label: "Download Extension", href: "https://github.com/vvegesna01/Design-Detective" }],
//   },
//   {
//     title: "Shelf This",
//     image: "/images/projects/shelf_this.png",
//     category: "Data viz",
//     tags: ["Python", "Streamlit", "Data Viz", "Dashboard"],
//     accent: "#f0f9ff",
//     description: [
//       "Dashboard to visualise reading habits from Goodreads / Storygraph exports",
//       "Stats: Highest Rated Reads, Books by Format, Reading Pace, and more",
//     ],
//     links: [
//       { label: "Source Code", href: "https://github.com/vvegesna01/ShelfThis" },
//       { label: "Go to Website", href: "https://shelfthis.streamlit.app/" },
//     ],
//   },
//   {
//     title: "The Eras Tour Tracker",
//     image: "/images/projects/eras_mockup.png",
//     category: "Data viz",
//     tags: ["React", "Next.js", "Data Viz", "Dashboard"],
//     accent: "#fdf2f8",
//     description: [
//       "Geo-coded tracker for Taylor Swift's Eras Tour — venues, openers, and song analytics on a live map",
//       "Dynamic visual representation of setlists and venue info across all devices",
//     ],
//     links: [
//       { label: "Source Code", href: "https://github.com/vvegesna01/eras-tour-tracker" },
//       { label: "Go to Website", href: "https://eras-tour-tracker.vercel.app/" },
//     ],
//   },
//   {
//     title: "Investogram",
//     image: "/images/projects/investogram_profile.png",
//     category: "Coursework",
//     tags: ["React", "Next.js", "MongoDB", "Dashboard"],
//     accent: "#ecfdf5",
//     description: [
//       "Beginner trading app with play money — learn investing by doing, with a live social feed",
//       "Portfolio dashboard, leaderboard, and full social layer: posts, comments, likes",
//     ],
//     links: [
//       { label: "Source Code", href: "https://github.com/CS-407/Investogram-Frontend" },
//       { label: "Demo Slides", href: "https://docs.google.com/presentation/d/1m5OFbwTUwbOdZnJzoAFLw9boNMa-b-4CzSh_a33uPkQ" },
//     ],
//   },
//   {
//     title: "PurduePAL",
//     image: "/images/projects/purduePAL.png",
//     category: "Coursework",
//     tags: ["React", "Python", "MongoDB"],
//     accent: "#f5f3ff",
//     description: [
//       "Social media app for Purdue students — posts, comments, likes, and interest-based pages",
//       "Anonymous posting, profile customization with bio, photo, and username",
//     ],
//     links: [{ label: "Source Code", href: "https://github.com/CS307Spring2022/PurduePAL-Backend" }],
//   },
//   {
//     title: "Shell Project",
//     image: "/images/projects/shell.png",
//     category: "Coursework",
//     tags: ["C", "Systems Programming"],
//     accent: "#f8fafc",
//     description: [
//       "Shell interpreter in C++ replicating csh and bash: piping, redirection, subshell, wildcard expansion",
//       "Command history, path completion, exit signal handling, and environment variable expansion",
//     ],
//     // TODO: add your own repo here if it's public. The old links pointed at
//     // the csh/bash docs, which say nothing about your work. If the repo has to
//     // stay private for course policy, leaving this empty is fine.
//     links: [],
//   },
// ];

// // The original site, kept as a quiet footnote instead of a card with no description.
// const OLD_PORTFOLIO = {
//   site: "https://vvegesna01.github.io/old-portfolio/",
//   repo: "https://github.com/vvegesna01/old-portfolio",
// };

// ── Helpers ─────────────────────────────────────────────────────────

const isExternal = (href: string) => /^https?:\/\//.test(href);

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const cellVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

function StatusBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-semibold text-amber-800">
      {label}
    </span>
  );
}

// ── Featured card (large, stacked) ───────────────────────────────────

function ProjectCard({ project, index, total }: { project: Project; index: number; total: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const primaryLink = project.links[0];
  const stickyTop = 80 + index * 14;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <div ref={ref} style={{ zIndex: index + 1 }} className="relative">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "sticky",
          top: stickyTop,
          backgroundColor: project.accent ?? "#fff",
        }}
        className="rounded-2xl overflow-hidden shadow-md border border-black/5"
      >
        <div className="grid grid-cols-1 md:grid-cols-5 min-h-[480px]">
          {/* Left: content */}
          <div className="md:col-span-2 flex flex-col justify-between p-8 md:p-10">
            <div>
              <div className="flex flex-wrap items-center gap-1 mb-5">
                {project.status && <StatusBadge label={project.status} />}
                {project.tags.map((tag) => (
                  <Tag key={tag} label={tag} variant="project-mono" />
                ))}
              </div>

              <h2 className="text-2xl md:text-3xl font-extrabold text-indigo-950 tracking-tight leading-tight mb-5">
                {project.title}
              </h2>

              {project.description.length > 0 && (
                <ul className="space-y-3">
                  {project.description.map((point, i) => (
                    <li key={i} className="flex gap-3 text-sm text-slate-600 leading-relaxed">
                      <span className="mt-2 shrink-0 w-1.5 h-1.5 rounded-full bg-indigo-400" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {project.links.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-8">
                {project.links.map((link) => (
                  <Button
                    key={link.label}
                    href={link.href}
                    variant="primary"
                    size="sm"
                    // Only external links open a new tab; blog links stay in-site
                    target={isExternal(link.href) ? "_blank" : undefined}
                  >
                    {link.label}
                  </Button>
                ))}
              </div>
            )}
          </div>

          {/* Right: media */}
          {primaryLink ? (
            <Link
              href={primaryLink.href}
              target={isExternal(primaryLink.href) ? "_blank" : undefined}
              rel={isExternal(primaryLink.href) ? "noopener noreferrer" : undefined}
              className="md:col-span-3 relative overflow-hidden min-h-[260px] cursor-none block"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              onMouseMove={handleMouseMove}
            >
              <motion.div
                animate={{ scale: hovered ? 1.035 : 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute inset-0 h-full w-full"
              >
                <Image src={project.image} alt={project.title} fill className="object-cover" unoptimized />
              </motion.div>

              <div
                className="absolute inset-y-0 left-0 w-16 pointer-events-none z-10"
                style={{ background: `linear-gradient(to right, ${project.accent ?? "#fff"}, transparent)` }}
              />

              <AnimatePresence>
                {hovered && (
                  <motion.div
                    style={{ left: cursorX, top: cursorY, translateX: "-50%", translateY: "-50%" }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute pointer-events-none z-30 hidden md:flex items-center gap-1.5 bg-indigo-950 text-white font-bold text-xs rounded-full px-5 py-3 shadow-xl whitespace-nowrap"
                  >
                    Go to project
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>
            </Link>
          ) : (
            // Nothing to link to yet: show the image as-is, no fake hover state
            <div className="md:col-span-3 relative overflow-hidden min-h-[260px]">
              <Image src={project.image} alt={project.title} fill className="object-cover" unoptimized />
              <div
                className="absolute inset-y-0 left-0 w-16 pointer-events-none"
                style={{ background: `linear-gradient(to right, ${project.accent ?? "#fff"}, transparent)` }}
              />
            </div>
          )}
        </div>

        <div className="absolute bottom-3 right-4 text-xs font-semibold text-black/20 tabular-nums select-none">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </div>
      </motion.div>
      <div className="h-6" />
    </div>
  );
}

// ── Compact card (the "more" grid) ───────────────────────────────────

function CompactProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      variants={cellVariants}
      className="group flex flex-col overflow-hidden rounded-2xl border border-black/5 shadow-sm transition-shadow duration-300 hover:shadow-lg"
      style={{ backgroundColor: project.accent ?? "#fff" }}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          unoptimized
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        {project.status && (
          <div className="mb-2">
            <StatusBadge label={project.status} />
          </div>
        )}

        <h3 className="text-lg font-extrabold leading-tight tracking-tight text-indigo-950">{project.title}</h3>

        {/* One line of context; the featured cards carry the full detail */}
        {project.description[0] && (
          <p className="mt-2 text-sm leading-relaxed text-slate-600 line-clamp-3">{project.description[0]}</p>
        )}

        <div className="mt-3 flex flex-wrap gap-1">
          {project.tags.slice(0, 3).map((tag) => (
            <Tag key={tag} label={tag} variant="project-mono" />
          ))}
        </div>

        {project.links.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-4 text-xs font-bold">
            {project.links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target={isExternal(link.href) ? "_blank" : undefined}
                rel={isExternal(link.href) ? "noopener noreferrer" : undefined}
                className="text-indigo-900 underline-offset-4 transition-colors hover:text-indigo-500 hover:underline"
              >
                {link.label} →
              </Link>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
}

// ── Page ─────────────────────────────────────────────────────────────

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);

  // Derived from data, fixed order, empty categories skipped, so chips
  // self-maintain as you add projects.
  const categoryCounts = useMemo(
    () =>
      CATEGORIES.map((c) => [c, PROJECTS.filter((p) => p.category === c).length] as const).filter(
        ([, count]) => count > 0
      ),
    []
  );

  const filtered = useMemo(
    () => (activeCategory ? PROJECTS.filter((p) => p.category === activeCategory) : PROJECTS),
    [activeCategory]
  );
  const featured = filtered.filter((p) => p.pinned);
  const more = filtered.filter((p) => !p.pinned);
  const showSectionLabels = featured.length > 0 && more.length > 0;

  return (
    <PageContainer
      className="bg-gray-50/30 text-slate-900 selection:bg-indigo-100 selection:text-indigo-900"
      size="default"
    >
      <PageHeader
        title="Projects"
        subtitle="Things I've built: data dashboards, social apps, shell interpreters, and more."
        animate={false}
      />

      {/* ── Filter bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="mt-10 border-b border-slate-200/60 pb-6"
      >
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setActiveCategory(null)}
            className="relative px-3.5 py-1.5 text-xs font-bold rounded-xl focus:outline-none transition-colors duration-200"
          >
            {activeCategory === null && (
              <motion.span
                layoutId="projects-tag-pill"
                className="absolute inset-0 bg-indigo-950 rounded-xl"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span
              className={`relative z-10 flex items-center gap-1.5 ${
                activeCategory === null ? "text-white" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              All
              <span
                className={`text-[10px] font-mono px-1 rounded ${
                  activeCategory === null ? "bg-indigo-800 text-indigo-200" : "bg-slate-100 text-slate-400"
                }`}
              >
                {PROJECTS.length}
              </span>
            </span>
          </button>

          {categoryCounts.map(([category, count]) => (
            <button
              key={category}
              onClick={() => setActiveCategory(activeCategory === category ? null : category)}
              className="relative px-3.5 py-1.5 text-xs font-bold rounded-xl focus:outline-none transition-colors duration-200"
            >
              {activeCategory === category && (
                <motion.span
                  layoutId="projects-tag-pill"
                  className="absolute inset-0 bg-indigo-950 rounded-xl"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span
                className={`relative z-10 flex items-center gap-1.5 uppercase tracking-wider ${
                  activeCategory === category ? "text-white" : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {category}
                <span
                  className={`text-[10px] font-mono px-1 rounded ${
                    activeCategory === category ? "bg-indigo-800 text-indigo-200" : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {count}
                </span>
              </span>
            </button>
          ))}
        </div>

        <AnimatePresence>
          {activeCategory && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="mt-4 text-sm text-indigo-400"
            >
              Showing {filtered.length} project{filtered.length !== 1 ? "s" : ""} in{" "}
              <span className="font-semibold text-indigo-600">{activeCategory}</span>
              {" · "}
              <button
                onClick={() => setActiveCategory(null)}
                className="underline underline-offset-2 hover:text-indigo-800 transition-colors"
              >
                Clear filter
              </button>
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── Featured: large stacked cards ── */}
      {featured.length > 0 && (
        <section className="mt-8">
          {showSectionLabels && (
            <p className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-400">Featured</p>
          )}
          {featured.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} total={featured.length} />
          ))}
        </section>
      )}

      {/* ── More: compact grid ── */}
      {more.length > 0 && (
        <section className={featured.length > 0 ? "mt-12" : "mt-8"}>
          {showSectionLabels && (
            <p className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              More things I&apos;ve built
              <span className="rounded bg-slate-100 px-1 font-mono text-[10px] text-slate-400">{more.length}</span>
            </p>
          )}
          {/* key remounts the grid on filter change so the stagger replays */}
          <motion.div
            key={activeCategory ?? "all"}
            variants={gridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {more.map((project) => (
              <CompactProjectCard key={project.title} project={project} />
            ))}
          </motion.div>
        </section>
      )}

      <p className="mt-16 mb-4 text-center text-xs text-slate-400">
        Curious what came before this site?{" "}
        <Link
          href={OLD_PORTFOLIO.site}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-indigo-900 underline-offset-4 hover:underline"
        >
          The original portfolio
        </Link>{" "}
        ·{" "}
        <Link
          href={OLD_PORTFOLIO.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-indigo-900 underline-offset-4 hover:underline"
        >
          source
        </Link>
      </p>
    </PageContainer>
  );
}