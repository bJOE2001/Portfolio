"use client";

import { motion } from "framer-motion";
import { capabilities } from "@/data/portfolio";

export default function TechStack() {
  return (
    <section id="capabilities" className="py-16 sm:py-24 border-b border-border">
      {/* Section Header */}
      <div className="space-y-3 mb-12 sm:mb-16">
        <p className="text-xs font-mono uppercase tracking-[0.25em] text-muted">
          03 / CAPABILITIES
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Tools I use to build.
        </h2>
        <p className="text-sm sm:text-base text-muted max-w-2xl leading-relaxed">
          Technologies, frameworks, and developer workflows I leverage to ship reliable digital solutions.
        </p>
      </div>

      {/* Editorial 4-Column Domain Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
        {Object.entries(capabilities).map(([category, items], colIndex) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, delay: colIndex * 0.08 }}
            className="space-y-4"
          >
            <div className="border-b border-border pb-2.5">
              <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-muted">
                {category}
              </h3>
            </div>

            <ul className="space-y-2 font-mono text-xs sm:text-sm">
              {items.map((skill) => (
                <li
                  key={skill}
                  className="text-foreground hover:text-muted transition-colors cursor-default flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-border group-hover:bg-foreground transition-colors" />
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
