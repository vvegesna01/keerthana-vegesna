"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";
import PageHeader from "@/components/layout/PageHeader";
import Tag from "@/components/ui/Tag";
import { CATEGORIES, PROJECTS, OLD_PORTFOLIO, type Category, type Project } from "@/data/projects";

// ── Helpers ─────────────────────────────────────────────────────────

const isExternal = (href: string) => /^https?:\/\//.test(href);

// Only external links open a new tab; blog links stay in-site
const linkProps = (href: string) =>
  isExternal(href) ? { target: "_blank", rel: "noopener noreferrer" } : {};

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cellVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

// Play on hover, pause on leave. Touch devices have no hover, so there the
// video plays while the card is mostly on screen. Skipped for reduced motion.
function useHoverVideo() {
  const cardRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(cardRef, { amount: 0.6 });
  const [canHover, setCanHover] = useState(true);

  useEffect(() => {
    setCanHover(window.matchMedia("(hover: hover)").matches);
  }, []);

  useEffect(() => {
    if (canHover || reduceMotion) return;
    const v = videoRef.current;
    if (!v) return;
    if (inView) v.play().catch(() => {});
    else v.pause();
  }, [inView, canHover, reduceMotion]);

  const play = () => {
    videoRef.current?.play().catch(() => {});
  };
  const pause = () => videoRef.current?.pause();

  const hoverProps =
    canHover && !reduceMotion
      ? { onMouseEnter: play, onMouseLeave: pause, onFocus: play, onBlur: pause }
      : {};

  return { cardRef, videoRef, hoverProps };
}

// ── Card ─────────────────────────────────────────────────────────────
// Matches the Experiences page rhythm: clicking the media or summary opens
// the full detail modal, while the title and quick links remain directly clickable.

function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  const { cardRef, videoRef, hoverProps } = useHoverVideo();
  const primary = project.links[0];

  const media = (
    <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.03]">
      {project.video ? (
        <video
          ref={videoRef}
          src={project.video}
          poster={project.image}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={project.title}
          className="h-full w-full object-cover"
        />
      ) : (
        <Image src={project.image} alt={project.title} fill className="object-cover" unoptimized />
      )}
    </div>
  );

  return (
    <motion.article ref={cardRef} variants={cellVariants} {...hoverProps} className="group flex flex-col">
      {/* Media opens the detail modal */}
      <button
        type="button"
        onClick={onOpen}
        tabIndex={-1}
        aria-hidden
        className="block w-full text-left"
      >
        <div
          className="relative aspect-[16/10] overflow-hidden rounded-xl"
          style={{ backgroundColor: project.accent ?? "#f1f5f9" }}
        >
          {media}
        </div>
      </button>

      {/* Title row */}
      <div className="mt-3 flex items-baseline justify-between gap-3">
        <h3 className="text-base font-semibold tracking-tight text-heading">
          {primary ? (
            <Link
              href={primary.href}
              {...linkProps(primary.href)}
              className="inline-flex items-center gap-1 transition-colors hover:text-accent"
            >
              {project.title}
            </Link>
          ) : (
            <button
              type="button"
              onClick={onOpen}
              className="text-left transition-colors hover:text-accent"
            >
              {project.title}
            </button>
          )}
        </h3>
        {project.year && (
          <span className="shrink-0 text-xs tabular-nums text-subtle">{project.year}</span>
        )}
      </div>

      {/* Full description (no line-clamp cutoff) + Details cue */}
      <button
        type="button"
        onClick={onOpen}
        aria-label={`${project.title}: view details`}
        className="block w-full text-left"
      >
        <p className="mt-1.5 text-sm leading-relaxed text-muted">{project.summary}</p>
      </button>

      {/* Links, status & Details trigger */}
      <div className="mt-2.5 flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5 text-xs">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          {project.status && <span className="text-amber-700">{project.status}</span>}
          {project.links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              {...linkProps(link.href)}
              className="text-subtle underline-offset-4 transition-colors hover:text-accent hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          onClick={onOpen}
          className="inline-flex items-center gap-1 font-medium text-subtle transition-colors group-hover:text-accent"
        >
          Details <ArrowUpRight size={12} />
        </button>
      </div>
    </motion.article>
  );
}

