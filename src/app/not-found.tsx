"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Home } from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";

const editorial = "font-[family-name:var(--font-editorial)]";

// Add more destinations here and they show up automatically.
const LINKS = [
  {
    href: "/about",
    title: "About",
    blurb: "Who I am and what I'm up to.",
  },
  {
    href: "/bookshelf",
    title: "Bookshelf",
    blurb: "What I'm reading, and what I'd recommend.",
  },
];

export default function NotFound() {
  const reduceMotion = useReducedMotion();

  return (
    <PageContainer
      className="flex min-h-[70vh] flex-col items-center justify-center text-center"
      size="default"
    >
      {/* 4 [book] 4: the sticker stands in for the zero */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`${editorial} flex items-center justify-center gap-2 text-7xl font-bold leading-none text-heading sm:gap-4 sm:text-9xl`}
        aria-label="404"
        role="img"
      >
        <span aria-hidden>4</span>
        <motion.span
          aria-hidden
          className="relative inline-block h-16 w-12 sm:h-28 sm:w-20"
          animate={reduceMotion ? undefined : { rotate: [-6, 6, -6], y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/images/stickers/book.png"
            alt=""
            fill
            sizes="80px"
            className="object-contain"
            priority
          />
        </motion.span>
        <span aria-hidden>4</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h1
          className={`${editorial} mt-6 text-2xl font-medium text-localhost_text sm:text-3xl`}
        >
          this page wandered off.
        </h1>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted sm:text-base">
          Maybe it&apos;s tucked away between two books somewhere. Here&apos;s
          where you can look instead.
        </p>
      </motion.div>

      <motion.ul
        initial="hidden"
        animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.25 } } }}
        className="mt-8 grid w-full max-w-xl grid-cols-1 gap-3 sm:grid-cols-2"
      >
        {LINKS.map((l) => (
          <motion.li
            key={l.href}
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
            }}
          >
            <Link
              href={l.href}
              className="group flex h-full items-start justify-between gap-3 rounded-xl border border-line bg-surface p-4 text-left transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            >
              <span>
                <span className="block text-base font-semibold tracking-tight text-heading">
                  {l.title}
                </span>
                <span className="mt-0.5 block text-sm text-subtle">{l.blurb}</span>
              </span>
              <ArrowUpRight
                size={16}
                className="mt-1 shrink-0 text-subtle transition-colors group-hover:text-accent"
                aria-hidden
              />
            </Link>
          </motion.li>
        ))}
      </motion.ul>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="mt-6"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-subtle transition-colors hover:text-accent"
        >
          <Home size={14} aria-hidden />
          Back home
        </Link>
      </motion.div>
    </PageContainer>
  );
}