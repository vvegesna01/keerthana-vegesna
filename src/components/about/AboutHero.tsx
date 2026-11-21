"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

// ── Photos ───────────────────────────────────────────────────────────
// One entry per hover target. Missing files are skipped, so you can add
// them one at a time. `tag` is the filename-style label on the print.
// `focus` picks which part of the photo survives the landscape crop
// (CSS object-position), which matters for portraits: "50% 20%" keeps
// the top of the frame, where faces tend to be.

type PhotoKey = "default" | "music" | "reading" | "hiking" | "photos" | "rtc" | "gwc" | "swe";

const PHOTOS: Record<PhotoKey, { src: string; alt: string; tag: string; focus?: string }> = {
  default: { src: "/images/profiles/grad_2023.jpg", alt: "Keerthana profile", tag: "purdue.grad", focus: "50% 25%" },
  music: { src: "/images/profiles/guitar.jpg", alt: "Songwriting", tag: "songs.wav" },
  reading: { src: "/images/profiles/reading.jpg", alt: "Reading", tag: "reading.epub" },
  hiking: { src: "/images/profiles/hiking-photo.jpg", alt: "Hiking", tag: "hiking.jpg" },
  photos: { src: "/images/profiles/camera.jpeg", alt: "Photography", tag: "photos.jpg" },
  rtc: { src: "/images/about/rtc.jpg", alt: "Rewriting the Code", tag: "rtc.mentor" },
  gwc: { src: "/images/about/gwc.jpg", alt: "Girls Who Code at Purdue", tag: "gwc.purdue" },
  swe: { src: "/images/profiles/swe.jpg", alt: "Society of Women Engineers conference", tag: "swe.conf" },
};

const PHOTO_KEYS = Object.keys(PHOTOS) as PhotoKey[];

// Where each print sits while it is NOT on top. Different tilts and offsets
// are what make the pile read as a pile; rotate is degrees, x/y are % of the
// print's own size. Keep x within about ±10 so nothing spills out of the column.
const POSES: Record<PhotoKey, { rotate: number; x: number; y: number }> = {
  default: { rotate: -4, x: -8, y: 4 },
  music: { rotate: 5, x: 8, y: -3 },
  reading: { rotate: -7, x: -4, y: -6 },
  hiking: { rotate: 3, x: 6, y: 7 },
  photos: { rotate: -2, x: 10, y: 2 },
  rtc: { rotate: 7, x: -10, y: -2 },
  gwc: { rotate: -5, x: 3, y: 8 },
  swe: { rotate: 4, x: -6, y: 5 },
};

// ── Styles ───────────────────────────────────────────────────────────

const hoverTerm =
  "cursor-pointer underline decoration-dotted decoration-indigo-300 underline-offset-4 transition-colors hover:text-accent hover:decoration-indigo-600";

const communityLink =
  "font-semibold underline underline-offset-4 decoration-1 transition hover:decoration-2";

// ── Component ────────────────────────────────────────────────────────

