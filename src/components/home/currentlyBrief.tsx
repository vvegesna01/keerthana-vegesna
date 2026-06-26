"use client";
import React from "react";
import Image from "next/image";
import { BookOpen, Coffee, Music, Wrench } from "lucide-react";
import { motion } from "framer-motion";

// Swap these out as they change — this is meant to be edited often, not designed around once
const items = [
  {
    icon: BookOpen,
    label: "Currently reading",
    value: "Babel",
    sub: "R.F. Kuang",
    accent: "bg-amber-50 text-amber-600 border-amber-100",
    image: "/images/blog/babel.jpg", // optional cover thumbnail
  },
  {
    icon: Coffee,
    label: "Coffee order",
    value: "Iced oat milk latte",
    sub: "extra shot, no sugar",
    accent: "bg-rose-50 text-rose-600 border-rose-100",
  },
  {
    icon: Wrench,
    label: "Currently tinkering with",
    value: "Book Club Dashboard",
    sub: "rebuilding the leaderboard",
    accent: "bg-indigo-50 text-indigo-600 border-indigo-100",
  },
  {
    icon: Music,
    label: "On repeat",
    value: "Practicing fingerstyle",
    sub: "guitar, badly, happily",
    accent: "bg-emerald-50 text-emerald-600 border-emerald-100",
  },
];

export default function CurrentlyBrief() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-6">
      <p className="text-xs font-mono text-gray-400 tracking-widest uppercase mb-4 text-center sm:text-left">
        Right now
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.3, delay: i * 0.06 }}
              whileHover={{ y: -3, rotate: i % 2 === 0 ? -1 : 1 }}
              className={`relative rounded-xl border p-3.5 flex flex-col gap-2 ${item.accent} bg-opacity-60`}
            >
              <div className="flex items-center gap-2">
                {item.image ? (
                  <div className="relative w-8 h-8 rounded-md overflow-hidden shrink-0 ring-2 ring-white">
                    <Image src={item.image} alt={item.value} fill className="object-cover" />
                  </div>
                ) : (
                  <Icon className="w-4 h-4 shrink-0" />
                )}
                <p className="text-[10px] font-mono uppercase tracking-wide opacity-70">
                  {item.label}
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold leading-snug">{item.value}</p>
                <p className="text-xs opacity-70 leading-snug">{item.sub}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}