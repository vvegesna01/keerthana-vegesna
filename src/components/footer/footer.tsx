import Link from "next/link";
import Image from "next/image";
import FooterMetadata from "../layout/FooterMetadata";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-400">
        
        <span className="text-xl">© 2026 Keerthana Vegesna</span>
        
        <div className="flex gap-4 items-center">
          <Link
            href="https://github.com/vvegesna01"
            target="_blank"
            className="hover:opacity-80 transition"
          >
            <Image 
              src="/images/logo/icons/github-key.png" 
              alt="GitHub" 
              width={30} 
              height={30} 
            />
          </Link>

          <Link
            href="https://www.linkedin.com/in/keerthana-vegesna/"
            target="_blank"
            className="hover:opacity-80 transition"
          >
            <Image 
              src="/images/logo/icons/linkedin-key.png" 
              alt="LinkedIn" 
              width={30} 
              height={30} 
            />
          </Link>
          
          <span className="text-xl">Updated June 2026</span>
        </div>
      </div>
    </footer>
  );
}