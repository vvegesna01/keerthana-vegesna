"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const updated = new Date(
  process.env.NEXT_PUBLIC_LAST_UPDATED ?? new Date().toISOString()
);

const updatedLabel = updated.toLocaleDateString("en-US", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

const SOCIAL_LINKS = [
  {
    href: "https://www.linkedin.com/in/keerthana-vegesna/",
    label: "LinkedIn",
    external: true,
    Icon: Linkedin,
  },
  {
    href: "https://github.com/vvegesna01",
    label: "GitHub",
    external: true,
    Icon: Github,
  },
  {
    href: "mailto:kvegesna01@gmail.com",
    label: "Email",
    external: false,
    Icon: Mail,
  },
];

const PHOTO_COUNT = 13;
const PHOTOS = Array.from(
  { length: PHOTO_COUNT },
  (_, i) => `/images/photography/photo${i + 1}.png`
);

// Fisher-Yates shuffle: every photo appears once before any photo repeats.
function shuffledOrder(): number[] {
  const order = PHOTOS.map((_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

const wrap = (n: number) => (n + PHOTO_COUNT) % PHOTO_COUNT;

const linkClass =
  "group inline-flex items-center gap-1.5 text-sm font-semibold text-heading hover:text-accent transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

const arrowClass =
  "text-body transition-all duration-200 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5";

export default function Footer() {
  const reduceMotion = useReducedMotion();

  // Start in a fixed order so server and client markup match, then shuffle on mount.
  const [order, setOrder] = useState<number[]>(() => PHOTOS.map((_, i) => i));
  const [pos, setPos] = useState(0);
  const [lastShown, setLastShown] = useState<number | null>(null);

  useEffect(() => {
    setOrder(shuffledOrder());
  }, []);

  const current = order[pos];
  const next = order[wrap(pos + 1)];

  // Only the photo on screen, the one fading out and the one up next are mounted,
  // so the footer never loads all 13 full-size images at once.
  const mounted = Array.from(
    new Set([current, next, ...(lastShown !== null ? [lastShown] : [])])
  );

  const goTo = (newPos: number) => {
    setLastShown(current);
    setPos(wrap(newPos));
  };

  const handleFooterClick = (e: React.MouseEvent<HTMLElement>) => {
    if ((e.target as HTMLElement).closest("a, button, input")) return;
    goTo(pos + 1);
  };

  return (
    <footer
      onClick={handleFooterClick}
      className="relative w-full overflow-hidden bg-bg border-t border-line/60 cursor-pointer select-none"
    >
      {/* Photography background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {mounted.map((idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: idx === current ? 1 : 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.9, ease: "easeInOut" }}
            className="absolute inset-0"
            style={{ zIndex: idx === current ? 1 : 0 }}
          >
            <Image
              src={PHOTOS[idx]}
              alt={`Photograph by Keerthana, ${idx + 1} of ${PHOTO_COUNT}`}
              fill
              sizes="100vw"
              className="object-cover object-center"
            />
          </motion.div>
        ))}

        {/* Blend the page background down into the photo */}
        <div className="absolute inset-x-0 top-0 h-40 sm:h-52 bg-gradient-to-b from-bg via-bg/80 to-transparent z-10" />
        {/* Gentle darkening so the white name and the caption stay legible */}
        <div className="absolute inset-0 bg-black/10 z-10" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/45 to-transparent z-10" />
      </div>

      <div className="relative z-20 max-w-4xl mx-auto px-6 pt-12 md:pt-16">
        {/* Info panel: frosted so text stays readable on any photo */}
        <div
          data-footer-panel
          className="cursor-default rounded-2xl border border-line/50 bg-bg/10 backdrop-blur-md p-6 sm:p-7 shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="max-w-sm">
              <p className="text-sm text-body leading-relaxed">
                Reach out if you want to collaborate, chat about tech, or just say hi!</p>
              <p className="mt-2 text-xs text-body/80">
                © {updated.getUTCFullYear()} Keerthana Vegesna · Updated{" "}
                {updatedLabel}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-body mb-2 sm:text-right">Say Hello!</p>
              <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 sm:justify-end">
                {SOCIAL_LINKS.map(({ href, label, external, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className={linkClass}
                    >
                      <Icon size={14} className="text-body group-hover:text-accent transition-colors" />
                      <span>{label}</span>
                      <ArrowUpRight size={11} className={arrowClass} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Oversized name, cut off at the bottom edge */}
      <div
        aria-hidden="true"
        className="relative z-20 pt-8 sm:pt-14 md:pt-16 text-center overflow-hidden pointer-events-none select-none w-full"
      >
        <h2 className="whitespace-nowrap text-[9.6vw] sm:text-[9.2vw] md:text-[8.8vw] font-black tracking-tighter leading-[0.8] translate-y-[24%] text-white/95 drop-shadow-[0_4px_16px_rgba(0,0,0,0.4)]">
          Keerthana Vegesna
        </h2>
      </div>
    </footer>
  );
}