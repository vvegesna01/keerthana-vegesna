"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const experiences = [

  {
    duration: "2025-2026",
    company: "Emvo.ai",
    role: "Platform Engineer",
    image: "/images/exp/emvo_new_logo.png",
  },
  {
    duration: "2024-2025",
    company: "Purdue University",
    role: "Web Developer",
    image: "/images/exp/honors_logo.png",
  },
  {
    duration: "2022",
    company: "Cummins",
    role: "Software Engineering Intern",
    image: "/images/exp/cummins-logo-round.jpeg",
  },
  {
    duration: "AUG 2021 - MAY 2022",
    company: "Merck",
    role: "Data Science Researcher",
    image: "/images/exp/Merck.png"
  }
];

export default function ExperiencesBrief() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-10">
      
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-extrabold text-indigo-900 mb-2">
          Experience
        </h2>
        <p className="text-gray-500 text-sm">
          A few places I’ve worked and learned from.
        </p>
      </div>

      {/* Cards */}
      <div className="flex gap-4 overflow-x-auto pb-2">
        {experiences.map((exp, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03 }}
            className="min-w-[200px] bg-indigo-50 border border-indigo-100 rounded-lg p-4 flex flex-col gap-3"
          >
            <div className="relative w-full h-24 bg-white rounded-md overflow-hidden">
              <Image
                src={exp.image}
                alt={exp.company}
                fill
                className="object-contain p-2"
              />
            </div>

            <div>
              <p className="text-xs text-indigo-400 uppercase tracking-widest">
                {exp.duration}
              </p>
              <p className="text-sm font-semibold text-indigo-900">
                {exp.company}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {exp.role}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}