export default function AboutHero() {
  const [active, setActive] = useState<PhotoKey>("default");
  const [failed, setFailed] = useState<Partial<Record<PhotoKey, boolean>>>({});
  const [canHover, setCanHover] = useState(true);

  // Read in an effect so server and client render the same markup
  useEffect(() => {
    setCanHover(window.matchMedia("(hover: hover)").matches);
  }, []);

  // A missing file brings the default print to the top instead of a broken image
  const shown: PhotoKey = failed[active] ? "default" : active;

  // Mouse and keyboard: preview while hovered or focused.
  // Touch: no hover exists, so the first tap previews the photo and a second
  // tap on the same term follows the link.
  const bind = (key: PhotoKey) =>
    canHover
      ? {
          onMouseEnter: () => setActive(key),
          onMouseLeave: () => setActive("default"),
          onFocus: () => setActive(key),
          onBlur: () => setActive("default"),
        }
      : {
          onClick: (e: React.MouseEvent) => {
            if (active !== key) {
              e.preventDefault();
              setActive(key);
            }
          },
        };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="mb-16"
    >
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
        {/* ── Photo stack (left) ── */}
        {/* Every print stays mounted and only moves; swapping `src` would flash
            while the next image loads. Each print is centered by a flex wrapper
            so framer-motion's transform never fights a Tailwind translate. */}
        <div className="relative isolate aspect-[4/3] w-full">
          {PHOTO_KEYS.map((key, index) => {
            if (failed[key]) return null;
            const isFront = shown === key;
            const pose = POSES[key];

            return (
              <div
                key={key}
                className="absolute inset-0 flex items-center justify-center"
                style={{ zIndex: isFront ? 50 : index }}
              >
                <motion.div
                  initial={false}
                  animate={
                    isFront
                      ? { rotate: 0, x: "0%", y: "0%", scale: 1.02 }
                      : { rotate: pose.rotate, x: `${pose.x}%`, y: `${pose.y}%`, scale: 0.97 }
                  }
                  transition={{ type: "spring", stiffness: 260, damping: 26 }}
                  className="relative aspect-[3/2] w-[76%] rounded-md bg-surface p-1.5 shadow-lg ring-1 ring-black/5"
                >
                  <div className="relative h-full w-full overflow-hidden rounded-[3px] bg-surface-alt">
                    <Image
                      src={PHOTOS[key].src}
                      // The text already says what each photo is about, so only the default needs alt
                      alt={key === "default" ? PHOTOS[key].alt : ""}
                      fill
                      priority={key === "default"}
                      sizes="(min-width: 768px) 40vw, 80vw"
                      className="object-cover"
                      style={{ objectPosition: PHOTOS[key].focus }}
                      onError={() => setFailed((f) => ({ ...f, [key]: true }))}
                      unoptimized
                    />
                    <span
                      className={`absolute bottom-2 left-2 rounded-full bg-surface/90 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-heading shadow-sm backdrop-blur transition-opacity duration-300 ${
                        isFront ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      {PHOTOS[key].tag}
                    </span>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* ── Text (right) ── */}
        <div>
          <h1 className="mb-4 text-4xl font-extrabold leading-tight text-heading">
            Hi there! I&apos;m Keerthana.
          </h1>

          <p className="mb-4 leading-7 text-muted">
            I&apos;m a software engineer focused on backend systems and cloud infrastructure, currently at
            ApexFlo.ai. Outside of work you&apos;ll find me{" "}
            <Link href="#music" {...bind("music")} className={hoverTerm}>
              playing guitar
            </Link>
            ,{" "}
            <Link href="/bookshelf" {...bind("reading")} className={hoverTerm}>
              reading
            </Link>
            ,{" "}
            {/* Preview only: there's nothing to link to yet */}
            <span tabIndex={0} {...bind("hiking")} className={hoverTerm}>
              hiking
            </span>
            , and{" "}
            <Link href="#photography" {...bind("photos")} className={hoverTerm}>
              taking photos
            </Link>
            .
          </p>

          <p className="leading-7 text-muted">
            The communities I&apos;m part of matter a lot to me. I&apos;m a mentor at{" "}
            <Link
              href="https://rewritingthecode.org/"
              target="_blank"
              rel="noopener noreferrer"
              {...bind("rtc")}
              className={`${communityLink} text-rtc_color`}
            >
              Rewriting the Code
            </Link>
            , helped start the{" "}
            <Link
              href="https://www.cs.purdue.edu/about/womens-history/girls-who-code.html"
              target="_blank"
              rel="noopener noreferrer"
              {...bind("gwc")}
              className={`${communityLink} text-gwc_color`}
            >
              Girls Who Code
            </Link>{" "}
            club at Purdue, and have attended{" "}
            <Link
              href="https://swe.org/"
              target="_blank"
              rel="noopener noreferrer"
              {...bind("swe")}
              className={`${communityLink} text-links_color`}
            >
              Society of Women Engineers
            </Link>{" "}
            conferences.
          </p>
        </div>
      </div>
    </motion.div>
  );
}