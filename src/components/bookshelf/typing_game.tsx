"use client";
import { useState, useEffect, useRef, useCallback } from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface LeaderboardEntry {
  name: string;
  wpm: number;
  accuracy: number;
  date: string;
}

// ---------------------------------------------------------------------------
// Word bank
// ---------------------------------------------------------------------------
const WORD_BANK = [
  "the",
  "be",
  "to",
  "of",
  "and",
  "a",
  "in",
  "that",
  "have",
  "it",
  "for",
  "not",
  "on",
  "with",
  "he",
  "as",
  "you",
  "do",
  "at",
  "this",
  "but",
  "his",
  "by",
  "from",
  "they",
  "we",
  "say",
  "her",
  "she",
  "or",
  "an",
  "will",
  "my",
  "one",
  "all",
  "would",
  "there",
  "their",
  "what",
  "so",
  "up",
  "out",
  "if",
  "about",
  "who",
  "get",
  "which",
  "go",
  "me",
  "when",
  "make",
  "can",
  "like",
  "time",
  "no",
  "just",
  "him",
  "know",
  "take",
  "people",
  "into",
  "year",
  "your",
  "good",
  "some",
  "could",
  "them",
  "see",
  "other",
  "than",
  "then",
  "now",
  "look",
  "only",
  "come",
  "its",
  "over",
  "think",
  "also",
  "back",
  "after",
  "use",
  "two",
  "how",
  "our",
  "work",
  "first",
  "well",
  "way",
  "even",
  "new",
  "want",
  "because",
  "any",
  "these",
  "give",
  "day",
  "most",
  "us",
  "great",
  "between",
  "need",
  "large",
  "often",
  "hand",
  "high",
  "place",
  "hold",
  "point",
  "city",
  "play",
  "small",
  "number",
  "off",
  "always",
  "move",
  "learn",
  "plant",
  "cover",
  "food",
  "sun",
  "four",
  "between",
  "state",
  "keep",
  "eye",
  "never",
  "last",
  "let",
  "thought",
  "city",
  "tree",
  "cross",
  "farm",
  "hard",
  "start",
  "might",
  "story",
  "saw",
  "far",
  "sea",
  "draw",
  "left",
  "late",
  "run",
  "while",
  "press",
  "close",
  "night",
  "real",
  "life",
  "few",
  "north",
  "open",
  "seem",
  "together",
  "next",
  "white",
  "children",
  "begin",
  "got",
  "walk",
  "example",
  "ease",
  "paper",
  "group",
  "always",
  "music",
  "those",
  "both",
  "mark",
  "book",
  "letter",
  "until",
  "mile",
  "river",
  "car",
  "feet",
  "care",
  "second",
  "enough",
  "plain",
  "girl",
  "usual",
  "young",
  "ready",
  "above",
  "ever",
  "red",
  "list",
  "though",
];

function generateWords(count: number): string[] {
  const words: string[] = [];
  for (let i = 0; i < count; i++) {
    words.push(WORD_BANK[Math.floor(Math.random() * WORD_BANK.length)]);
  }
  return words;
}

// ---------------------------------------------------------------------------
// Storage helpers (shared leaderboard)
// ---------------------------------------------------------------------------

