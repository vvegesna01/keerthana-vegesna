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

const SITE_LINKS = [
  { href: "/about", label: "About" },
  { href: "/experience", label: "Work" },
  { href: "/projects", label: "Play" },
  { href: "/blog", label: "Field Notes" },
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

      <div className="relative z-20 max-w-6xl mx-auto px-6 pt-14 md:pt-20">
        {/* Info panel: frosted so text stays readable on any photo */}
        <div
          data-footer-panel
          className="cursor-default rounded-2xl border border-line/50 bg-bg/10 backdrop-blur-md p-6 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
            <div className="max-w-md">
              {/* <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-heading">
                Keerthana Vegesna
              </h3> */}
              <p className="mt-2 text-sm text-body leading-relaxed">
                Reach out if you want to collaborate, chat about tech, or just say hi!
                and thank you for checking out my website!
              </p>
              <p className="mt-4 text-xs text-body/80">
                © {updated.getUTCFullYear()} Keerthana Vegesna · Updated{" "}
                {updatedLabel}
              </p>
            </div>

            <nav
              aria-label="Footer"
              className="flex flex-wrap gap-x-12 gap-y-6 sm:gap-x-16"
            >
              {/* <div>
                <p className="text-xs font-semibold text-body mb-3">Explore</p>
                <ul className="flex flex-col gap-2.5">
                  {SITE_LINKS.map(({ href, label }) => (
                    <li key={href}>
                      <Link href={href} className={linkClass}>
                        <span>{label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div> */}

              <div>
                <p className="text-xs font-semibold text-body mb-3">Find me</p>
                <ul className="flex flex-col gap-2.5">
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
            </nav>
          </div>
        </div>

        {/* Photo strip: all 13 shots, click any to jump to it */}
        <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-3">
          {/* <div
            role="group"
            aria-label="Choose a photograph"
            className="flex gap-1.5 overflow-x-auto rounded-xl bg-black/35 backdrop-blur-md p-1.5 max-w-full"
          >
            {PHOTOS.map((src, i) => {
              const active = i === current;
              return (
                <button
                  key={src}
                  type="button"
                  onClick={() => goTo(order.indexOf(i))}
                  aria-label={`Show photo ${i + 1} of ${PHOTO_COUNT}`}
                  aria-current={active ? "true" : undefined}
                  className={`relative h-10 w-10 sm:h-11 sm:w-11 shrink-0 overflow-hidden rounded-lg transition-all duration-200 focus-visible:outline-2 focus-visible:outline-white ${
                    active
                      ? "ring-2 ring-white opacity-100"
                      : "opacity-55 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </button>
              );
            })}
          </div> */}

          {/* <p className="text-xs text-white/90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
            Photography by Keerthana · tap anywhere for the next one
          </p> */}
        </div>

        {/* Oversized name, cut off at the bottom edge */}
        <div
          aria-hidden="true"
          className="pt-8 sm:pt-14 md:pt-20 text-center overflow-hidden pointer-events-none select-none"
        >
          <h2 className="whitespace-nowrap text-[9.6vw] sm:text-[9.2vw] md:text-[8.8vw] font-black tracking-tighter leading-[0.8] translate-y-[24%] text-white/95 drop-shadow-[0_4px_16px_rgba(0,0,0,0.4)]">
            Keerthana Vegesna
          </h2>
        </div>
      </div>
    </footer>
  );
}