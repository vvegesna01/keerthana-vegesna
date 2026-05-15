"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Globe2, Users, BookOpen, Camera, Music } from "lucide-react";
import BlogBrief from "@/components/home/BlogBrief";

import PhotographyGrid from "@/components/about/photographyGrid";
import HikingGame from "@/components/about/hikingGame";

// ── Variants ─────────────────────────────────────────────────────────

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const staggerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariant = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

// ── Data ─────────────────────────────────────────────────────────────

const COMMUNITY = [
  "Girls Who Code",
  "Rewriting the Code",
  "Society of Women Engineers",
];

const HOBBIES = [
  { icon: Music, label: "Music", color: "text-pink-400", href: "/about#music" },
  {
    icon: BookOpen,
    label: "Reading",
    color: "text-purple-400",
    href: "/bookshelf",
  },
  {
    icon: Camera,
    label: "Photography",
    color: "text-blue-400",
    href: "/about#photography",
  },
  { icon: Globe2, label: "Hiking", color: "text-green-400", href: "#" },
];

// ── Page ─────────────────────────────────────────────────────────────

export default function AboutMe() {
  const [hikingActive, setHikingActive] = useState(false);

  return (
    <main className="flex min-h-screen flex-col p-10 bg-white overflow-x-hidden">
      <div className="max-w-4xl w-full mx-auto">
        {/* ── Hero ── */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
          className="mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Image (LEFT) */}
                    <div
          className="
            relative w-full h-80 md:h-[420px] rounded-xl overflow-hidden
            bg-indigo-100
            rotate-[-3deg] hover:rotate-0 hover:scale-[1.02]
            transition-all duration-300 ease-out
            cursor-pointer
            shadow-md hover:shadow-xl
          "
        >
          <Image
            src="/images/profiles/grad_2023.jpg"
            alt="Keerthana profile"
            fill
            className="object-cover"
          />

          {/* Corner tag — feels personal, not resume-y */}
          <div className="
            absolute bottom-3 left-3
            bg-white/85 backdrop-blur-sm
            rounded-lg px-3 py-1
            text-[11px] font-mono text-white
            tracking-wide z-10
          ">
            purdue.grad
          </div>
        </div>
            {/* <div className="relative w-full h-80 md:h-[420px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/images/profiles/grad_2023.jpg"
                fill
                className="object-cover object-top"
                alt="Keerthana profile"
                priority
              />
            </div> */}

            {/* Text (RIGHT) */}
            <div>
              <h1 className="text-4xl leading-tight font-extrabold text-indigo-900 mb-4">
                Hi there! I&apos;m Keerthana.
              </h1>
              <p className="text-gray-600 leading-7 mb-4">
                I&apos;m currently a Platform Engineer at Emvo.ai.
              </p>

              <p className="text-gray-600 leading-7 mb-4">
                I got my Bachelor&apos;s Degree at{" "}
                <Link
                  href="https://www.purdue.edu/"
                  className="text-purdue_color font-semibold underline transition duration-300 hover:text-blue-500"
                >
                  Purdue University
                </Link>{" "}
                studying Computer Science. I&apos;ve been a Web Developer for
                the Purdue Honors College, a Software Engineering Intern at
                Cummins and also a TA for The Data Mine and for the CS Bridge
                Program.
              </p>

              <p className="text-gray-600 leading-8 py-3 animate-fadeIn">
                I&apos;m involved in communities that empower women in stem like{" "}
                <Link
                  href="https://www.cs.purdue.edu/diversity/womens-history/girls-who-code.html"
                  className="text-gwc_color font-semibold underline transition duration-300 hover:text-blue-500"
                >
                  Girls Who Code
                </Link>
                {", "}
                <Link
                  href="https://rewritingthecode.org/"
                  className="text-rtc_color font-semibold underline transition duration-300 hover:text-blue-500"
                >
                  Rewriting the Code
                </Link>
                {","} and the{" "}
                <Link
                  href="https://swe.org/"
                  className="text-links_color font-semibold underline transition duration-300 hover:text-blue-500"
                >
                  Society of Women Engineers
                </Link>
                {"."}
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── Beyond Tech — 4-up cards linking to sections ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInVariants}
          className="mb-12"
        >
          <h2 className="text-2xl font-extrabold text-indigo-900 hover:text-purple-500 transition-colors duration-300 mb-6">
            🎧 Beyond Tech
          </h2>
          <motion.div
            variants={staggerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3"
          >
            {HOBBIES.map(({ icon: Icon, label, color, href }) => (
              <motion.div key={label} variants={itemVariant}>
                {label === "Hiking" ? (
                  // Hiking triggers the game instead of navigating
                  <button
                    onClick={() => setHikingActive(true)}
                    className="group bg-indigo-50 border border-indigo-100 rounded-lg p-5 flex flex-col items-center gap-2 hover:shadow-md transition-shadow duration-300 text-center w-full"
                  >
                    <Icon
                      size={24}
                      className={`${color} group-hover:scale-110 transition-transform duration-200`}
                    />
                    <span className="text-xs font-semibold uppercase tracking-widest text-indigo-700">
                      {label}
                    </span>
                  </button>
                ) : (
                  <Link
                    href={href}
                    className="group bg-indigo-50 border border-indigo-100 rounded-lg p-5 flex flex-col items-center gap-2 hover:shadow-md transition-shadow duration-300 text-center block"
                  >
                    <Icon
                      size={24}
                      className={`${color} group-hover:scale-110 transition-transform duration-200`}
                    />
                    <span className="text-xs font-semibold uppercase tracking-widest text-indigo-700">
                      {label}
                    </span>
                  </Link>
                )}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Music ── */}
        <motion.div
          id="music"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInVariants}
          className="mb-12 scroll-mt-10"
        >
          <h2 className="text-2xl font-extrabold text-indigo-900 hover:text-purple-500 transition-colors duration-300 mb-3">
            ♫ Music
          </h2>
          <p className="text-gray-500 leading-8 text-lg mb-6">
            I spend my free time songwriting, singing, and honing my guitar
            skills. I also upload covers and original songs on my{" "}
            <Link
              href="https://www.youtube.com/channel/UC3jv-V2sKktWbd16ISmz2WQ"
              target="_blank"
              rel="noopener noreferrer"
              className="text-links_color underline hover:text-transparent hover:bg-gradient-to-r hover:bg-clip-text hover:from-purple-500 hover:to-indigo-500 transition transform hover:-translate-y-1"
            >
              YouTube channel
            </Link>
            .
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {["nIxVo8t5Cj4", "rvKqtjU3Fuo"].map((id) => (
              <div
                key={id}
                className="relative w-full aspect-video rounded-xl overflow-hidden bg-indigo-50 shadow-sm"
              >
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${id}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Photography ── */}
        <motion.div
          id="photography"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInVariants}
          className="mb-12 scroll-mt-10"
        >
          <h2 className="text-2xl font-extrabold text-indigo-900 hover:text-purple-500 transition-colors duration-300 mb-3">
            📷 Photography
          </h2>
          <p className="text-gray-500 leading-8 text-lg mb-6">
            I love taking interesting pictures of my travels and everyday life —
            documenting the way I see the world through my camera lens. Check
            out my{" "}
            <Link
              href="https://vsco.co/not-so-keeth/gallery"
              target="_blank"
              rel="noopener noreferrer"
              className="text-links_color underline hover:text-transparent hover:bg-gradient-to-r hover:bg-clip-text hover:from-purple-500 hover:to-indigo-500 transition transform hover:-translate-y-1"
            >
              VSCO
            </Link>{" "}
            for my most recent shots.
          </p>
          {/* <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {Array.from({ length: 6 }, (_, i) => (
              <div
                key={i}
                className="group relative aspect-square rounded-lg overflow-hidden bg-indigo-50 shadow-sm"
              >
                <Image
                  src={`/images/photography/photo${i + 1}.png`}
                  alt={`Photo ${i + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  unoptimized
                />
              </div>
            ))}
          </div> */}
          <PhotographyGrid />
          <div>
          <BlogBrief></BlogBrief>
          </div>
        </motion.div>

        

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-gray-100 text-xs text-gray-400">
          <span>Updated Apr 2026</span>
        </div>
      </div>
      <div>
  {hikingActive && (
    <HikingGame onClose={() => setHikingActive(false)} />
  )}
</div>
    </main>
  );
}
