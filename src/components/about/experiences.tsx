"use client";
import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronDown, X } from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";
import PageHeader from "@/components/layout/PageHeader";
import StatCard from "@/components/ui/StatCard";
import Tag from "@/components/ui/Tag";

// ── Data ────────────────────────────────────────────────────────────

interface Stat {
  value: string;
  label: string;
}

type BentoSize = "lg" | "md" | "sm";

interface Experience {
  duration: string;
  company: string;
  role: string;
  description: string[];
  image: string;
  // "contain" (default) fits a logo inside the tile with padding.
  // "cover" fills the tile edge-to-edge; use it for photos / full-bleed images.
  logoFit?: "contain" | "cover";
  // Older roles collapse into a compact list under "Earlier roles".
  earlier?: boolean;
  tag?: string;
  stats?: Stat[];
  techTags?: string[];
  skills: string[];
  bentoSize: BentoSize;
}

const EXPERIENCES: Experience[] = [
{
    duration: "JUL 2026 – PRESENT",
    company: "ApexFlo.ai",
    tag: "Current",
    role: "Member of Technical Staff (MTS-1)",
    bentoSize: "lg",
    skills: ["Systems", "Backend", "AI/Infra", "Computer Vision"],
    description: [
      "Architected and delivered 3 production edge-AI platforms spanning real-time CV pipelines, event-driven services, pgvector search, and K3s edge deployments.",
      "Engineered infrastructure for face re-id and visual scene search pipelines utilizing 512D face embeddings and 768D SigLIP2 embeddings on pgvector, enabling natural-language camera evidence search.",
      "Optimized heterogeneous accelerator workloads (Intel GPU/NPU) across 8 concurrent 1080p camera streams, maintaining compute headroom at 17.07% average CPU usage.",
      "Built idempotent, retry-safe ingestion architectures benchmarked at 200+ ingests/sec with 122ms p95 latency (51% below target) and integrated automated incident/drone dispatch workflows.",
    ],
    stats: [
      { value: "200+", label: "Ingests/sec" },
      { value: "11+", label: "CV Use Cases" },
    ],
    techTags: ["k3s", "Python", "Linux", "systemd", "OpenCV", "pgvector", "SigLIP2"],
    image: "/images/exp/apexflo-logo.png",
  },
  // {
  //   duration: "2026",
  //   company: "AfterWord",
  //   role: "Founder & Solo Developer",
  //   bentoSize: "md",
  //   skills: ["Backend", "AI/Infra", "Frontend"],
  //   description: [
  //     "Built a knowledge ingestion and retrieval platform using FastAPI, PostgreSQL, PostGIS, pgvector, Redis, and Next.js.",
  //     "Designed asynchronous ingestion pipelines to parse, normalize, embed, and index long-form reading data.",
  //     "Implemented semantic retrieval across 10K+ embedded highlights using vector similarity search and Redis caching.",
  //     "Architected the entire platform including backend infrastructure, AI pipelines, database design, and frontend.",
  //   ],
  //   stats: [
  //     { value: "10K+", label: "Embeddings" },
  //     { value: "100%", label: "Built Solo" },
  //   ],
  //   techTags: ["FastAPI", "PostgreSQL", "PostGIS", "pgvector", "Redis", "Next.js"],
  //   image: "/images/exp/aw-logo.png",
  // },
  // {
  //   duration: "JAN 2026",
  //   company: "Maksika Group",
  //   tag: "",
  //   role: "Software Engineer",
  //   bentoSize: "md",
  //   skills: ["Backend", "Cloud", "Frontend"],
  //   description: [
  //     "Develop and maintain GIS and geospatial applications supporting Earth Science Engineering and mineral prospecting workflows across international projects.",
  //     "Build and maintain the official web platform and customer-facing digital applications for Maksika Group.",
  //     "Contribute to spatial data workflows and geospatial analytics solutions using open-source GIS technologies and PostgreSQL/PostGIS databases.",
  //   ],
  //   stats: [],
  //   techTags: ["PostGIS", "PostgreSQL", "GIS", "Python"],
  //   image: "/images/exp/maksika.png",
  // },
  {
    duration: "OCT 2025 – JAN 2026",
    company: "EMVO.ai",
    role: "Platform & AgentOps Engineer",
    // "sm" (not "md") so EMVO + Purdue sit side by side next to the large
    // ApexFlo cell, which makes the featured grid a clean 2-row block.
    bentoSize: "sm",
    skills: ["Backend", "Cloud", "AI/Infra"],
    description: [
      "Improved availability and reliability of production AWS services through monitoring, observability, and infrastructure optimization.",
      "Resolved production incidents involving asynchronous workflows, API failures, and cloud infrastructure issues.",
      "Implemented backend services coordinating authentication, external integrations, and tool execution.",
      "Partnered with frontend, infrastructure, and product teams to ship production-ready AI features.",
    ],
    techTags: ["AWS", "CloudWatch", "REST APIs", "Microservices", "Python", "Async Workflows"],
    image: "/images/exp/emvo_new_logo.png",
  },
  {
    duration: "JAN 2024 - MAY 2025",
    company: "Purdue University",
    role: "Web Developer",
    bentoSize: "sm",
    skills: ["Backend", "Frontend"],
    description: [
      "Maintained and improved production web services with focus on application stability, deployment reliability, and performance optimization.",
      "Automated deployment and operational workflows, reducing update and release overhead by approximately 45%.",
      "Assisted in debugging production incidents and validating reliability across releases and environments.",
      "Refactored application components to improve maintainability and operational consistency.",
    ],
    techTags: ["HTML", "CSS", "JS", "CI/CD", "CMS"],
    image: "/images/exp/purdue_sidearch.jpg",
    logoFit: "cover", // this one is a photo, not a logo — flip to "contain" if it crops badly
  },
  {
    duration: "JUN 2022 - AUG 2022",
    company: "Cummins, Inc.",
    role: "Software Engineering Intern",
    bentoSize: "md",
    skills: ["Cloud", "Backend"],
    description: [
      "Monitored distributed AWS workflows to identify production reliability bottlenecks.",
      "Improved CloudWatch observability and alerting for faster incident response.",
      "Automated validation workflows handling large-scale operational data.",
      "Performed root cause analysis for asynchronous cloud infrastructure failures.",
    ],
    techTags: ["AWS", "CloudWatch", "Lambda", "S3", "Python"],
    image: "/images/exp/cummins-logo-round.jpeg",
  },
  {
    duration: "AUG 2021 - MAY 2022",
    company: "Merck",
    role: "Data Science Researcher & TA",
    bentoSize: "sm",
    earlier: true,
    skills: ["Backend", "Mentorship"],
    description: [
      "Built Python data pipelines using SQL, AWS S3, and Databricks.",
      "Developed dashboards and reporting workflows for research visibility.",
      "Provided debugging support and technical mentorship.",
      "Communicated technical findings across research teams.",
    ],
    techTags: ["Python", "AWS", "Databricks", "SQL", "Jupyter"],
    image: "/images/exp/Merck.png",
  },
  {
    duration: "MAY 2021 - AUG 2021",
    company: "Purdue CS Dept.",
    role: "TA · CS Bridge Program",
    bentoSize: "sm",
    earlier: true,
    skills: ["Mentorship"],
    description: [
      "Mentored 45+ incoming CS students through OOP fundamentals and Java during the summer bridge program.",
    ],
    techTags: ["Java", "OOP"],
    image: "/images/exp/purdue_cs.png",
  },
];

