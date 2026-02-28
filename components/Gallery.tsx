"use client";

import { motion } from "framer-motion";

const galleryItems = [
  { id: 1, label: "Tech Summit",   sub: "Speaker",       emoji: "🎤", color: "bg-violet-50 border-violet-100" },
  { id: 2, label: "AI Conference", sub: "Lead",          emoji: "🤖", color: "bg-sky-50 border-sky-100" },
  { id: 3, label: "Hackathon",     sub: "Champion 🏆",   emoji: "⚡", color: "bg-amber-50 border-amber-100" },
  { id: 4, label: "Dev Meetup",    sub: "Host",          emoji: "👥", color: "bg-emerald-50 border-emerald-100" },
  { id: 5, label: "Workshop",      sub: "200+ People",   emoji: "🚀", color: "bg-pink-50 border-pink-100" },
];

export default function Gallery() {
  return (
    <section className="card p-5">
      <p className="section-label">Gallery</p>
      <div className="flex gap-3 overflow-x-auto no-scrollbar">
        {galleryItems.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.22, delay: i * 0.05 }}
            whileHover={{ y: -1 }}
            className={`shrink-0 flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer hover:shadow-sm transition-all ${item.color}`}
          >
            <span className="text-xl">{item.emoji}</span>
            <div>
              <p className="text-xs font-bold text-[var(--text)] whitespace-nowrap">{item.label}</p>
              <p className="text-[10px] text-[var(--text-muted)] whitespace-nowrap">{item.sub}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
