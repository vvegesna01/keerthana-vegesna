import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ProfileImageProps {
  src: string;
  alt: string;
  cornerTag: string;
  href?: string;
  className?: string;
  priority?: boolean;
}

export default function ProfileImage({
  src,
  alt,
  cornerTag,
  href,
  className,
  priority = false,
}: ProfileImageProps) {
  const containerClasses = cn(
    "relative w-full h-80 md:h-[420px] rounded-xl overflow-hidden bg-indigo-100 rotate-[-3deg] hover:rotate-0 hover:scale-[1.02] transition-all duration-300 ease-out cursor-pointer shadow-md hover:shadow-xl",
    className
  );

  const innerContent = (
    <>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className="object-cover"
      />
      <div className="absolute bottom-3 left-3 bg-white/85 backdrop-blur-sm rounded-lg px-3 py-1 text-[11px] font-mono text-white tracking-wide z-10">
        {cornerTag}
      </div>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cn("block", containerClasses)}>
        {innerContent}
      </Link>
    );
  }

  return <div className={containerClasses}>{innerContent}</div>;
}
