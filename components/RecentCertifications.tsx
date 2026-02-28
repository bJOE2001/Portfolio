"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { certifications } from "@/data/portfolio";

const issuerColors: Record<string, string> = {
  Huawei:   "bg-red-50 text-red-600 border-red-100",
  Google:   "bg-blue-50 text-blue-600 border-blue-100",
  TestDome: "bg-amber-50 text-amber-600 border-amber-100",
  Oracle:   "bg-orange-50 text-orange-600 border-orange-100",
};

export default function RecentCertifications() {
  return (
    <section className="card p-5">
      <div className="flex items-center justify-between mb-3">
        <p className="section-label mb-0">Certifications</p>
        <a href="#" className="flex items-center gap-1 text-[11px] font-semibold text-[var(--accent-text)] hover:underline">
          View All <ArrowUpRight size={12} />
        </a>
      </div>

      <div className="divide-y divide-[var(--border)]">
        {certifications.map((cert, i) => (
          <motion.div
            key={cert.name}
            initial={{ opacity: 0, x: -5 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2, delay: i * 0.05 }}
            className="group flex items-center gap-3 py-2.5 hover:bg-gray-50 -mx-2 px-2 rounded-lg transition-colors"
          >
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded border shrink-0 ${
                issuerColors[cert.issuer] ?? "bg-gray-100 text-gray-600 border-gray-200"
              }`}
            >
              {cert.issuer}
            </span>
            <p className="text-xs font-medium text-[var(--text)] flex-1 leading-tight">{cert.name}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
