"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Globe2, Users, BookOpen, Camera, Music, ArrowRight } from "lucide-react";
import BlogBrief from "@/components/home/BlogBrief";

import PhotographyGrid from "@/components/about/photographyGrid";
import HikingGame from "@/components/about/hikingGame";
import PageContainer from "@/components/layout/PageContainer";
// import ProfileImage from "@/components/ui/ProfileImage";
import FooterMetadata from "@/components/layout/FooterMetadata";
import FloatingHobbies from "@/components/about/FloatingHobbies";
import MiniBookshelf from "@/components/about/MiniBookshelf";
import AboutHero from "@/components/about/AboutHero";

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
    <PageContainer className="flex flex-col" size="default">
        <AboutHero/>

        {/* ── Beyond Tech — 4-up cards linking to sections ── */}
        <FloatingHobbies setHikingActive={setHikingActive}></FloatingHobbies>


        {/* ── Music ── */}
        <motion.div
          id="music"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInVariants}
          className="mb-12 scroll-mt-10"
        >
          <h2 className="text-2xl font-extrabold text-heading hover:text-accent-soft transition-colors duration-300 mb-3">
            ♫ Music
          </h2>
          <p className="text-muted leading-8 text-lg mb-6">
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
                className="relative w-full aspect-video rounded-xl overflow-hidden bg-surface-alt shadow-sm"
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
        <MiniBookshelf></MiniBookshelf>

        {/* ── Photography ── */}
        <motion.div
          id="photography"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInVariants}
          className="mb-12 scroll-mt-10"
        >
          <h2 className="text-2xl font-extrabold text-heading hover:text-accent-soft transition-colors duration-300 mb-3">
            📷 Photography
          </h2>
          <p className="text-muted leading-8 text-lg mb-6">
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
                className="group relative aspect-square rounded-lg overflow-hidden bg-surface-alt shadow-sm"
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

      
      {hikingActive && (
        <HikingGame onClose={() => setHikingActive(false)} />
      )}
    </PageContainer>
  );
}
