"use client";
import React, { useState } from "react";
import Link from "next/link";
import Shelf from "./new_shelf";
import BookQuoteMatch from "./bookQuoteMatch";

export default function Bookshelf() {
  // State to track visibility of the BookQuoteMatch game
  const [isGameVisible, setGameVisible] = useState(false);

  // Handle click on Easter egg
  const handleEasterEggClick = () => {
    setGameVisible(true); // Reveal the game
  };

  return (
    <main className="flex min-h-screen flex-col justify-between p-10 bg-white">
      <div className="flex flex-col">
        <h1 className="text-4xl leading-10 animate-fadeIn font-extrabold text-indigo-900 hover:text-purple-500 transition-colors duration-100">
          Bookshelf
        </h1>
        <p className="text-localhost_text leading-8 text-lg py-3 animate-fadeIn m-3">
          These are some of my favourite reads. Here&apos;s a link to my{" "}
          <Link
            href="https://shelfthis.streamlit.app/"
            className="text-xl text-links_color underline hover:text-transparent hover:bg-gradient-to-r hover:bg-clip-text hover:from-purple-500 hover:to-indigo-500 transition transform hover:-translate-y-1 hover:scale-100"
          >
            reading website
          </Link>{" "}
          where I document all the books I read and my self-imposed reading challenges! <br></br>
          <br></br>
          P.S. There&apos;s a hidden game in this page for you to find! 🕵️‍♂️ ☕️
        </p>

        {/* Show BookQuoteMatch only when isGameVisible is true */}
        {isGameVisible && <BookQuoteMatch />}
         {/* Shelf Component - Pass Easter Egg Click Handler */}
        <Shelf onEasterEggClick={handleEasterEggClick} />

      </div>
    </main>
  );
}
