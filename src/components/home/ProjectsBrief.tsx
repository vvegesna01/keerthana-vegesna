"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Where Does Your Data Go?",
    image: "/images/projects/datago.png",
    link: "/projects",
  },
  {
    title: "Investogram",
    image: "/images/projects/investogram_profile.png",
    link: "/projects",
  },
  {
    title: "Shelf This",
    image: "/images/projects/shelf_this.png",
    link: "/projects",
  },
  {
    title: "Eras Tour Tracker",
    image: "/images/projects/eras_tour.png",
    link: "/projects",
  },
];

export default function ProjectsBrief() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-10">

      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-extrabold text-indigo-900 mb-2">
          Projects
        </h2>
        <p className="text-gray-500 text-sm">
          Things I’ve built for fun, curiosity, and exploration.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {projects.map((project, i) => (
          <motion.a
            key={i}
            href={project.link}
            whileHover={{ scale: 1.04 }}
            className="group"
          >
            <div className="relative w-full aspect-[4/3] bg-indigo-50 rounded-lg overflow-hidden shadow-sm">
              
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Hover overlay (like bookshelf) */}
              <div className="absolute inset-0 bg-indigo-900/0 group-hover:bg-indigo-900/70 transition-all duration-300 flex items-end p-2">
                <p className="text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition">
                  {project.title}
                </p>
              </div>
            </div>

            <p className="mt-2 text-xs text-indigo-900 font-medium line-clamp-2">
              {project.title}
            </p>
          </motion.a>
        ))}
      </div>
    </section>
  );
}