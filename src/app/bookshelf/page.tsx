"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import BookRecommender from "@/components/bookshelf/readNext";

// ── Data ────────────────────────────────────────────────────────────

const FIVE_STARS: { title: string; author: string; isbn: string }[] = [
  { title: "Babel", author: "R.F. Kuang", isbn: "9780063021426" },
  { title: "Flowers for Algernon", author: "Daniel Keyes", isbn: "9781474605731" },
  { title: "Betty", author: "Tiffany McDaniel", isbn: "9780525657071" },
  { title: "Sunrise On The Reaping", author: "Suzanne Collins", isbn: "9781546171461" },
  { title: "Project Hail Mary", author: "Andy Weir", isbn: "9780593135204" },
  { title: "The Guest Cat", author: "Takashi Hiraide", isbn: "9780811221504" },
  { title: "Crying in H Mart", author: "Michelle Zauner", isbn: "9780525657743" },
  { title: "Lessons in Chemistry", author: "Bonnie Garmus", isbn: "9780385547345" },
  { title: "Educated", author: "Tara Westover", isbn: "9780525510673" },
  { title: "Open Water", author: "Caleb Azumah Nelson", isbn: "9780241448779" },
  { title: "A Suitable Boy", author: "Vikram Seth", isbn: "9780062433657" },
  { title: "Someone Who Will Love You in All Your Damaged Glory", author: "Raphael Bob-Waksberg", isbn: "9781984891891" },
  { title: "Strange Houses", author: "Uketsu", isbn: "9780063433151" },
  { title: "Everything is Tuberculosis", author: "John Green", isbn: "9798217082391" },
  { title: "The Hunger Games", author: "Suzanne Collins", isbn: "9780439023481" },
  { title: "Such a Fun Age", author: "Kiley Reid", isbn: "9780525541929" },
  { title: "The Martian", author: "Andy Weir", isbn: "9780804139021" },
  { title: "The Little Book of Hygge", author: "Meik Wiking", isbn: "9780241283912" },
  { title: "The Invisible Life of Addie LaRue", author: "V.E. Schwab", isbn: "9781250777959" },
  { title: "We Should All Be Feminists", author: "Chimamanda Ngozi Adichie", isbn: "9781101872932" },
];

const RATING_DIST = [
  { label: "2", count: 1 },
  { label: "2.5", count: 1 },
  { label: "2.75", count: 2 },
  { label: "3", count: 9 },
  { label: "3.25", count: 6 },
  { label: "3.5", count: 5 },
  { label: "3.75", count: 12 },
  { label: "4", count: 15 },
  { label: "4.25", count: 5 },
  { label: "4.5", count: 7 },
  { label: "4.75", count: 11 },
  { label: "5", count: 24 },
];

const BOOKS_PER_YEAR: { year: string; count: number }[] = [
  { year: "2022", count: 17 },
  { year: "2023", count: 13 },
  { year: "2024", count: 17 },
  { year: "2025", count: 22 },
  { year: "2026*", count: 36 },
];

const FORMATS = [
  { label: "Hardcover", count: 49 },
  { label: "Audio", count: 33 },
  { label: "Paperback", count: 32 },
  { label: "Digital", count: 19 },
];

const MONTHLY = [
  { m: "Jan", year: "25", n: 3 }, { m: "Feb", year: "25", n: 1 },
  { m: "Mar", year: "25", n: 0 }, { m: "Apr", year: "25", n: 2 },
  { m: "May", year: "25", n: 5 }, { m: "Jun", year: "25", n: 0 },
  { m: "Jul", year: "25", n: 3 }, { m: "Aug", year: "25", n: 2 },
  { m: "Sep", year: "25", n: 1 }, { m: "Oct", year: "25", n: 3 },
  { m: "Nov", year: "25", n: 2 }, { m: "Dec", year: "25", n: 0 },
  { m: "Jan", year: "26", n: 9 }, { m: "Feb", year: "26", n: 13 },
  { m: "Mar", year: "26", n: 9 }, { m: "Apr", year: "26", n: 5 },
];

const TOP_MOODS = [
  { label: "adventurous", count: 6 },
  { label: "dark", count: 6 },
  { label: "mysterious", count: 4 },
  { label: "emotional", count: 3 },
  { label: "reflective", count: 3 },
  { label: "funny", count: 2 },
  { label: "informative", count: 2 },
  { label: "tense", count: 2 },
];

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const staggerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const itemVariant = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

