"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import ProfileImage from "@/components/ui/ProfileImage";
import { ArrowUpRight, MapPin } from "lucide-react";

// ── Sticker (wiggles on hover) ──────────────────────────────────────

function Icon({ src, tilt }: { src: string; tilt: number }) {
  const ref = useRef<HTMLSpanElement>(null);

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
      className="hero-icon mx-1 inline-flex items-center align-middle"
      onMouseEnter={wiggle}
    >
      <span
        ref={ref}
        className="inline-block h-5 min-w-5 sm:h-6 sm:min-w-6 md:h-7 md:min-w-7"
        style={{ transform: `rotate(${tilt}deg)` }}
        aria-hidden
      >
        <Image
          src={src}
          alt=""
          width={72}
          height={72}
          className="h-full w-auto object-contain"
        />
      </span>
    </span>
  );
}

// ── Headline words that reveal a caption ────────────────────────────
// Edit the captions here. Keep each to one or two short sentences.

type WordKey = "engineer" | "bookworm" | "musician";

const WORDS: {
  key: WordKey;
  label: string;
  sticker: string;
  tilt: number;
  caption: string;
}[] = [
  {
    key: "engineer",
    label: "software engineer",
    sticker: "/images/stickers/keyboard-sticker.png",
    tilt: -6,
    caption:
      "I build scalable backend systems for AI/ML applications on bare-metal & cloud infrastructure.",
  },
  {
    key: "bookworm",
    label: "bookworm",
    sticker: "/images/stickers/book.png",
    tilt: 5,
    caption:
      "There's a hidden easter egg bookshelf on this site if you look closely. Has some great recommendations too.",
  },
  {
    key: "musician",
    label: "musician",
    sticker: "/images/stickers/martin-guitar.png",
    tilt: -4,
    // TODO: make this yours (instrument, band, what you're learning)
    caption: "My guitar is never far from reach.",
  },
];

function Word({
  item,
  active,
  onShow,
  onHide,
  onToggle,
}: {
  item: (typeof WORDS)[number];
  active: WordKey | null;
  onShow: (k: WordKey) => void;
  onHide: (k: WordKey) => void;
  onToggle: (k: WordKey) => void;
}) {
  const pointerType = useRef("");
  const isActive = active === item.key;

  return (
    <button
      type="button"
      aria-pressed={isActive}
      aria-controls="hero-caption"
      // Mouse: hover reveals. Touch/keyboard: tap or Enter/Space toggles.
      onPointerDown={(e) => {
        pointerType.current = e.pointerType;
      }}
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") onShow(item.key);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") onHide(item.key);
      }}
      onClick={(e) => {
        // detail === 0 means a keyboard-initiated click
        if (e.detail === 0 || pointerType.current !== "mouse") onToggle(item.key);
      }}
      onBlur={() => onHide(item.key)}
      className="hero-line inline-block cursor-pointer rounded-md text-left outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
    >
      <span
        className={`underline decoration-dotted decoration-1 underline-offset-[6px] transition-colors ${
          isActive ? "decoration-accent" : "decoration-subtle"
        }`}
      >
        {item.label}
      </span>
      <Icon src={item.sticker} tilt={item.tilt} />
    </button>
  );
}

// ── Orgs ────────────────────────────────────────────────────────────

type Org = {
  name: string;
  href: string;
  logo?: string;
  note?: string; // text revealed when the logo is clicked; falls back to name
};

const CURRENT: Org = {
  name: "ApexFlo.ai",
  href: "https://apexflo.ai",
  logo: "/images/exp/apexflo_white_logo.png",
};

// Most relevant first. Only MAX_LOGOS are shown; extras collapse into "+N".
const OTHER_ORGS: Org[] = [
  {
    name: "Northeastern",
    note: "MS CS @ Northeastern",
    href: "https://vancouver.northeastern.edu/",
    logo: "/images/exp/nu_seal.png",
  },
  {
    name: "RTC",
    note: "Mentor @ Rewriting the Code",
    href: "https://rewritingthecode.org/",
    logo: "/images/exp/rtc_logo.png",
  },
  {
    name: "Purdue",
    note: "BS CS @ Purdue University",
    href: "https://www.cs.purdue.edu/",
    logo: "/images/exp/purdue_logo.png",
  },
  {
    name: "Cummins",
    note: "Software Engineering Intern @ Cummins",
    href: "https://www.cummins.com",
    logo: "/images/exp/cummins.png",
  },
];

const MAX_LOGOS = 5;

