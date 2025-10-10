"use client";
import React from "react";
import Image from "next/image";

interface Experience {
  duration: string;
  company: string;
  role: string;
  description: string[];
  image: string; // Path to the image
}

const Experiences: React.FC = () => {
  const experiences: Experience[] = [
    {
      duration: "SEPT 2025 - Present",
      company: "EMVO.AI",
      role: "Platform and AgentOps Architect",
      description: [],
      image: "/images/exp/emvo-logo.png",
    },
    {
      duration: "JAN 2024 - MAY 2025",
      company: "PURDUE UNIVERSITY HONORS COLLEGE",
      role: "Web Developer",
      description: [
        "Designed and implemented user-friendly layouts using HTML, CSS, and JavaScript, enhancing site aesthetics and functionality.",
        "Optimized websites for mobile and desktop platforms, ensuring responsiveness and cross-browser compatibility.",
        "Maintained and updated websites for Purdue Honors College, ensuring usability and accessibility.",
      ],
      image: "/images/exp/honors_image.jpg",
    },
    {
      duration: "JUN 2022 - AUG 2022",
      company: "CUMMINS, INC",
      role: "Software Engineering Intern",
      description: [
        "Worked on the Data Acquisition team to implement monitoring systems for existing applications.",
        "Gained experience with AWS services including CloudWatch Alarms, S3, and Lambda Functions.",
      ],
      image: "/images/exp/cummins-logo-round.jpeg",
    },
    {
      duration: "AUG 2021 - JAN 2022",
      company: "THE DATA MINE - MERCK",
      role: "Undergraduate Data Science Researcher",
      description: [
        "Collaborated with Merck to create a web-based inventory tracking system using QR codes to optimize drug development.",
        "Worked on the backend team to set up a common database using AWS S3 and Databricks to analyze the data.",
        "Helped develop the solution architecture for the implementation.",
      ],
      image: "/images/exp/Merck.png",
    },
    {
      duration: "AUG 2021 - JAN 2022",
      company: "THE DATA MINE",
      role: "Undergraduate Teaching Assistant",
      description: [
        "Assisted over 600 students in The Data Mine during office hours.",
        "Helped students with assignments on Bash, SQL, Unix, R, Python, and SQL.",
      ],
      image: "/images/exp/dm_dr_photo.jpeg",
    },
    {
      duration: "MAY 2021 - AUG 2021",
      company: "PURDUE UNIVERSITY COMPUTER SCIENCE DEPARTMENT",
      role: "Undergraduate Teaching Assistant | CS Bridge Program",
      description: [
        "Mentored and guided 45+ incoming computer science students, facilitating their understanding of object-oriented programming and Java.",
        "Conducted labs, office hours, and workshops resulting in improved learning outcomes.",
      ],
      image: "/images/exp/lawson_loop.jpg",
    },
    // Add more experiences as needed
  ];

  return (
    <div className="space-y-6 p-5">
      <h1 className="text-4xl font-extrabold text-indigo-900 hover:text-purple-500 transition-colors duration-300 mb-8">
        Experience
      </h1>

      {experiences.map((experience, index) => (
        <div
          key={index}
          className="p-6 bg-white border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <div className="flex flex-col items-center sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative w-full max-w-xs sm:max-w-sm h-64 sm:h-40 overflow-hidden rounded-md shadow-md">
              <Image
                src={experience.image}
                alt={`${experience.company} logo`}
                fill
                className="object-cover"
              />
            </div>

            <div className="text-center sm:text-left">
              <div className="text-lg font-semibold text-gray-700">
                {experience.duration}
              </div>
              <div className="text-xl font-bold text-indigo-900">
                {experience.company}
              </div>
              <div className="text-lg font-semibold text-gray-700">
                <i>{experience.role}</i>
              </div>
              <ul className="text-gray-700 text-lg mt-2 list-disc list-inside space-y-1">
                {experience.description.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Experiences;
