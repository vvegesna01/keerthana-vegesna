import React from "react";
import { FaYoutube, FaLinkedin, FaGithub } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="flex flex-col items-center justify-between p-5 bg-white">
      <div className="flex flex-col text-localhost_text p-2">
        © 2026 Keerthana Vegesna
      </div>
      <div className="flex space-x-4 text-localhost_text">
        <div className="">
          <Link href="https://www.youtube.com/channel/UC3jv-V2sKktWbd16ISmz2WQ">
            <div className="group">
              <FaYoutube
                size="35"
                className="text-lg text-localhost_text hover:text-gray-500 transition duration-300 transform hover:-translate-y-1 hover:scale-100"
              />
              <span className="sr-only">YouTube</span>
            </div>
          </Link>
        </div>
        <div className="">
          <Link href="https://www.linkedin.com/in/keerthana-vegesna/">
            <div className="group">
              <FaLinkedin
                size="35"
                className="text-lg text-localhost_text hover:text-gray-500 transition duration-300 transform hover:-translate-y-1 hover:scale-100"
              />
              <span className="sr-only">LinkedIn</span>
            </div>
          </Link>
        </div>
        <div className="">
          <Link href="https://github.com/vvegesna01">
            <div className="group">
              <FaGithub
                size="35"
                className="text-lg text-localhost_text hover:text-gray-500 transition duration-300 transform hover:-translate-y-1 hover:scale-100"
              />
              <span className="sr-only">GitHub</span>
            </div>
          </Link>
        </div>
        <div className="">
          <Link href="mailto:vvegesna@purdue.edu">
            <div className="group">
              <SiGmail
                size="35"
                className="text-lg text-localhost_text hover:text-gray-500 transition duration-300 transform hover:-translate-y-1 hover:scale-100"
              />
              <span className="sr-only">Gmail</span>
            </div>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
