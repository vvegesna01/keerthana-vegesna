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
  FaQrcode,
  FaArrowLeft,
  FaMapMarkerAlt,
  FaRegCopy,
  FaCheck,
  FaFileAlt,
  FaAddressBook,
} from "react-icons/fa";
import { QRCodeSVG } from "qrcode.react";
import PageContainer from "@/components/layout/PageContainer";
import PageHeader from "@/components/layout/PageHeader";
import Button from "@/components/ui/Button";

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

// Set to your resume path (e.g. "/Keerthana_Vegesna_Resume.pdf" in /public)
// and a Resume button appears. Leave empty to hide it.
const RESUME_HREF = "";

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

function CardHeader() {
  return (
    <div className="relative z-10 mt-1 text-center">
      <h1 className="mb-3 text-3xl font-extrabold leading-10 tracking-tight text-indigo-950 transition-colors duration-300 hover:text-purple-600">
        {PROFILE.name}
      </h1>
      <p className="text-lg text-slate-700">
        {PROFILE.role} <span className="px-1 font-normal text-slate-400">@</span> {PROFILE.company}
      </p>
      <p className="mt-2 flex items-center justify-center gap-1 text-[12px] font-semibold uppercase tracking-wider text-slate-500">
        <FaMapMarkerAlt className="text-[10px] text-[#1C4E9C]" />
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

function BusinessCard({ onBack }: { onBack: () => void }) {
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
    "rounded-full border border-white/70 bg-white/60 p-3 text-[#1C4E9C] shadow-sm transition-all hover:border-[#1C4E9C] hover:bg-[#1C4E9C] hover:text-white";

  return (
    <div className="flex animate-scaleUp flex-col items-center justify-center py-6">
      <button
        onClick={onBack}
        className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500 transition-colors hover:text-slate-800"
      >
        <FaArrowLeft size={10} /> Back to standard view
      </button>

      {/* overflow-hidden keeps the peeking decor from causing sideways scroll on phones */}
      <div className="flex w-full justify-center overflow-hidden px-10 py-8">
        <div className="relative w-[21rem] max-w-full">
          {/* Scene behind the glass: color blobs plus a few things from the rest of the site.
              The card blurs them, which is what makes it read as glass. */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-10 -top-8 h-56 w-56 rounded-full bg-indigo-400/50 blur-3xl" />
            <div className="absolute -bottom-10 -right-8 h-64 w-64 rounded-full bg-fuchsia-300/50 blur-3xl" />
            <div className="absolute right-0 top-1/3 h-40 w-40 rounded-full bg-amber-200/60 blur-3xl" />

            {/* Polaroid from the photography section */}
            <div className="absolute -left-8 top-8 w-28 -rotate-[9deg] bg-white p-1.5 pb-6 shadow-lg">
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
            className="relative h-[36rem]"
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
                  className="absolute inset-0 flex flex-col overflow-hidden rounded-3xl p-7"
                  style={glassFace}
                >
                  <FaceBlobs />
                  <CardHeader />

                  <div className="relative z-10 flex flex-1 flex-col items-center justify-center">
                    <div className="group relative h-44 w-44">
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

                    {/* <span className="mt-3 flex items-center gap-2 rounded-full border border-emerald-200/80 bg-emerald-50/70 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-emerald-700">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                      </span>
                      Open to Opportunities
                    </span> */}

                    {/* <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                      {INTERESTS.map((i) => (
                        <span
                          key={i}
                          className="rounded-full border border-white/70 bg-white/50 px-2.5 py-1 text-[10px] font-semibold text-indigo-900"
                        >
                          {i}
                        </span>
                      ))}
                    </div> */}
                                      <p className="relative z-10 text-center text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Tap to flip
                  </p>
                  </div>

                  <div className="relative z-20 mb-2 mt-4 flex justify-center gap-4">
                    <a
                      href={PROFILE.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      onClick={stop}
                      tabIndex={isFlipped ? -1 : 0}
                      className={iconLink}
                      aria-label="LinkedIn"
                    >
                      <FaLinkedin size={18} />
                    </a>
                    <a
                      href={PROFILE.github}
                      target="_blank"
                      rel="noreferrer"
                      onClick={stop}
                      tabIndex={isFlipped ? -1 : 0}
                      className={iconLink}
                      aria-label="GitHub"
                    >
                      <FaGithub size={18} />
                    </a>
                    <a
                      href={`mailto:${PROFILE.email}`}
                      onClick={stop}
                      tabIndex={isFlipped ? -1 : 0}
                      className={iconLink}
                      aria-label="Email"
                    >
                      <FaEnvelope size={18} />
                    </a>
                    
                  </div>
                                    <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      downloadVCard(site);
                    }}
                    tabIndex={isFlipped ? 0 : -1}
                    className="relative z-20 mx-auto mt-3 flex items-center gap-2 rounded-full border border-white/70 bg-white/60 px-4 py-2 text-xs font-semibold text-[#1C4E9C] shadow-sm transition-all hover:border-[#1C4E9C] hover:bg-[#1C4E9C] hover:text-white"
                  >
                    <FaAddressBook size={13} /> Save to contacts
                  </button>

                  <motion.div
                    className="pointer-events-none absolute inset-0 z-30 rounded-3xl"
                    style={{ background: glare }}
                  />
                </div>

                {/* ── BACK ── */}
                <div
                  aria-hidden={!isFlipped}
                  className="absolute inset-0 flex flex-col overflow-hidden rounded-3xl p-7"
                  style={{ ...glassFace, transform: "rotateY(180deg)" }}
                >
                  <FaceBlobs />
                  <CardHeader />

                  <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-3">
                    <div className="rounded-2xl border border-white/80 bg-white p-3 shadow-sm">
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
                        <div className="h-[160px] w-[160px] animate-pulse rounded-xl bg-slate-100" />
                      )}
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#1C4E9C]">Scan to connect</p>

                    <div className="mt-1 text-center">
                      <p className="mb-1.5 text-[9px] font-bold uppercase tracking-widest text-slate-400">On my shelf</p>
                      <div className="flex justify-center gap-1.5">
                        {SHELF.map((b) => (
                          <div
                            key={b.title}
                            className="relative aspect-[2/3] w-10 overflow-hidden rounded-sm shadow-md"
                          >
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
                    className="relative z-20 mx-auto mt-3 flex items-center gap-2 rounded-full border border-white/70 bg-white/60 px-4 py-2 text-xs font-semibold text-[#1C4E9C] shadow-sm transition-all hover:border-[#1C4E9C] hover:bg-[#1C4E9C] hover:text-white"
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
  const [showCard, setShowCard] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked; the mailto button still works
    }
  };

  return (
    <PageContainer
      className="flex min-h-[80vh] flex-col justify-center bg-gray-50/30 text-slate-900 selection:bg-indigo-100 selection:text-indigo-900"
      size="default"
    >
      {!showCard ? (
        <div className="animate-fadeIn">
          <PageHeader
            title="Get in touch"
            subtitle="I'm currently open to software engineering roles focused on backend systems, cloud infrastructure, and data platforms."
          />

          {/* <p className="mt-3 flex flex-wrap items-center gap-x-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <FaMapMarkerAlt className="text-[10px] text-[#1C4E9C]" />
            Based in {PROFILE.location} · open to relocating to {PROFILE.relocate}
          </p> */}

          <div className="mt-6">
            {/* The illustration is the entry point to the card, so say so */}
            <div className="mb-8 flex items-end gap-3">
              <button
                type="button"
                onClick={() => setShowCard(true)}
                aria-label="Open business card"
                className="group relative h-48 w-48 cursor-pointer"
              >
                <Image
                  src="/images/logo/hover.png"
                  alt="Keerthana looking up from laptop"
                  fill
                  className="rounded-xl object-contain transition-opacity duration-300 group-hover:opacity-0"
                  unoptimized
                />
                <Image
                  src="/images/logo/standard.png"
                  alt="Keerthana working at a laptop"
                  fill
                  className="absolute inset-0 rounded-xl object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  unoptimized
                />
              </button>
              <p className="mb-8 hidden -rotate-2 text-xs italic text-slate-400 sm:block">← tap me for a business card</p>
            </div>

            {/* <div className="mb-10 max-w-xl text-sm font-normal leading-relaxed text-slate-600">
              Feel free to reach out for formal opportunities, technical collaborations, or if you ever want to talk about
              books!
            </div> */}

            <div className="flex flex-wrap gap-3">
              <Button href={`mailto:${PROFILE.email}`} size="md" variant="primary">
                <FaEnvelope className="mr-2 inline" size={14} /> Email me
              </Button>

              {RESUME_HREF && (
                <Button href={RESUME_HREF} target="_blank" size="md" variant="secondary">
                  <FaFileAlt size={14} className="mr-2 inline text-slate-700" /> Resume
                </Button>
              )}

              <Button href={PROFILE.linkedin} target="_blank" size="md" variant="secondary">
                <FaLinkedin size={14} className="mr-2 inline text-indigo-600" /> LinkedIn
              </Button>
              <Button href={PROFILE.github} target="_blank" size="md" variant="secondary">
                <FaGithub size={14} className="mr-2 inline text-slate-700" /> GitHub
              </Button>

              <button
                onClick={copyEmail}
                className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition-colors duration-200 hover:bg-slate-50"
                aria-live="polite"
              >
                {copied ? <FaCheck size={13} className="text-emerald-600" /> : <FaRegCopy size={13} />}
                {copied ? "Copied!" : "Copy email"}
              </button>

              <button
                onClick={() => setShowCard(true)}
                className="flex items-center gap-2 rounded-lg bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 transition-colors duration-200 hover:bg-indigo-100"
              >
                <FaQrcode size={18} /> Business card
              </button>
            </div>
          </div>
        </div>
      ) : (
        <BusinessCard onBack={() => setShowCard(false)} />
      )}
    </PageContainer>
  );
}