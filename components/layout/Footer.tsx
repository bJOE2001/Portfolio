"use client";

import { ArrowUp } from "lucide-react";
import { profile } from "@/data/portfolio";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border mt-32 py-12 text-sm text-muted">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <p className="font-medium text-foreground">
            &copy; {new Date().getFullYear()} {profile.name}.
          </p>
          <p className="text-xs text-subtle mt-0.5">
            Crafted with Next.js 14, TypeScript & Tailwind CSS.
          </p>
        </div>

        <div className="flex items-center gap-6 text-xs font-mono uppercase tracking-wider">
          {profile.social.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground transition-colors"
            >
              {s.label}
            </a>
          ))}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 hover:text-foreground transition-colors ml-2"
            aria-label="Back to top"
          >
            <span>Top</span>
            <ArrowUp size={13} />
          </button>
        </div>
      </div>
    </footer>
  );
}