// ── Detail modal ────────────────────────────────────────────────────

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-indigo-900/60 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        className="relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-xl bg-surface p-6 shadow-xl"
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 rounded-lg p-1 text-subtle transition-colors hover:text-heading"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Category / Year header */}
        <div className="mb-3 pr-8">
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-accent-soft">
            {project.category}
            {project.year ? ` · ${project.year}` : ""}
          </p>
          <h3 className="text-2xl font-extrabold leading-tight text-heading">{project.title}</h3>
          {project.status && (
            <p className="mt-1 text-xs font-medium text-amber-700">{project.status}</p>
          )}
        </div>

        {/* Media preview */}
        <div
          className="relative mb-4 aspect-[16/10] w-full overflow-hidden rounded-lg"
          style={{ backgroundColor: project.accent ?? "#f1f5f9" }}
        >
          {project.video ? (
            <video
              src={project.video}
              poster={project.image}
              autoPlay={!reduceMotion}
              controls
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
            />
          ) : (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              unoptimized
            />
          )}
        </div>

        {/* Full description */}
        <p className="mb-4 text-sm leading-relaxed text-muted">{project.summary}</p>

        {/* Tech tags */}
        {project.tags.length > 0 && (
          <div className="mb-5 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <Tag key={tag} label={tag} variant="default" />
            ))}
          </div>
        )}

        {/* Links */}
        {project.links.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 border-t border-line/60 pt-4">
            {project.links.map((link, idx) => (
              <Link
                key={link.label}
                href={link.href}
                {...linkProps(link.href)}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors ${
                  idx === 0
                    ? "bg-brand text-white hover:opacity-90"
                    : "bg-sunken text-heading hover:bg-surface-strong"
                }`}
              >
                {link.label}
                <ArrowUpRight size={13} />
              </Link>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [selected, setSelected] = useState<Project | null>(null);

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
  const gridKey = activeCategory ?? "all"; // remount on filter change so the stagger replays

  return (
    <PageContainer
      className="bg-gray-50/30 text-heading selection:bg-surface-strong selection:text-heading"
      size="default"
    >
      <PageHeader
        title="Play"
        subtitle="Things I've built: data dashboards, social apps, shell interpreters, and more."
        animate={false}
        className="mb-4"
      />

      {/* ── Filter bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="border-b border-line/60 pb-6"
      >
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setActiveCategory(null)}
            className="relative px-3.5 py-1.5 text-xs font-bold rounded-xl focus:outline-none transition-colors duration-200"
          >
            {activeCategory === null && (
              <motion.span
                layoutId="projects-tag-pill"
                className="absolute inset-0 bg-brand rounded-xl"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span
              className={`relative z-10 flex items-center gap-1.5 ${
                activeCategory === null ? "text-white" : "text-subtle hover:text-muted"
              }`}
            >
              All
              <span
                className={`text-[10px] font-mono px-1 rounded ${
                  activeCategory === null ? "bg-indigo-800 text-indigo-200" : "bg-sunken text-subtle"
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
                  className="absolute inset-0 bg-brand rounded-xl"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span
                className={`relative z-10 flex items-center gap-1.5 uppercase tracking-wider ${
                  activeCategory === category ? "text-white" : "text-subtle hover:text-muted"
                }`}
              >
                {category}
                <span
                  className={`text-[10px] font-mono px-1 rounded ${
                    activeCategory === category ? "bg-indigo-800 text-indigo-200" : "bg-sunken text-subtle"
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
              className="mt-4 text-sm text-accent-soft"
            >
              Showing {filtered.length} project{filtered.length !== 1 ? "s" : ""} in{" "}
              <span className="font-semibold text-accent">{activeCategory}</span>
              {" · "}
              <button
                onClick={() => setActiveCategory(null)}
                className="underline underline-offset-2 hover:text-accent transition-colors"
              >
                Clear filter
              </button>
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── Featured: two columns ── */}
      {featured.length > 0 && (
        <section className="mt-8">
          {showSectionLabels && (
            <p className="mb-4 text-xs font-bold uppercase tracking-wider text-subtle">Featured</p>
          )}
          <motion.div
            key={`featured-${gridKey}`}
            variants={gridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2"
          >
            {featured.map((project) => (
              <ProjectCard
                key={project.title}
                project={project}
                onOpen={() => setSelected(project)}
              />
            ))}
          </motion.div>
        </section>
      )}

      {/* ── More: three columns ── */}
      {more.length > 0 && (
        <section className={featured.length > 0 ? "mt-14" : "mt-8"}>
          {showSectionLabels && (
            <p className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-subtle">
              More things I&apos;ve built
              <span className="rounded bg-sunken px-1 font-mono text-[10px] text-subtle">{more.length}</span>
            </p>
          )}
          <motion.div
            key={`more-${gridKey}`}
            variants={gridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
          >
            {more.map((project) => (
              <ProjectCard
                key={project.title}
                project={project}
                onOpen={() => setSelected(project)}
              />
            ))}
          </motion.div>
        </section>
      )}

      <p className="mt-16 mb-4 text-center text-xs text-subtle">
        Curious what came before this site?{" "}
        <Link
          href={OLD_PORTFOLIO.site}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-heading underline-offset-4 hover:underline"
        >
          The original portfolio
        </Link>{" "}
        ·{" "}
        <Link
          href={OLD_PORTFOLIO.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-heading underline-offset-4 hover:underline"
        >
          source
        </Link>
      </p>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </PageContainer>
  );
}