async function loadLeaderboard(): Promise<LeaderboardEntry[]> {
  try {
    const res = await fetch("/api/leaderboard");
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

async function saveLeaderboard(
  entry: LeaderboardEntry,
): Promise<LeaderboardEntry[]> {
  try {
    const res = await fetch("/api/leaderboard", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(entry),
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------
interface WordDisplayProps {
  words: string[];
  currentIndex: number;
  typedCorrect: boolean[];
  currentInput: string;
}

function WordDisplay({
  words,
  currentIndex,
  typedCorrect,
  currentInput,
}: WordDisplayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [currentIndex]);

  return (
    <div ref={containerRef} className="word-display" aria-label="Words to type">
      {words.map((word, i) => {
        let cls = "word";
        if (i < currentIndex)
          cls += typedCorrect[i] ? " correct" : " incorrect";
        if (i === currentIndex) cls += " active";
        return (
          <span
            key={i}
            ref={i === currentIndex ? activeRef : null}
            className={cls}
          >
            {i === currentIndex
              ? word.split("").map((ch, j) => {
                  let charCls = "char";
                  if (j < currentInput.length) {
                    charCls +=
                      currentInput[j] === ch ? " char-correct" : " char-wrong";
                  }
                  if (j === currentInput.length) charCls += " char-cursor";
                  return (
                    <span key={j} className={charCls}>
                      {ch}
                    </span>
                  );
                })
              : word}
          </span>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
type GameState = "idle" | "running" | "finished";

declare global {
  interface Window {
    storage: {
      get: (
        key: string,
        shared?: boolean,
      ) => Promise<{ key: string; value: string; shared: boolean } | null>;
      set: (
        key: string,
        value: string,
        shared?: boolean,
      ) => Promise<{ key: string; value: string; shared: boolean } | null>;
      delete: (
        key: string,
        shared?: boolean,
      ) => Promise<{ key: string; deleted: boolean; shared: boolean } | null>;
      list: (
        prefix?: string,
        shared?: boolean,
      ) => Promise<{ keys: string[]; prefix?: string; shared: boolean } | null>;
    };
  }
}

export default function TypingGame() {
  const GAME_DURATION = 60;
  const WORD_COUNT = 120;

  const [gameState, setGameState] = useState<GameState>("idle");
  const [words, setWords] = useState<string[]>(() => generateWords(WORD_COUNT));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentInput, setCurrentInput] = useState("");
  const [typedCorrect, setTypedCorrect] = useState<boolean[]>([]);
  const [correctWords, setCorrectWords] = useState(0);
  const [incorrectWords, setIncorrectWords] = useState(0);
  const [totalCharsTyped, setTotalCharsTyped] = useState(0);
  const [correctChars, setCorrectChars] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);

  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [showNamePrompt, setShowNamePrompt] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [lastResult, setLastResult] = useState<{
    wpm: number;
    accuracy: number;
  } | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const wpm = lastResult?.wpm ?? 0;
  const accuracy = lastResult?.accuracy ?? 0;

  // Load leaderboard on mount
  useEffect(() => {
    loadLeaderboard().then(setLeaderboard);
  }, []);

  // Timer
  useEffect(() => {
    if (gameState !== "running") return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          endGame();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current!);
  }, [gameState]);

  const endGame = useCallback(() => {
    setGameState("finished");
  }, []);

  // Compute results when game finishes
  useEffect(() => {
    if (gameState !== "finished") return;
    const finalWpm = correctWords;
    const totalTyped = totalCharsTyped;
    const finalAccuracy =
      totalTyped > 0 ? Math.round((correctChars / totalTyped) * 100) : 0;
    setLastResult({ wpm: finalWpm, accuracy: finalAccuracy });
    setShowNamePrompt(true);
  }, [gameState]);

  function startGame() {
    clearInterval(timerRef.current!);
    const newWords = generateWords(WORD_COUNT);
    setWords(newWords);
    setCurrentIndex(0);
    setCurrentInput("");
    setTypedCorrect([]);
    setCorrectWords(0);
    setIncorrectWords(0);
    setTotalCharsTyped(0);
    setCorrectChars(0);
    setTimeLeft(GAME_DURATION);
    setGameState("running");
    setShowNamePrompt(false);
    setLastResult(null);
    setTimeout(() => inputRef.current?.focus(), 50);
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    if (gameState !== "running") return;
    const val = e.target.value;

    if (val.endsWith(" ")) {
      const typed = val.trim();
      if (!typed) return;
      const isCorrect = typed === words[currentIndex];
      setTypedCorrect((prev) => [...prev, isCorrect]);
      if (isCorrect) setCorrectWords((c) => c + 1);
      else setIncorrectWords((c) => c + 1);
      setTotalCharsTyped((t) => t + typed.length);
      setCorrectChars((c) => {
        let add = 0;
        for (
          let i = 0;
          i < Math.min(typed.length, words[currentIndex].length);
          i++
        ) {
          if (typed[i] === words[currentIndex][i]) add++;
        }
        return c + add;
      });
      setCurrentIndex((i) => i + 1);
      setCurrentInput("");
    } else {
      setCurrentInput(val);
    }
  }

  async function handleSubmitName() {
    const name = playerName.trim() || "Anonymous";
    const entry: LeaderboardEntry = {
      name,
      wpm: lastResult!.wpm,
      accuracy: lastResult!.accuracy,
      date: new Date().toLocaleDateString(),
    };
    const updated = await saveLeaderboard(entry);
    if (updated.length > 0) setLeaderboard(updated);
    setShowNamePrompt(false);
    setPlayerName("");
  }
  const timerPct = (timeLeft / GAME_DURATION) * 100;
  const timerColor =
    timeLeft > 20
      ? "var(--timer-ok)"
      : timeLeft > 10
        ? "var(--timer-warn)"
        : "var(--timer-danger)";

  return (
    <>
      <style>{`
  .tg-root {
    --timer-ok: #22c55e;
    --timer-warn: #f59e0b;
    --timer-danger: #ef4444;
    font-family: 'JetBrains Mono', 'Fira Mono', 'Cascadia Code', monospace;
    max-width: 720px;
    margin: 2rem auto;
  }
  .tg-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.25rem;
    gap: 1rem;
  }
  .tg-title {
    font-size: 1.1rem;
    font-weight: 600;
    letter-spacing: -0.02em;
    color: #111111;
  }
  .tg-timer-wrap {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .tg-timer-bar-bg {
    width: 120px;
    height: 6px;
    border-radius: 3px;
    background: #e2e2e2;
    overflow: hidden;
  }
  .tg-timer-bar {
    height: 100%;
    border-radius: 3px;
    transition: width 1s linear, background-color 0.3s;
  }
  .tg-timer-num {
    font-size: 1rem;
    font-weight: 600;
    min-width: 28px;
    text-align: right;
    color: #111111;
  }
  .word-display {
    background: #f8f8f8;
    border: 0.5px solid #e2e2e2;
    border-radius: 8px;
    padding: 1.25rem 1.5rem;
    line-height: 2.2;
    font-size: 1.05rem;
    height: 130px;
    overflow: hidden;
    word-break: break-word;
    user-select: none;
    margin-bottom: 1rem;
    color: #a0a0a0;
  }
  .word { margin-right: 0.5em; display: inline-block; }
  .word.correct { color: #16a34a; }
  .word.incorrect { color: #dc2626; text-decoration: underline; text-decoration-style: wavy; }
  .word.active { color: #111111; }
  .char { position: relative; }
  .char-correct { color: #16a34a; }
  .char-wrong { color: #dc2626; }
  .char-cursor::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 2px;
    height: 1.2em;
    background: #111111;
    animation: blink 0.8s step-end infinite;
  }
  @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
  .tg-input {
    width: 100%;
    box-sizing: border-box;
    font-family: inherit;
    font-size: 1rem;
    padding: 0.6rem 1rem;
    border-radius: 6px;
    border: 0.5px solid #d4d4d4;
    background: #ffffff;
    color: #111111;
    outline: none;
    margin-bottom: 0.75rem;
  }
  .tg-input:focus { box-shadow: 0 0 0 2px #e2e2e2; }
  .tg-input:disabled { opacity: 0.4; cursor: default; }
  .tg-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-bottom: 1rem;
  }
  .tg-stat {
    background: #f8f8f8;
    border-radius: 6px;
    padding: 0.75rem 1rem;
    text-align: center;
  }
  .tg-stat-label {
    font-size: 0.7rem;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 4px;
  }
  .tg-stat-value {
    font-size: 1.4rem;
    font-weight: 600;
    color: #111111;
  }
  .tg-btn {
    display: inline-block;
    padding: 0.55rem 1.2rem;
    font-family: inherit;
    font-size: 0.875rem;
    font-weight: 500;
    border-radius: 6px;
    border: 0.5px solid #d4d4d4;
    background: #ffffff;
    color: #374151;
    cursor: pointer;
    transition: background 0.15s, transform 0.1s;
  }
  .tg-btn:hover { background: #f3f4f6; }
  .tg-btn:active { transform: scale(0.97); }
  .tg-btn-primary {
    background: #111111;
    color: #ffffff;
    border-color: transparent;
  }
  .tg-btn-primary:hover { opacity: 0.85; background: #111111; }
  .tg-idle-msg {
    text-align: center;
    color: #6b7280;
    font-size: 0.9rem;
    padding: 1.5rem 0 0.5rem;
  }
  .tg-name-prompt {
    background: #f8f8f8;
    border: 0.5px solid #e2e2e2;
    border-radius: 8px;
    padding: 1.25rem 1.5rem;
    margin-bottom: 1rem;
  }
  .tg-name-prompt h3 {
    margin: 0 0 0.75rem;
    font-size: 0.95rem;
    color: #111111;
  }
  .tg-name-row {
    display: flex;
    gap: 8px;
  }
  .tg-leaderboard {
    margin-top: 1.5rem;
  }
  .tg-lb-title {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #6b7280;
    margin-bottom: 0.5rem;
  }
  .tg-lb-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.875rem;
  }
  .tg-lb-table th {
    text-align: left;
    padding: 6px 8px;
    color: #6b7280;
    font-weight: 500;
    font-size: 0.75rem;
    border-bottom: 0.5px solid #e2e2e2;
  }
  .tg-lb-table td {
    padding: 7px 8px;
    border-bottom: 0.5px solid #e2e2e2;
    color: #111111;
  }
  .tg-lb-table tr:last-child td { border-bottom: none; }
  .tg-lb-rank {
    color: #6b7280;
    font-size: 0.75rem;
    width: 28px;
  }
  .tg-medal { font-size: 14px; }
  .tg-lb-empty {
    text-align: center;
    color: #6b7280;
    font-size: 0.85rem;
    padding: 1rem 0;
  }
  .tg-result-banner {
    background: #f8f8f8;
    border-radius: 8px;
    border: 0.5px solid #e2e2e2;
    padding: 1.25rem 1.5rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 0.75rem;
  }
  .tg-result-wpm { font-size: 2rem; font-weight: 700; color: #111111; }
  .tg-result-sub { font-size: 0.75rem; color: #6b7280; }
`}</style>
      <div className="tg-root">
        {/* Header */}
        <div className="tg-header">
          <span className="tg-title">⌨ type FAST (v2.0)</span>
          <div className="tg-timer-wrap">
            <div className="tg-timer-bar-bg">
              <div
                className="tg-timer-bar"
                style={{ width: `${timerPct}%`, background: timerColor }}
              />
            </div>
            <span className="tg-timer-num">{timeLeft}s</span>
          </div>
        </div>

        {/* Word display */}
        <WordDisplay
          words={words}
          currentIndex={currentIndex}
          typedCorrect={typedCorrect}
          currentInput={currentInput}
        />

        {/* Input */}
        <input
          ref={inputRef}
          className="tg-input"
          type="text"
          value={currentInput}
          onChange={handleInput}
          disabled={gameState !== "running"}
          placeholder={
            gameState === "idle"
              ? "Click Start to begin…"
              : gameState === "finished"
                ? "Game over!"
                : "Type here…"
          }
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
        />

        {/* Live stats */}
        {gameState === "running" && (
          <div className="tg-stats">
            <div className="tg-stat">
              <div className="tg-stat-label">wpm</div>
              <div className="tg-stat-value">{correctWords}</div>
            </div>
            <div className="tg-stat">
              <div className="tg-stat-label">correct</div>
              <div className="tg-stat-value">{correctWords}</div>
            </div>
            <div className="tg-stat">
              <div className="tg-stat-label">errors</div>
              <div className="tg-stat-value">{incorrectWords}</div>
            </div>
          </div>
        )}

        {/* Idle */}
        {gameState === "idle" && (
          <div className="tg-idle-msg">
            <p style={{ margin: "0 0 1rem" }}>
              Type each word and press{" "}
              <kbd
                style={{
                  padding: "2px 6px",
                  border: "0.5px solid var(--color-border-secondary)",
                  borderRadius: 4,
                }}
              >
                Space
              </kbd>{" "}
              to advance.
            </p>
            <button className="tg-btn tg-btn-primary" onClick={startGame}>
              Start game
            </button>
          </div>
        )}

        {/* Finished — result banner */}
        {gameState === "finished" && lastResult && !showNamePrompt && (
          <div className="tg-result-banner">
            <div>
              <div className="tg-result-wpm">{lastResult.wpm} WPM</div>
              <div className="tg-result-sub">
                {lastResult.accuracy}% accuracy
              </div>
            </div>
            <button className="tg-btn tg-btn-primary" onClick={startGame}>
              Play again
            </button>
          </div>
        )}

        {/* Name prompt */}
        {showNamePrompt && lastResult && (
          <div className="tg-name-prompt">
            <h3>You scored {lastResult.wpm} WPM — save your score?</h3>
            <div className="tg-name-row">
              <input
                className="tg-input"
                style={{ margin: 0, flex: 1 }}
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmitName()}
                placeholder="Your name…"
                maxLength={24}
                autoFocus
              />
              <button
                className="tg-btn tg-btn-primary"
                onClick={handleSubmitName}
              >
                Save
              </button>
              <button
                className="tg-btn"
                onClick={() => {
                  setShowNamePrompt(false);
                }}
              >
                Skip
              </button>
            </div>
            <div style={{ marginTop: "0.75rem" }}>
              <button className="tg-btn" onClick={startGame}>
                Play again
              </button>
            </div>
          </div>
        )}

        {/* Leaderboard */}
        <div className="tg-leaderboard">
          <div className="tg-lb-title">leaderboard — top 10</div>
          {leaderboard.length === 0 ? (
            <div className="tg-lb-empty">No scores yet — be the first!</div>
          ) : (
            <table className="tg-lb-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>name</th>
                  <th>wpm</th>
                  <th>accuracy</th>
                  <th>date</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry, i) => (
                  <tr key={i}>
                    <td className="tg-lb-rank">
                      {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : i + 1}
                    </td>
                    <td style={{ fontWeight: 500 }}>{entry.name}</td>
                    <td style={{ fontWeight: 600 }}>{entry.wpm}</td>
                    <td style={{ color: "black" }}>
                      {entry.accuracy}%
                    </td>
                    <td
                      style={{
                        color: "black",
                        fontSize: "0.8rem",
                      }}
                    >
                      {entry.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
