"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaLinkedin, FaGithub, FaEnvelope, FaQrcode, FaArrowLeft, FaMapMarkerAlt} from "react-icons/fa";
import { QRCodeSVG } from "qrcode.react";
import PageContainer from "@/components/layout/PageContainer";
import PageHeader from "@/components/layout/PageHeader";
import Button from "@/components/ui/Button";

export default function Contact() {
  const [showCard, setShowCard] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  // Stop the card from flipping when a user clicks a link
  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // Reusable header component for both sides of the 3D card
  const cardHeaderJSX = (
    <div className="text-center mt-1">
      <h1 className="text-4xl leading-10 font-bold text-indigo-900 hover:text-purple-500 transition-colors duration-300 mb-3 tracking-tight">
        Keerthana Vegesna
      </h1>
      {/* <h2 className="text-2xl font-black tracking-tight text-slate-800 mb-1">Keerthana Vegesna</h2> */}
      {/* <p className="text-[13px] font-medium italic text-slate-400 mb-3">(keer-thuh-nuh)</p> */}
      
      <div className="mb-2">
        <p className="text-xl text-slate-700">
          SWE <span className="text-slate-300 font-normal px-1">@</span> <span className="">Maksika Group</span>
        </p>
        <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider m-2 flex items-center justify-center gap-1">
  <FaMapMarkerAlt className="text-[#1C4E9C] text-[10px]" />
  Hyderabad, India
</p>    
      </div>
    </div>
  );

  return (
    <PageContainer className="bg-gray-50/30 text-slate-900 selection:bg-indigo-100 selection:text-indigo-900 min-h-[80vh] flex flex-col justify-center" size="default">
      
      {!showCard ? (
        /* ================= STANDARD CONTACT VIEW ================= */
        <div className="animate-fadeIn">
          <PageHeader
            title="Get in touch"
            subtitle="I'm currently open to software engineering roles focused on backend systems, cloud infrastructure, and data platforms."
          />
          
          <div className="mt-6">
            <div 
              className="relative w-48 h-48 mb-8 cursor-pointer group" 
              onClick={() => setShowCard(true)}
            >
              <Image
                src="/images/logo/standard.png"
                alt="Keerthana working at a laptop"
                fill
                className="object-contain rounded-xl transition-opacity duration-300 group-hover:opacity-0"
                unoptimized
              />
              <Image
                src="/images/logo/hover.png"
                alt="Keerthana looking up from laptop"
                fill
                className="absolute inset-0 object-contain rounded-xl transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                unoptimized
              />
            </div>

            <div className="text-slate-600 leading-relaxed text-sm max-w-xl mb-10 font-normal">
              Feel free to reach out for formal opportunities, technical collaborations, or if you ever want to talk about books!
            </div>

            <div className="flex flex-wrap gap-3">
              <Button href="mailto:kvegesna01@gmail.com" size="md" variant="primary">
                <FaEnvelope className="mr-2 inline" size={14} /> Email me
              </Button>
              <Button href="https://www.linkedin.com/in/keerthana-vegesna/" target="_blank" size="md" variant="secondary">
                <FaLinkedin size={14} className="text-indigo-600 mr-2 inline" /> LinkedIn
              </Button>
              <Button href="https://github.com/vvegesna01" target="_blank" size="md" variant="secondary">
                <FaGithub size={14} className="text-slate-700 mr-2 inline" /> GitHub
              </Button>
              
              <button 
                onClick={() => setShowCard(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors duration-200"
              >
                <FaQrcode size={18} /> Share Business Card
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* ================= 3D FLIPPABLE BUSINESS CARD VIEW ================= */
        <div className="flex flex-col items-center justify-center py-6 animate-scaleUp">
          <button 
            onClick={() => {
              setShowCard(false);
              setIsFlipped(false);
            }}
            className="mb-8 flex items-center gap-2 text-xs font-semibold tracking-wide uppercase text-slate-500 hover:text-slate-800 transition-colors"
          >
            <FaArrowLeft size={10} /> Back to standard view
          </button>

          {/* 3D Scene Container */}
          <div 
            className="relative w-80 h-[34rem] cursor-pointer"
            style={{ perspective: "1000px" }}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            {/* Flipping Wrapper */}
            <div 
              className="w-full h-full transition-transform duration-700 ease-in-out relative"
              style={{ 
                transformStyle: "preserve-3d", 
                transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" 
              }}
            >
              
              {/* === FRONT OF CARD === */}
              <div 
                className="absolute inset-0 w-full h-full bg-[#FAFAFA] rounded-2xl p-8 flex flex-col shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] border border-slate-200"
                style={{ backfaceVisibility: "hidden" }}
              >
                {cardHeaderJSX}

                {/* Character Illustration with Hover Swap */}
                <div className="flex-1 flex flex-col justify-center">
                  <div className="relative w-48 h-48 mx-auto group">
                    <Image
                      src="/images/logo/standard.png"
                      alt="Keerthana"
                      fill
                      className="object-contain transition-opacity duration-300 group-hover:opacity-0"
                      unoptimized
                    />
                    <Image
                      src="/images/logo/hover.png"
                      alt="Keerthana looking up"
                      fill
                      className="absolute inset-0 object-contain transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                      unoptimized
                    />
                  </div>
                          {/* Badges */}
        <div className="flex justify-center gap-2 mt-5">
          {/* <span className="flex items-center text-[9px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-1 rounded border border-slate-200">
            Purdue CS Alum
          </span> */}
          <span className="flex items-center text-[9px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 px-2 py-1 rounded border border-emerald-200">
            Open to Opportunities
          </span>
        </div>
                </div>

                {/* Clean Icon Links */}
                <div className="flex justify-center gap-4 z-20 mt-4 mb-2">
                  <a 
                    href="https://www.linkedin.com/in/keerthana-vegesna/" 
                    target="_blank" 
                    rel="noreferrer"
                    onClick={handleLinkClick}
                    className="bg-white border border-slate-200 text-[#1C4E9C] p-3 rounded-full hover:bg-[#1C4E9C] hover:text-white hover:border-[#1C4E9C] transition-all shadow-sm"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin size={18} />
                  </a>
                  <a 
                    href="https://github.com/vvegesna01" 
                    target="_blank" 
                    rel="noreferrer"
                    onClick={handleLinkClick}
                    className="bg-white border border-slate-200 text-[#1C4E9C] p-3 rounded-full hover:bg-[#1C4E9C] hover:text-white hover:border-[#1C4E9C] transition-all shadow-sm"
                    aria-label="GitHub"
                  >
                    <FaGithub size={18} />
                  </a>
                  <a 
                    href="mailto:kvegesna01@gmail.com" 
                    onClick={handleLinkClick}
                    className="bg-white border border-slate-200 text-[#1C4E9C] p-3 rounded-full hover:bg-[#1C4E9C] hover:text-white hover:border-[#1C4E9C] transition-all shadow-sm"
                    aria-label="Email"
                  >
                    <FaEnvelope size={18} />
                  </a>
                </div>

                <div className="text-center text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-2">
                  Tap to flip
                </div>
              </div>

              {/* === BACK OF CARD === */}
              <div 
                className="absolute inset-0 w-full h-full bg-[#FAFAFA] rounded-2xl p-8 flex flex-col shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] border border-slate-200"
                style={{ 
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)" 
                }}
              >
                {cardHeaderJSX}

                {/* QR Code Container */}
                <div className="flex-1 flex flex-col items-center justify-center">
                  <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-200 mt-2">
                    {currentUrl ? (
                      <QRCodeSVG 
                        value={currentUrl} 
                        size={190}
                        level={"H"}
                        fgColor="#1C4E9C"
                        includeMargin={false}
                        imageSettings={{
                          src: "/images/logo/hover.png", 
                          x: undefined,
                          y: undefined,
                          height: 28,
                          width: 28,
                          excavate: true,
                        }}
                      />
                    ) : (
                      <div className="w-[150px] h-[150px] bg-slate-100 animate-pulse rounded-xl" />
                    )}
                  </div>
                </div>

                <div className="text-center text-[#1C4E9C] text-[10px] font-bold uppercase tracking-widest mt-6">
                  Scan to connect
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </PageContainer>
  );
}