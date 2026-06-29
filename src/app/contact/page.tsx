"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import PageContainer from "@/components/layout/PageContainer";
import PageHeader from "@/components/layout/PageHeader";
import FooterMetadata from "@/components/layout/FooterMetadata";
import Button from "@/components/ui/Button";

export default function Contact() {
  const [hovered, setHovered] = useState(false);

  return (
    <PageContainer className="bg-gray-50/30 text-slate-900 selection:bg-indigo-100 selection:text-indigo-900" size="default">

      {/* Header */}
      <PageHeader
        title="Get in touch"
        subtitle="I'm currently open to software engineering roles focused on backend systems, cloud infrastructure, and data platforms."
      />

      {/* Everything below triggers the image swap */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >

        {/* Image */}
        <div className="relative w-36 h-36 mb-8">
          <Image
            src="/images/logo/standard.png"
            alt="Keerthana working at a laptop"
            fill
            className={`object-contain rounded-xl transition-opacity duration-300 ${hovered ? "opacity-0" : "opacity-100"}`}
            unoptimized
          />
          <Image
            src="/images/logo/hover.png"
            alt="Keerthana looking up from laptop"
            fill
            className={`object-contain rounded-xl transition-opacity duration-300 ${hovered ? "opacity-100" : "opacity-0"}`}
            unoptimized
          />
        </div>

        {/* Body */}
        <div className="text-slate-600 leading-relaxed text-sm max-w-xl mb-10 font-normal">
          Feel free to reach out for formal opportunities, technical collaborations, or if you ever want to talk about books!
        </div>

        {/* Action Links Stack */}
        <div className="flex flex-wrap gap-3">
          <Button href="mailto:kvegesna01@gmail.com" size="md" variant="primary">
            Email me
          </Button>
          <Button href="https://www.linkedin.com/in/keerthana-vegesna/" target="_blank" size="md" variant="secondary">
            <FaLinkedin size={14} className="text-indigo-600" /> LinkedIn
          </Button>
          <Button href="https://github.com/vvegesna01" target="_blank" size="md" variant="secondary">
            <FaGithub size={14} className="text-slate-700" /> GitHub
          </Button>
        </div>

      </div>

    </PageContainer>
  );
}