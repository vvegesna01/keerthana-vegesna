"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const PHOTO_COUNT = 6;
const photos = Array.from({ length: PHOTO_COUNT }, (_, i) => ({
  src: `/images/photography/photo${i + 1}.png`,
  alt: `Photo ${i + 1}`,
}));

export default function PhotographyGrid() {
  const [selected, setSelected] = useState<number | null>(null);
  const [shutter, setShutter] = useState<number | null>(null);

  const open = (i: number) => {
    setShutter(i);
    // Brief shutter flash, then open lightbox
    setTimeout(() => {
      setShutter(null);
      setSelected(i);
    }, 180);
  };

  const close = useCallback(() => setSelected(null), []);

  const prev = useCallback(() =>
    setSelected((s) => (s === null ? null : (s - 1 + PHOTO_COUNT) % PHOTO_COUNT)), []);

  const next = useCallback(() =>
    setSelected((s) => (s === null ? null : (s + 1) % PHOTO_COUNT)), []);

  // Keyboard nav
  useEffect(() => {
    if (selected === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selected, close, prev, next]);

  // Lock body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = selected !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selected]);

  return (
    <>
      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {photos.map((photo, i) => (
          <motion.div
            key={i}
            onClick={() => open(i)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            className="group relative aspect-square rounded-lg overflow-hidden bg-indigo-50 shadow-sm cursor-pointer select-none"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              unoptimized
            />

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-indigo-900/0 group-hover:bg-indigo-900/20 transition-colors duration-200" />

            {/* Shutter flash — white overlay that fades out quickly */}
            <AnimatePresence>
              {shutter === i && (
                <motion.div
                  className="absolute inset-0 bg-white z-10"
                  initial={{ opacity: 0.8 }}
                  animate={{ opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                />
              )}
            </AnimatePresence>

            {/* Camera icon hint */}
            <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <span className="text-white text-xs bg-black/30 rounded px-1.5 py-0.5 backdrop-blur-sm">
                🔍
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
          >
            {/* Image container — stops click propagation so clicking image doesn't close */}
            <motion.div
              className="relative w-[90vw] max-w-2xl aspect-square rounded-xl overflow-hidden shadow-2xl"
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={photos[selected].src}
                alt={photos[selected].alt}
                fill
                className="object-cover"
                unoptimized
                priority
              />

              {/* Counter */}
              <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs font-mono">
                {selected + 1} / {PHOTO_COUNT}
              </div>
            </motion.div>

            {/* Close */}
            <button
              onClick={close}
              className="absolute top-4 right-4 text-white/70 hover:text-white transition p-2 rounded-full hover:bg-white/10"
              aria-label="Close"
            >
              <X size={22} />
            </button>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition p-2 rounded-full hover:bg-white/10"
              aria-label="Previous photo"
            >
              <ChevronLeft size={28} />
            </button>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition p-2 rounded-full hover:bg-white/10"
              aria-label="Next photo"
            >
              <ChevronRight size={28} />
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5">
              {photos.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setSelected(i); }}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                    i === selected ? "bg-white scale-125" : "bg-white/40"
                  }`}
                  aria-label={`Go to photo ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}