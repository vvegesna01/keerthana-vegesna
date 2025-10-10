"use client";
import Footer from "@/components/footer/footer";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaLinkedin } from "react-icons/fa";

const Contact: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="space-y-6 p-24">
      <div className="text-localhost_text leading-8 text-lg py-3 animate-fadeIn">
        I love meeting new people and talking about all things
        <span className="highlight-bg"> software engineering</span>,
        <span className="highlight-bg"> data visualization</span>, and
        <span className="highlight-bg"> geospatial tech</span>. Feel free to
        reach out if you'd like to collaborate or just say hi!
      </div>
      <div className="flex flex-wrap gap-4 mt-8">
        <Link
          href="mailto:kvegesna01@gmail.com"
          className="bg-indigo-900 text-white rounded-full py-2 px-6 border border-indigo-900 hover:bg-transparent hover:text-indigo-900 transition duration-300"
        >
          Email Me
        </Link>
        <Link
          href="https://www.linkedin.com/in/keerthana-vegesna/"
          className="bg-[#0077B5] text-white rounded-full py-2 px-6 border border-[#0077B5] hover:bg-transparent hover:text-[#0077B5] transition duration-300"
        >
          <FaLinkedin className="inline-block mr-2" /> LinkedIn
        </Link>
        <Link
          href="https://github.com/vvegesna01"
          className="bg-black text-white rounded-full py-2 px-6 border border-black hover:bg-transparent hover:text-black transition duration-300"
        >
          GitHub
        </Link>
      </div>

      {/* If you want to put your resume back on here */}
      {/* Conditionally render PDF preview only on the client */}
      {/* {isClient && (
        <div className="pdf-preview">
          <iframe
            src="/files/website_2024.pdf#toolbar=0"
            width="100%"
            height="1000px"
            className="border"
          >
            This browser does not support PDFs. Please download the PDF to view it:{" "}
            <a href="/files/website_2024.pdf">Download PDF</a>.
          </iframe>
        </div>
      )} */}

      {/* PDF Download Link */}
      {/* <div className="pt-6">
        <a
          href="/files/website_2024.pdf"
          download
          className="text-blue-500 underline hover:text-blue-700 font-semibold"
        >
          Download PDF
        </a>
      </div> */}
    </div>
  );
};

export default Contact;
