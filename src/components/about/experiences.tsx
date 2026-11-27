"use client";
import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronDown, X } from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";
import PageHeader from "@/components/layout/PageHeader";
import Tag from "@/components/ui/Tag";

// ── Data ────────────────────────────────────────────────────────────

interface Stat {
  value: string;
  label: string;
}

interface Experience {
  duration: string;
  company: string;
  role: string;
  summary: string;
  description: string[];
  // Logo (or photo, see logoFit). Used next to the company name, in the modal,
  // in the fallback panel, and in "Earlier roles".
  image: string;
  // Company site. The small logo by the name turns into an arrow and links here.
  url?: string;
  // Optional card image. Export at 16:10 (e.g. 1280x800) since it's cropped
  // with object-cover. Without it, the card shows the logo on a tinted panel.
  media?: string;
  // Tint behind the logo panel when there's no media. Defaults to soft indigo.
  accent?: string;
  // "contain" (default) fits a logo cleanly without framing.
  // "cover" fills the tile edge-to-edge; use it for photos / full-bleed images.
  logoFit?: "contain" | "cover";
  // Older roles collapse into a compact list under "Earlier roles".
  earlier?: boolean;
  tag?: string;
  stats?: Stat[];
  techTags?: string[];
  skills: string[];
}

const EXPERIENCES: Experience[] = [
  {
    duration: "2026 - Present",
    company: "ApexFlo.ai (NVIDIA Inception Program)",
    url: "https://apexflo.ai",
    tag: "Current",
    role: "Platform Engineer",
    summary:
      "Architected and delivered 3 production edge-AI platforms spanning real-time CV pipelines, pgvector search, and K3s edge deployments.",
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
    image: "/images/exp/apexflo_white_logo.png",
    media: "/images/exp/apexflo_nvidia.png",
  },
  {
    duration: "2025",
    company: "EMVO.ai",
    url: "https://emvo.ai",
    role: "Platform & AgentOps Engineer",
    summary:
      "Improved availability of production AWS services through monitoring and observability while building the backend services behind AI features.",
    skills: ["Backend", "Cloud", "AI/Infra"],
    description: [
      "Improved availability and reliability of production AWS services through monitoring, observability, and infrastructure optimization.",
      "Resolved production incidents involving asynchronous workflows, API failures, and cloud infrastructure issues.",
      "Implemented backend services coordinating authentication, external integrations, and tool execution.",
      "Partnered with frontend, infrastructure, and product teams to ship production-ready AI features.",
    ],
    techTags: ["AWS", "CloudWatch", "REST APIs", "Microservices", "Python", "Async Workflows"],
    image: "/images/exp/emvo_new_logo.png",
    media: "/images/exp/emvo-media.png",
  },
  {
    duration: "2024 - 2025",
    company: "Purdue University",
    url: "https://www.purdue.edu",
    role: "Web Developer",
    summary:
      "Kept production web services stable and automated deployment workflows, cutting release overhead by about 45%.",
    skills: ["Backend", "Frontend"],
    description: [
      "Maintained and improved production web services with focus on application stability, deployment reliability, and performance optimization.",
      "Automated deployment and operational workflows, reducing update and release overhead by approximately 45%.",
      "Assisted in debugging production incidents and validating reliability across releases and environments.",
      "Refactored application components to improve maintainability and operational consistency.",
    ],
    techTags: ["HTML", "CSS", "JS", "CI/CD", "CMS"],
    image: "/images/exp/purdue_logo.png",
    logoFit: "contain",
    media: "/images/exp/purdue_sidearch.jpg",
  },
  {
    duration: "Summer 2022",
    company: "Cummins, Inc.",
    url: "https://www.cummins.com",
    role: "Software Engineering Intern",
    summary:
      "Monitored distributed AWS workflows to find reliability bottlenecks and improved CloudWatch alerting for faster incident response.",
    skills: ["Cloud", "Backend"],
    description: [
      "Monitored distributed AWS workflows to identify production reliability bottlenecks.",
      "Improved CloudWatch observability and alerting for faster incident response.",
      "Automated validation workflows handling large-scale operational data.",
      "Performed root cause analysis for asynchronous cloud infrastructure failures.",
    ],
    techTags: ["AWS", "CloudWatch", "Lambda", "S3", "Python"],
    image: "/images/exp/cummins.png",
  },
  {
    duration: "2021 - 2022",
    company: "Merck",
    url: "https://www.merck.com",
    role: "Data Science Researcher & TA",
    summary:
      "Built Python data pipelines on SQL, S3, and Databricks, plus dashboards that gave research teams visibility.",
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
    duration: "Summer 2021",
    company: "Purdue CS Dept.",
    url: "https://www.cs.purdue.edu",
    role: "TA · CS Bridge Program",
    summary: "Mentored 45+ incoming CS students through OOP fundamentals and Java in the summer bridge program.",
    earlier: true,
    skills: ["Mentorship"],
    description: [
      "Mentored 45+ incoming CS students through OOP fundamentals and Java during the summer bridge program.",
    ],
    techTags: ["Java", "OOP"],
    image: "/images/exp/purdue_cs.png",
  },
];

