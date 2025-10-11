import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Music() {
  return (

      <div id="#parks" className="flex flex-col items-center w-full mt-10 mb-20 animate-fadeIn">
        <h1 className="text-4xl leading-5 p-5 font-extrabold text-indigo-900 hover:text-purple-500 transition-colors duration-100">
          National Parks
        </h1>

        <div className="w-full md:w-4/5 lg:w-3/4 aspect-video">
          <iframe
            className="w-full h-full rounded-2xl shadow-md"
            src="https://www.mapsandlines.com/parks/index.html?parks=IndianaDunes,MammothCave,MountRainier,RockyMountain,Saguaro,Sequoia,Yosemite,CuyahogaValley,GrandCanyon"
            title="Parks Map"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>

        <p className="text-localhost_text leading-8 text-lg py-3 mt-3 text-center max-w-3xl">
          A few of the National Parks I&apos;ve been lucky to explore so far 🌲🏔️ Many more to go!
        </p>

        <motion.div
          className="relative p-2 md:p-5 m-0 md:m-5 rounded-lg overflow-hidden"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
            <Image
              src="/images/profiles/hiking-photo.jpg"
              width={500}
              height={800}
              className="mt-3 object-cover animate-fadeIn rounded-lg"
              alt="Profile"
            />
        </motion.div>
        <span className="highlight-bg">
        <p className="text-localhost_text leading-8 text-xl py-3 animate-fadeIn">
              🎉 Woah! Thank you for scrolling this far! 🎉</p></span>
       <p className="text-localhost_text leading-8 text-xl py-3 animate-fadeIn"> Connect with me{" "}
              <Link
                href="https://www.linkedin.com/in/keerthana-vegesna/"
                className="text-emvo_color font-semibold underline transition duration-300 hover:text-blue-500"
              >
                here
              </Link>!
        </p>
    </div>
  );}