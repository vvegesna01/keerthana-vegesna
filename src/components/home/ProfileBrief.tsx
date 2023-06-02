import React from "react";
import profileImg from "images/profile.jpg";
import Image from 'next/image';
import UnderConstruction from "@/app/constr";

export default function ProfileBrief() {
  return (
    <div className="flex flex-col items-center m-5">
      <div className="flex flex-col-reverse items-center md:flex-row">
        <div className="md:w-1/4">
          <Image
            src="/images/profile.jpg"
            width={1000}
            height={500}
            className="object-cover p-10 animate-fadeIn m-5"
            alt="Profile"
          />
        </div>
        <div className="md:w-3/4">
          <h1 className="text-localhost_text text-xl leading-10 ml-10 animate-fadeIn font-extrabold">
            SOFTWARE ENGINEER | UNDERGRADUATE TEACHING ASSISTANT | MUSICIAN
          </h1>
          <h1 className="text-localhost_text text-lg leading-10 ml-10 mt-5 animate-fadeIn">
            Hi! I'm Keerthana, a senior at Purdue University studying Computer Science. I am passionate about solving complex problems through software development and leveraging data to drive insights. I am driven by a curiosity to explore new technologies and find innovative solutions and am excited to continue my journey in computer science, constantly learning and growing.
          </h1>
        </div>
      </div>
      <UnderConstruction />
    </div>
  );
}