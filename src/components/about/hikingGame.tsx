"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

// ── Sprite frames using CSS art (no image dependency) ──────────────────────
// The character is a tiny 32×32 hiker drawn purely with divs/CSS.
// Frame alternates on walk to animate legs.

type Direction = "left" | "right";
type Frame = 0 | 1;

function HikerSprite({ direction, jumping }: { direction: Direction; jumping: boolean }) {
  return (
    <Image
      src="/images/profiles/hikingsprite1.png"  // update this path to wherever you drop your PNG
      alt="hiker"
      width={48}
      height={48}
      style={{
        width:48,
        height: 48,
        imageRendering: "pixelated",
        transform: direction === "left" ? "scaleX(-1)" : "scaleX(1)",
        // slight squish on landing, stretch on jump — feels more alive
        filter: jumping ? "none" : undefined,
        transition: "transform 0.05s",
      }}
    />
  );
}

// Speech bubble
function Bubble({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4, scale: 0.85 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      style={{
        position: "absolute",
        bottom: "100%",
        left: "50%",
        transform: "translateX(-50%)",
        marginBottom: 6,
        background: "white",
        border: "1.5px solid #e0e7ff",
        borderRadius: 10,
        padding: "4px 10px",
        fontSize: 11,
        whiteSpace: "nowrap",
        color: "#3730a3",
        fontFamily: "monospace",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    >
      {text}
      {/* Tail */}
      <div style={{
        position: "absolute",
        bottom: -7,
        left: "50%",
        transform: "translateX(-50%)",
        width: 0,
        height: 0,
        borderLeft: "6px solid transparent",
        borderRight: "6px solid transparent",
        borderTop: "7px solid white",
      }} />
    </motion.div>
  );
}

// Quips the hiker says when bumping into things
const QUIPS = [
  "Nice view up here! 🏔️",
  "Made it! 🎉",
  "Keep hiking! 👟",
  "Is that a snack? 🥾",
  "The trail never ends...",
  "One step at a time!",
  "Watch out! Hiker coming through!",
  "Left, right, left, right...",
  "My pack is too heavy 😅",
  "Are we there yet?",
];

const GRAVITY = 0.6;
const JUMP_FORCE = -13;
const MOVE_SPEED = 4;
const GROUND_OFFSET = 0; // px above viewport bottom

interface Pos { x: number; y: number; }

export default function HikingGame({ onClose }: { onClose: () => void }) {
  const [pos, setPos] = useState<Pos>({ x: 80, y: 0 });
  const [vel, setVel] = useState({ x: 0, y: 0 });
  const [onGround, setOnGround] = useState(false);
  const [direction, setDirection] = useState<Direction>("right");
  const [frame, setFrame] = useState<Frame>(0);
  const [jumping, setJumping] = useState(false);
  const [quip, setQuip] = useState<string | null>("Use ← → to walk, ↑ to jump! Press Esc to leave.");
  const [quipTimer, setQuipTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  const keys = useRef<Set<string>>(new Set());
  const rafRef = useRef<number>(0);
  const frameTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const posRef = useRef(pos);
  const velRef = useRef(vel);
  const onGroundRef = useRef(onGround);
  posRef.current = pos;
  velRef.current = vel;
  onGroundRef.current = onGround;

  // Show a quip for 2.5s
  const showQuip = useCallback((text: string) => {
    if (quipTimer) clearTimeout(quipTimer);
    setQuip(text);
    const t = setTimeout(() => setQuip(null), 2500);
    setQuipTimer(t);
  }, [quipTimer]);

  // Key listeners
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(e.key)) e.preventDefault();
      keys.current.add(e.key);
    };
    const up = (e: KeyboardEvent) => {
      keys.current.delete(e.key);
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, [onClose]);

  // Walk cycle timer
  useEffect(() => {
    frameTimer.current = setInterval(() => setFrame((f) => (f === 0 ? 1 : 0)), 150);
    return () => { if (frameTimer.current) clearInterval(frameTimer.current); };
  }, []);

  // Physics loop
  useEffect(() => {
    const SPRITE_HEIGHT = 40;
    const SPRITE_WIDTH = 32;

    const loop = () => {
      const p = { ...posRef.current };
      const v = { ...velRef.current };
      const groundY = window.innerHeight - SPRITE_HEIGHT - GROUND_OFFSET;

      // Horizontal
      let dx = 0;
      if (keys.current.has("ArrowLeft"))  { dx = -MOVE_SPEED; setDirection("left"); }
      if (keys.current.has("ArrowRight")) { dx = +MOVE_SPEED; setDirection("right"); }

      // Jump
      if ((keys.current.has("ArrowUp") || keys.current.has(" ")) && onGroundRef.current) {
        v.y = JUMP_FORCE;
        setJumping(true);
        showQuip(QUIPS[Math.floor(Math.random() * QUIPS.length)]);
      }

      // Gravity
      v.y = Math.min(v.y + GRAVITY, 20);

      let newX = p.x + dx;
      let newY = p.y + v.y;

      // Floor collision
      if (newY >= groundY) {
        newY = groundY;
        v.y = 0;
        setOnGround(true);
        setJumping(false);
      } else {
        setOnGround(false);
      }

      // Wall collision
      newX = Math.max(0, Math.min(newX, window.innerWidth - SPRITE_WIDTH));

      posRef.current = { x: newX, y: newY };
      velRef.current = v;
      setPos({ x: newX, y: newY });
      setVel({ ...v });

      rafRef.current = requestAnimationFrame(loop);
    };

    // Init y to ground
    setPos((p) => ({ ...p, y: window.innerHeight - 40 - GROUND_OFFSET }));

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* Full-screen overlay — transparent so page is still visible */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9990,
          pointerEvents: "none", // page stays interactive
        }}
      />

      {/* Dismiss hint */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        style={{
          position: "fixed",
          top: 16,
          right: 16,
          zIndex: 9998,
          background: "rgba(255,255,255,0.9)",
          border: "1px solid #e0e7ff",
          borderRadius: 8,
          padding: "6px 12px",
          fontSize: 12,
          color: "#4f46e5",
          fontFamily: "monospace",
          backdropFilter: "blur(4px)",
          pointerEvents: "auto",
          cursor: "pointer",
        }}
        onClick={onClose}
      >
        Press Esc or click here to stop hiking 🥾
      </motion.div>

      {/* The hiker character */}
      <div
        style={{
          position: "fixed",
          left: pos.x,
          top: pos.y,
          zIndex: 9997,
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        <AnimatePresence>
          {quip && <Bubble text={quip} />}
        </AnimatePresence>
        <HikerSprite direction={direction} jumping={jumping} />
      </div>
    </>
  );
}