function OrgAnchor({
  org,
  className,
  children,
}: {
  org: Org;
  className: string;
  children: React.ReactNode;
}) {
  const label = org.note ?? org.name;
  if (org.href.startsWith("http")) {
    return (
      <a
        href={org.href}
        target="_blank"
        rel="noopener noreferrer"
        title={label}
        aria-label={label}
        className={className}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={org.href} title={label} aria-label={label} className={className}>
      {children}
    </Link>
  );
}

function LogoCircle({ org, size }: { org: Org; size: string }) {
  return (
    <span
      className={`relative flex ${size} shrink-0 items-center justify-center overflow-hidden rounded-full border border-line/70 bg-white`}
    >
      {org.logo ? (
        <Image
          src={org.logo}
          alt=""
          width={56}
          height={56}
          className="h-full w-full object-contain p-0.5"
        />
      ) : (
        <span className="text-[10px] font-bold text-muted" aria-hidden>
          {org.name[0]}
        </span>
      )}
    </span>
  );
}

// ── Component ───────────────────────────────────────────────────────

export default function ProfileBrief() {
  const heroRef = useRef<HTMLElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<WordKey | null>(null);

  // `openOrg` drives open/closed. `lastOrg` keeps the text on screen while the
  // panel animates shut, so it doesn't go blank mid-collapse.
  const [openOrg, setOpenOrg] = useState<string | null>(null);
  const [lastOrg, setLastOrg] = useState<Org | null>(null);

  const show = (k: WordKey) => setActive(k);
  const hide = (k: WordKey) => setActive((a) => (a === k ? null : a));
  const toggle = (k: WordKey) => setActive((a) => (a === k ? null : k));

  const toggleOrg = (org: Org) => {
    setLastOrg(org);
    setOpenOrg((cur) => (cur === org.name ? null : org.name));
  };

  const shownLogos = OTHER_ORGS.slice(0, MAX_LOGOS);
  const hiddenCount = OTHER_ORGS.length - shownLogos.length;

  // Close the org detail on outside click or Escape
  useEffect(() => {
    if (!openOrg) return;
    const onPointerDown = (e: PointerEvent) => {
      if (metaRef.current && !metaRef.current.contains(e.target as Node)) {
        setOpenOrg(null);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenOrg(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [openOrg]);

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
          .from(".hero-meta", { y: 12, opacity: 0, duration: 0.45 }, "-=0.3");
      });
    }, hero);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  const layer =
    "col-start-1 row-start-1 transition-opacity duration-200 motion-reduce:transition-none";

  return (
    <section ref={heroRef} className="relative">
      <div className="mx-auto max-w-4xl px-6 pt-4 pb-6 sm:pb-8 md:pt-6 md:pb-8">
        <h1 className="sr-only">Keerthana Vegesna</h1>

        {/* Row 1: portrait + headline (+ the caption slot) */}
        <div className="grid grid-cols-[5rem_1fr] items-center gap-4 sm:grid-cols-[7rem_1fr] sm:gap-6 md:grid-cols-[9rem_1fr] md:gap-8">
          <div className="hero-image relative aspect-square w-full [&_.font-mono]:hidden sm:[&_.font-mono]:block">
            <ProfileImage
              src="/images/profiles/profile_headshot_square.jpg"
              alt="Keerthana profile"
              href="/about"
              priority
              className="h-full w-full md:h-full"
            />
          </div>

          <div className="min-w-0 text-left">
            <p className="font-[family-name:var(--font-editorial)] text-base font-medium leading-snug text-localhost_text sm:text-xl md:text-2xl">
              <Word item={WORDS[0]} active={active} onShow={show} onHide={hide} onToggle={toggle} />{" "}
              <Word item={WORDS[1]} active={active} onShow={show} onHide={hide} onToggle={toggle} />
              {" and "}
              <Word item={WORDS[2]} active={active} onShow={show} onHide={hide} onToggle={toggle} />
            </p>

            {/* Caption slot: every layer sits in the same grid cell, so the
                slot is as tall as the longest one and nothing below it shifts. */}
            <div id="hero-caption" className="hero-line mt-2 grid">
              <p
                aria-hidden={active !== null}
                className={`${layer} flex items-center gap-1 text-xs text-subtle sm:text-sm ${
                  active ? "opacity-0" : "opacity-100"
                }`}
              >
                <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
                Hyderabad, India
              </p>
              {WORDS.map((w) => (
                <p
                  key={w.key}
                  aria-hidden={active !== w.key}
                  className={`${layer} font-[family-name:var(--font-editorial)] text-sm leading-relaxed text-muted sm:text-base md:text-[17px] ${
                    active === w.key ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {w.caption}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Row 2: current role + logo strip, with a detail line that slides
            open underneath when a logo is clicked */}
        <div ref={metaRef} className="hero-meta mt-5 sm:mt-6">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
            <p className="flex items-center gap-1.5 text-xs text-subtle sm:text-sm">
              <span>MTS at</span>
              <OrgAnchor
                org={CURRENT}
                className="group inline-flex items-center gap-1.5 font-medium text-heading transition-colors hover:text-accent"
              >
                <LogoCircle org={CURRENT} size="h-5 w-5" />
                <span className="underline-offset-4 group-hover:underline">{CURRENT.name}</span>
              </OrgAnchor>
            </p>

            <span className="hidden h-4 w-px bg-line sm:block" aria-hidden />

            <div className="flex items-center gap-2">
              {shownLogos.map((org) => {
                const isOpen = openOrg === org.name;
                return (
                  <button
                    key={org.name}
                    type="button"
                    onClick={() => toggleOrg(org)}
                    aria-expanded={isOpen}
                    aria-controls="org-detail"
                    aria-label={org.note ?? org.name}
                    className={`rounded-full shadow-sm outline-none transition-all hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                      isOpen ? "-translate-y-0.5 ring-2 ring-indigo-400" : ""
                    }`}
                  >
                    <LogoCircle org={org} size="h-7 w-7" />
                  </button>
                );
              })}
              {hiddenCount > 0 && (
                <Link
                  href="/work"
                  title="See all experience"
                  aria-label={`${hiddenCount} more, see all experience`}
                  className="flex h-7 min-w-7 items-center justify-center rounded-full border border-line/70 bg-sunken/60 px-1.5 text-[11px] font-semibold text-muted transition-colors hover:text-accent"
                >
                  +{hiddenCount}
                </Link>
              )}
            </div>
          </div>

          {/* Detail panel: animates height (0fr -> 1fr) and opacity */}
          <div
            id="org-detail"
            aria-live="polite"
            className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${
              openOrg ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <div className="pt-3">
                {lastOrg && (
                  <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
                    <span className="font-medium text-heading">
                      {lastOrg.note ?? lastOrg.name}
                    </span>
                    <a
                      href={lastOrg.href}
                      target={lastOrg.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      tabIndex={openOrg ? 0 : -1}
                      className="inline-flex items-center gap-0.5 text-subtle transition-colors hover:text-accent"
                    >
                      Visit <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                    </a>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}