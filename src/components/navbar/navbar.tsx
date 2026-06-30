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
    { href: "/projects", label: "Projects" },
    { href: "/experience", label: "Experience" },
    { href: "/blog", label: "Blog"},
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="w-full border-b border-gray-100 bg-white">
      <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo and Name */}
        <Link
          href="/"
          className="flex items-center gap-2.5 text-lg sm:text-2xl font-semibold text-indigo-900 transition-colors duration-300 hover:text-purple-500"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocus={() => setIsHovered(true)}
          onBlur={() => setIsHovered(false)}
        >
          <div className="w-12 h-12 rounded-full overflow-hidden  shrink-0 relative">
            <Image
              src={isHovered ? "/images/logo/hover1.png" : "/images/logo/standard.png"}
              alt="Keerthana Vegesna"
              width={32}
              height={32}
              className="object-cover w-full h-full transition-opacity duration-300"
            />
          </div>
          Keerthana Vegesna
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 text-xl text-gray-500">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-indigo-900 transition"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-600 hover:text-indigo-900 transition"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-gray-100">
          <nav className="flex flex-col px-6 py-4 gap-4 text-gray-600 text-base">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="hover:text-indigo-900 transition"
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