// ── Sub-components ───────────────────────────────────────────────────

function BookCoverCard({ title, author, isbn }: { title: string; author: string; isbn: string }) {
  const [loaded, setLoaded] = useState(false);
  const coverUrl = `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;

  return (
    <motion.div variants={itemVariant} className="flex flex-col items-center group">
      <div className="relative w-full aspect-[2/3] bg-indigo-50 rounded overflow-hidden shadow-md transition-transform duration-300 group-hover:scale-105 group-hover:shadow-xl">
        {!loaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-indigo-50 animate-pulse" />
        )}
        <Image
          src={coverUrl}
          alt={title}
          fill
          className={`object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setLoaded(true)}
          unoptimized
        />
        <div className="absolute inset-0 bg-indigo-900/0 group-hover:bg-indigo-900/75 transition-all duration-300 flex items-end p-2">
          <div className="translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <p className="text-white text-xs font-semibold leading-tight">{title}</p>
            <p className="text-indigo-300 text-xs mt-0.5">{author}</p>
          </div>
        </div>
      </div>
      <p className="mt-2 text-xs text-center text-indigo-900 font-medium leading-tight line-clamp-2 w-full px-0.5">
        {title}
      </p>
    </motion.div>
  );
}

function StatCard({ value, label, sub }: { value: string | number; label: string; sub?: string }) {
  return (
    <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-5 flex flex-col gap-1">
      <span className="text-3xl font-extrabold text-indigo-900">{value}</span>
      <span className="text-xs font-semibold text-indigo-700 uppercase tracking-widest">{label}</span>
      {sub && <span className="text-xs text-indigo-400">{sub}</span>}
    </div>
  );
}

