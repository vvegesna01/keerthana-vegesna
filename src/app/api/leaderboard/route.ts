import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

export interface LeaderboardEntry {
  name: string;
  wpm: number;
  accuracy: number;
  date: string;
}

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const KEY = "typing:leaderboard";

export async function GET() {
  try {
    const entries = await redis.get<LeaderboardEntry[]>(KEY) ?? [];
    return NextResponse.json(entries);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(req: Request) {
  try {
    const entry: LeaderboardEntry = await req.json();

    // Validate
    if (
      typeof entry.name !== "string" ||
      typeof entry.wpm !== "number" ||
      entry.wpm < 0 || entry.wpm > 300 ||
      typeof entry.accuracy !== "number" ||
      entry.accuracy < 0 || entry.accuracy > 100
    ) {
      return NextResponse.json({ error: "Invalid entry" }, { status: 400 });
    }

    // Sanitize name
    entry.name = entry.name.trim().slice(0, 24) || "Anonymous";

    // Rate limit: 5 submissions per IP per minute
    const ip = req.headers.get("x-forwarded-for") ?? "unknown";
    const rlKey = `typing:rl:${ip}`;
    const attempts = await redis.incr(rlKey);
    if (attempts === 1) await redis.expire(rlKey, 60);
    if (attempts > 5) {
      return NextResponse.json({ error: "Too many submissions" }, { status: 429 });
    }

    const current = await redis.get<LeaderboardEntry[]>(KEY) ?? [];
    const updated = [...current, entry]
      .sort((a, b) => b.wpm - a.wpm)
      .slice(0, 10);

    await redis.set(KEY, updated);
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}