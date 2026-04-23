"use client";
import React from "react";
import Link from "next/link";
import { FaLinkedin, FaGithub } from "react-icons/fa";

export default function Contact() {
  return (
    <main className="bg-white">
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-10">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-indigo-900 mb-3">
            Get in touch
          </h1>
          <p className="text-gray-600 leading-7 max-w-2xl">
            I’m currently open to software engineering roles focused on backend systems,
            cloud infrastructure, and data platforms.
          </p>
        </div>

        {/* Body */}
        <div className="text-gray-600 leading-7 mb-8 max-w-xl">
          Feel free to reach out for opportunities, collaborations, or just to say hi.
        </div>

        {/* Links */}
        <div className="flex flex-col sm:flex-row gap-4 text-sm">

          <Link
            href="mailto:kvegesna01@gmail.com"
            className="px-5 py-2 bg-indigo-900 text-white rounded-md hover:bg-indigo-600 transition"
          >
            Email me
          </Link>

          <Link
            href="https://www.linkedin.com/in/keerthana-vegesna/"
            target="_blank"
            className="px-5 py-2 border border-gray-200 rounded-md text-indigo-900 hover:bg-indigo-50 transition flex items-center gap-2"
          >
            <FaLinkedin size={14} /> LinkedIn
          </Link>

          <Link
            href="https://github.com/vvegesna01"
            target="_blank"
            className="px-5 py-2 border border-gray-200 rounded-md text-indigo-900 hover:bg-indigo-50 transition flex items-center gap-2"
          >
            <FaGithub size={14} /> GitHub
          </Link>

        </div>

        {/* Footer note */}
        <p className="text-xs text-gray-400 mt-10">
          Prefer email, but I’m responsive on LinkedIn too.
        </p>

      </section>
    </main>
  );
}