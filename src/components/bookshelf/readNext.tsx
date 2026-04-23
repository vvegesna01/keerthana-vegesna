"use client";
import { useState } from "react";

const BOOKS = [
  { title: "Project Hail Mary", mood: "fast", length: "long" },
  { title: "The Guest Cat", mood: "calm", length: "short" },
  { title: "Open Water", mood: "emotional", length: "short" },
];

export default function BookRecommender() {
  const [step, setStep] = useState(0);
  const [mood, setMood] = useState("");
  const [length, setLength] = useState("");
  const [result, setResult] = useState<any>(null);

  const handleMood = (m: string) => {
    setMood(m);
    setStep(1);
  };

  const handleLength = (l: string) => {
    setLength(l);
    const match = BOOKS.find(b => b.mood === mood && b.length === l);
    setResult(match || BOOKS[Math.floor(Math.random() * BOOKS.length)]);
    setStep(2);
  };

  return (
    <section className="max-w-4xl mx-auto px-6 py-10">

      <h2 className="text-2xl font-extrabold text-indigo-900 mb-2">
        What should you read next? (recs from Keerthana)
      </h2>

      {step === 0 && (
        <div className="flex gap-3 flex-wrap mt-4">
          {["fast", "calm", "emotional"].map(m => (
            <button
              key={m}
              onClick={() => handleMood(m)}
              className="px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-md text-sm hover:bg-indigo-100 transition"
            >
              {m}
            </button>
          ))}
        </div>
      )}

      {step === 1 && (
        <div className="flex gap-3 flex-wrap mt-4">
          {["short", "medium", "long"].map(l => (
            <button
              key={l}
              onClick={() => handleLength(l)}
              className="px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-md text-sm hover:bg-indigo-100 transition"
            >
              {l}
            </button>
          ))}
        </div>
      )}

      {step === 2 && result && (
        <div className="mt-6 bg-indigo-50 border border-indigo-100 rounded-lg p-5">
          <p className="text-xs text-indigo-400 uppercase mb-1">
            You should read
          </p>
          <p className="text-lg font-semibold text-indigo-900">
            {result.title}
          </p>
        </div>
      )}

    </section>
  );
}