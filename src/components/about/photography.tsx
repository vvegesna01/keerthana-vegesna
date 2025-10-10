import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Photography() {
  return (
  <div className="flex flex-col mt-10 ">
      <h1 className="text-4xl leading-5 ml-5 animate-fadeIn font-extrabold text-indigo-900 hover:text-purple-500 transition-colors duration-100">Photography</h1>

	  <p className="text-localhost_text text-lg py-3 animate-fadeIn m-3">
         A collection of moments I’ve captured from my travels and everyday life.
      </p>
    {/* Animated Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {[
            "/images/photography/photo1.png",
            "/images/photography/photo2.png",
            "/images/photography/photo3.png",
            "/images/photography/photo8.png",
            "/images/photography/photo5.png",
            "/images/photography/photo6.png",
          ].map((src, idx) => (
            <motion.div
              key={idx}
              className="overflow-hidden  shadow-md bg-indigo-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3 }}
              
            >
              <Image
                src={src}
                alt={`Photo ${idx + 1}`}
                width={600}
                height={400}
                className="object-cover w-full h-64"
              />
            </motion.div>
          ))}
        </div>
	</div>
  )
  };