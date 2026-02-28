"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/portfolio";

export default function About() {
  return (
    <section id="about">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="section-label"
      >
        01 — About Me
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="text-2xl font-bold text-[var(--text)] mb-6"
      >
        A developer who loves building{" "}
        <span className="gradient-text">things that matter</span>
      </motion.h2>
      <div className="space-y-4">
        {profile.bio.map((paragraph, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="text-sm text-[var(--text-muted)] leading-7"
          >
            {paragraph}
          </motion.p>
        ))}
      </div>
    </section>
  );
}
