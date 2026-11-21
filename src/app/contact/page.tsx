"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion";
import {
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaMapMarkerAlt,
  FaAddressBook,
} from "react-icons/fa";
import { QRCodeSVG } from "qrcode.react";
import PageContainer from "@/components/layout/PageContainer";

// ── Content (edit here, not in the JSX) ─────────────────────────────

const PROFILE = {
  name: "Keerthana Vegesna",
  role: "MTS",
  company: "ApexFlo Labs",
  location: "Hyderabad, India",
  email: "kvegesna01@gmail.com",
  linkedin: "https://www.linkedin.com/in/keerthana-vegesna/",
  github: "https://github.com/vvegesna01",
  siteFallback: "https://kvegesna.vercel.app",
};

// Pulled from your About page so the card feels like the rest of the site
// const INTERESTS = ["📚 Reader", "🎸 Musician", "📷 Photographer", "🥾 Hiker"];
const POLAROID_SRC = "/images/photography/photo1.png";
const cover = (isbn: string) => `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;
const PEEKING_BOOKS = [
  { title: "Project Hail Mary", src: cover("9780593135204") },
];
const SHELF = [
  { title: "Exhalation", src: cover("9781101972083") },
  { title: "Tomorrow, and Tomorrow, and Tomorrow", src: cover("9781529115543") },
  { title: "Babel", src: cover("9780063021426") },
  { title: "The Martian", src: cover("0804139032") },
];

// ── Liquid glass ────────────────────────────────────────────────────
// What sells the look: a translucent gradient fill, blur + saturation of
// whatever is behind it, a bright 1px edge, inset highlights, and a soft
// specular glare that follows the pointer (set up in <BusinessCard>).
const glassFace: React.CSSProperties = {
  background: "linear-gradient(145deg, rgba(255,255,255,0.55), rgba(255,255,255,0.16))",
  backdropFilter: "blur(22px) saturate(180%)",
  WebkitBackdropFilter: "blur(22px) saturate(180%)",
  border: "1px solid rgba(255,255,255,0.6)",
  boxShadow: [
    "0 30px 60px -20px rgba(49,46,129,0.35)", // drop shadow, indigo-tinted
    "inset 0 1px 0 rgba(255,255,255,0.95)", // bright top edge
    "inset 0 -1px 0 rgba(255,255,255,0.25)", // faint bottom edge
    "inset 0 0 40px rgba(255,255,255,0.25)", // soft inner glow
  ].join(", "),
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden",
};

// Each face carries its own blurred color blobs, so it still reads as glass
// in browsers where backdrop-filter misbehaves inside 3D transforms.
function FaceBlobs() {
  return (
    <>
      <div className="pointer-events-none absolute -top-12 -left-12 h-40 w-40 rounded-full bg-indigo-300/40 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-14 -right-10 h-44 w-44 rounded-full bg-fuchsia-200/50 blur-2xl" />
    </>
  );
}

function CardHeader({ className = "" }: { className?: string }) {
  return (
    <div className={`relative z-10 mt-1 text-center md:mt-0 md:text-left ${className}`}>
      <h1 className="mb-3 text-3xl font-extrabold leading-10 tracking-tight text-heading transition-colors duration-300 hover:text-accent-soft">
        {PROFILE.name}
      </h1>
      <p className="text-lg text-muted">
        {PROFILE.role} <span className="px-1 font-normal text-subtle">@</span> {PROFILE.company}
      </p>
      <p className="mt-2 flex items-center justify-center md:justify-start gap-1 text-[12px] font-semibold uppercase tracking-wider text-muted">
        <FaMapMarkerAlt className="text-[10px] text-link" />
        {PROFILE.location}
      </p>
    </div>
  );
}

// ── vCard: "Save to contacts" ───────────────────────────────────────

function downloadVCard(site: string) {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${PROFILE.name}`,
    "N:Vegesna;Keerthana;;;",
    `ORG:${PROFILE.company}`,
    "TITLE:Member of Technical Staff",
    `EMAIL:${PROFILE.email}`,
    `URL:${site}`,
    "END:VCARD",
  ];
  const blob = new Blob([lines.join("\r\n")], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Keerthana-Vegesna.vcf";
  a.click();
  // Revoke later; revoking instantly can cancel the download in some browsers
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// ── Business card ───────────────────────────────────────────────────

function BusinessCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [origin, setOrigin] = useState("");
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  // Pointer position (0–1) drives both the tilt and the glare. Motion values
  // update the DOM directly, so moving the mouse never re-renders React.
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 160, damping: 18 });
  const sy = useSpring(py, { stiffness: 160, damping: 18 });
  const rotateX = useTransform(sy, [0, 1], [7, -7]);
  const rotateY = useTransform(sx, [0, 1], [-7, 7]);
  const gx = useTransform(sx, (v) => `${v * 100}%`);
  const gy = useTransform(sy, (v) => `${v * 100}%`);
  const glare = useMotionTemplate`radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.5), rgba(255,255,255,0) 55%)`;

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    // Mouse only: on touch, a drag is a scroll, not a tilt
    if (reduceMotion || e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };
  const resetTilt = () => {
    px.set(0.5);
    py.set(0.5);
  };

  const stop = (e: React.SyntheticEvent) => e.stopPropagation();
  const site = origin || PROFILE.siteFallback;

  const iconLink =
    "rounded-full border border-white/70 bg-surface/60 p-3 text-link shadow-sm transition-all hover:border-link hover:bg-link hover:text-white";

  return (
    <div className="flex animate-scaleUp flex-col items-center justify-center py-2">
      {/* overflow-hidden keeps the peeking decor from causing sideways scroll on phones */}
      <div className="flex w-full justify-center overflow-x-clip px-10 py-8">
        <div className="relative w-[21rem] max-w-full md:w-[38rem]">
          {/* Scene behind the glass: color blobs plus a few things from the rest of the site.
              The card blurs them, which is what makes it read as glass. */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-10 -top-8 h-56 w-56 rounded-full bg-indigo-400/50 blur-3xl" />
            <div className="absolute -bottom-10 -right-8 h-64 w-64 rounded-full bg-fuchsia-300/50 blur-3xl" />
            <div className="absolute right-0 top-1/3 h-40 w-40 rounded-full bg-amber-200/60 blur-3xl" />

            {/* Polaroid from the photography section */}
            <div className="absolute -left-8 top-8 w-28 -rotate-[9deg] bg-surface p-1.5 pb-6 shadow-lg">
              <div className="relative aspect-square w-full overflow-hidden">
                <Image src={POLAROID_SRC} alt="" fill className="object-cover" unoptimized />
              </div>
            </div>

            {/* Books from the bookshelf */}
            <div className="absolute -right-6 bottom-14 flex rotate-[7deg] -space-x-3">
              {PEEKING_BOOKS.map((b) => (
                <div key={b.title} className="relative aspect-[2/3] w-14 overflow-hidden rounded-sm shadow-lg">
                  <Image src={b.src} alt="" fill className="object-cover" unoptimized />
                </div>
              ))}
            </div>
          </div>

          {/* 3D scene */}
          <div
            className="relative h-[36rem] md:h-[21rem]"
            style={{ perspective: "1100px" }}
            onPointerMove={handleMove}
            onPointerLeave={resetTilt}
          >
            <motion.div
              className="h-full w-full"
              style={{
                transformStyle: "preserve-3d",
                ...(reduceMotion ? {} : { rotateX, rotateY }),
              }}
            >
              {/* Flipper */}
              <div
                role="button"
                tabIndex={0}
                aria-label="Flip business card"
                onClick={() => setIsFlipped((f) => !f)}
                onKeyDown={(e) => {
                  // Only when the card itself is focused, not a link inside it
                  if (e.target !== e.currentTarget) return;
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setIsFlipped((f) => !f);
                  }
                }}
                className="relative h-full w-full cursor-pointer rounded-3xl outline-none transition-transform duration-700 ease-in-out focus-visible:ring-2 focus-visible:ring-indigo-400"
                style={{
                  transformStyle: "preserve-3d",
                  transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
              >
                {/* ── FRONT ── */}
                <div
                  aria-hidden={isFlipped}
                  className="absolute inset-0 flex flex-col overflow-hidden rounded-3xl p-7 md:px-10"
                  style={glassFace}
                >
                  <FaceBlobs />

                  <div className="relative z-10 grid flex-1 grid-cols-1 content-between gap-3 md:grid-cols-[auto_1fr] md:content-center md:gap-x-10 md:gap-y-4">
                    <CardHeader className="order-1 md:order-none md:col-start-2 md:row-start-1 md:self-end" />

                    <div className="group relative order-2 mx-auto h-44 w-44 md:order-none md:col-start-1 md:row-span-2 md:row-start-1 md:h-52 md:w-52">
                      <Image
                        src="/images/logo/standard.png"
                        alt="Keerthana"
                        fill
                        className="object-contain transition-opacity duration-300 group-hover:opacity-0"
                        unoptimized
                      />
                      <Image
                        src="/images/logo/hover.png"
                        alt="Keerthana looking up"
                        fill
                        className="absolute inset-0 object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        unoptimized
                      />
                    </div>

                    <div className="order-3 flex flex-col items-center gap-3 md:order-none md:col-start-2 md:row-start-2 md:items-start">
                      <div className="flex justify-center gap-4">
                        <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" onClick={stop} tabIndex={isFlipped ? -1 : 0} className={iconLink} aria-label="LinkedIn">
                          <FaLinkedin size={18} />
                        </a>
                        <a href={PROFILE.github} target="_blank" rel="noreferrer" onClick={stop} tabIndex={isFlipped ? -1 : 0} className={iconLink} aria-label="GitHub">
                          <FaGithub size={18} />
                        </a>
                        <a href={`mailto:${PROFILE.email}`} onClick={stop} tabIndex={isFlipped ? -1 : 0} className={iconLink} aria-label="Email">
                          <FaEnvelope size={18} />
                        </a>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          downloadVCard(site);
                        }}
                        tabIndex={isFlipped ? -1 : 0}
                        className="flex items-center gap-2 rounded-full border border-white/70 bg-surface/60 px-4 py-2 text-xs font-semibold text-link shadow-sm transition-all hover:border-link hover:bg-link hover:text-white"
                      >
                        <FaAddressBook size={13} /> Save to contacts
                      </button>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-subtle">Tap to flip</p>
                    </div>
                  </div>

                  <motion.div
                    className="pointer-events-none absolute inset-0 z-30 rounded-3xl"
                    style={{ background: glare }}
                  />
                </div>

                {/* ── BACK ── */}
                <div
                  aria-hidden={!isFlipped}
                  className="absolute inset-0 flex flex-col overflow-hidden rounded-3xl p-7 md:px-10"
                  style={{ ...glassFace, transform: "rotateY(180deg)" }}
                >
                  <FaceBlobs />
                  <CardHeader className="md:hidden" />

                  <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-3 md:flex-row md:gap-12">
                    <div className="flex flex-col items-center gap-3">
                      <div className="rounded-2xl border border-white/80 bg-surface p-3 shadow-sm">
                        {origin ? (
                          <QRCodeSVG
                            value={`${origin}/contact`}
                            size={160}
                            level="M"
                            fgColor="#1C4E9C"
                            bgColor="#ffffff"
                            includeMargin={false}
                          />
                        ) : (
                          <div className="h-[160px] w-[160px] animate-pulse rounded-xl bg-sunken" />
                        )}
                      </div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-link">Scan to connect</p>
                    </div>

                    <div className="mt-1 text-center">
                      <p className="mb-1.5 text-[9px] font-bold uppercase tracking-widest text-subtle">On my shelf</p>
                      <div className="flex justify-center gap-1.5">
                        {SHELF.map((b) => (
                          <div key={b.title} className="relative aspect-[2/3] w-10 overflow-hidden rounded-sm shadow-md md:w-14">
                            <Image src={b.src} alt={b.title} fill className="object-cover" unoptimized />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      downloadVCard(site);
                    }}
                    tabIndex={isFlipped ? 0 : -1}
                    className="relative z-20 mx-auto mt-3 flex items-center gap-2 rounded-full border border-white/70 bg-surface/60 px-4 py-2 text-xs font-semibold text-link shadow-sm transition-all hover:border-link hover:bg-link hover:text-white"
                  >
                    <FaAddressBook size={13} /> Save to contacts
                  </button> */}

                  <motion.div
                    className="pointer-events-none absolute inset-0 z-30 rounded-3xl"
                    style={{ background: glare }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Page ────────────────────────────────────────────────────────────

export default function Contact() {
  return (
    <PageContainer
      className="flex min-h-[80vh] flex-col justify-center text-heading selection:bg-surface-strong selection:text-heading"
      size="default"
    >
      <BusinessCard />
    </PageContainer>
  );
}
