"use client";

import { motion } from "framer-motion";
import {
  MapPin, BadgeCheck, Mail, Phone, BookOpen,
  Linkedin, Github, Instagram, Trophy, Facebook
} from "lucide-react";
import { profile, techStack, social } from "@/data/portfolio";

const categoryColors: Record<string, string> = {
  Frontend: "bg-[var(--accent-light)] text-[var(--text)] border-[var(--border)]",
  Backend:  "bg-[var(--accent-light)] text-[var(--text)] border-[var(--border)]",
  Tools:    "bg-[var(--accent-light)] text-[var(--text)] border-[var(--border)]",
};

const socialIcons: Record<string, React.ReactNode> = {
  LinkedIn:  <Linkedin  size={14} />,
  GitHub:    <Github    size={14} />,
  Instagram: <Instagram size={14} />,
};

export default function Sidebar() {
  return (
    <aside className="w-full flex flex-col gap-4">

      {/* ── Profile Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="card p-5 sm:p-6"
      >
        {/* Large centered avatar */}
        <div className="flex flex-col items-center text-center mb-5">
          <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center border-4 border-white shadow-md mb-3 overflow-hidden relative group/avatar cursor-pointer">
            {profile.avatarUrl ? (
              <>
                {/* Light Mode Avatar */}
                <div className="dark:hidden w-full h-full relative">
                  <img 
                    src={profile.avatarUrl} 
                    alt={profile.name} 
                    className={`w-full h-full object-cover ${profile.avatarHoverUrl ? 'group-hover/avatar:opacity-0' : ''}`}
                  />
                  {profile.avatarHoverUrl && (
                    <img 
                      src={profile.avatarHoverUrl} 
                      alt={`${profile.name} hover`} 
                      className="w-full h-full object-cover absolute inset-0 opacity-0 group-hover/avatar:opacity-100"
                    />
                  )}
                </div>
                {/* Dark Mode Avatar */}
                <div className="hidden dark:block w-full h-full relative">
                  <img 
                    src="/sleeping.png" 
                    alt={`${profile.name} sleeping`} 
                    className="w-full h-full object-cover group-hover/avatar:opacity-0"
                  />
                  <img 
                    src="/sleepinghover.png" 
                    alt={`${profile.name} dreaming`} 
                    className="w-full h-full object-cover absolute inset-0 opacity-0 group-hover/avatar:opacity-100"
                  />
                </div>
              </>
            ) : (
              <span className="text-4xl font-black text-black">
                {profile.name.charAt(0)}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5 justify-center mt-2 w-full max-w-[200px] mx-auto">
            <h1 className="font-bold text-lg text-[var(--text)] text-center leading-tight">{profile.name}</h1>
            {profile.verified && (
              <BadgeCheck 
                size={16} 
                fill="#1da1f2" 
                className="text-white shrink-0 -mt-0.5" 
              />
            )}
          </div>
          <p className="text-xs text-[var(--text-muted)] flex items-center gap-1 mt-1">
            <MapPin size={11} /> {profile.location}
          </p>
          {/* Roles */}
          <div className="flex flex-wrap gap-1 justify-center mt-2.5">
            {profile.roles.map((r) => (
              <span key={r} className="px-2.5 py-0.5 text-[11px] font-medium rounded-full bg-[var(--accent-light)] text-[var(--text)] border border-[var(--border)]">
                {r}
              </span>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-2">
          <a
            href={profile.callLink}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-[var(--text)] text-[var(--bg)] text-xs font-semibold hover:opacity-80 transition-colors"
          >
            <Phone size={13} /> Schedule a Call
          </a>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-[var(--border)] text-xs font-medium text-[var(--text-muted)] hover:bg-[var(--accent-light)] hover:text-[var(--text)] transition-colors"
            >
              <Mail size={12} /> Email
            </a>
            <a
              href={profile.facebookLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-[var(--border)] text-xs font-medium text-[var(--text-muted)] hover:bg-[var(--accent-light)] hover:text-[var(--text)] transition-colors"
            >
              <Facebook size={12} /> Facebook
            </a>
          </div>
        </div>
      </motion.div>


      {/* ── About ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.07 }}
        className="card p-5"
        id="about"
      >
        <p className="section-label">About</p>
        <div className="space-y-3">
          {profile.bio.map((paragraph, index) => (
            <p key={index} className="text-sm text-[var(--text-muted)] leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </motion.div>

      {/* ── Tech Stack ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.12 }}
        className="card p-5"
      >
        <p className="section-label">Tech Stack</p>
        <div className="space-y-3">
          {Object.entries(techStack).map(([cat, skills]) => (
            <div key={cat}>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-[var(--text-light)] mb-1.5">
                {cat}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((s) => (
                  <span
                    key={s}
                    className={`text-[11px] font-medium px-2 py-0.5 rounded-md border ${categoryColors[cat] ?? "bg-[var(--accent-light)] text-[var(--text-muted)] border-[var(--border)]"}`}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Social ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.16 }}
        className="card p-5"
      >
        <p className="section-label">Connect</p>
        <div className="space-y-2">
          {social.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2.5 text-xs text-[var(--text-muted)] hover:text-[var(--accent-text)] transition-colors group"
            >
              <span className="text-[var(--text-light)] group-hover:text-[var(--accent-text)] transition-colors">
                {socialIcons[s.label] ?? <Mail size={14} />}
              </span>
              {s.label}
            </a>
          ))}
        </div>
      </motion.div>

    </aside>
  );
}
