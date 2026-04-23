"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export default function Photography() {
  return (
    <main className="flex min-h-screen flex-col p-10 bg-white overflow-x-hidden" id="photography">
      <div className="max-w-4xl w-full mx-auto">

        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
          className="mb-10"
        >
          <h1 className="text-4xl leading-10 font-extrabold text-indigo-900 hover:text-purple-500 transition-colors duration-300 mb-3">
            Photography
          </h1>
          <p className="text-gray-500 leading-8 text-lg">
            I love taking interesting pictures of my travels and everyday life — documenting the way
            I see the world through my camera lens. Check out my{" "}
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
        </motion.div>

        {/* VSCO embed / CTA card */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInVariants}
        >
          <Link
            href="https://vsco.co/not-so-keeth/gallery"
            target="_blank"
            rel="noopener noreferrer"
            className="group block bg-indigo-50 border border-indigo-100 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300 text-center"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-2">
              Gallery
            </p>
            <p className="text-2xl font-extrabold text-indigo-900 group-hover:text-purple-500 transition-colors duration-300">
              vsco.co/not-so-keeth
            </p>
            <p className="text-sm text-gray-400 mt-2">Open in VSCO →</p>
          </Link>
        </motion.div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-gray-100 flex flex-wrap justify-between gap-2 text-xs text-gray-400">
          <span>Updated Apr 2026</span>
          <Link
            href="https://vsco.co/not-so-keeth/gallery"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 underline hover:text-purple-500 transition-colors duration-200"
          >
            View VSCO gallery →
          </Link>
        </div>
      </div>
    </main>
  );
}