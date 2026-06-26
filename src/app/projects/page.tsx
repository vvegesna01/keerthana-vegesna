"use client";
import React, { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useInView, useMotionValue, useSpring } from "framer-motion";

// ── Data ────────────────────────────────────────────────────────────

interface Project {
  title: string;
  image: string;
  description: string[];
  tags: string[];
  links: { label: string; href: string; disabled?: boolean }[];
  accent?: string;
}

const PROJECTS: Project[] = [
  {
    title: "AfterWord",
    image: "/images/blog/notes_afterword_dashboard.png",
    tags: ["React", "TypeScript", "FastAPI", "PostgreSQL", "Mobile App"],
    accent: "#eef2ff",
    description: [
      "AI-powered reading companion that transforms Kindle highlights into a searchable personal knowledge platform",
      "Semantic retrieval, vector search, AI-generated insights, reading analytics, and scalable ingestion pipelines",
    ],
    links: [
      { label: "Get AfterWord", href: "https://getafterword.vercel.app/" },
      { label: "Blog Post", href: "./blog/devlog2" },
    ],
  },
  {
    title: "Where Does Your Data Go?",
    image: "/images/projects/datago.png",
    tags: ["Python", "Streamlit", "Data Viz"],
    accent: "#f0fdf4",
    description: [
      "Visualizes the real-time journey of your data across CDNs, load balancers, servers, and storage",
      "Four animated scenarios: photo upload, message, search, and video stream",
    ],
    links: [
      { label: "Visit Live App", href: "https://where-does-your-data-go.streamlit.app/" },
      { label: "Source Code", href: "https://github.com/vvegesna01/Where-Does-Your-Data-Go" },
      { label: "Blog Post", href: "./blog/wheredoesyourdatago" },
    ],
  },
  {
    title: "Jot",
    image: "/images/projects/jot_triage.gif",
    tags: ["Electron", "macOS"],
    accent: "#fefce8",
    description: [
      "Global hotkey summons a minimal floating input — capture thoughts without breaking flow",
      "Inline syntax (#folder, !priority, due:date) parsed in real time with a full triage window",
    ],
    links: [
      { label: "Download dmg (Coming Soon!)", href: "", disabled: true },
      { label: "Blog Post", href: "./blog/smallsoftware" },
    ],
  },
  {
    title: "KrachBooks",
    image: "/images/projects/krachbooks.gif",
    tags: ["Python", "Streamlit", "Data Viz", "Dashboard"],
    accent: "#fff7ed",
    description: [
      "Stats dashboard and badge tracker for a friend group book club",
      "Parses monthly CSV exports, Plotly charts, per-member badges, and a spin-wheel curator picker",
    ],
    links: [
      { label: "Website", href: "https://krach-books-dashboard.streamlit.app/" },
      { label: "Source Code", href: "https://github.com/vvegesna01/KrachBooks" },
    ],
  },
  {
    title: "Obsidian Movie Vault",
    image: "/images/projects/add_movie.gif",
    tags: ["Obsidian"],
    accent: "#fdf4ff",
    description: [
      "Personal movie database inside Obsidian — IMDb API pulls metadata, Dataview handles dynamic queries",
      "Sort and filter by genre, rating, or watch status; a lightweight local alternative to tracking apps",
    ],
    links: [{ label: "Tutorial coming soon!", href: "", disabled: true }],
  },
  {
    title: "Shelf This",
    image: "/images/projects/shelf_this.png",
    tags: ["Python", "Streamlit", "Data Viz", "Dashboard"],
    accent: "#f0f9ff",
    description: [
      "Dashboard to visualise reading habits from Goodreads / Storygraph exports",
      "Stats: Highest Rated Reads, Books by Format, Reading Pace, and more",
    ],
    links: [
      { label: "Source Code", href: "https://github.com/vvegesna01/ShelfThis" },
      { label: "Go to Website", href: "https://shelfthis.streamlit.app/" },
    ],
  },
  {
    title: "Investogram",
    image: "/images/projects/investogram_profile.png",
    tags: ["React", "Next.js", "MongoDB", "Dashboard"],
    accent: "#ecfdf5",
    description: [
      "Beginner trading app with play money — learn investing by doing, with a live social feed",
      "Portfolio dashboard, leaderboard, and full social layer: posts, comments, likes",
    ],
    links: [
      { label: "Source Code", href: "https://github.com/CS-407/Investogram-Frontend" },
      { label: "Demo Slides", href: "https://docs.google.com/presentation/d/1m5OFbwTUwbOdZnJzoAFLw9boNMa-b-4CzSh_a33uPkQ" },
    ],
  },
  {
    title: "The Eras Tour Tracker",
    image: "/images/projects/eras_tour.png",
    tags: ["React", "Next.js", "Data Viz", "Dashboard"],
    accent: "#fdf2f8",
    description: [
      "Geo-coded tracker for Taylor Swift's Eras Tour — venues, openers, and song analytics on a live map",
      "Dynamic visual representation of setlists and venue info across all devices",
    ],
    links: [
      { label: "Source Code", href: "https://github.com/vvegesna01/eras-tour-tracker" },
      { label: "Go to Website", href: "https://eras-tour-tracker.vercel.app/" },
    ],
  },
  {
    title: "Design Detective 🔎",
    image: "/images/projects/font_detective.gif",
    tags: ["HTML/CSS/JS", "Browser Extension"],
    accent: "#fffbeb",
    description: [
      "Hover over any font or color on any website and copy the font name or hex code instantly",
    ],
    links: [
      { label: "Download Extension", href: "https://github.com/vvegesna01/Design-Detective" },
    ],
  },
  {
    title: "PurduePAL",
    image: "/images/projects/purduePAL.png",
    tags: ["React", "Python", "MongoDB"],
    accent: "#f5f3ff",
    description: [
      "Social media app for Purdue students — posts, comments, likes, and interest-based pages",
      "Anonymous posting, profile customization with bio, photo, and username",
    ],
    links: [
      { label: "Source Code", href: "https://github.com/CS307Spring2022/PurduePAL-Backend" },
    ],
  },
  {
    title: "Shell Project",
    image: "/images/projects/shell.png",
    tags: ["C", "Systems Programming"],
    accent: "#f8fafc",
    description: [
      "Shell interpreter in C++ replicating csh and bash: piping, redirection, subshell, wildcard expansion",
      "Command history, path completion, exit signal handling, and environment variable expansion",
    ],
    links: [
      { label: "CSH", href: "https://www2.cs.duke.edu/csl/docs/csh.html" },
      { label: "Bash Shell", href: "https://www.gnu.org/software/bash/" },
    ],
  },
  {
    title: "Old Portfolio Website",
    image: "/images/projects/old_portfolio.png",
    tags: ["HTML/CSS/JS", "Portfolio"],
    accent: "#f1f5f9",
    description: [],
    links: [
      { label: "Source Code", href: "https://github.com/vvegesna01/old-portfolio" },
      { label: "Go to Website", href: "https://vvegesna01.github.io/old-portfolio/" },
    ],
  },
];

