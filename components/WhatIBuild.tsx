"use client";

import { motion } from "framer-motion";
import { Globe, Database, Puzzle, Cpu } from "lucide-react";

const services = [
  {
    icon: <Globe size={18} className="text-violet-600" />,
    bg: "bg-violet-50 border-violet-100",
    title: "Web Applications",
    desc: "Responsive, scalable apps built with Vue.js, Quasar, and Laravel.",
  },
  {
    icon: <Database size={18} className="text-sky-600" />,
    bg: "bg-sky-50 border-sky-100",
    title: "Backend & APIs",
    desc: "REST APIs, structured databases (PostgreSQL, MSSQL), and secure server-side logic.",
  },
  {
    icon: <Puzzle size={18} className="text-emerald-600" />,
    bg: "bg-emerald-50 border-emerald-100",
    title: "System Integrations",
    desc: "Workflow automation, third-party API integrations, and leave/HR systems.",
  },
  {
    icon: <Cpu size={18} className="text-amber-600" />,
    bg: "bg-amber-50 border-amber-100",
    title: "ML-Enhanced Features",
    desc: "Integrating machine learning into apps for smarter analytics and decision-making.",
  },
];

export default function WhatIBuild() {
  return (
    <section className="card p-5">
      <p className="section-label">What I Build</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.22, delay: i * 0.06 }}
            className={`flex items-start gap-3 p-3 rounded-xl border ${s.bg}`}
          >
            <div className={`w-8 h-8 rounded-lg border ${s.bg} flex items-center justify-center shrink-0 bg-white`}>
              {s.icon}
            </div>
            <div>
              <p className="text-xs font-bold text-[var(--text)] mb-0.5">{s.title}</p>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">{s.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
