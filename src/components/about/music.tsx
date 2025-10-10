import React from "react";
import Link from "next/link";

export default function Music() {
  return (
    <div className="flex flex-col mt-10">
      <h1 className="text-4xl leading-5 ml-5 animate-fadeIn font-extrabold text-indigo-900 hover:text-purple-500 transition-colors duration-100">Music</h1>

      <p className="text-localhost_text leading-8 text-lg py-3 animate-fadeIn m-3">
        I spend my free time songwriting, singing, and honing my guitar skills. I also upload covers and original songs on my{" "}
        <Link
          href="https://www.youtube.com/channel/UC3jv-V2sKktWbd16ISmz2WQ"
          className="text-xl text-links_color underline hover:text-transparent hover:bg-gradient-to-r hover:bg-clip-text hover:from-purple-500 hover:to-indigo-500 transition transform hover:-translate-y-1 hover:scale-100"
        >
          YouTube channel!
        </Link>
      </p>
      <div className="flex flex-col mb-10 space-y-4 md:flex-row md:space-x-4 md:space-y-0 animate-fadeIn">
        <iframe 
          className=""
          width="50%" 
          height="400" 
          src="https://www.youtube.com/embed/nIxVo8t5Cj4" 
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        ></iframe>
        <iframe 
          className=""
          width="50%" 
          height="400" 
          src="https://www.youtube.com/embed/rvKqtjU3Fuo" 
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        ></iframe>
      </div>
    </div>
  );
}
