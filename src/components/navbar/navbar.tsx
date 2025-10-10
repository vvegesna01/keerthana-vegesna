"use client";
import Link from "next/link";
import React, { useState } from "react";
import Footer from "../footer/footer";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <main className="w-full">
      <div className="flex flex-col md:flex-row items-center justify-between min-h-auto bg-gray-200 p-5 md:p-5 w-full">
        <a href="/" className="m-0 md:m-10">
          <h1 className="text-localhost_text text-3xl md:text-5xl font-large font-extrabold mb-2 md:mb-4 transition duration-300 transform hover:-translate-y-1 hover:scale-100">
            Keerthana Vegesna
          </h1>
        </a>

        {/* Hamburger Menu for Mobile */}
        <nav className="md:hidden w-full flex justify-end pr-4">
          <button
            type="button"
            onClick={toggleMobileMenu}
            className="text-indigo-900 hover:text-transparent hover:bg-gradient-to-r hover:bg-clip-text hover:from-purple-500 hover:to-indigo-500 transition duration-300 transform hover:-translate-y-1 hover:scale-100"
          >
            ☰
          </button>
        </nav>

        {/* Links */}
        <ul
          className={`${
            isMobileMenuOpen ? "flex" : "hidden"
          } flex-col md:flex md:flex-row items-center md:items-end w-full md:w-auto text-center space-y-4 md:space-y-0 md:space-x-8 mt-4 md:mt-0 text-localhost_text`}
        >
          <li>
            <a
              href="/about"
              className="text-indigo-900 text-xl md:text-2xl hover:text-transparent hover:bg-gradient-to-r hover:bg-clip-text hover:from-purple-500 hover:to-indigo-500 transition duration-300 transform hover:-translate-y-1 hover:scale-120"
            >
              ABOUT
            </a>
          </li>
          <li>
            <a
              href="/projects"
              className="text-indigo-900 text-xl md:text-2xl hover:text-transparent hover:bg-gradient-to-r hover:bg-clip-text hover:from-purple-500 hover:to-indigo-500 transition duration-300 transform hover:-translate-y-1 hover:scale-120"
            >
              PROJECTS
            </a>
          </li>
          <li>
            <a
              href="/experience"
              className="text-indigo-900 text-xl md:text-2xl hover:text-transparent hover:bg-gradient-to-r hover:bg-clip-text hover:from-purple-500 hover:to-indigo-500 transition duration-300 transform hover:-translate-y-1 hover:scale-120"
            >
              EXPERIENCE
            </a>
          </li>
          <li>
            <a
              href="/bookshelf"
              className="text-indigo-900 text-xl md:text-2xl hover:text-transparent hover:bg-gradient-to-r hover:bg-clip-text hover:from-purple-500 hover:to-indigo-500 transition duration-300 transform hover:-translate-y-1 hover:scale-120"
            >
              BOOKSHELF
            </a>
          </li>
          <li>
            <a
              href="/contact"
              className="text-indigo-900 text-xl md:text-2xl hover:text-transparent hover:bg-gradient-to-r hover:bg-clip-text hover:from-purple-500 hover:to-indigo-500 transition duration-300 transform hover:-translate-y-1 hover:scale-120"
            >
              CONTACT
            </a>
          </li>
        </ul>
      </div>
    </main>
  );
};

export default Navbar;