// ── Helpers ─────────────────────────────────────────────────────────

function Tag({ label }: { label: string }) {
  return (
    <span className="inline-block bg-indigo-50 border border-indigo-100 text-indigo-500 text-[10px] font-semibold uppercase tracking-widest rounded-full px-2.5 py-0.5">
      {label}
    </span>
  );
}

function FilterChip({
  label,
  active,
  count,
  onClick,
}: {
  label: string;
  active: boolean;
  count: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest rounded-full px-3 py-1.5 border transition-all duration-200 cursor-pointer ${
        active
          ? "bg-indigo-900 text-white border-indigo-900 shadow-sm"
          : "bg-white text-indigo-500 border-indigo-200 hover:border-indigo-400 hover:text-indigo-700"
      }`}
    >
      {label}
      <span
        className={`text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center ${
          active ? "bg-indigo-700 text-white" : "bg-indigo-100 text-indigo-400"
        }`}
      >
        {count}
      </span>
    </button>
  );
}

// ── Stacked Project Card ─────────────────────────────────────────────

function ProjectCard({ project, index, total }: { project: Project; index: number; total: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const primaryLink = project.links.find((l) => !l.disabled);
  const stickyTop = 80 + index * 14;

  // Track Mouse coordinates for Custom Follow-Cursor
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out coordinate tracking
  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    // Position tracking relative to the dynamic panel box
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <div ref={ref} style={{ zIndex: index + 1 }} className="relative max-w-5xl mx-auto px-4 md:px-8">
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
        {/* ── Bento grid layout ── */}
        <div className="grid grid-cols-1 md:grid-cols-5 min-h-[480px]">
          {/* Left: text panel — 2/5 */}
          <div className="md:col-span-2 flex flex-col justify-between p-8 md:p-10">
            <div>
              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.tags.map((tag) => (
                  <Tag key={tag} label={tag} />
                ))}
              </div>

              <h2 className="text-2xl md:text-3xl font-extrabold text-indigo-900 leading-tight mb-5">
                {project.title}
              </h2>

              {project.description.length > 0 && (
                <ul className="space-y-3">
                  {project.description.map((point, i) => (
                    <li key={i} className="flex gap-3 text-sm text-gray-600 leading-relaxed">
                      <span className="mt-2 shrink-0 w-1.5 h-1.5 rounded-full bg-indigo-300" />
                      {point}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mt-8">
              {project.links.map((link) =>
                link.disabled ? (
                  <span
                    key={link.label}
                    className="inline-block bg-black/5 text-gray-400 text-sm font-semibold rounded-full py-2 px-5 cursor-not-allowed"
                  >
                    {link.label}
                  </span>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-indigo-900 text-white text-sm font-semibold rounded-full py-2 px-5 border border-indigo-900 hover:bg-transparent hover:text-indigo-900 transition duration-300"
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>
          </div>

          {/* Right: image panel — 3/5 */}
          {primaryLink ? (
            <Link
              href={primaryLink.href}
              target="_blank"
              rel="noopener noreferrer"
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
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </motion.div>

              <div
                className="absolute inset-y-0 left-0 w-16 pointer-events-none z-10"
                style={{
                  background: `linear-gradient(to right, ${project.accent ?? "#fff"}, transparent)`,
                }}
              />

              {/* Dynamic Tracking Cursor Overlay Button */}
              <AnimatePresence>
                {hovered && (
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
                    className="absolute pointer-events-none z-30 hidden md:flex items-center gap-1.5 bg-indigo-900 text-white font-bold text-xs rounded-full px-5 py-3 shadow-xl whitespace-nowrap"
                  >
                    Go to project
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>
            </Link>
          ) : (
            // Static image wrapper for unlinked items (e.g., "Coming Soon")
            <div
              className="md:col-span-3 relative overflow-hidden min-h-[260px] cursor-not-allowed"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <div className="absolute inset-0">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover opacity-75 grayscale-[20%]"
                  unoptimized
                />
              </div>
              <div
                className="absolute inset-y-0 left-0 w-16 pointer-events-none"
                style={{
                  background: `linear-gradient(to right, ${project.accent ?? "#fff"}, transparent)`,
                }}
              />
              <AnimatePresence>
                {hovered && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[2px]"
                  >
                    <span className="bg-white/90 text-gray-800 text-xs font-bold tracking-wider uppercase rounded-full px-5 py-2.5 shadow">
                      Coming soon
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Bottom edge counter */}
        <div className="absolute bottom-3 right-4 text-xs font-semibold text-black/20 tabular-nums select-none">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </div>
      </motion.div>

      {/* Spacer so the next card has room to scroll over this one */}
      <div className="h-6" />
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────

export default function Projects() {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const project of PROJECTS) {
      for (const tag of project.tags) {
        counts[tag] = (counts[tag] ?? 0) + 1;
      }
    }
    return Object.entries(counts).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }, []);

  const filteredProjects = useMemo(
    () => (activeTag ? PROJECTS.filter((p) => p.tags.includes(activeTag)) : PROJECTS),
    [activeTag]
  );

  return (
    <main className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* ── Header ── */}
      <div className="max-w-5xl mx-auto px-8 pt-14 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl font-extrabold text-indigo-900 hover:text-purple-500 transition-colors duration-300 mb-3 leading-tight">
            Projects
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed">
            Things I&apos;ve built — data dashboards, social apps, shell interpreters, and more.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8"
        >
          {[
            { value: PROJECTS.length, label: "Projects" },
            { value: "4", label: "Live apps" },
            { value: "Full-stack", label: "Focus area" },
            { value: "Python", label: "Go-to stack" },
          ].map(({ value, label }) => (
            <div key={label} className="bg-white border border-gray-100 rounded-xl p-5 flex flex-col gap-1 shadow-sm">
              <span className="text-3xl font-extrabold text-indigo-900">{value}</span>
              <span className="text-xs font-semibold text-indigo-700 uppercase tracking-widest">{label}</span>
            </div>
          ))}
        </motion.div>

        {/* Filter bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18 }}
          className="mt-8"
        >
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTag(null)}
              className={`inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest rounded-full px-3 py-1.5 border transition-all duration-200 cursor-pointer ${
                activeTag === null
                  ? "bg-indigo-900 text-white border-indigo-900 shadow-sm"
                  : "bg-white text-indigo-500 border-indigo-200 hover:border-indigo-400 hover:text-indigo-700"
              }`}
            >
              All
              <span
                className={`text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center ${
                  activeTag === null ? "bg-indigo-700 text-white" : "bg-indigo-100 text-indigo-400"
                }`}
              >
                {PROJECTS.length}
              </span>
            </button>

            {tagCounts.map(([tag, count]) => (
              <FilterChip
                key={tag}
                label={tag}
                active={activeTag === tag}
                count={count}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              />
            ))}
          </div>

          <AnimatePresence>
            {activeTag && (
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="mt-3 text-sm text-indigo-400"
              >
                Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""} tagged{" "}
                <span className="font-semibold text-indigo-600">{activeTag}</span>
                {" · "}
                <button
                  onClick={() => setActiveTag(null)}
                  className="underline underline-offset-2 hover:text-indigo-800 transition-colors"
                >
                  Clear filter
                </button>
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ── Stacked project cards ── */}
      <div className="pb-40">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
              total={filteredProjects.length}
            />
          ))}
        </AnimatePresence>

        {filteredProjects.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-400 py-24"
          >
            No projects match this tag.
          </motion.p>
        )}
      </div>

      {/* ── Footer ── */}
      <div className="max-w-5xl mx-auto px-8 py-6 text-xs text-gray-400">
        Updated June 2026
      </div>
    </main>
  );
}