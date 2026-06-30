"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface FloatingHobbiesProps {
  setHikingActive: (active: boolean) => void;
}

const HOBBIES = [
  {
    image: "/images/logo/hobbies/music.png",
    label: "Music",
    type: "link",
    href: "/about#music",
    delay: 0,
  },
  {
    image: "/images/logo/hobbies/reading.png",
    label: "Reading",
    type: "link",
    href: "/bookshelf",
    delay: 0.4,
  },
  {
    image: "/images/logo/hobbies/photography.png",
    label: "Photography",
    type: "link",
    href: "/about#photography",
    delay: 0.2,
  },
  {
    image: "/images/logo/hobbies/hiking.png",
    label: "Hiking",
    type: "hiking",
    delay: 0.6,
  },
];

// Decorative ambient doodles — unchanged from before.
const DOODLES = [
  {
    node: (
      <svg width="56" height="24" viewBox="0 0 56 24" fill="none">
        <path
          d="M2 18C8 6 14 22 20 12C26 2 32 20 38 10C44 2 48 16 54 8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    className:
      "hidden sm:block absolute -top-6 -left-4 text-indigo-200/70 rotate-[-6deg]",
    floatDelay: 0.3,
  },
  {
    node: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path
          d="M14 2 L17 11 L26 14 L17 17 L14 26 L11 17 L2 14 L11 11 Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
    className:
      "hidden sm:block absolute top-1/2 -right-6 text-purple-200/70",
    floatDelay: 0.8,
  },
  {
    node: (
      <svg width="60" height="20" viewBox="0 0 60 20" fill="none">
        <path
          d="M2 18C15 2 45 2 58 18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="1 7"
        />
      </svg>
    ),
    className:
      "hidden sm:block absolute -bottom-8 left-1/3 text-gray-300/70",
    floatDelay: 1.2,
  },
];

const doodleFloat = (delay: number) => ({
  y: [0, -6, 0],
  opacity: [0.7, 1, 0.7],
  transition: {
    duration: 5,
    repeat: Infinity,
    ease: "easeInOut",
    delay,
  },
});

export default function FloatingHobbies({
  setHikingActive,
}: FloatingHobbiesProps) {
  return (
    <div className="relative isolate mb-16 py-6 select-none">
      <h2 className="text-2xl font-extrabold text-indigo-900 mb-10">
        Beyond Tech
      </h2>

      {DOODLES.map((d, i) => (
        <motion.div
          key={i}
          aria-hidden="true"
          className={d.className}
          animate={doodleFloat(d.floatDelay)}
        >
          {d.node}
        </motion.div>
      ))}

      <div className="flex flex-row flex-wrap justify-around items-center gap-10 md:gap-16 px-4">
        {HOBBIES.map(({ image, label, type, href, delay }) => {
          const floatAnimation = {
            y: [0, -10, 0, -6, 0],
            rotate: [0, 1.5, -1.5, 0.5, 0],
            transition: {
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay,
            },
          };

          const itemStyles =
            "group flex flex-col items-center gap-2 cursor-pointer transition-opacity duration-300 hover:opacity-80";

          const hobbyContent = (
            <>
              <div className="relative w-20 h-20 transition-transform duration-300 group-hover:scale-110">
                <Image
                  src={image}
                  alt={label}
                  fill
                  className="object-contain drop-shadow-md"
                />
              </div>

              <span className="text-[11px] font-bold uppercase tracking-widest text-indigo-900/70 group-hover:text-indigo-900">
                {label}
              </span>
            </>
          );

          return (
            <motion.div
              key={label}
              animate={floatAnimation}
              whileHover={{ scale: 1.08, y: -4 }}
            >
              {type === "hiking" ? (
                <button
                  onClick={() => setHikingActive(true)}
                  className={itemStyles}
                >
                  {hobbyContent}
                </button>
              ) : (
                <Link href={href!} className={itemStyles}>
                  {hobbyContent}
                </Link>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}