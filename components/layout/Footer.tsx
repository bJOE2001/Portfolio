"use client";

import { ArrowUp } from "lucide-react";
import { profile } from "@/data/portfolio";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border mt-16 py-10 text-sm text-muted">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-center sm:text-left">
          <p className="font-medium text-foreground">
            &copy; {new Date().getFullYear()} {profile.name}.
          </p>
          <p className="text-xs text-subtle mt-0.5">
            Full-Stack Developer · Philippines · Remote Worldwide
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono uppercase tracking-wider">
          <a
            href={`mailto:${profile.email}`}
            className="hover:text-foreground transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
          >
            Email
          </a>
          {profile.social.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
            >
              {s.label}
            </a>
          ))}
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1 hover:text-foreground transition-colors ml-1 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
            aria-label="Scroll back to top"
          >
            <span>Top</span>
            <ArrowUp size={13} aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