// ── Layout helpers ──────────────────────────────────────────────────

function spanClasses(size: BentoSize): string {
  switch (size) {
    case "lg":
      return "sm:col-span-2 lg:col-span-2 row-span-2";
    case "md":
      return "sm:col-span-2 lg:col-span-2 row-span-1";
    case "sm":
    default:
      return "row-span-1";
  }
}

// Only controls how many lines the single visible bullet can wrap to.
function bulletClamp(size: BentoSize): string {
  return size === "sm" ? "line-clamp-3" : "line-clamp-2";
}

// ── Variants ────────────────────────────────────────────────────────

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const cellVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

// ── Logo ────────────────────────────────────────────────────────────
// One component renders every logo, so they all share the same tile:
// fixed square, white background, hairline ring, same radius, padded
// "contain" fit. Mismatched source files (round JPEG, wide PNG, etc.)
// end up looking like a set. If an image fails to load, we fall back to
// a monogram instead of a broken icon.

type LogoSize = "sm" | "md" | "lg";

const LOGO_DIMS: Record<LogoSize, string> = {
  sm: "w-10 h-10",
  md: "w-12 h-12",
  lg: "w-16 h-16",
};

function monogram(company: string): string {
  // First two capitals: "ApexFlo.ai" -> "AF", "Cummins, Inc." -> "CI"
  return company.match(/[A-Z]/g)?.slice(0, 2).join("") ?? company.charAt(0).toUpperCase();
}

