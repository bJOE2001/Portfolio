"use client";

import { motion } from "framer-motion";
import {
  MapPin,
  BadgeCheck,
  Mail,
  Phone,
  Linkedin,
  Github,
  Instagram,
  Facebook,
} from "lucide-react";
import { profile, social } from "@/data/portfolio";

const socialIcons: Record<string, React.ReactNode> = {
  LinkedIn: <Linkedin size={14} />,
  GitHub: <Github size={14} />,
  Instagram: <Instagram size={14} />,
};

export default function Sidebar() {
  return (
    <aside className="w-full flex flex-col gap-4">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="card p-5 sm:p-6"
      >
        <div className="mb-5 flex flex-col items-center text-center">
          <div className="group/avatar relative mb-3 h-24 w-24 cursor-pointer overflow-hidden rounded-full border-4 border-white bg-gray-100 shadow-md">
            {profile.avatarUrl ? (
              <>
                <div className="relative h-full w-full dark:hidden">
                  <img
                    src={profile.avatarUrl}
                    alt={profile.name}
                    className={`h-full w-full object-cover ${profile.avatarHoverUrl ? "group-hover/avatar:opacity-0" : ""}`}
                  />
                  {profile.avatarHoverUrl && (
                    <img
                      src={profile.avatarHoverUrl}
                      alt={`${profile.name} hover`}
                      className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover/avatar:opacity-100"
                    />
                  )}
                </div>

                <div className="relative hidden h-full w-full dark:block">
                  <img
                    src="/sleeping.png"
                    alt={`${profile.name} sleeping`}
                    className="h-full w-full object-cover group-hover/avatar:opacity-0"
                  />
                  <img
                    src="/sleepinghover.png"
                    alt={`${profile.name} dreaming`}
                    className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover/avatar:opacity-100"
                  />
                </div>
              </>
            ) : (
              <span className="text-4xl font-black text-black">
                {profile.name.charAt(0)}
              </span>
            )}
          </div>

          <div className="mx-auto mt-2 flex w-full max-w-[200px] items-center justify-center gap-1.5">
            <h1 className="text-center text-lg font-bold leading-tight text-[var(--text)]">
              {profile.name}
            </h1>
            {profile.verified && (
              <BadgeCheck
                size={16}
                fill="#1da1f2"
                className="shrink-0 -mt-0.5 text-white"
              />
            )}
          </div>

          <p className="mt-1 flex items-center gap-1 text-xs text-[var(--text-muted)]">
            <MapPin size={11} /> {profile.location}
          </p>

          <div className="mt-2.5 flex flex-wrap justify-center gap-1">
            {profile.roles.map((role) => (
              <span
                key={role}
                className="rounded-full border border-[var(--border)] bg-[var(--accent-light)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--text)]"
              >
                {role}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <a
            href={profile.callLink}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 rounded-lg bg-[var(--text)] px-3 py-2 text-xs font-semibold text-[var(--bg)] hover:opacity-80 transition-colors"
          >
            <Phone size={13} /> Schedule a Call
          </a>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center justify-center gap-1.5 rounded-lg border border-[var(--border)] px-3 py-2 text-xs font-medium text-[var(--text-muted)] hover:bg-[var(--accent-light)] hover:text-[var(--text)] transition-colors"
            >
              <Mail size={12} /> Email
            </a>
            <a
              href={profile.facebookLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-1.5 rounded-lg border border-[var(--border)] px-3 py-2 text-xs font-medium text-[var(--text-muted)] hover:bg-[var(--accent-light)] hover:text-[var(--text)] transition-colors"
            >
              <Facebook size={12} /> Facebook
            </a>
          </div>
        </div>
      </motion.div>

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
            <p key={index} className="text-sm leading-relaxed text-[var(--text-muted)]">
              {paragraph}
            </p>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.12 }}
        className="card p-5"
      >
        <p className="section-label">Connect</p>
        <div className="space-y-2">
          {social.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-2.5 text-xs text-[var(--text-muted)] transition-colors hover:text-[var(--accent-text)]"
            >
              <span className="text-[var(--text-light)] transition-colors group-hover:text-[var(--accent-text)]">
                {socialIcons[item.label] ?? <Mail size={14} />}
              </span>
              {item.label}
            </a>
          ))}
        </div>
      </motion.div>
    </aside>
  );
}
