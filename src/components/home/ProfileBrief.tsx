"use client";
import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import ProfileImage from "@/components/ui/ProfileImage";

// Inline sticker with a footnote number, Carolyn-Lee style. Pass `src` for an
// image in /public/images/stickers, or `children` for an inline SVG.
function Icon({
  n,
  src,
  tilt,
  children,
}: {
  n: number;
  src?: string;
  tilt: number;
  children?: React.ReactNode;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  // A tiny wiggle on hover, settling back to the sticker's resting tilt
  const wiggle = () => {
    const el = ref.current;
    if (!el || gsap.isTweening(el)) return;
    gsap
      .timeline({ defaults: { duration: 0.12, ease: "sine.inOut" } })
      .to(el, { x: -2, y: -3, rotation: tilt - 8 })
      .to(el, { x: 2, y: 1, rotation: tilt + 8 })
      .to(el, { x: -1, y: -2, rotation: tilt - 4 })
      .to(el, { x: 0, y: 0, rotation: tilt, duration: 0.2 });
  };

  return (
    <span
      className="hero-icon mx-0.5 inline-flex items-start align-middle"
      onMouseEnter={wiggle}
    >
      <span
        ref={ref}
        className="inline-block h-5 min-w-5 sm:h-7 sm:min-w-7"
        style={{ transform: `rotate(${tilt}deg)` }}
        aria-hidden
      >
        {src ? (
          <Image
            src={src}
            alt=""
            width={72}
            height={72}
            className="h-full w-auto object-contain"
          />
        ) : (
          children
        )}
      </span>
      <sup className="ml-0.5 font-mono text-[9px] text-accent-soft" aria-hidden>
        {n}
      </sup>
    </span>
  );
}

const PILLS: { prefix: string; bold: string }[] = [
  // { prefix: "Backend · Cloud · Data", bold: "" },
  // { prefix: "Purdue CS Alum", bold: "" },
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
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from(".hero-image", {
          x: -60,
          rotation: -8,
          opacity: 0,
          duration: 0.85,
        })
          .from(
            ".hero-line",
            { x: 32, opacity: 0, duration: 0.6, stagger: 0.12 },
            "-=0.55"
          )
          .from(
            ".hero-icon",
            {
              scale: 0,
              rotation: -25,
              duration: 0.5,
              stagger: 0.1,
              ease: "back.out(2.2)",
            },
            "-=0.5"
          )
          .from(
            ".hero-pill",
            { y: 14, opacity: 0, duration: 0.45, stagger: 0.08 },
            "-=0.3"
          );
      });
    }, hero);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={heroRef} className="relative">
      <div className="mx-auto max-w-3xl px-6 pt-6 pb-8 sm:pb-12 md:pt-10 md:pb-14">
        <h1 className="sr-only">Keerthana Vegesna</h1>

        {/* Photo column is narrower than before (was up to 135px) */}
        <div className="grid grid-cols-[4rem_1fr] items-center gap-4 sm:grid-cols-[5rem_1fr] sm:gap-6 md:grid-cols-[6rem_1fr] md:gap-8">
          {/* Photo card: a fixed square box, so nothing gets cropped */}
          <div className="hero-image relative aspect-square w-full [&_.font-mono]:hidden sm:[&_.font-mono]:block">
            {/* ProfileImage hard-codes h-80 / md:h-[420px], so both the base and
                md: heights are overridden to keep the card square */}
            <ProfileImage
              src="/images/profiles/profile_headshot_square.jpg"
              alt="Keerthana profile"
              href="/about"
              priority
              className="h-full md:h-full w-full"
            />
          </div>

          <div className="text-left">
            <p className="text-xs font-medium leading-6 text-localhost_text sm:text-base sm:leading-8 md:text-lg">
              <span className="hero-line inline">software engineer </span>
              <Icon n={1} src="/images/stickers/keyboard-sticker.png" tilt={-6} />
              <span className="hero-line inline"> bookworm </span>
              <Icon n={2} src="/images/stickers/book.png" tilt={5} />
              <span className="hero-line inline"> and musician </span>
              <Icon n={3} src="/images/stickers/martin-guitar.png" tilt={-4} />
            </p>
            <p className="hero-line mt-2 text-xs leading-relaxed text-muted sm:mt-2.5 sm:text-sm sm:leading-normal md:text-base">
              I build backend systems, data pipelines, and intelligent infrastructure that turn messy data into reliable workflows.
            </p>

            {PILLS.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1 sm:mt-4 sm:gap-1.5">
                {PILLS.map(({ prefix, bold }, idx) => (
                  <span
                    key={`${prefix}-${bold}-${idx}`}
                    className="hero-pill rounded-full bg-sunken/70 px-1.5 py-0.5 text-[9px] text-muted sm:px-2.5 sm:py-1 sm:text-[11px]"
                  >
                    {prefix} <strong className="text-heading">{bold}</strong>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