// ── Education ───────────────────────────────────────────────────────
// Kept separate from EXPERIENCES: a degree isn't a role, so it isn't
// affected by the skill filters and has its own detail sections.
// Every list is optional; a section only shows in the modal if it has entries.

interface Education {
  school: string;
  degree: string;
  duration: string;
  status?: string; // shown as a small tag, e.g. "In progress"
  url?: string;
  image: string;
  summary: string;
  coursework?: string[];
  certifications?: { name: string; issuer?: string; href?: string }[];
  awards?: { name: string; detail?: string }[];
  // Long-form story lives on the blog; the modal just links to it
  blogHref?: string;
  blogLabel?: string;
}

// const EDUCATION: Education[] = [
//   {
//     school: "Northeastern University",
//     degree: "M.S. in Information Systems",
//     duration: "2027 - Present", 
//     status: "In Progress",
//     url: "https://vancouver.northeastern.edu/",
//     image: "/images/exp/nu_seal.png",
//     summary: "",
//     coursework: [],
//     certifications: [
//     ],
//     awards: [
//       { name: "International Impact Scholarship Award", detail: "" },
//     ],
//     blogHref: "/blog/northeastern",
//     blogLabel: "Read about my master's so far",
//   },
//   {
//     school: "Purdue University",
//     degree: "B.S. in Computer Science",
//     duration: "2025",
//     url: "https://www.cs.purdue.edu",
//     image: "/images/exp/purdue_logo.png",
//     summary: "",
//     certifications: [ { name: "Applications in Data Science" }, { name: "Entrepreneurship & Innovation" } ],
//   },
// ];

// ── Variants ────────────────────────────────────────────────────────

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cellVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

// ── Logo ────────────────────────────────────────────────────────────
// Renders transparent logos cleanly without an outer box or border ring.
// If an image fails to load, falls back to a subtle monogram tile.
// Takes anything with an image + name, so it works for roles and schools.

type LogoSize = "xs" | "sm" | "md" | "lg" | "xl";

const LOGO_DIMS: Record<LogoSize, string> = {
  xs: "w-5 h-5",
  sm: "w-9 h-9",
  md: "w-11 h-11",
  lg: "w-14 h-14",
  xl: "w-20 h-20",
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
  exp: { image: string; company: string; logoFit?: "contain" | "cover" };
  size: LogoSize;
  dimmed?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const cover = exp.logoFit === "cover";

  return (
    <div
      className={`relative shrink-0 overflow-hidden ${LOGO_DIMS[size]} ${
        dimmed ? "grayscale opacity-50" : ""
      }`}
    >
      {failed ? (
        <div
          className={`flex h-full w-full items-center justify-center rounded-md bg-sunken/80 font-bold tracking-tight text-heading ${
            size === "xs" ? "text-[9px]" : "text-sm"
          }`}
        >
          {monogram(exp.company)}
        </div>
      ) : (
        <>
          {!loaded && (
            <div className="absolute inset-0 animate-pulse rounded-md bg-sunken/40" />
          )}
          <Image
            src={exp.image}
            alt=""
            fill
            sizes="80px"
            className={`transition-all duration-300 ${
              cover
                ? "rounded-md object-cover"
                : `object-contain ${loaded ? "opacity-100" : "opacity-0"}`
            }`}
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
            unoptimized
          />
        </>
      )}
    </div>
  );
}

