"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white border-b border-[var(--border)] sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-6 h-12 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-bold text-[var(--text)] text-sm tracking-tight">
            your<span className="text-[var(--accent-text)]">name</span>.dev
          </span>
        </Link>

        {/* Desktop */}
        <nav className="hidden sm:flex items-center gap-1">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="px-3 py-1.5 rounded-md text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-gray-50 transition-all"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Mobile */}
        <button
          className="sm:hidden p-1.5 rounded-md hover:bg-gray-100 text-[var(--text-muted)]"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={17} /> : <Menu size={17} />}
        </button>
      </div>

      {open && (
        <div className="sm:hidden bg-white border-t border-[var(--border)] px-6 py-3 flex flex-col gap-1">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-2 px-3 rounded-md text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-gray-50"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
