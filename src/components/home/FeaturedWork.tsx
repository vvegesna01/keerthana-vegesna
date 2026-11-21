"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export interface FeaturedItem {
  title: string;
  role: string;
  year: string;
  summary: string;
  image: string;
  logo?: string;
  href: string;
  external?: boolean;
}

export const FEATURED_ITEMS: FeaturedItem[] = [
  {
    title: "ApexFlo.ai (NVIDIA Inception Program)",
    role: "Platform Engineer",
    year: "2026",
    summary:
      "Architected and deployed 3 edge-AI platforms spanning real-time computer vision pipelines, pgvector natural-language search, and K3s orchestration.",
    image: "/images/exp/apexflo_nvidia.png",
    logo: "/images/exp/apexflo-logo.png",
    href: "https://apexflo.ai",
    external: true,
  },
  {
    title: "AfterWord",
    role: "Founder & Solo Dev",
    year: "2026",
    summary:
      "Reading companion that turns Kindle highlights into a searchable knowledge base using vector search and scalable ingestion pipelines.",
    image: "/images/projects/aw_mockup.jpeg",
    logo: "/images/projects/aw_logo.png",
    href: "https://getafterword.vercel.app/",
    external: true,
  },
  {
    title: "Pickle",
    role: "Mobile App",
    year: "2026",
    summary:
      "Cross-platform tool that organizes saves across Instagram, YouTube, and the web with automatic metadata, custom tags, and instant search.",
    image: "/images/projects/pickle_banner.png",
    logo: "/images/projects/pickle_logo.png",
    href: "https://keethapps.github.io/Pickle/",
    external: true,
  },
  {
    title: "KrachBooks",
    role: "Data Platform",
    year: "2025",
    summary:
      "Analytics dashboard converting monthly CSV reading exports into member statistics, badge rewards, and interactive curator algorithms.",
    image: "/images/projects/krachbooks_mockup1.png",
    href: "/blog/krachbooks",
    external: false,
  },
];

export default function FeaturedWork() {
  return (
    <section className="pt-4 pb-12 md:pt-6 md:pb-16">
      {/* Header */}
      <div className="mb-6 sm:mb-8 flex flex-row items-end justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-heading">
            Engineering
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-muted">
            Platforms, systems, and projects I&apos;ve built.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/projects"
            className="text-xs font-semibold text-muted hover:text-heading transition-colors"
          >
            All Projects →
          </Link>
          <span className="text-subtle text-xs">·</span>
          <Link
            href="/experience"
            className="text-xs font-semibold text-muted hover:text-heading transition-colors"
          >
            Experience →
          </Link>
        </div>
      </div>

      {/* 2-Column Minimal Unboxed Grid (Max 6 Cards) matching Work page style */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
        {FEATURED_ITEMS.slice(0, 6).map((item, idx) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: idx * 0.05 }}
            className="group block"
          >
            <Link
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              className="block cursor-pointer select-none"
            >
              {/* Media on top: aspect-[16/10], rounded-xl, no outer box/card border */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-surface-alt">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
              </div>

              {/* Title & Metadata row directly below media */}
              <div className="mt-3.5 flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2">
                  {item.logo && (
                    <div className="relative h-5 w-5 shrink-0 overflow-hidden rounded-sm">
                      <Image
                        src={item.logo}
                        alt=""
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                  <h3 className="truncate text-base font-semibold tracking-tight text-heading transition-colors group-hover:text-accent">
                    {item.title}
                  </h3>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-xs font-mono tabular-nums text-subtle">
                    {item.year}
                  </span>
                  <ArrowUpRight
                    size={14}
                    className="text-subtle transition-all duration-200 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>
              </div>

              {/* Role */}
              <p className="mt-0.5 text-sm text-subtle">
                {item.role}
              </p>

              {/* Clean Summary (no languages/chips) */}
              <p className="mt-1.5 text-sm leading-relaxed text-muted line-clamp-2">
                {item.summary}
              </p>
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
