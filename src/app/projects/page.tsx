"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

// ── Data ────────────────────────────────────────────────────────────

interface Project {
  title: string;
  image: string;
  description: string[];
  tags: string[];
  links: { label: string; href: string; disabled?: boolean }[];
}

const PROJECTS: Project[] = [
  {
    title: "Where Does Your Data Go?",
    image: "/images/projects/datago.png",
    tags: ["Streamlit", "HTML Components", "Python"],
    description: [
      "Interactive Streamlit app that visualizes the real-time journey of your data across the internet, from your device through CDNs, load balancers, servers, and storage",
      "Features four data scenarios (photo upload, message, search, video stream) each with an animated node-by-node reveal"
    ],
    links: [{ label: "Visit Live App", href: "https://where-does-your-data-go.streamlit.app/", disabled: false },
      { label: "Source Code", href: "https://github.com/vvegesna01/Where-Does-Your-Data-Go" },
      {label: "Blog Post", href:"https://keerthana-vegesna.vercel.app/blog/wheredoesyourdatago"}
    ],
  },
  {
    title: "Obsidian Movie Vault",
    image: "/images/projects/movies.png",
    tags: ["Obsidian", "Markdown", "IMDb API"],
    description: [
      "A personal movie database built inside Obsidian using Markdown and Dataview.",
      "Integrates with the IMDb API to automatically fetch movie metadata including ratings, genres, cast, and release year.",
      "Supports dynamic queries to sort and filter movies by genre, rating, or watch status directly in Obsidian.",
      "Designed as a lightweight, local alternative to third-party movie tracking apps.",
    ],
    links: [{ label: "Tutorial coming soon!", href: "", disabled: true },],
  },
  {
    title: "Shelf This",
    image: "/images/projects/shelf_this.png",
    tags: ["Python", "Streamlit", "Data Viz"],
    description: [
      "A dashboard to visualise reading habits using imported Goodreads / Storygraph data.",
      "Built with Streamlit and Python.",
      "Stats include Highest Rated Reads, Books by Format, Reading Pace metrics, and more.",
    ],
    links: [
      { label: "Source Code", href: "https://github.com/vvegesna01/ShelfThis" },
      { label: "Go to Website", href: "https://shelfthis.streamlit.app/" },
    ],
  },
  {
    title: "Investogram",
    image: "/images/projects/investogram_profile.png",
    tags: ["React", "Next.js", "MongoDB"],
    description: [
      "An app for beginner traders to start with play money and interact with the stock market to learn about investing.",
      "Built with MongoDB backend and React / Next.js frontend.",
      "Features include making, commenting, and liking posts on your feed from friends.",
      "A personal dashboard showing portfolio value, money invested, all previous trades, and current holdings.",
      "Leaderboard incentives to get better at investing.",
    ],
    links: [
      { label: "Source Code", href: "https://github.com/CS-407/Investogram-Frontend" },
      { label: "Demo Slides", href: "https://docs.google.com/presentation/d/1m5OFbwTUwbOdZnJzoAFLw9boNMa-b-4CzSh_a33uPkQ" },
    ],
  },
  {
    title: "The Eras Tour Tracker",
    image: "/images/projects/eras_tour.png",
    tags: ["React", "Next.js", "OpenStreetMaps"],
    description: [
      "A tracker for venues, openers, and song analytics for Taylor Swift's Eras Tour.",
      "Geo-coded data with React / Next.js frontend and OpenStreetMaps API.",
      "Dynamic visual representation of tour locations, setlists, openers, and venue info across devices.",
    ],
    links: [
      { label: "Source Code", href: "https://github.com/vvegesna01/eras-tour-tracker" },
      { label: "Go to Website", href: "https://eras-tour-tracker.vercel.app/" },
    ],
  },
  {
    title: "Design Detective",
    image: "/images/projects/design_detective.png",
    tags: ["HTML", "Javascript", "CSS"],
    description: [
      "Let's you hover over fonts and colors on the interwebs and copy the font names and hex codes to your clipboard",

    ],
    links: [
      {label: "Download Extension", href: "https://github.com/vvegesna01/Design-Detective"},
    ]
  },
  {
    title: "PurduePAL",
    image: "/images/projects/purduePAL.png",
    tags: ["React", "Python", "MongoDB"],
    description: [
      "A social media app for Purdue students to connect with each other.",
      "Built with React frontend and Python / MongoDB backend.",
      "Features include liking, commenting, posting, and following interest pages.",
      "Anonymous posting option and profile customization with picture, bio, and username.",
    ],
    links: [
      { label: "Source Code", href: "https://github.com/CS307Spring2022/PurduePAL-Backend" },
    ],
  },
  {
    title: "Shell Project",
    image: "/images/projects/shell.png",
    tags: ["C", "Systems Programming", "Lex", "Yacc"],
    description: [
      "Shell interpreter written in C++ that replicates functionality of csh and bash shells.",
      "Features include piping and file redirection, exit signal handling, subshell, environment variable expansion, wildcard expansion, command history, and path completion.",
    ],
    links: [
      { label: "CSH", href: "https://www2.cs.duke.edu/csl/docs/csh.html" },
      { label: "Bash Shell", href: "https://www.gnu.org/software/bash/" },
    ],
  },
  {
    title: "Old Portfolio Website",
    image: "/images/projects/old_portfolio.png",
    tags: ["HTML", "CSS", "JavaScript"],
    description: [],
    links: [
      { label: "Source Code", href: "https://github.com/vvegesna01/old-portfolio" },
      { label: "Go to Website", href: "https://vvegesna01.github.io/old-portfolio/" },
    ],
  },
];

