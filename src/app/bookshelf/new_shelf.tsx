"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion"; // Import motion for animation


const Shelf = ({ onEasterEggClick }: {onEasterEggClick: () => void}) => {
  const books = [
    { id: 1, title: "Martian", image: "/images/martian.png" },
    { id: 2, title: "Goodbye, Things", image: "/images/goodbye_things.png" },
    { id: 3, title: "Fun Age", image: "/images/fun_age.png" },
    { id: 4, title: "Before the Coffee Gets Cold", image: "/images/before_the_coffee.png" },
    { id: 5, title: "Seven Husbands of Evelyn Hugo", image: "/images/seven_husbands.png" },
    { id: 6, title: "Ove", image: "/images/ove.png" },
    { id: 7, title: "Red-Haired Woman", image: "/images/red_haired_woman.png" },
    { id: 8, title: "Do You Know Your Book Quotes?", image: "/images/thegame.png" },
    { id: 9, title: "Educated", image: "/images/educated.png" },
    { id: 10, title: "The Giver", image: "/images/giver.png" },
    { id: 11, title: "If We Were Villains", image: "/images/villians.jpeg" },
    { id: 12, title: "Bunny", image: "/images/bunny.jpeg" },
    { id: 13, title: "Almond", image: "/images/almond.jpeg" },
    { id: 14, title: "What We Fed to the Manticore", image: "/images/manticore.jpeg" },
    { id: 15, title: "Yellowface", image: "/images/yellowface.png" },
    { id: 16, title: "Crying in H Mart", image: "/images/hmart.jpeg" },
    { id: 17, title: "The Vanishing Half", image: "/images/vanishing_half.png" },
    { id: 18, title: "The Invisible Life of Addie LaRue", image: "/images/invisble_life.jpeg" },
    { id: 19, title: "Days at the Morisaki Bookshop", image: "/images/morisaki_bookshop.jpeg" },
    { id: 20, title: "The Guest Cat", image: "/images/guestcat.jpg" },
    { id: 21, title: "The Guest", image: "/images/guest.jpeg" },
  ];

  const [gridColumns, setGridColumns] = useState("");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width <= 640) {
        setGridColumns("1fr");
      } else if (width <= 768) {
        setGridColumns("repeat(2, 1fr)");
      } else if (width <= 1024) {
        setGridColumns("repeat(3, 1fr)");
      } else {
        setGridColumns("repeat(5, 1fr)");
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="bg-gray-100 p-4">
      <div className="grid" style={{ gridTemplateColumns: gridColumns }} gap-4>
        {books.map((book) => {
          const isEasterEggBook = book.title === "Do You Know Your Book Quotes?";

          return (
            <motion.div
              key={book.id}
              className={`relative overflow-hidden m-5 ${isEasterEggBook ? "cursor-pointer" : ""}`}
              onClick={isEasterEggBook ? onEasterEggClick : undefined}
              whileHover={{ scale: 1.05, rotateX: 5, rotateY: 5 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              style={{
                perspective: 1000, // Ensures 3D effect
              }}
            >
              <Image
                src={book.image}
                alt={book.title}
                width={180}
                height={250}
                className="w-[180vh] h-[250pvh] object-cover shadow-lg"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gray-900 text-white py-1 px-2 text-sm font-medium">
                {book.title}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Shelf;