// ── Company link ────────────────────────────────────────────────────
// Small logo + name. With a `url`, hovering swaps the logo for an arrow and
// the whole thing links out to the company site. Without one, it's static.

function CompanyLink({ exp, active }: { exp: Experience; active: boolean }) {
  const linked = Boolean(exp.url) && active;

  const content = (
    <>
      <span className="relative flex h-5 w-5 shrink-0 items-center justify-center">
        <span
          className={`flex h-full w-full items-center justify-center transition-all duration-200 ${
            linked ? "group-hover/link:scale-75 group-hover/link:opacity-0" : ""
          }`}
        >
          <Logo exp={exp} size="xs" dimmed={!active} />
        </span>
        {linked && (
          <span className="absolute inset-0 flex scale-75 items-center justify-center text-accent opacity-0 transition-all duration-200 group-hover/link:scale-100 group-hover/link:opacity-100">
            <ArrowUpRight size={14} />
          </span>
        )}
      </span>
      <span
        className={`truncate text-base font-semibold tracking-tight text-heading transition-colors ${
          linked ? "group-hover/link:text-accent" : ""
        }`}
      >
        {exp.company}
      </span>
    </>
  );

  if (!linked) {
    return <span className="flex min-w-0 items-center gap-2">{content}</span>;
  }

  return (
    <a
      href={exp.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${exp.company} website`}
      className="group/link flex min-w-0 items-center gap-2"
    >
      {content}
    </a>
  );
}

// ── Card ────────────────────────────────────────────────────────────
// Media on top, then a title row, one sentence, and a quiet cue. No box.
// The company name links out; everything else opens the details modal.
// (The link can't live inside a <button>, so the card is an <article> with
// two button regions around the title row.)

function ExperienceCard({
  exp,
  active,
  onOpen,
}: {
  exp: Experience;
  active: boolean;
  onOpen: () => void;
}) {
  return (
    <motion.article
      variants={cellVariants}
      className={`group transition-opacity duration-300 ${active ? "" : "opacity-40"}`}
    >
      {/* Media: a mouse target only; the text button below is the keyboard one */}
      <button
        type="button"
        onClick={onOpen}
        disabled={!active}
        tabIndex={-1}
        aria-hidden
        className="block w-full text-left"
      >
        <div
          className="relative aspect-[16/10] overflow-hidden rounded-xl"
          style={{ backgroundColor: exp.accent ?? "#eef2ff" }}
        >
          {exp.media ? (
            <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.03]">
              <Image src={exp.media} alt={exp.company} fill className="object-cover" unoptimized />
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <Logo exp={exp} size="xl" dimmed={!active} />
            </div>
          )}
        </div>
      </button>

      <div className="mt-3 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <h3 className="min-w-0">
            <CompanyLink exp={exp} active={active} />
          </h3>
          {exp.tag && active && <Tag label={exp.tag} variant="stat" />}
        </div>
        <span className="shrink-0 whitespace-nowrap text-xs tabular-nums text-subtle">{exp.duration}</span>
      </div>

      <button
        type="button"
        onClick={onOpen}
        disabled={!active}
        aria-label={`${exp.company} — ${exp.role}: details`}
        className="block w-full text-left"
      >
        <p className="mt-0.5 text-sm text-subtle">{exp.role}</p>

        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{exp.summary}</p>

        {/* A single muted line for the headline numbers, if there are any */}
        {exp.stats && exp.stats.length > 0 && (
          <p className="mt-2 text-xs text-subtle">
            {exp.stats.map((s, i) => (
              <span key={s.label}>
                {i > 0 && " · "}
                <span className="font-semibold text-muted">{s.value}</span> {s.label}
              </span>
            ))}
          </p>
        )}

        {exp.description.length > 1 && (
          <p className="mt-3 flex items-center gap-1 text-xs font-medium text-subtle transition-colors group-hover:text-accent">
            Details <ArrowUpRight size={12} />
          </p>
        )}
      </button>
    </motion.article>
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
          ? "bg-surface border-line hover:border-line hover:shadow-md"
          : "bg-gray-50 border-line"
      }`}
    >
      <Logo exp={exp} size="sm" dimmed={!active} />
      <div className="min-w-0 flex-1">
        <p
          className={`truncate text-sm font-extrabold leading-tight ${
            active ? "text-heading" : "text-subtle"
          }`}
        >
          {exp.company}
        </p>
        <p className={`truncate text-xs italic ${active ? "text-muted" : "text-subtle"}`}>
          {exp.role}
        </p>
      </div>
      <p className="hidden sm:block shrink-0 text-[11px] text-subtle">{exp.duration}</p>
      <ArrowUpRight
        size={14}
        className={`shrink-0 transition-colors ${
          active ? "text-subtle group-hover:text-accent" : "text-subtle"
        }`}
      />
    </button>
  );
}

