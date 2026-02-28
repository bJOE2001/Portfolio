"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

import { profile } from "@/data/portfolio";

const navLinks = [
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: `mailto:${profile.email}` },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <header className="bg-[var(--sidebar-bg)] border-b border-[var(--border)] sticky top-0 z-40 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-12 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-bold text-[var(--text)] text-sm tracking-tight">
            {profile.navbarLogo.start}
            <span className="text-[var(--accent-text)]">{profile.navbarLogo.accent}</span>
            {profile.navbarLogo.end}
          </span>
        </Link>

        {/* Desktop */}
        <nav className="hidden sm:flex items-center gap-1">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="px-3 py-1.5 rounded-md text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-gray-50 dark:hover:bg-neutral-800 transition-all"
            >
              {l.label}
            </a>
          ))}
          <div className="w-px h-4 bg-gray-200 dark:bg-neutral-800 mx-2" />
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-1.5 rounded-md text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-gray-50 dark:hover:bg-neutral-800 transition-all"
          >
            {mounted && theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>
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
        <div className="sm:hidden bg-[var(--sidebar-bg)] border-t border-[var(--border)] px-6 py-3 flex flex-col gap-1 transition-colors duration-300">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-2 px-3 rounded-md text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors"
            >
              {l.label}
            </a>
          ))}

          {/* Mobile theme toggle */}
          <div className="mt-3 pt-3 border-t border-[var(--border)] flex items-center justify-between">
            <span className="text-xs font-medium text-[var(--text-muted)]">Appearance</span>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex items-center gap-2 py-1.5 px-3 rounded-md text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors"
            >
              {mounted && theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
              <span>{mounted && theme === "dark" ? "Light mode" : "Dark mode"}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
