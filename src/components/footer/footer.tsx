"use client";
import React, { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { Github, Linkedin, Mail } from "lucide-react";
import { gsap } from "gsap";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

// Injected at build time from next.config.js (last git commit date).
// Fall back to the build date so the footer never renders "Invalid Date".
const updated = new Date(
  process.env.NEXT_PUBLIC_LAST_UPDATED ?? new Date().toISOString()
);

// Pin to UTC so server and client always render the same string
const updatedLabel = updated.toLocaleDateString("en-US", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

const LINKS = [
  { href: "https://www.linkedin.com/in/keerthana-vegesna/", label: "LinkedIn", external: true, Icon: Linkedin },
  { href: "mailto:kvegesna01@gmail.com", label: "Email", external: false, Icon: Mail },
  { href: "https://github.com/vvegesna01", label: "GitHub", external: true, Icon: Github },
];

// Photography shots used as stamps
const PHOTOS = [1, 2, 3, 4, 5, 6].map((n) => `/images/photography/photo${n}.png`);
// Tray previews stay plain so the photo is a surprise
const PREVIEW = "#c7d2fe";

const W = 64;
const H = 80;

// Rectangle with semicircle bites along every edge, like a perforated stamp
function perforated(r: number, n: number) {
  const bites = (len: number) => Array.from({ length: n }, (_, i) => ((i + 0.5) * len) / n);
  let d = "M0 0";
  for (const c of bites(W)) d += ` L${c - r} 0 A${r} ${r} 0 0 0 ${c + r} 0`;
  d += ` L${W} 0`;
  for (const c of bites(H)) d += ` L${W} ${c - r} A${r} ${r} 0 0 0 ${W} ${c + r}`;
  d += ` L${W} ${H}`;
  for (const c of bites(W).reverse()) d += ` L${c + r} ${H} A${r} ${r} 0 0 0 ${c - r} ${H}`;
  d += ` L0 ${H}`;
  for (const c of bites(H).reverse()) d += ` L0 ${c + r} A${r} ${r} 0 0 0 0 ${c - r}`;
  return `path('${d} Z')`;
}

const SHAPES = [
  { id: "postage", label: "Postage", clip: perforated(2.6, 7), radius: "0px" },
  { id: "scallop", label: "Scallop", clip: perforated(4.2, 4), radius: "0px" },
  { id: "rounded", label: "Rounded", clip: undefined, radius: "14px" },
] as const;

type ShapeId = (typeof SHAPES)[number]["id"];

interface Placed {
  key: number;
  photo: string;
  shape: ShapeId;
  x: number; // % of footer width
  y: number; // % of footer height
  tilt: number;
}

function Stamp({ photo, shape }: { photo?: string; shape: ShapeId }) {
  const sh = SHAPES.find((s) => s.id === shape)!;
  return (
    <span className="block" style={{ filter: "drop-shadow(0 2px 3px rgba(30,27,75,0.25))" }}>
      <span
        className="relative block bg-white"
        style={{ width: W, height: H, clipPath: sh.clip, borderRadius: sh.radius, padding: 6 }}
      >
        <span
          className="relative block h-full w-full overflow-hidden"
          style={{ background: PREVIEW, borderRadius: shape === "rounded" ? "9px" : "1px" }}
        >
          {photo && <Image src={photo} alt="" fill sizes="80px" draggable={false} className="object-cover" />}
        </span>
      </span>
    </span>
  );
}

// The favicon, traced as strokes so GSAP can draw it in
function Mark() {
  const ref = useRef<SVGSVGElement>(null);

  useLayoutEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    const strokes = Array.from(svg.querySelectorAll<SVGGeometryElement>("[data-draw]"));
    const fills = svg.querySelectorAll("[data-fill]");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    strokes.forEach((el) => {
      const len = el.getTotalLength();
      gsap.set(el, { strokeDasharray: len, strokeDashoffset: len });
    });
    const hair = strokes[0];
    gsap.set(hair, { fillOpacity: 0 });
    gsap.set(fills, { opacity: 0 });

    let tl: gsap.core.Timeline | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
        tl.to(strokes, { strokeDashoffset: 0, duration: 1.1, stagger: 0.12 })
          .to(hair, { fillOpacity: 1, duration: 0.5 }, "-=0.4")
          .to(fills, { opacity: 1, duration: 0.5 }, "<");
      },
      { threshold: 0.4 }
    );
    io.observe(svg);

    return () => {
      io.disconnect();
      tl?.kill();
    };
  }, []);

  const ink = "#1e1b4b";
  return (
    <svg ref={ref} viewBox="0 0 285 285" className="h-10 w-10 shrink-0" fill="none" aria-hidden>
      {/* hair */}
      <path
        data-draw
        d="M142 6C60 6 30 90 24 160C20 220 10 260 12 285L268 285C262 240 258 200 262 150C266 80 230 6 142 6Z"
        stroke={ink}
        strokeWidth="8"
        strokeLinejoin="round"
        fill={ink}
      />
      {/* face and neck */}
      <path
        data-fill
        d="M62 100C62 60 100 42 145 42C195 42 225 70 228 110C232 170 200 235 150 238C100 235 64 170 62 100Z"
        fill="#fff"
      />
      <path data-fill d="M105 225L105 285L195 285L195 225Z" fill="#fff" />
      {/* glasses */}
      <rect data-draw x="72" y="100" width="63" height="48" rx="14" stroke={ink} strokeWidth="9" />
      <rect data-draw x="150" y="100" width="63" height="48" rx="14" stroke={ink} strokeWidth="9" />
      <path data-draw d="M135 118Q142 112 150 118" stroke={ink} strokeWidth="8" strokeLinecap="round" />
      <path data-draw d="M72 115L58 110M213 115L227 110" stroke={ink} strokeWidth="8" strokeLinecap="round" />
      {/* eyes and smile */}
      <circle data-fill cx="108" cy="124" r="6" fill={ink} />
      <circle data-fill cx="182" cy="124" r="6" fill={ink} />
      <path data-draw d="M120 180Q142 197 166 180" stroke={ink} strokeWidth="8" strokeLinecap="round" />
      <circle data-fill cx="56" cy="152" r="7" fill={ink} />
      <circle data-fill cx="228" cy="152" r="7" fill={ink} />
    </svg>
  );
}