// ── Education row ───────────────────────────────────────────────────

function EducationRow({ edu, onOpen }: { edu: Education; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`${edu.school} — ${edu.degree}: details`}
      className="group flex w-full items-center gap-4 rounded-xl border border-line bg-surface px-4 py-3.5 text-left transition-all hover:shadow-md"
    >
      <Logo exp={{ image: edu.image, company: edu.school }} size="md" />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <p className="truncate text-base font-semibold tracking-tight text-heading">
            {edu.school}
          </p>
          {edu.status && <Tag label={edu.status} variant="stat" />}
        </div>
        <p className="text-sm italic text-muted">{edu.degree}</p>
        <p className="mt-1 line-clamp-2 text-sm text-subtle">{edu.summary}</p>
      </div>
      <p className="hidden shrink-0 text-xs tabular-nums text-subtle sm:block">{edu.duration}</p>
      <ArrowUpRight
        size={14}
        className="shrink-0 text-subtle transition-colors group-hover:text-accent"
      />
    </button>
  );
}

// ── Detail modal (roles) ────────────────────────────────────────────

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
        className="bg-surface rounded-xl max-w-lg w-full p-6 relative max-h-[85vh] overflow-y-auto"
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-subtle hover:text-heading transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-4 mb-4 pr-8">
          <Logo exp={exp} size="lg" />
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent-soft mb-1">
              {exp.duration}
            </p>
            <h3 className="text-2xl font-extrabold text-heading leading-tight">{exp.company}</h3>
            <p className="text-sm italic text-muted mt-0.5">{exp.role}</p>
          </div>
        </div>

        <ul className="space-y-2 mb-4">
          {exp.description.map((point, i) => (
            <li key={i} className="flex gap-2 text-sm text-muted leading-relaxed">
              <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-indigo-300" />
              {point}
            </li>
          ))}
        </ul>

        {exp.stats && exp.stats.length > 0 && (
          <div className="flex flex-wrap gap-6 mb-4">
            {exp.stats.map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-extrabold text-heading leading-none">{s.value}</p>
                <p className="text-xs text-subtle">{s.label}</p>
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

// ── Detail modal (education) ────────────────────────────────────────

function ModalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-5">
      <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-subtle">{title}</h4>
      {children}
    </section>
  );
}

function EducationModal({ edu, onClose }: { edu: Education; onClose: () => void }) {
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
        aria-label={`${edu.school} — ${edu.degree}`}
        className="bg-surface rounded-xl max-w-lg w-full p-6 relative max-h-[85vh] overflow-y-auto"
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-subtle hover:text-heading transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="mb-5 flex items-center gap-4 pr-8">
          <Logo exp={{ image: edu.image, company: edu.school }} size="lg" />
          <div className="min-w-0">
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-accent-soft">
              {edu.duration}
            </p>
            <h3 className="text-2xl font-extrabold leading-tight text-heading">{edu.school}</h3>
            <p className="mt-0.5 text-sm italic text-muted">{edu.degree}</p>
          </div>
        </div>

        {edu.coursework && edu.coursework.length > 0 && (
          <ModalSection title="Coursework">
            <div className="flex flex-wrap gap-1.5">
              {edu.coursework.map((c) => (
                <Tag key={c} label={c} variant="default" />
              ))}
            </div>
          </ModalSection>
        )}

        {edu.certifications && edu.certifications.length > 0 && (
          <ModalSection title="Certifications">
            <ul className="space-y-1.5">
              {edu.certifications.map((c) => (
                <li key={c.name} className="text-sm leading-relaxed text-muted">
                  {c.href ? (
                    <a
                      href={c.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-heading underline-offset-4 hover:text-accent hover:underline"
                    >
                      {c.name}
                    </a>
                  ) : (
                    <span className="font-medium text-heading">{c.name}</span>
                  )}
                  {c.issuer && <span className="text-subtle"> · {c.issuer}</span>}
                </li>
              ))}
            </ul>
          </ModalSection>
        )}

        {edu.awards && edu.awards.length > 0 && (
          <ModalSection title="Awards">
            <ul className="space-y-1.5">
              {edu.awards.map((a) => (
                <li key={a.name} className="text-sm leading-relaxed text-muted">
                  <span className="font-medium text-heading">{a.name}</span>
                  {a.detail && <span className="text-subtle"> · {a.detail}</span>}
                </li>
              ))}
            </ul>
          </ModalSection>
        )}

        {edu.blogHref && (
          <Link
            href={edu.blogHref}
            className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
          >
            {edu.blogLabel ?? "Read more on the blog"} <ArrowUpRight size={14} />
          </Link>
        )}
      </motion.div>
    </motion.div>
  );
}

// ── Page ────────────────────────────────────────────────────────────

export default function Experiences() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [selected, setSelected] = useState<Experience | null>(null);
  const [selectedEdu, setSelectedEdu] = useState<Education | null>(null);
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
        title="Work"
        subtitle="Where I've worked and what I shipped. Click a card for details."
        className="mb-4"
      />

      {/* Filter bar */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="mb-8 border-b border-line/60 pb-6"
      >
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setActiveFilter(null)}
            className="relative px-3.5 py-1.5 text-xs font-bold rounded-xl focus:outline-none transition-colors duration-200"
          >
            {activeFilter === null && (
              <motion.span
                layoutId="exp-tag-pill"
                className="absolute inset-0 bg-brand rounded-xl"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span
              className={`relative z-10 flex items-center gap-1.5 ${
                activeFilter === null ? "text-white" : "text-subtle hover:text-muted"
              }`}
            >
              All
              <span
                className={`text-[10px] font-mono px-1 rounded ${
                  activeFilter === null ? "bg-indigo-800 text-indigo-200" : "bg-sunken text-subtle"
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
                  className="absolute inset-0 bg-brand rounded-xl"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span
                className={`relative z-10 flex items-center gap-1.5 uppercase tracking-wider ${
                  activeFilter === skill ? "text-white" : "text-subtle hover:text-muted"
                }`}
              >
                {skill}
                <span
                  className={`text-[10px] font-mono px-1 rounded ${
                    activeFilter === skill ? "bg-indigo-800 text-indigo-200" : "bg-sunken text-subtle"
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
              className="mt-4 text-sm text-accent-soft"
            >
              Showing roles tagged <span className="font-semibold text-accent">{activeFilter}</span>
              {" · "}
              <button
                onClick={() => setActiveFilter(null)}
                className="underline underline-offset-2 hover:text-accent transition-colors"
              >
                Clear filter
              </button>
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Featured: two columns, same rhythm as the projects page */}
      <motion.div
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        className="mb-10 grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2"
      >
        {featured.map((exp) => (
          <ExperienceCard
            key={exp.company}
            exp={exp}
            active={matches(exp)}
            onOpen={() => setSelected(exp)}
          />
        ))}
      </motion.div>

      {/* Education: always visible, not affected by the skill filters */}
      {/* <section className="mb-10">
        <p className="mb-4 text-xs font-bold uppercase tracking-wider text-subtle">Education</p>
        <div className="space-y-2">
          {EDUCATION.map((edu) => (
            <EducationRow key={edu.school} edu={edu} onOpen={() => setSelectedEdu(edu)} />
          ))}
        </div>
      </section> */}

      {/* Earlier roles — collapsed by default */}
      {earlier.length > 0 && (
        <div className="mb-10">
          {filterHitsEarlier ? (
            <p className="text-xs font-bold uppercase tracking-wider text-subtle">Earlier roles</p>
          ) : (
            <button
              type="button"
              onClick={() => setEarlierOpen((o) => !o)}
              aria-expanded={earlierOpen}
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-subtle hover:text-heading transition-colors"
            >
              Earlier roles
              <span className="rounded bg-sunken px-1 font-mono text-[10px] text-subtle">
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

      <AnimatePresence>
        {selectedEdu && <EducationModal edu={selectedEdu} onClose={() => setSelectedEdu(null)} />}
      </AnimatePresence>
    </PageContainer>
  );
}