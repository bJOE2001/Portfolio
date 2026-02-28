"use client";

import { Linkedin, Github, Instagram, Mail, Phone, BookOpen, ChevronRight } from "lucide-react";
import { social, memberships, speaking, profile } from "@/data/portfolio";

const socialIcons: Record<string, React.ReactNode> = {
  LinkedIn:  <Linkedin  size={13} />,
  GitHub:    <Github    size={13} />,
  Instagram: <Instagram size={13} />,
};

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-[var(--border)] bg-white mt-6 py-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-6">
          {/* Memberships */}
          <div>
            <p className="section-label">Member of</p>
            <ul className="space-y-1.5">
              {memberships.map((m) => (
                <li key={m}>
                  <a href="#" className="text-xs text-[var(--text-muted)] hover:text-[var(--accent-text)] flex items-start gap-1.5 group transition-colors">
                    <span className="mt-1 w-1 h-1 rounded-full bg-gray-300 shrink-0 group-hover:bg-violet-500 transition-colors" />
                    {m}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="section-label">Social</p>
            <ul className="space-y-2">
              {social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-xs text-[var(--text-muted)] hover:text-[var(--accent-text)] transition-colors"
                  >
                    {socialIcons[s.label] ?? <Mail size={13} />}
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Speaking */}
          <div>
            <p className="section-label">Speaking</p>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-2">
              {speaking.description}
            </p>
            <a href={speaking.contactLink} className="inline-flex items-center gap-1 text-xs text-[var(--accent-text)] font-medium hover:underline">
              Get in touch <ChevronRight size={11} />
            </a>
          </div>

          {/* Contact */}
          <div>
            <p className="section-label">Contact</p>
            <ul className="space-y-2">
              <li>
                <a href={`mailto:${profile.email}`} className="flex items-center gap-2 text-xs text-[var(--text-muted)] hover:text-[var(--accent-text)] transition-colors">
                  <Mail size={13} /> {profile.email}
                </a>
              </li>
              <li>
                <a href={profile.callLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs text-[var(--text-muted)] hover:text-[var(--accent-text)] transition-colors">
                  <Phone size={13} /> Schedule a Call
                </a>
              </li>
              <li>
                {/* <a href={profile.blogLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs text-[var(--text-muted)] hover:text-[var(--accent-text)] transition-colors">
                  <BookOpen size={13} /> Read my blog
                </a> */}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-5 border-t border-[var(--border)] text-center">
          <p className="text-xs text-[var(--text-light)]">
            &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
