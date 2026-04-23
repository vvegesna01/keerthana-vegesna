"use client";
import React from "react";
// import profile_img from "/public/images/profile.jpg";
import Link from "next/link";
import Image from "next/image";
import Music from "@/components/about/music";
import Photography from "@/components/about/photography";
import Parks from "@/components/about/parks";
import Secret from "@/components/about/secret";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function AboutMe() {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-10 bg-white">
      <div className="flex flex-col items-center md:flex-row">
        <motion.div
          className="relative p-2 md:p-5 m-0 md:m-5 rounded-lg overflow-hidden"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src="/images/profiles/grad_2023.jpg"
            width={1500}
            height={1000}
            className="object-cover animate-fadeIn rounded-lg"
            alt="Profile"
          />
          {/* Scroll Down Indicator */}
          <div className="flex justify-center mt-10">
            <motion.div
              className="flex flex-col items-center cursor-pointer select-none"
              initial={{ opacity: 0, y: -10 }}
              animate={{
                opacity: [0, 1, 0.8, 1],
                y: [0, 10, 0],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              onClick={() => {
                window.scrollTo({
                  top: window.innerHeight,
                  behavior: "smooth",
                });
              }}
            >
              <span className="text-sm text-gray-500 mb-2">Scroll down</span>
              <ChevronDown className="w-6 h-6 text-gray-500" />
            </motion.div>
          </div>
        </motion.div>

        <div>
          <h1 className="text-4xl leading-5 p-5 animate-fadeIn font-extrabold text-indigo-900 hover:text-purple-500 transition-colors duration-100">
            About Me
          </h1>

          <div className="flex flex-col p-1">
            <p className="text-localhost_text leading-8 text-xl py-3 animate-fadeIn">
              Hi there! I&apos;m Keerthana. I got my Bachelor&apos;s Degree at{" "}
              <Link
                href="https://www.purdue.edu/"
                className="text-purdue_color font-semibold underline transition duration-300 hover:text-blue-500"
              >
                Purdue University
              </Link>{" "}
              studying Computer Science.
            </p>
            <p className="text-localhost_text leading-8 text-xl py-3 animate-fadeIn">
              I&apos;m currently a Platform Engineer at{" "}
              <Link
                href="https://www.emvo.ai/"
                className="text-emvo_color font-semibold underline transition duration-300 hover:text-blue-500"
              >
                Emvo.ai
              </Link>
              .
            </p>
            <p className="text-localhost_text leading-8 text-xl py-3 animate-fadeIn">
              I&apos;ve been a Web Developer for the{" "}
              <Link
                href="https://honors.purdue.edu/"
                className="text-purdue_color font-semibold underline transition duration-300 hover:text-blue-500"
              >
                Purdue University Honors College
              </Link>
              , a Software Engineering Intern at{" "}
              <Link
                href="https://www.cummins.com/"
                className="text-cummins_color font-semibold underline transition duration-300 hover:text-blue-500"
              >
                Cummins, Inc
              </Link>
              , and also an Undergraduate Teaching Assistant for{" "}
              <Link
                href="https://datamine.purdue.edu/"
                className="text-links_color font-semibold underline transition duration-300 hover:text-blue-500"
              >
                The Data Mine
              </Link>{" "}
              and for the{" "}
              <Link
                href="https://www.cs.purdue.edu/undergraduate/bridge/"
                className="text-purdue_color font-semibold underline transition duration-300 hover:text-blue-500"
              >
                CS Bridge Program
              </Link>
              .
            </p>
            <p className="text-localhost_text leading-8 text-xl py-3 animate-fadeIn">
              I&apos;m involved in communities that empower women in engineering
              like{" "}
              <Link
                href="https://www.cs.purdue.edu/diversity/womens-history/girls-who-code.html"
                className="text-gwc_color font-semibold underline transition duration-300 hover:text-blue-500"
              >
                Girls Who Code
              </Link>
              {", "}
              <Link
                href="https://rewritingthecode.org/"
                className="text-rtc_color font-semibold underline transition duration-300 hover:text-blue-500"
              >
                Rewriting the Code
              </Link>
              {","} and the{" "}
              <Link
                href="https://swe.org/"
                className="text-links_color font-semibold underline transition duration-300 hover:text-blue-500"
              >
                Society of Women Engineers
              </Link>
              {"."}
            </p>
            <p className="text-localhost_text leading-8 text-xl py-3 animate-fadeIn">
              I grew up in Bangalore, India and enjoy playing guitar,{" "}
              <Link
                href="/bookshelf"
                className="animate-fadeIn font-extrabold text-indigo-900 hover:text-purple-500 transition-colors duration-100"
              >
                reading
              </Link>
              , photography, and exploring National Parks!
            </p>
          </div>
        </div>
      </div>

      <Music></Music>
      <Photography></Photography>
      <Parks></Parks>
    </main>
  );
}
