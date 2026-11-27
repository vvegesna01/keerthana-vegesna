"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const links = [
    { href: "/about", label: "About" },
    { href: "/experience", label: "Work" },
    { href: "/projects", label: "Play" },
    { href: "/blog", label: "Blog"},
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-bg/80 backdrop-blur">
      <div className="max-w-4xl mx-auto px-6 py-2.5 flex justify-between items-center">
        {/* Logo and Name */}
        <Link
          href="/"
          className="flex items-center gap-2 text-base sm:text-lg font-semibold text-heading transition-colors duration-300 hover:text-accent-soft"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocus={() => setIsHovered(true)}
          onBlur={() => setIsHovered(false)}
        >
          Keerthana Vegesna
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-5 text-sm text-muted">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-heading transition"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-muted hover:text-heading transition"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden">
          <nav className="flex flex-col px-6 py-3 gap-3 text-muted text-sm">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="hover:text-heading transition"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}