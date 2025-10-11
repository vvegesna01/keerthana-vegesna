"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { title } from "process";

const Shelf: React.FC = () => {
  const books = [
    { title: "Martian", image: "/images/martian.png" },
    { title: "Goodbye, Things", image: "/images/goodbye_things.png" },
    { title: "Fun Age", image: "/images/fun_age.png" },
    { title: "Before the Coffee Gets Cold", image: "/images/before_the_coffee.png" },
    { title: "Seven Husbands of Evelyn Hugo", image: "/images/seven_husbands.png" },
    { title: "Ove", image: "/images/ove.png" },
    { title: "Red-Haired Woman", image: "/images/red_haired_woman.png" },
    { title: "The Vanishing Half", image: "/images/vanishing_half.png" },
    { title: "Do You Know Your Book Quotes?", image:"/images/thegame.png"},
    { title: "Educated", image: "/images/educated.png" },
    { title: "The Giver", image: "/images/giver.png" },
    { title: "If We Were Villains", image:"/images/villians.jpeg"},
    { title: "Bunny", image:"/images/bunny.jpeg"},
    { title: "Almond", image:"/images/almond.jpeg"},
    { title: "What We Fed to the Manticore", image:"/images/manticore.jpeg"},
    { title: "Yellowface", image:"/images/yellowface.png"},
    { title: "Crying in H Mart", image:"/images/hmart.jpeg"},

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
        {books.map((book, index) => (
          <div
            key={index}
            className="relative overflow-hidden transition-transform duration-300 transform hover:scale-105 m-5"
          >
            <Image src={book.image} alt={book.title} width={200} height={150} className="w-fit h-full" />
            <div className="absolute bottom-0 inset-x-0 bg-gray-900 text-white py-1 px-2 text-sm font-sm">
              {book.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shelf;
