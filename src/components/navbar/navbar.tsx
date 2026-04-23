"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/experience", label: "Experience" },
    { href: "/bookshelf", label: "Books" },
    { href: "/blog", label: "Notes" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="w-full border-b border-gray-100 bg-white">
      <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link
          href="/"
          className="text-lg sm:text-2xl font-semibold text-indigo-900"
        >
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