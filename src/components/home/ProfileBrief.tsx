"use client";
import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import ProfileImage from "@/components/ui/ProfileImage";
import ScrollHint from "@/components/home/ScrollHint";

// Inline sticker with a footnote number, Carolyn-Lee style. Pass `src` for an
// image in /public/images/stickers, or `children` for an inline SVG.
function Icon({ n, src, tilt, children }: { n: number; src?: string; tilt: number; children?: React.ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);

  // A tiny wiggle on hover, settling back to the sticker's resting tilt
  const wiggle = () => {
    const el = ref.current;
    if (!el || gsap.isTweening(el)) return;
    gsap.timeline({ defaults: { duration: 0.12, ease: "sine.inOut" } })
      .to(el, { x: -2, y: -3, rotation: tilt - 8 })
      .to(el, { x: 2, y: 1, rotation: tilt + 8 })
      .to(el, { x: -1, y: -2, rotation: tilt - 4 })
      .to(el, { x: 0, y: 0, rotation: tilt, duration: 0.2 });
  };

  return (
    <span className="hero-icon inline-flex items-start align-middle mx-0.5" onMouseEnter={wiggle}>
      <span
        ref={ref}
        className="inline-block h-5 min-w-5 sm:h-8 sm:min-w-8"
        style={{ transform: `rotate(${tilt}deg)` }}
        aria-hidden
      >
        {src ? (
          <Image src={src} alt="" width={72} height={72} className="h-full w-auto object-contain" />
        ) : (
          children
        )}
      </span>
      <sup className="text-[9px] font-mono text-indigo-400 ml-0.5" aria-hidden>
        {n}
      </sup>
    </span>
  );
}

const PILLS = [
  { prefix: "Backend · Cloud · Data", bold: "" },
  { prefix: "Purdue CS Alum", bold: "" },
  // { prefix: "Open to", bold: "full-time roles" },
];

export default function ProfileBrief() {
  const heroRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Photo slides in from the left, text follows from the right
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from(".hero-image", { x: -90, rotation: -10, opacity: 0, duration: 0.9 })
          .from(".hero-line", { x: 40, opacity: 0, duration: 0.6, stagger: 0.12 }, "-=0.55")
          .from(
            ".hero-icon",
            { scale: 0, rotation: -25, duration: 0.5, stagger: 0.1, ease: "back.out(2.2)" },
            "-=0.5"
          )
          .from(".hero-pill", { y: 14, opacity: 0, duration: 0.45, stagger: 0.08 }, "-=0.3")
;
      });
    }, hero);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={heroRef} className="relative">
      <div className="max-w-4xl mx-auto px-6 pt-3 md:pt-8 pb-4">
        <h1 className="sr-only">Keerthana Vegesna</h1>

        <div className="grid grid-cols-[6rem_1fr] sm:grid-cols-[10rem_1fr] md:grid-cols-[260px_1fr] gap-4 sm:gap-8 md:gap-14 items-center">
          {/* Photo, with the CTAs popping out of its corners */}
          <div className="hero-image relative w-full [&_.font-mono]:hidden sm:[&_.font-mono]:block">
            <ProfileImage
              src="/images/profiles/profile-headshot.jpg"
              alt="Keerthana profile"
              cornerTag="keerthana.dev"
              href="/about"
              priority
              className="h-28 sm:h-48 md:h-80"
            />
          </div>

          <div className="text-left">
            <p className="text-xs sm:text-base md:text-lg leading-6 sm:leading-8 text-localhost_text">
              <span className="hero-line inline">software engineer </span>
              <Icon n={1} src="/images/stickers/keyboard-sticker.png" tilt={-6} />
              <span className="hero-line inline"> bookworm </span>
              <Icon n={2} src="/images/stickers/book.png" tilt={5} />
              <span className="hero-line inline"> and musician</span>
              <Icon n={3} src="/images/stickers/martin-guitar.png" tilt={-4} />
              <span className="hero-line inline">I build backend systems, data pipelines, and intelligent infrastructure that turn messy data into reliable workflows.</span>
            </p>

            <div className="mt-2 sm:mt-4 flex flex-wrap gap-1 sm:gap-1.5">
              {PILLS.map(({ prefix, bold }) => (
                <span
                  key={bold}
                  className="hero-pill px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-gray-200/70 text-[9px] sm:text-[11px] text-gray-700"
                >
                  {prefix} <strong className="text-indigo-950">{bold}</strong>
                </span>
              ))}
            </div>
          </div>
        </div>
{/* 
        <div className="mt-5">
          <ScrollHint targetId="showcase" />
        </div> */}
      </div>
    </section>
  );
}
