"use client";
import React from "react";
import Link from "next/link";
import { FaLinkedin, FaGithub } from "react-icons/fa";

export default function Contact() {
  return (
    <main className="min-h-screen bg-gray-50/30 text-slate-900 selection:bg-indigo-100 selection:text-indigo-900 pt-16 pb-24">
      <section className="max-w-4xl mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl leading-10 font-extrabold text-indigo-900 hover:text-purple-500 transition-colors duration-300 mb-3 tracking-tight">
            Get in touch
          </h1>
          <p className="text-gray-500 leading-8 text-lg max-w-2xl">
            I’m currently open to software engineering roles focused on backend systems,
            cloud infrastructure, and data platforms.
          </p>
        </div>

        {/* Body */}
        <div className="text-slate-600 leading-relaxed text-sm max-w-xl mb-10">
          Feel free to reach out for formal opportunities, technical collaborations, or just to talk architecture and engineering books.
        </div>

        {/* Action Links Stack */}
        <div className="flex flex-wrap gap-3 text-xs font-bold uppercase tracking-wider">
          
          {/* Core Primary Button */}
          <Link
            href="mailto:kvegesna01@gmail.com"
            className="px-6 py-3 bg-indigo-950 text-white rounded-full border border-indigo-950 hover:bg-transparent hover:text-indigo-950 transition-colors duration-300 shadow-sm"
          >
            Email me
          </Link>

          {/* Social Secondary Actions */}
          <Link
            href="https://www.linkedin.com/in/keerthana-vegesna/"
            target="_blank"
            className="px-5 py-3 border border-slate-200 bg-white rounded-full text-indigo-950 hover:bg-indigo-50/50 transition-colors duration-200 flex items-center gap-2 shadow-sm"
          >
            <FaLinkedin size={14} className="text-indigo-600" /> LinkedIn
          </Link>

          <Link
            href="https://github.com/vvegesna01"
            target="_blank"
            className="px-5 py-3 border border-slate-200 bg-white rounded-full text-indigo-950 hover:bg-indigo-50/50 transition-colors duration-200 flex items-center gap-2 shadow-sm"
          >
            <FaGithub size={14} className="text-slate-700" /> GitHub
          </Link>

        </div>

        {/* Footer Metadata */}
        <div className="mt-20 pt-6 border-t border-slate-200/60 flex justify-between text-[11px] font-mono text-slate-400">
          <span>Prefer email, but I’m responsive on LinkedIn too.</span>
          <span>Last Updated June 2026</span>
        </div>

      </section>
    </main>
  );
}