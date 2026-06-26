"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const staggerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariant = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const VIDEOS = [
  { id: "nIxVo8t5Cj4", title: "Cover · nIxVo8t5Cj4" },
  { id: "rvKqtjU3Fuo", title: "Cover · rvKqtjU3Fuo" },
];

export default function Music() {
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
            Music
          </h1>
          <p className="text-gray-500 leading-8 text-lg">
            I spend my free time songwriting, singing, and honing my guitar skills. I also upload
            covers and original songs on my{" "}
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
        </motion.div>

        {/* Videos */}
        <motion.div
          variants={staggerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {VIDEOS.map(({ id }) => (
            <motion.div
              key={id}
              variants={itemVariant}
              className="group bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              <div className="relative w-full aspect-video bg-indigo-50">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${id}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-gray-100 flex flex-wrap justify-between gap-2 text-xs text-gray-400">
          <span>Updated June 2026</span>
          <Link
            href="https://www.youtube.com/channel/UC3jv-V2sKktWbd16ISmz2WQ"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 underline hover:text-purple-500 transition-colors duration-200"
          >
            View full YouTube channel →
          </Link>
        </div>
      </div>
    </main>
  );
}