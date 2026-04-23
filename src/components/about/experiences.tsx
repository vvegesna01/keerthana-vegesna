"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// ── Data ────────────────────────────────────────────────────────────

interface Experience {
  duration: string;
  company: string;
  role: string;
  description: string[];
  image: string;
  tag?: string;
}

const EXPERIENCES: Experience[] = [
  {
      duration: "OCT 2025 - JAN 2026",
      company: "EMVO.AI",
      role: "Platform Engineer",
      tag: "Current",
      description: ["Worked on backend services supporting distributed data workflows.",
        "Built and maintained REST APIs for data ingestion and processing",
        "Reduced incident resolution time by ~30% via logs + metrics analysis (CloudWatch)",
        "Contributed to architecture decisions around scalability and fault tolerance"
      ],
      image: "/images/exp/emvo_logo.png",
    },
  {
    duration: "JAN 2024 – MAY 2025",
    company: "Purdue University Honors College",
    role: "Web Developer",
    description: [
      "Designed and implemented user-friendly layouts using HTML, CSS, and JavaScript, enhancing site aesthetics and functionality.",
      "Optimized websites for mobile and desktop platforms, ensuring responsiveness and cross-browser compatibility.",
      "Maintained and updated websites for Purdue Honors College, ensuring usability and accessibility.",
    ],
    image: "/images/exp/honors_image.jpg",
  },
  {
    duration: "JUN 2022 – AUG 2022",
    company: "Cummins, Inc.",
    role: "Software Engineering Intern",
    description: [
      "Worked on the Data Acquisition team to implement monitoring systems for existing applications.",
      "Gained experience with AWS services including CloudWatch Alarms, S3, and Lambda Functions.",
    ],
    image: "/images/exp/cummins-logo-round.jpeg",
  },
  {
    duration: "AUG 2021 – JAN 2022",
    company: "Merck",
    role: "Undergraduate Data Science Researcher",
    description: [
      "Collaborated with Merck to create a web-based inventory tracking system using QR codes to optimize drug development.",
      "Worked on the backend team to set up a common database using AWS S3 and Databricks to analyze the data.",
      "Helped develop the solution architecture for the implementation.",
    ],
    image: "/images/exp/Merck.png",
  },
  {
    duration: "AUG 2021 – JAN 2022",
    company: "The Data Mine",
    role: "Undergraduate Teaching Assistant",
    description: [
      "Assisted over 600 students in The Data Mine during office hours.",
      "Helped students with assignments on Bash, SQL, Unix, R, Python, and SQL.",
    ],
    image: "/images/exp/dm_dr_photo.jpeg",
  },
  {
    duration: "MAY 2021 – AUG 2021",
    company: "Purdue University CS Department",
    role: "Undergraduate Teaching Assistant · CS Bridge Program",
    description: [
      "Mentored and guided 45+ incoming computer science students, facilitating their understanding of object-oriented programming and Java.",
      "Conducted labs, office hours, and workshops resulting in improved learning outcomes.",
    ],
    image: "/images/exp/lawson_loop.jpg",
  },
];

// ── Variants ─────────────────────────────────────────────────────────

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const staggerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// ── Sub-components ───────────────────────────────────────────────────

function StatPill({ label }: { label: string }) {
  return (
    <span className="inline-block bg-indigo-50 border border-indigo-100 text-indigo-500 text-xs font-semibold uppercase tracking-widest rounded-full px-3 py-0.5">
      {label}
    </span>
  );
}

function ExperienceCard({ exp, index }: { exp: Experience; index: number }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <motion.div
      variants={cardVariant}
      className="group relative bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden"
    >
      {/* Thin indigo accent bar on the left */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-l-xl" />

      <div className="flex flex-col sm:flex-row gap-0">
        {/* Image panel */}
        <div className="relative sm:w-44 sm:shrink-0 h-44 sm:h-auto bg-indigo-50 overflow-hidden">
          {!imgLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-indigo-50 animate-pulse" />
          )}
          <Image
            src={exp.image}
            alt={`${exp.company} image`}
            fill
            className={`object-cover transition-opacity duration-300 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
            onLoad={() => setImgLoaded(true)}
            unoptimized
          />
          {/* Subtle overlay on hover */}
          <div className="absolute inset-0 bg-indigo-900/0 group-hover:bg-indigo-900/10 transition-all duration-300" />
        </div>

        {/* Content panel */}
        <div className="flex-1 p-6">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
              {exp.duration}
            </span>
            {exp.tag && <StatPill label={exp.tag} />}
          </div>

          <h3 className="text-xl font-extrabold text-indigo-900 group-hover:text-purple-500 transition-colors duration-300 leading-tight">
            {exp.company}
          </h3>
          <p className="text-sm italic text-gray-500 mt-0.5 mb-4">{exp.role}</p>

          <ul className="space-y-2">
            {exp.description.map((point, i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-600 leading-relaxed">
                <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-indigo-300" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────

export default function Experiences() {
  return (
    <main className="flex min-h-screen flex-col p-10 bg-white overflow-x-hidden">
      <div className="max-w-4xl w-full mx-auto">

        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
          className="mb-10"
        >
          <h1 className="text-4xl leading-10 font-extrabold text-indigo-900 hover:text-purple-500 transition-colors duration-300 mb-3">
            Experience
          </h1>
          <p className="text-gray-500 leading-8 text-lg">
            A timeline of the roles and teams that shaped how I build things.
          </p>
        </motion.div>

        {/* Quick stats */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInVariants}
          className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10"
        >
          {[
            { value: EXPERIENCES.length, label: "Roles" },
            { value: "3+", label: "Years" },
            { value: "AWS", label: "Cloud focus" },
          ].map(({ value, label }) => (
            <div
              key={label}
              className="bg-indigo-50 border border-indigo-100 rounded-lg p-5 flex flex-col gap-1"
            >
              <span className="text-3xl font-extrabold text-indigo-900">{value}</span>
              <span className="text-xs font-semibold text-indigo-700 uppercase tracking-widest">
                {label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Experience cards */}
        <motion.div
          variants={staggerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="flex flex-col gap-4"
        >
          {EXPERIENCES.map((exp, index) => (
            <ExperienceCard key={index} exp={exp} index={index} />
          ))}
        </motion.div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-gray-100 flex flex-wrap justify-between gap-2 text-xs text-gray-400">
          <span>Updated Apr 2026</span>
        </div>
      </div>
    </main>
  );
}