function RatingChart() {
  const max = Math.max(...RATING_DIST.map((r) => r.count));
  return (
    <div className="bg-white border border-gray-100 rounded-lg p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-4">
        Rating distribution
      </p>
      <div className="flex flex-col gap-2">
        {RATING_DIST.map((r) => (
          <div
            key={r.label}
            className="grid items-center gap-2"
            style={{ gridTemplateColumns: "2.5rem 1fr 1.25rem" }}
          >
            <span className="text-xs text-gray-400 text-right">{r.label}</span>
            <div className="h-1.5 bg-indigo-50 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-900 rounded-full transition-all duration-700"
                style={{ width: `${(r.count / max) * 100}%` }}
              />
            </div>
            <span className="text-xs text-gray-400">{r.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function YearlyChart() {
  const max = Math.max(...BOOKS_PER_YEAR.map((y) => y.count));
  return (
    <div className="bg-white border border-gray-100 rounded-lg p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-4">
        Books per year
      </p>
      <div className="flex gap-3 items-end" style={{ height: "96px" }}>
        {BOOKS_PER_YEAR.map(({ year, count }) => (
          <div key={year} className="flex flex-col items-center gap-1 flex-1">
            <span className="text-xs text-gray-400">{count}</span>
            <div className="w-full bg-indigo-50 rounded-sm relative" style={{ height: "64px" }}>
              <div
                className="absolute bottom-0 left-0 right-0 bg-indigo-900 rounded-sm"
                style={{ height: `${(count / max) * 100}%` }}
              />
            </div>
            <span className="text-xs text-gray-400 whitespace-nowrap">{year}</span>
          </div>
        ))}
      </div>
      <p className="text-xs text-indigo-300 mt-2">* 2026 in progress</p>
    </div>
  );
}

function FormatChart() {
  const max = Math.max(...FORMATS.map((f) => f.count));
  return (
    <div className="bg-white border border-gray-100 rounded-lg p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-4">Format</p>
      <div className="flex flex-col gap-3">
        {FORMATS.map((f) => (
          <div key={f.label} className="flex items-center gap-3">
            <span className="text-xs text-gray-600 w-24 shrink-0">{f.label}</span>
            <div className="flex-1 h-1.5 bg-indigo-50 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-700 rounded-full"
                style={{ width: `${(f.count / max) * 100}%` }}
              />
            </div>
            <span className="text-xs text-gray-400 w-5 text-right">{f.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MoodCloud() {
  const max = Math.max(...TOP_MOODS.map((m) => m.count));
  return (
    <div className="bg-white border border-gray-100 rounded-lg p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-4">
        Reading moods
      </p>
      <div className="flex flex-wrap gap-2 items-baseline">
        {TOP_MOODS.map((m) => {
          const scale = 0.8 + (m.count / max) * 0.55;
          return (
            <span
              key={m.label}
              className="italic text-indigo-900 opacity-70 hover:opacity-100 transition-opacity duration-200 cursor-default"
              style={{ fontSize: `${scale}rem` }}
            >
              {m.label}
            </span>
          );
        })}
      </div>
    </div>
  );
}

function MonthlyChart() {
  const max = Math.max(...MONTHLY.map((m) => m.n));
  return (
    <div className="bg-white border border-gray-100 rounded-lg p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-4">
        Monthly pace · 2025–2026
      </p>
      <div className="flex gap-1.5 items-end overflow-x-auto pb-1">
        {MONTHLY.map(({ m, year, n }, i) => (
          <div key={i} className="flex flex-col items-center gap-0.5 min-w-[26px]">
            <span className="text-xs text-gray-400" style={{ minHeight: "16px" }}>
              {n || ""}
            </span>
            <div
              className={`w-5 rounded-sm ${n > 0 ? "bg-indigo-900" : "bg-indigo-50"}`}
              style={{ height: `${Math.max(n > 0 ? (n / max) * 64 : 2, n > 0 ? 4 : 2)}px` }}
            />
            <span className="text-xs text-gray-400">{m}</span>
            {(i === 0 || i === 12) && (
              <span className="text-xs text-indigo-300">'{year}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────

export default function Bookshelf() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? FIVE_STARS : FIVE_STARS.slice(0, 10);

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
            Bookshelf
          </h1>
          <p className="text-localhost_text leading-8 text-lg">
            I read A LOT and I track it obsessively on{" "}
            <Link
              href="https://app.thestorygraph.com"
              target="_blank"
              rel="noopener"
              className="text-xl text-links_color underline hover:text-transparent hover:bg-gradient-to-r hover:bg-clip-text hover:from-purple-500 hover:to-indigo-500 transition transform hover:-translate-y-1"
            >
              Storygraph
            </Link>
            . Here&apos;s a data view of my reading life.
          </p>

        </motion.div>

        {/* Stats */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInVariants}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6"
        >
          <StatCard value={134} label="Books read" sub="as of mid-2026"/>
          <StatCard value={299} label="To-read pile" sub="and growing" />
          <StatCard value="4.12" label="Avg rating" sub="out of 5" />
          <StatCard value={24} label="5-star reads" sub="all-time faves" />
        </motion.div>

        {/* Charts 2×2 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInVariants}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3"
        >
          <RatingChart />
          <YearlyChart />
          <FormatChart />
          <MoodCloud />
        </motion.div>

        {/* Monthly full-width */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInVariants}
          className="mb-10"
        >
          <MonthlyChart />
        </motion.div>

        {/* 5-star reads with covers */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInVariants}
        >
          <h2 className="text-2xl font-extrabold text-indigo-900 hover:text-purple-500 transition-colors duration-300 mb-1">
             ★ Five-Star Reads
          </h2>
          <p className="text-localhost_text text-base leading-8 mb-6">
            Books I gave five stars without hesitation.
          </p>

          <motion.div
            variants={staggerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            className="grid grid-cols-3 sm:grid-cols-5 gap-4"
          >
            {visible.map((book) => (
              <BookCoverCard key={book.isbn} {...book} />
            ))}
          </motion.div>

          {!showAll && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => setShowAll(true)}
                className="px-6 py-2 bg-indigo-900 text-white text-sm font-semibold rounded-md hover:bg-indigo-600 transition"
              >
                Show all {FIVE_STARS.length} →
              </button>
            </div>
          )}
        </motion.div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-gray-100 flex flex-wrap justify-between gap-2 text-xs text-gray-400">
          <span>Data from Storygraph export · updated Apr 2026</span>
          <Link
            href="https://app.thestorygraph.com"
            target="_blank"
            rel="noopener"
            className="text-links_color underline hover:text-transparent hover:bg-gradient-to-r hover:bg-clip-text hover:from-purple-500 hover:to-indigo-500 transition"
          >
            View full Storygraph profile →
          </Link>
        </div>
      </div>
    </main>
  );
}