// ── Variants ─────────────────────────────────────────────────────────

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const staggerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// ── Sub-components ───────────────────────────────────────────────────

function Tag({ label }: { label: string }) {
  return (
    <span className="inline-block bg-indigo-50 border border-indigo-100 text-indigo-500 text-xs font-semibold uppercase tracking-widest rounded-full px-3 py-0.5">
      {label}
    </span>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <motion.div
      variants={cardVariant}
      className="group relative bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden"
    >
      {/* Left accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-l-xl" />

      <div className="flex flex-col sm:flex-row gap-0">
        {/* Image panel */}
        <div className="relative sm:w-64 sm:shrink-0 h-52 sm:h-auto bg-indigo-50 overflow-hidden">
          {!imgLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-indigo-50 animate-pulse" />
          )}
          <Image
            src={project.image}
            alt={project.title}
            fill
            className={`object-cover transition-opacity duration-300 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
            onLoad={() => setImgLoaded(true)}
            unoptimized
          />
          <div className="absolute inset-0 bg-indigo-900/0 group-hover:bg-indigo-900/10 transition-all duration-300" />
        </div>

        {/* Content panel */}
        <div className="flex-1 p-6 flex flex-col justify-between gap-4">
          <div>
            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {project.tags.map((tag) => (
                <Tag key={tag} label={tag} />
              ))}
            </div>

            {/* Title */}
            <h3 className="text-xl font-extrabold text-indigo-900 group-hover:text-purple-500 transition-colors duration-300 leading-tight mb-3">
              {project.title}
            </h3>

            {/* Description */}
            {project.description.length > 0 && (
              <ul className="space-y-2">
                {project.description.map((point, i) => (
                  <li key={i} className="flex gap-2 text-sm text-gray-600 leading-relaxed">
                    <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-indigo-300" />
                    {point}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-2 pt-1">
            {project.links.map((link) =>
              link.disabled ? (
                <span
                  key={link.label}
                  className="inline-block bg-gray-100 text-gray-400 text-sm font-semibold rounded-full py-1.5 px-4 cursor-not-allowed"
                >
                  {link.label}
                </span>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-indigo-900 text-white text-sm font-semibold rounded-full py-1.5 px-4 border border-indigo-900 hover:bg-transparent hover:text-indigo-900 transition duration-300"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────

export default function Projects() {
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
            Projects
          </h1>
          <p className="text-gray-500 leading-8 text-lg">
            Things I&apos;ve built, from data dashboards to social apps to shell interpreters.
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInVariants}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10"
        >
          {[
            { value: PROJECTS.length, label: "Projects" },
            { value: "4", label: "Live apps" },
            { value: "Full-stack", label: "Focus area" },
            { value: "Python", label: "Go-to stack" },
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

        {/* Project cards */}
        <motion.div
          variants={staggerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="flex flex-col gap-4"
        >
          {PROJECTS.map((project) => (
            <ProjectCard key={project.title} project={project} />
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