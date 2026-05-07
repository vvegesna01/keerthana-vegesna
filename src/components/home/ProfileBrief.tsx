"use client";
import React from "react";
import Image from "next/image";
import { Typewriter } from "react-simple-typewriter";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProfileBrief() {
  return (
    <section className="max-w-4xl mx-auto px-6 pt-16 pb-10">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

        {/* Image (LEFT) */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.25 }}
          className="relative w-full h-80 md:h-[420px] rounded-xl overflow-hidden bg-indigo-50"
        >
          <Image
            src="/images/profiles/profile-headshot.jpg"
            alt="Keerthana profile"
            fill
            className="object-cover"
          />
        </motion.div>

        {/* Text (RIGHT) */}
        <div>

          {/* Title */}
          <h1 className="text-4xl font-extrabold text-indigo-900 mb-3 leading-tight">
            Hi, I&apos;m Keerthana.
          </h1>

          {/* Typewriter (subtle, not dominant) */}
          <p className="text-sm text-indigo-400 font-medium mb-4">
            <Typewriter
              words={[
                "Software Engineer",
                "Bookworm",
                "Undergrad TA",
                "Data Science Researcher",
                "Musician",
              ]}
              loop
              cursor
              cursorStyle="|"
              typeSpeed={60}
              deleteSpeed={40}
              delaySpeed={1200}
            />
          </p>

          {/* Body */}
          <p className="text-localhost_text leading-7 mb-4">
            I enjoy building systems, exploring data, and creating things that are both useful and thoughtful.
          </p>

          <p className="text-localhost_text leading-7 mb-6">
            Outside of work I love reading, playing guitar + songwriting and building small interactive projects around books and data.
          </p>

          {/* Links */}
          <div className="flex gap-4 text-sm">
            <Link
              href="/projects"
              className="text-indigo-900 underline hover:text-purple-500 transition"
            >
              Projects →
            </Link>

            <Link
              href="/experience"
              className="text-indigo-900 underline hover:text-purple-500 transition"
            >
              Experience →
            </Link>
            <Link
              href="/blog"
              className="text-indigo-900 underline hover:text-purple-500 transition"
            >
              Blog →
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}