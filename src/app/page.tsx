"use client";
import ExperiencesBrief from '@/components/home/ExpBrief';
import ProfileBrief from '@/components/home/ProfileBrief';
import ProjectsGallery from '@/components/home/ProjectsBrief';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-between p-5">
      <div>
        <ProfileBrief />
        {/* Scroll Down Indicator */}
        <div className="flex justify-center mt-1">
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
              ease: 'easeInOut',
            }}
            onClick={() => {
              window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth',
              });
            }}
          >
            <span className="text-sm text-gray-500 mb-2">Scroll Down</span>
            <ChevronDown className="w-6 h-6 text-gray-500" />
          </motion.div>
        </div>
        <ExperiencesBrief />
        <ProjectsGallery />

        {/* Text Section with Waving Hand and Arrow */}
        <div className="relative flex flex-col items-center mt-10">
          <h1 className="text-localhost_text text-xl leading-10 p-10 animate-fadeIn w-3/4 text-center">
            I&apos;m currently open to full-time software engineering roles focused on
            <span className="highlight-bg"> Backend Systems</span>{', '}
            <span className="highlight-bg"> Cloud Infrastructure</span>{', and'}
            <span className="highlight-bg"> Data Platforms</span>.
            Feel free to reach out for opportunities, collaborations, or just to {' '}
            <Link href="/contact" className="text-links_color font-semibold underline transition duration-300 hover:text-blue-500">
              connect! {" "}
            </Link>
          </h1>
        </div>
      </div>
    </main>
  );
}
