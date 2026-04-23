import React from "react";
import Link from "next/link";

export default function Music() {
  return (
    <div className="flex flex-col mt-10">
      <h1 className="text-4xl leading-5 ml-5 animate-fadeIn font-extrabold text-indigo-900 hover:text-purple-500 transition-colors duration-100">
        Music
      </h1>

      <p className="text-localhost_text leading-8 text-lg py-3 animate-fadeIn m-3">
        I spend my free time songwriting, singing, and honing my guitar skills.
        I also upload covers and original songs on my{" "}
        <Link
          href="https://www.youtube.com/channel/UC3jv-V2sKktWbd16ISmz2WQ"
          className="text-xl text-links_color underline hover:text-transparent hover:bg-gradient-to-r hover:bg-clip-text hover:from-purple-500 hover:to-indigo-500 transition transform hover:-translate-y-1 hover:scale-100"
        >
          YouTube channel!
        </Link>
      </p>

      {/* YouTube Embeds */}
      <div className="flex flex-col mb-10 space-y-6 md:flex-row md:space-x-6 md:space-y-0 animate-fadeIn">
        <div className="w-full md:w-1/2 aspect-video">
          <iframe
            className="w-full h-full rounded-2xl shadow-md"
            src="https://www.youtube.com/embed/SrR07om-b1w?si=jcdfmaNH1qyndLxm"
            title="Lavender - Keerthana (original song)"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        </div>

        <div className="w-full md:w-1/2 aspect-video">
          <iframe
            className="w-full h-full rounded-2xl shadow-md"
            src="https://www.youtube.com/embed/rvKqtjU3Fuo"
            title="Stick Season cover - Keerthana"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        </div>
      </div>

      {/* <p className="text-localhost_text leading-8 text-lg py-3 animate-fadeIn m-3">
        I once did a year long project where I recorded and released an original
        demo <i>every single month!</i> Check it out here:
      </p> */}

      {/* A year of demos */}
      {/* <div className="flex flex-col mb-10 space-y-6 md:flex-row md:space-x-6 md:space-y-0 animate-fadeIn"> */}
        {/* YouTube Playlist */}
        {/* <div className="w-full md:w-1/2 aspect-video">
          <iframe
            className="w-full h-full rounded-2xl shadow-md"
            src="https://www.youtube.com/embed/videoseries?si=-ot4Tk3aTcrsxigt&amp;list=PLTEpv7IXVKxAFgLtNjLCQmdG95Y4Zybhu"
            title="AYOD playlist"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        </div> */}

        {/* SoundCloud */}
        {/* <div className="w-full md:w-1/2 aspect-video">
          <iframe
            className="w-full h-full rounded-2xl shadow-md"
            scrolling="no"
            allow="autoplay"
            src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/soundcloud%253Aplaylists%253A1568276002&color=%234da8e4&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
          ></iframe>
        </div>
      </div> */}

      {/* Instagram
      <p className="text-localhost_text leading-8 text-lg py-3 animate-fadeIn m-3">
        You can also find me on{" "}
        <Link
          href="https://www.instagram.com/keerthana_and_music"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl text-links_color underline hover:text-transparent hover:bg-gradient-to-r hover:bg-clip-text hover:from-pink-500 hover:to-orange-400 transition transform hover:-translate-y-1 hover:scale-100"
        >
          Instagram
        </Link>!
      </p> */}
    </div>
  );
}
