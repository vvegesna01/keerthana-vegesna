"use client";
import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import ProfileImage from "@/components/ui/ProfileImage";

function Icon({
  src,
  tilt,
  children,
}: {
  src?: string;
  tilt: number;
  children?: React.ReactNode;
}) {
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
    </span>
  );
}

type Org = {
  name: string;
  href: string;
  logo?: string;
};

const CURRENT_ORGS: Org[] = [
  {
    name: "ApexFlo.ai",
    href: "/work",
    logo: "/images/exp/apexflo-logo.png",
  },
  {
    name: "Northeastern",
    href: "https://vancouver.northeastern.edu/",
    logo: "/images/exp/nu_seal.png",
  },
    {
    name: "RTC",
    href: "https://rewritingthecode.org/",
    logo: "/images/exp/rtc_logo.png",
  },
];

const PAST_ORGS: Org[] = [
  {
    name: "Purdue CS",
    href: "https://www.cs.purdue.edu/",
    logo: "/images/exp/purdue_logo.png",
  },
  {
    name: "Cummins",
    href: "/work",
    logo: "/images/exp/cummins-logo.png",
  },

];

function InlineOrg({ org }: { org: Org }) {
  const external = org.href.startsWith("http");
  const className =
    "group inline-flex items-center gap-1.5 align-baseline font-medium text-heading transition-colors hover:text-accent";

  const content = (
    <>
      {org.logo && (
        <span className="relative inline-flex h-4 w-4 shrink-0 translate-y-[2px] items-center justify-center overflow-hidden rounded-full border border-line/70 bg-white">
          <Image
            src={org.logo}
            alt=""
            width={32}
            height={32}
            className="h-full w-full object-contain p-0.5"
          />
        </span>
      )}
      <span className="underline-offset-4 group-hover:underline">{org.name}</span>
    </>
  );

  if (external) {
    return (
      <a
        href={org.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={org.href} className={className}>
      {content}
    </Link>
  );
}

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
            ".hero-meta",
            { y: 12, opacity: 0, duration: 0.45 },
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
      <div className="mx-auto max-w-4xl px-6 pt-4 pb-6 sm:pb-8 md:pt-6 md:pb-8">
        <h1 className="sr-only">Keerthana Vegesna</h1>

        {/* Single unified 2-column grid so everything aligns cleanly under the bio */}
        <div className="grid grid-cols-[5rem_1fr] items-start gap-4 sm:grid-cols-[7rem_1fr] sm:gap-6 md:grid-cols-[9rem_1fr] md:gap-8">
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
              <span className="hero-line inline">software engineer </span>
              <Icon src="/images/stickers/keyboard-sticker.png" tilt={-6} />
              <span className="hero-line inline"> bookworm </span>
              <Icon src="/images/stickers/book.png" tilt={5} />
              <span className="hero-line inline"> and musician </span>
              <Icon src="/images/stickers/martin-guitar.png" tilt={-4} />
            </p>

            <p className="hero-line mt-2 font-[family-name:var(--font-editorial)] text-sm leading-relaxed text-muted sm:text-base md:text-[17px]">
              I work on building scalable, backend systems for AI/ML applications on bare-metal & cloud infrastructure.
            </p>

            {/* Clean, prose-style affiliation trail aligned with the bio */}
            <div className="hero-meta mt-3.5 space-y-1 text-xs leading-relaxed text-subtle sm:mt-4 sm:text-sm">
              <p className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
                <span>Currently MTS at</span>
                <InlineOrg org={CURRENT_ORGS[0]} />
                {/* <span>· Master's at</span>
                <InlineOrg org={CURRENT_ORGS[1]} /> */}
                <span>· Mentor at</span>
                <InlineOrg org={CURRENT_ORGS[2]} />
              </p>
              <p className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
                <span>Previously</span>
                {PAST_ORGS.map((org, idx) => (
                  <React.Fragment key={org.name}>
                    <InlineOrg org={org} />
                    {idx < PAST_ORGS.length - 1 && <span>·</span>}
                  </React.Fragment>
                ))}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}