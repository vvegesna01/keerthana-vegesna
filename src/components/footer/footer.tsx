import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 mt-16">
      <div className="max-w-4xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-400">

        <span>© 2026 Keerthana Vegesna</span>

        <div className="flex gap-4 items-center">
          <Link
            href="https://github.com/vvegesna01"
            target="_blank"
            className="hover:text-indigo-900 transition"
          >
            <FaGithub size={14} />
          </Link>

          <Link
            href="https://www.linkedin.com/in/keerthana-vegesna/"
            target="_blank"
            className="hover:text-indigo-900 transition"
          >
            <FaLinkedin size={14} />
          </Link>
        </div>

      </div>
    </footer>
  );
}