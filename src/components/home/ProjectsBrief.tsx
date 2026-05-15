"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const projects = [
  {
    title: "Where Does Your Data Go?",
    image: "/images/projects/datago.png",
    link: "/projects",
    // Spans 2 cols + 2 rows — the hero tile.
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-2",
    large: true,
  },
  {
    title: "Investogram",
    image: "/images/projects/investogram_profile.png",
    link: "/projects",
    colSpan: "",
    rowSpan: "",
    large: false,
  },
  {
    title: "Book Club Dashboard",
    image: "/images/projects/krachbooks.gif",
    link: "/projects",
    colSpan: "",
    rowSpan: "",
    large: false,
  },
  {
    title: "Eras Tour Tracker",
    image: "/images/projects/eras_tour.png",
    link: "/projects",
    colSpan: "md:col-span-2",
    rowSpan: "",
    large: false,
  },
  {
    title: "Jot - Thought Capture Tool",
    image: "/images/projects/jot_triage.gif",
    link: "/projects",
    colSpan: "",
    rowSpan: "",
    large: false,
  }
];

export default function ProjectsBrief() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h2 className="text-2xl font-extrabold text-indigo-900 hover:text-purple-500 transition mb-1">
          <Link href="/projects">Projects</Link>
        </h2>
        <p className="text-gray-400 text-sm italic">
          Things I&apos;ve built for fun, curiosity, and exploration.
        </p>
      </div>

      {/*
        Bento grid — 3 columns, 2 rows at md+.
        Layout:
          [ hero (2×2) ] [ small ] [ small ]
          [ hero (2×2) ] [ wide (2×1)      ]
      */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 auto-rows-[180px]">
        {projects.map((project, i) => (
          <motion.a
            key={i}
            href={project.link}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className={`
              group relative rounded-2xl overflow-hidden
              bg-indigo-50 border border-indigo-100
              ${project.colSpan} ${project.rowSpan}
            `}
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Overlay — gradient from bottom so title is always readable */}
            <div className="
              absolute inset-0
              bg-gradient-to-t from-indigo-950/80 via-indigo-900/10 to-transparent
              opacity-60 group-hover:opacity-90
              transition-opacity duration-300
            " />

            {/* Title — always visible at bottom, grows on hover */}
            <div className="absolute inset-x-0 bottom-0 p-4">
              <p className={`
                text-white font-semibold leading-tight
                ${project.large ? "text-lg" : "text-sm"}
              `}>
                {project.title}
              </p>
              {/* Arrow appears on hover */}
              <p className="
                text-indigo-300 text-xs mt-1
                opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0
                transition-all duration-200
              ">
                View project →
              </p>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}