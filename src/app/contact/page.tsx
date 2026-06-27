"use client";
import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import PageContainer from "@/components/layout/PageContainer";
import PageHeader from "@/components/layout/PageHeader";
import FooterMetadata from "@/components/layout/FooterMetadata";
import Button from "@/components/ui/Button";

export default function Contact() {
  return (
    <PageContainer className="bg-gray-50/30 text-slate-900 selection:bg-indigo-100 selection:text-indigo-900" size="default">
      
      {/* Header */}
      <PageHeader
        title="Get in touch"
        subtitle="I’m currently open to software engineering roles focused on backend systems, cloud infrastructure, and data platforms."
      />

      {/* Body */}
      <div className="text-slate-600 leading-relaxed text-sm max-w-xl mb-10 font-normal">
        Feel free to reach out for formal opportunities, technical collaborations, or just to talk architecture and engineering books.
      </div>

      {/* Action Links Stack */}
      <div className="flex flex-wrap gap-3">
        
        {/* Core Primary Button */}
        <Button
          href="mailto:kvegesna01@gmail.com"
          size="md"
          variant="primary"
        >
          Email me
        </Button>

        {/* Social Secondary Actions */}
        <Button
          href="https://www.linkedin.com/in/keerthana-vegesna/"
          target="_blank"
          size="md"
          variant="secondary"
        >
          <FaLinkedin size={14} className="text-indigo-600" /> LinkedIn
        </Button>

        <Button
          href="https://github.com/vvegesna01"
          target="_blank"
          size="md"
          variant="secondary"
        >
          <FaGithub size={14} className="text-slate-700" /> GitHub
        </Button>

      </div>

      {/* Footer Metadata */}
      <FooterMetadata
        updatedText="Prefer email, but I’m responsive on LinkedIn too."
        className="border-slate-200/60 mt-20"
      >
        <span>Last Updated June 2026</span>
      </FooterMetadata>

    </PageContainer>
  );
}