"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface MiniBook {
  title: string;
  author: string;
  isbn: string;
}

// Curated subset — swap freely, doesn't need to match FIVE_STARS exactly.
const FEATURED: MiniBook[] = [
  { title: "Babel", author: "R.F. Kuang", isbn: "9780063021426" },
  { title: "Project Hail Mary", author: "Andy Weir", isbn: "9780593135204" },
  { title: "Exhalation", author: "Ted Chiang", isbn: "9781101972083" },
  { title: "Flowers for Algernon", author: "Daniel Keyes", isbn: "9781407230030" },
  { title: "Tomorrow, and Tomorrow, and Tomorrow", author: "Gabrielle Zevin", isbn: "9781529115543" },
  { title: "The Invisible Life of Addie LaRue", author: "V.E. Schwab", isbn: "9780765387561" },
  { title: "God of Small Things", author: "Arundhati Roy", isbn: "9780143028574" },
  { title: "The Martian", author: "Andy Weir", isbn: "0804139032" },
];

function MiniBookCover({ title, author, isbn }: MiniBook) {
  const [loaded, setLoaded] = useState(false);
  const coverUrl = `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;

  return (
    <div className="flex-shrink-0 w-24 group">
      <div className="relative w-24 aspect-[2/3] bg-indigo-50 rounded overflow-hidden shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:shadow-md">
        {!loaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-indigo-50 animate-pulse" />
        )}
        <Image
          src={coverUrl}
          alt={title}
          fill
          sizes="96px"
          className={`object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setLoaded(true)}
          unoptimized
        />
      </div>
      <p className="mt-1.5 text-[11px] text-indigo-900/70 font-medium leading-tight line-clamp-2 w-24">
        {title}
      </p>
      <p className="text-[10px] text-gray-400 leading-tight line-clamp-1 w-24">
        {author}
      </p>
    </div>
  );
}

export default function MiniBookshelf() {
  // Duplicate the track so a -50% translateX loop has no visible seam —
  // at the halfway point, copy #2 is pixel-identical to where copy #1 started.
  const track = [...FEATURED, ...FEATURED];

  return (
    <div className="mb-16">
      <div className="flex justify-between items-end mb-5">
        <div>
          <h2 className="text-2xl font-extrabold text-indigo-900">
            📚 Bookshelf
          </h2>
        <p className="text-gray-500 leading-8 text-lg mb-6">
            Recent favourites & recs
          </p>
        </div>
        <Link
          href="/bookshelf"
          className="group flex items-center gap-1 text-sm font-bold text-indigo-600 hover:text-purple-600 transition-colors whitespace-nowrap"
        >
          View Full Shelf
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
        <div className="flex gap-4 w-max animate-bookshelf-scroll hover:[animation-play-state:paused]">
          {track.map((book, i) => (
            <MiniBookCover key={`${book.isbn}-${i}`} {...book} />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes bookshelf-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-bookshelf-scroll {
          animation: bookshelf-scroll 50s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-bookshelf-scroll {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}