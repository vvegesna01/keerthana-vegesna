"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Section from "@/components/layout/Section";
import ProfileImage from "@/components/ui/ProfileImage";

// Mix resume words with genuine personality — the contrast is the point
const WORDS = [
  "💻 Software Engineer",
  "📚 Bookworm",
  "📊 Data Science Researcher",
  "📓 Teaching Assistant",
  "🎸 Guitarist & Singer-Songwriter",
  "Purdue Alum, Boiler Up!",
  "🔨 Built this site with code & some blood, sweat and tears as well",
  "☕️ Amateur Barista (decent lattes)",
  "🎧 Currently listening to an audiobook (probably)"
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
    <Section className="pt-16 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mt-20">

        {/* Image — tilted frame that straightens on hover */}
        <ProfileImage
          src="/images/profiles/profile-headshot.jpg"
          alt="Keerthana profile"
          cornerTag="keerthana.dev"
          href="/about"
        />

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

          <p className="text-localhost_text leading-7 mb-5">
            I’m a Software Engineer who loves clean systems, good documentation, and fun UI.
          <p className="text-localhost_text leading-7 mt-2 mb-6">
            Outside of engineering, my life is mostly run on books, songwriting, and sharing my weekly field notes.</p>
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
    </Section>
  );
}