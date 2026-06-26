"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const experiences = [
  {
    duration: "2025 — 2026",
    company: "Emvo",
    role: "Backend Engineer",
    image: "/images/exp/emvo_new_logo.png",
    current: true,
  },
  {
    duration: "2024 — 2025",
    company: "Purdue University",
    role: "Web Developer",
    image: "/images/exp/honors_logo.png",
    current: false,
  },
  {
    duration: "2022",
    company: "Cummins",
    role: "Software Engineering Intern",
    image: "/images/exp/cummins-logo-round.jpeg",
    current: false,
  },
  {
    duration: "2021 — 2022",
    company: "Merck",
    role: "Data Science Researcher",
    image: "/images/exp/Merck.png",
    current: false,
  },
];

export default function ExperiencesBrief() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-10">
      <div className="mb-10">
        <h2 className="text-2xl font-extrabold text-indigo-900 hover:text-purple-500 transition mb-1">
          <Link href="/experience">Experience</Link>
        </h2>
        <p className="text-gray-500 text-sm">
          A few places I&apos;ve worked and learned from, most recent first.
        </p>
      </div>

      <div className="relative pl-8 md:pl-10">
        {/* Spine — sits behind the dots, so position it first */}
        <div className="absolute left-[7px] md:left-[9px] top-2 bottom-2 w-px bg-indigo-200" />

        <div className="flex flex-col gap-6">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="relative"
            >
              {/* Dot on the spine */}
              <span
                className={`
                  absolute -left-8 md:-left-10 top-1/2 -translate-y-1/2
                  w-3.5 h-3.5 rounded-full border-2
                  ${exp.current ? "bg-indigo-500 border-indigo-500" : "bg-white border-indigo-300"}
                `}
              >
                {exp.current && (
                  <span className="absolute inset-0 rounded-full bg-indigo-400 animate-ping opacity-60" />
                )}
              </span>

              <motion.div
                whileHover={{ x: 4 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-4 bg-white border border-indigo-100 rounded-xl p-3 md:p-4 hover:border-indigo-300 hover:shadow-sm transition-shadow"
              >
                <div className="relative w-14 h-14 shrink-0 bg-indigo-50 rounded-lg overflow-hidden">
                  <Image src={exp.image} alt={exp.company} fill className="object-contain p-2" />
                </div>

                <div className="min-w-0">
                  <p className="text-[11px] font-mono text-indigo-400 uppercase tracking-widest">
                    {exp.duration}{exp.current ? " · current" : ""}
                  </p>
                  <p className="text-sm font-semibold text-indigo-900 truncate">{exp.company}</p>
                  <p className="text-xs text-gray-500 truncate">{exp.role}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}