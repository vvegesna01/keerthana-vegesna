"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Mix resume words with genuine personality — the contrast is the point
const WORDS = [
  "Software Engineer",
  "Bookworm",
  "Currently job-hunting",
  "Data Science Researcher",
  "Guitarist + Songwriter",
  "Will talk for hours about books",
  "Data is my jam",
];

function useTypewriter(words: string[], typeSpeed = 65, deleteSpeed = 35, pauseMs = 1600) {
  const [display, setDisplay] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting) {
      timeout = setTimeout(() => {
        setDisplay(word.slice(0, charIndex + 1));
        if (charIndex + 1 === word.length) {
          setTimeout(() => setDeleting(true), pauseMs);
        } else {
          setCharIndex((c) => c + 1);
        }
      }, typeSpeed);
    } else {
      timeout = setTimeout(() => {
        setDisplay(word.slice(0, charIndex - 1));
        if (charIndex - 1 === 0) {
          setDeleting(false);
          setWordIndex((i) => (i + 1) % words.length);
          setCharIndex(0);
        } else {
          setCharIndex((c) => c - 1);
        }
      }, deleteSpeed);
    }

    return () => clearTimeout(timeout);
  }, [words, wordIndex, charIndex, deleting, typeSpeed, deleteSpeed, pauseMs]);

  return display;
}

export default function ProfileBrief() {
  const typed = useTypewriter(WORDS);

  return (
    <section className="max-w-4xl mx-auto px-6 pt-16 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

        {/* Image — tilted frame that straightens on hover */}
        <Link
          className="
            relative w-full h-80 md:h-[420px] rounded-xl overflow-hidden
            bg-indigo-100
            rotate-[-3deg] hover:rotate-0 hover:scale-[1.02]
            transition-all duration-300 ease-out
            cursor-pointer
            shadow-md hover:shadow-xl
          "
          href={"/about"}
        >
          <Image
            src="/images/profiles/profile-headshot.jpg"
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
            keerthana.dev
          </div>
        </Link>

        {/* Text */}
        <div>
          <h1 className="text-4xl font-extrabold text-indigo-900 mb-2 leading-tight">
            Hi, I&apos;m Keerthana.
          </h1>

          {/* Typewriter — mono font keeps it distinct from body copy */}
          <p className="font-mono text-xs text-indigo-500 tracking-widest mb-5 h-5">
            {typed}
            <span className="animate-pulse">|</span>
          </p>

          <p className="text-localhost_text leading-7 mb-4">
            I enjoy building systems, exploring data, and creating things that are both useful and thoughtful.
          </p>
          <p className="text-localhost_text leading-7 mb-6">
            Outside of work I love reading, playing guitar + songwriting, and building small interactive projects around books and data.
          </p>

          <div className="flex gap-5 text-sm flex-wrap">
            {[
              { href: "/projects", label: "Projects →" },
              { href: "/experience", label: "Experience →" },
              { href: "/bookshelf", label: "Bookshelf →"}
              // { href: "/blog", label: "Blog →" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="
                  text-indigo-900 font-semibold
                  border-b-2 border-indigo-300 pb-px
                  hover:text-purple-600 hover:border-purple-500
                  transition-colors duration-200
                "
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}