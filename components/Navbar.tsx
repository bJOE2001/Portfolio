"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { profile } from "@/data/portfolio";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Proof", href: "#proof" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-5xl mx-auto px-5 sm:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="group flex items-center gap-1.5 focus-visible:outline-none"
          onClick={(e) => {
            if (window.location.pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
        >
          <span className="font-semibold text-foreground text-sm tracking-tight group-hover:opacity-75 transition-opacity">
            {profile.navbarLogo.start}
            <span className="text-muted">{profile.navbarLogo.accent}</span>
            {profile.navbarLogo.end}
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden sm:flex items-center gap-7">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-xs font-mono tracking-wider uppercase text-muted hover:text-foreground transition-colors"
            >
              {item.label}
            </a>
          ))}

          <div className="w-px h-3 bg-border" />

          {/* Theme Switcher */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-1.5 rounded-md text-muted hover:text-foreground transition-colors focus-visible:outline-none"
            aria-label="Toggle theme"
          >
            {mounted && theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </nav>

        {/* Mobile Hamburger */}
        <div className="flex sm:hidden items-center gap-3">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-1.5 rounded-md text-muted hover:text-foreground transition-colors"
            aria-label="Toggle theme"
          >
            {mounted && theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <button
            className="p-1.5 rounded-md text-muted hover:text-foreground transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle mobile menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="sm:hidden border-b border-border bg-background/95 backdrop-blur-lg px-6 py-4 flex flex-col gap-3"
          >
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-1.5 text-xs font-mono uppercase tracking-wider text-muted hover:text-foreground transition-colors"
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