function Logo({
  exp,
  size,
  dimmed = false,
}: {
  exp: Experience;
  size: LogoSize;
  dimmed?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const cover = exp.logoFit === "cover";

  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-lg bg-white ring-1 ring-slate-200 ${
        LOGO_DIMS[size]
      } ${dimmed ? "grayscale opacity-60" : ""}`}
    >
      {failed ? (
        <div className="absolute inset-0 flex items-center justify-center bg-indigo-50 text-sm font-extrabold tracking-tight text-indigo-900">
          {monogram(exp.company)}
        </div>
      ) : (
        <>
          {!loaded && (
            <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-indigo-100 to-indigo-50" />
          )}
          <Image
            src={exp.image}
            alt=""
            fill
            sizes="64px"
            className={`transition-opacity duration-300 ${
              cover ? "object-cover" : "object-contain p-1.5"
            } ${loaded ? "opacity-100" : "opacity-0"}`}
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
            unoptimized
          />
        </>
      )}
    </div>
  );
}

// ── Bento cell ──────────────────────────────────────────────────────

function BentoCell({
  exp,
  active,
  onOpen,
}: {
  exp: Experience;
  active: boolean;
  onOpen: () => void;
}) {
  const isLg = exp.bentoSize === "lg";

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      variants={cellVariants}
      animate={{ scale: active ? 1 : 0.96 }}
      transition={{ duration: 0.3 }}
      className={`group relative text-left rounded-xl shadow-sm transition-all duration-300 overflow-hidden border-2 ${spanClasses(
        exp.bentoSize
      )} ${
        active
          ? "bg-white border-indigo-100 hover:shadow-lg hover:border-indigo-200"
          : "bg-gray-50 border-gray-100"
      }`}
      style={{ pointerEvents: active ? "auto" : "none" }}
      aria-label={`${exp.company} — ${exp.role}`}
    >
      <div
        className={`absolute left-0 top-0 bottom-0 w-1 bg-indigo-900 transition-opacity duration-300 ${
          active ? "opacity-0 group-hover:opacity-100" : "opacity-0"
        }`}
      />

      <div className="flex flex-col h-full p-4">
        <div className="flex items-center gap-3 mb-2">
          <Logo exp={exp} size={isLg ? "lg" : "md"} dimmed={!active} />
          <div className="min-w-0">
            <p
              className={`font-extrabold leading-tight truncate ${isLg ? "text-lg" : "text-sm"} ${
                active ? "text-indigo-900" : "text-gray-400"
              }`}
            >
              {exp.company}
            </p>
            <p className={`text-[11px] truncate ${active ? "text-gray-400" : "text-gray-300"}`}>
              {exp.duration}
            </p>
          </div>
          {exp.tag && active && <Tag label={exp.tag} variant="stat" />}
        </div>

        <p
          className={`italic mb-2 ${isLg ? "text-sm" : "text-xs"} line-clamp-1 ${
            active ? "text-gray-500" : "text-gray-300"
          }`}
        >
          {exp.role}
        </p>

        {/* One bullet on the card; the full list lives in the modal */}
        {exp.description.length > 0 && (
          <div className="flex-1">
            <p
              className={`flex gap-1.5 leading-relaxed ${isLg ? "text-sm" : "text-xs"} ${bulletClamp(
                exp.bentoSize
              )} ${active ? "text-gray-600" : "text-gray-400"}`}
            >
              <span
                className={`mt-1.5 shrink-0 w-1 h-1 rounded-full ${active ? "bg-indigo-300" : "bg-gray-300"}`}
              />
              {exp.description[0]}
            </p>

            {exp.description.length > 1 && (
              <p
                className={`mt-1 text-[11px] font-medium ${
                  active ? "text-indigo-400 group-hover:text-indigo-600" : "text-gray-300"
                }`}
              >
                +{exp.description.length - 1} more →
              </p>
            )}
          </div>
        )}

        {isLg && exp.stats && exp.stats.length > 0 && (
          <div className="flex flex-wrap gap-6 mt-3">
            {exp.stats.map((s) => (
              <div key={s.label}>
                <p
                  className={`font-extrabold leading-none text-3xl ${
                    active ? "text-indigo-900" : "text-gray-300"
                  }`}
                >
                  {s.value}
                </p>
                <p className={`text-[11px] ${active ? "text-gray-400" : "text-gray-300"}`}>{s.label}</p>
              </div>
            ))}
          </div>
        )}

        {exp.techTags && (
          <div className={`flex flex-wrap gap-1 mt-3 ${active ? "" : "opacity-40"}`}>
            {exp.techTags.slice(0, isLg ? 5 : 2).map((t) => (
              <Tag key={t} label={t} variant="default" />
            ))}
          </div>
        )}
      </div>

      {active && (
        <div className="absolute inset-0 bg-indigo-900/0 group-hover:bg-indigo-900/85 transition-all duration-300 flex items-end p-4 pointer-events-none">
          <div className="translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-1 text-indigo-900 bg-white text-xs font-semibold">
            View details <ArrowUpRight size={14} />
          </div>
        </div>
      )}
    </motion.button>
  );
}

// ── Compact row for "Earlier roles" ─────────────────────────────────

function EarlierRow({
  exp,
  active,
  onOpen,
}: {
  exp: Experience;
  active: boolean;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      disabled={!active}
      aria-label={`${exp.company} — ${exp.role}`}
      className={`group flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-all duration-300 ${
        active
          ? "bg-white border-indigo-100 hover:border-indigo-200 hover:shadow-md"
          : "bg-gray-50 border-gray-100"
      }`}
    >
      <Logo exp={exp} size="sm" dimmed={!active} />
      <div className="min-w-0 flex-1">
        <p
          className={`truncate text-sm font-extrabold leading-tight ${
            active ? "text-indigo-900" : "text-gray-400"
          }`}
        >
          {exp.company}
        </p>
        <p className={`truncate text-xs italic ${active ? "text-gray-500" : "text-gray-300"}`}>
          {exp.role}
        </p>
      </div>
      <p className="hidden sm:block shrink-0 text-[11px] text-gray-400">{exp.duration}</p>
      <ArrowUpRight
        size={14}
        className={`shrink-0 transition-colors ${
          active ? "text-gray-300 group-hover:text-indigo-600" : "text-gray-200"
        }`}
      />
    </button>
  );
}

// ── Detail modal ────────────────────────────────────────────────────

function ExperienceModal({ exp, onClose }: { exp: Experience; onClose: () => void }) {
  // Escape closes the modal — expected behaviour for any dialog
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 bg-indigo-900/60 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`${exp.company} — ${exp.role}`}
        className="bg-white rounded-xl max-w-lg w-full p-6 relative max-h-[85vh] overflow-y-auto"
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-indigo-900 transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-4 mb-4 pr-8">
          <Logo exp={exp} size="lg" />
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-1">
              {exp.duration}
            </p>
            <h3 className="text-2xl font-extrabold text-indigo-900 leading-tight">{exp.company}</h3>
            <p className="text-sm italic text-gray-500 mt-0.5">{exp.role}</p>
          </div>
        </div>

        <ul className="space-y-2 mb-4">
          {exp.description.map((point, i) => (
            <li key={i} className="flex gap-2 text-sm text-gray-600 leading-relaxed">
              <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-indigo-300" />
              {point}
            </li>
          ))}
        </ul>

        {exp.stats && exp.stats.length > 0 && (
          <div className="flex flex-wrap gap-6 mb-4">
            {exp.stats.map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-extrabold text-indigo-900 leading-none">{s.value}</p>
                <p className="text-xs text-gray-400">{s.label}</p>
              </div>
            ))}
          </div>
        )}

        {exp.techTags && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {exp.techTags.map((t) => (
              <Tag key={t} label={t} variant="default" />
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

// ── Page ────────────────────────────────────────────────────────────

export default function Experiences() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [selected, setSelected] = useState<Experience | null>(null);
  const [earlierOpen, setEarlierOpen] = useState(false);

  // Derive filter chips from the data so they self-maintain. A chip is only
  // useful if it actually narrows the list, so skip skills that appear on
  // just one role (nothing to compare) or on all-but-one (barely filters).
  const skillCounts = useMemo(() => {
    const total = EXPERIENCES.length;
    const counts: Record<string, number> = {};
    for (const exp of EXPERIENCES) {
      for (const skill of exp.skills) {
        counts[skill] = (counts[skill] ?? 0) + 1;
      }
    }
    return Object.entries(counts)
      .filter(([, count]) => count >= 2 && count <= total - 2)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }, []);

  const matches = (exp: Experience) => activeFilter === null || exp.skills.includes(activeFilter);
  const featured = EXPERIENCES.filter((e) => !e.earlier);
  const earlier = EXPERIENCES.filter((e) => e.earlier);

  // If a filter matches an older role, open that section automatically so
  // a filtered result is never hidden behind a collapsed toggle.
  const filterHitsEarlier = activeFilter !== null && earlier.some(matches);
  const showEarlier = earlierOpen || filterHitsEarlier;

  return (
    <PageContainer className="flex flex-col" size="default">
      <PageHeader
        title="Experience"
        subtitle="What I've been working on in a non-resume format! (click on the cards to learn more)"
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInVariants}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8"
      >
        {[
          // { value: EXPERIENCES.length, label: "Roles" },
          // { value: "2+", label: "Years" },
          // { value: "Backend", label: "Focus" },
          // { value: "Python, React", label: "Core Stack" },
        ].map(({ value, label }) => (
          <StatCard key={label} value={value} label={label} />
        ))}
      </motion.div>

      {/* Filter bar */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="mb-6 border-b border-slate-200/60 pb-6"
      >
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setActiveFilter(null)}
            className="relative px-3.5 py-1.5 text-xs font-bold rounded-xl focus:outline-none transition-colors duration-200"
          >
            {activeFilter === null && (
              <motion.span
                layoutId="exp-tag-pill"
                className="absolute inset-0 bg-indigo-950 rounded-xl"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span
              className={`relative z-10 flex items-center gap-1.5 ${
                activeFilter === null ? "text-white" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              All
              <span
                className={`text-[10px] font-mono px-1 rounded ${
                  activeFilter === null ? "bg-indigo-800 text-indigo-200" : "bg-slate-100 text-slate-400"
                }`}
              >
                {EXPERIENCES.length}
              </span>
            </span>
          </button>

          {skillCounts.map(([skill, count]) => (
            <button
              key={skill}
              onClick={() => setActiveFilter(activeFilter === skill ? null : skill)}
              className="relative px-3.5 py-1.5 text-xs font-bold rounded-xl focus:outline-none transition-colors duration-200"
            >
              {activeFilter === skill && (
                <motion.span
                  layoutId="exp-tag-pill"
                  className="absolute inset-0 bg-indigo-950 rounded-xl"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span
                className={`relative z-10 flex items-center gap-1.5 uppercase tracking-wider ${
                  activeFilter === skill ? "text-white" : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {skill}
                <span
                  className={`text-[10px] font-mono px-1 rounded ${
                    activeFilter === skill ? "bg-indigo-800 text-indigo-200" : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {count}
                </span>
              </span>
            </button>
          ))}
        </div>

        <AnimatePresence>
          {activeFilter && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="mt-4 text-sm text-indigo-400"
            >
              Showing roles tagged <span className="font-semibold text-indigo-600">{activeFilter}</span>
              {" · "}
              <button
                onClick={() => setActiveFilter(null)}
                className="underline underline-offset-2 hover:text-indigo-800 transition-colors"
              >
                Clear filter
              </button>
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Featured bento grid */}
      <motion.div
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[minmax(180px,auto)] gap-3 mb-8"
      >
        {featured.map((exp) => (
          <BentoCell
            key={exp.company}
            exp={exp}
            active={matches(exp)}
            onOpen={() => setSelected(exp)}
          />
        ))}
      </motion.div>

      {/* Earlier roles — collapsed by default */}
      {earlier.length > 0 && (
        <div className="mb-10">
          {filterHitsEarlier ? (
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Earlier roles</p>
          ) : (
            <button
              type="button"
              onClick={() => setEarlierOpen((o) => !o)}
              aria-expanded={earlierOpen}
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-indigo-900 transition-colors"
            >
              Earlier roles
              <span className="rounded bg-slate-100 px-1 font-mono text-[10px] text-slate-400">
                {earlier.length}
              </span>
              <ChevronDown
                size={14}
                className={`transition-transform duration-300 ${earlierOpen ? "rotate-180" : ""}`}
              />
            </button>
          )}

          <AnimatePresence initial={false}>
            {showEarlier && (
              <motion.div
                key="earlier"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="space-y-2 pt-4">
                  {earlier.map((exp) => (
                    <EarlierRow
                      key={exp.company}
                      exp={exp}
                      active={matches(exp)}
                      onOpen={() => setSelected(exp)}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      <AnimatePresence>
        {selected && <ExperienceModal exp={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </PageContainer>
  );
}