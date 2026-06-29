"use client";
import React, { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";
import PageHeader from "@/components/layout/PageHeader";
import StatCard from "@/components/ui/StatCard";
import Tag from "@/components/ui/Tag";
import FooterMetadata from "@/components/layout/FooterMetadata";

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
  tag?: string;
  stats?: Stat[];
  techTags?: string[];
  skills: string[];
  bentoSize: BentoSize;
}

const EXPERIENCES: Experience[] = [
  {
    duration: "FEB 2026",
    company: "AfterWord",
    tag: "Current",
    role: "Founder & Solo-Developer",
    bentoSize: "lg",
    skills: ["Backend", "AI/Infra", "Cloud", "Frontend"],
    description: [
      "Built a knowledge ingestion and retrieval platform using FastAPI, PostgreSQL, PostGIS, pgvector, and Next.js to structure and resurface long-term reading and research data.",
      "Designed asynchronous ingestion pipelines to parse, normalize, chunk, embed, and index external content — including reading exports — into vectorized, queryable knowledge entries.",
      "Implemented semantic retrieval and ranking systems enabling low-latency search across 10k+ embedded highlights using vector similarity queries and Redis caching.",
      "Architected and deployed the full platform independently, including backend services, infrastructure, database schema design, AI integration, and frontend development.",
    ],
    stats: [
      { value: "10K+", label: "embedded highlights" },
      { value: "100%", label: "solo-architected" },
    ],
    techTags: ["FastAPI", "PostgreSQL", "pgvector", "Redis", "Next.js"],
    image: "/images/exp/aw-logo.png",
  },
  {
    duration: "JAN 2026",
    company: "Maksika Group",
    tag: "Current",
    role: "Software Engineer",
    bentoSize: "md",
    skills: ["Backend", "Cloud", "Frontend"],
    description: [
      "Develop and maintain GIS and geospatial applications supporting Earth Science Engineering and mineral prospecting workflows across international projects.",
      "Build and maintain the official web platform and customer-facing digital applications for Maksika Group.",
      "Contribute to spatial data workflows and geospatial analytics solutions using open-source GIS technologies and PostgreSQL/PostGIS databases.",
    ],
    stats: [],
    techTags: ["PostGIS", "PostgreSQL", "GIS", "Python"],
    image: "/images/exp/maksika.png",
  },
  {
    duration: "OCT 2025 - JAN 2026",
    company: "EMVO.AI",
    role: "Platform & AgentOps Engineer",
    bentoSize: "md",
    skills: ["Backend", "Cloud", "AI/Infra"],
    description: [
      "Built backend orchestration services coordinating external services, authentication flows, and tool execution across customer-facing AI applications.",
      "Improved availability and reliability of production AWS services through monitoring, observability improvements, and infrastructure optimization.",
      "Investigated and resolved production incidents involving asynchronous workflows, API failures, and cloud infrastructure issues to maintain service reliability and customer uptime.",
      "Collaborated cross-functionally with frontend, product, and infrastructure teams to ship production-ready features under tight timelines.",
    ],
    stats: [{ value: "~30%", label: "faster incident resolution" }],
    techTags: ["AWS", "S3/CloudWatch/Lambda", "REST APIs", "Async Workflows", "Microservices", "ElevenLabs", "Google ADKs"],
    image: "/images/exp/emvo_new_logo.png",
  },
  {
    duration: "JAN 2024 - MAY 2025",
    company: "Purdue University",
    role: "Software Developer",
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
  },
  {
    duration: "JUN 2022 - AUG 2022",
    company: "Cummins, Inc.",
    role: "Software Engineering Intern",
    bentoSize: "sm",
    skills: ["Cloud", "Backend"],
    description: [
      "Monitored and debugged distributed AWS workflows in production environments to identify reliability and performance bottlenecks.",
      "Improved CloudWatch observability pipelines and alerting systems, reducing operational overhead and improving incident response.",
      "Automated internal workflow and validation systems handling large-scale operational data transfers.",
      "Performed root cause analysis and debugging for cloud infrastructure failures and asynchronous workflow issues.",
    ],
    techTags: ["AWS", "CloudWatch", "Lambda", "S3", "Python"],
    image: "/images/exp/cummins-logo-round.jpeg",
  },
  {
    duration: "AUG 2021 - MAY 2022",
    company: "Merck",
    role: "Data Science Researcher & TA",
    bentoSize: "sm",
    skills: ["Backend", "Mentorship"],
    description: [
      "Built Python-based data pipelines and analytics workflows using SQL, AWS S3, and Databricks.",
      "Developed dashboards and reporting workflows to improve visibility into operational and research metrics.",
      "Provided debugging support and technical mentorship for research and software workflows.",
      "Communicated technical findings and troubleshooting steps to both technical and non-technical collaborators.",
    ],
    techTags: ["Python", "AWS", "Databricks", "SQL", "Jupyter"],
    image: "/images/exp/Merck.png",
  },
  {
    duration: "MAY 2021 - AUG 2021",
    company: "Purdue CS Dept.",
    role: "TA · CS Bridge Program",
    bentoSize: "sm",
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

// Only controls how many lines the single visible bullet can wrap to —
// count is no longer tier-based, since every cell shows just one bullet now.
function bulletClamp(size: BentoSize): string {
  switch (size) {
    case "lg":
      return "line-clamp-2";
    case "md":
      return "line-clamp-2";
    case "sm":
    default:
      return "line-clamp-3";
  }
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
  const [imgLoaded, setImgLoaded] = useState(false);
  const isLg = exp.bentoSize === "lg";
  const logoSize = isLg ? "w-20 h-20" : "w-14 h-14";

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
        {/* Header: bigger logo + company/role/duration */}
        <div className="flex items-center gap-3 mb-2">
          <div
            className={`relative shrink-0 bg-indigo-50 rounded-md overflow-hidden ${logoSize} ${
              active ? "" : "grayscale opacity-60"
            }`}
          >
            {!imgLoaded && (
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-indigo-50 animate-pulse" />
            )}
            <Image
              src={exp.image}
              alt=""
              fill
              className={`object-contain transition-opacity duration-300 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
              onLoad={() => setImgLoaded(true)}
              unoptimized
            />
          </div>
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

        {/* Always show exactly one bullet on the card; full list lives in the modal */}
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

            {/* Affordance hint — tells the reader there's more without giving it away */}
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

        {/* Stats — lg cells only, kept compact so they don't compete with bullets for space */}
        {isLg && exp.stats && exp.stats.length > 0 && (
          <div className="flex flex-wrap gap-6 mt-3">
            {exp.stats.map((s) => (
              <div key={s.label}>
                <p className={`font-extrabold leading-none text-3xl ${active ? "text-indigo-900" : "text-gray-300"}`}>
                  {s.value}
                </p>
                <p className={`text-[11px] ${active ? "text-gray-400" : "text-gray-300"}`}>{s.label}</p>
              </div>
            ))}
          </div>
        )}

        {exp.techTags && (
          <div className={`flex flex-wrap gap-1 mt-3 color-black ${active ? "" : "opacity-40"}`}>
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

// ── Detail modal ────────────────────────────────────────────────────

function ExperienceModal({ exp, onClose }: { exp: Experience; onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 bg-indigo-900/60 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
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

        <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-1">{exp.duration}</p>
        <h3 className="text-2xl font-extrabold text-indigo-900 leading-tight">{exp.company}</h3>
        <p className="text-sm italic text-gray-500 mt-0.5 mb-4">{exp.role}</p>

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

  // Mirrors the Projects page's tagCounts pattern: derive counts from data,
  // sort by frequency then alphabetically, so the filter bar self-maintains
  // as you add/remove roles instead of needing a hand-kept list.
  const skillCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const exp of EXPERIENCES) {
      for (const skill of exp.skills) {
        counts[skill] = (counts[skill] ?? 0) + 1;
      }
    }
    return Object.entries(counts).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }, []);

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
          { value: EXPERIENCES.length, label: "Roles" },
          { value: "2+", label: "Years" },
          { value: "AWS", label: "Cloud Focus" },
          { value: "Python", label: "Go-to Stack" },
        ].map(({ value, label }) => (
          <StatCard key={label} value={value} label={label} />
        ))}
      </motion.div>

      {/* Filter bar — same layoutId-pill pattern as the Projects page */}
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

      {/* Bento grid — minmax keeps a 180px floor for clean span math, but lets
          taller bullet content grow a cell past it rather than clip/overflow. */}
      <motion.div
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[minmax(180px,auto)] gap-3 mb-10"
      >
        {EXPERIENCES.map((exp) => (
          <BentoCell
            key={exp.company}
            exp={exp}
            active={activeFilter === null || exp.skills.includes(activeFilter)}
            onOpen={() => setSelected(exp)}
          />
        ))}
      </motion.div>

      <AnimatePresence>
        {selected && <ExperienceModal exp={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </PageContainer>
  );
}