export default function Footer() {
  const [shape, setShape] = useState<ShapeId>("postage");
  const [placed, setPlaced] = useState<Placed[]>([]);
  const next = useRef(0);

  // Every click on the footer cuts a stamp from the next photo, in the chosen shape
  const place = (e: React.MouseEvent<HTMLElement>) => {
    if ((e.target as HTMLElement).closest("a, button")) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const photo = PHOTOS[next.current++ % PHOTOS.length];
    setPlaced((p) =>
      [
        ...p,
        {
          key: Date.now() + p.length,
          photo,
          shape,
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
          tilt: Math.round(Math.random() * 24 - 12),
        },
      ].slice(-30)
    );
  };

  return (
    <footer
      onClick={place}
      className="relative overflow-hidden border-t border-gray-200 bg-[whitesmoke] cursor-crosshair"
    >
      {/* Placed stickers sit behind the content so links stay clickable */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <AnimatePresence>
          {placed.map((s) => (
            <motion.span
              key={s.key}
              initial={{ scale: 1.5, opacity: 0, rotate: s.tilt }}
              animate={{ scale: 1, opacity: 1, rotate: s.tilt }}
              transition={{ type: "spring", stiffness: 500, damping: 22 }}
              className="absolute block -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${s.x}%`, top: `${s.y}%` }}
            >
              <Stamp photo={s.photo} shape={s.shape} />
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      <div className="relative max-w-4xl mx-auto px-6 pt-8 pb-5">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-6">
          <div className="flex items-center gap-3">
            <p className="font-extrabold text-indigo-900">Keerthana Vegesna</p>
            {/* <p className="text-xs text-gray-500 mt-1 max-w-[16rem]">
              Software engineer who loves books, music, and telling the story with data.
            </p> */}
          </div>

          <nav className="flex items-center gap-5 sm:justify-end">
            {LINKS.map(({ href, label, external, Icon }) => (
              <Link
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                aria-label={label}
                title={label}
                className="text-indigo-700 hover:text-purple-500 transition-colors"
              >
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </Link>
            ))}
          </nav>
        </div>

        {/* Stamp cutter */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-wider text-gray-400">
            Glad you stopped by! Click to place a stamp anywhere as a souvenir.
          </span>
          {SHAPES.map((sh) => (
            <button
              key={sh.id}
              type="button"
              aria-label={`${sh.label} stamp`}
              aria-pressed={shape === sh.id}
              onClick={() => setShape(sh.id)}
              className={`rounded-lg border p-1 transition ${
                shape === sh.id
                  ? "bg-white border-indigo-300 shadow-sm -translate-y-0.5"
                  : "border-transparent hover:bg-white/70"
              }`}
            >
              <span className="block" style={{ width: W * 0.4, height: H * 0.4 }}>
                <span className="block origin-top-left scale-[0.4]">
                  <Stamp shape={sh.id} />
                </span>
              </span>
            </button>
          ))}
          {placed.length > 0 && (
            <button
              type="button"
              onClick={() => setPlaced([])}
              className="ml-1 font-mono text-[10px] uppercase tracking-wider text-gray-400 hover:text-indigo-700 transition-colors"
            >
              Clear
            </button>
          )}
        </div>

        <div className="mt-5 pt-4 border-t border-gray-200 text-xs text-gray-400">
          <span>
            © {updated.getUTCFullYear()} Keerthana Vegesna · Updated {updatedLabel}
          </span>
        </div>
      </div>
    </footer>
  );
}
