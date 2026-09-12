"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, X, ZoomIn, ZoomOut, Award } from "lucide-react";
import { certifications } from "@/data/portfolio";

type Certification = (typeof certifications)[number];

export default function RecentCertifications() {
  const [activeCertIndex, setActiveCertIndex] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const activeCert = activeCertIndex !== null ? certifications[activeCertIndex] : null;

  function openCertificate(index: number) {
    setActiveCertIndex(index);
    setIsZoomed(false);
  }

  function closeCertificate() {
    setActiveCertIndex(null);
    setIsZoomed(false);
  }

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (activeCertIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeCertificate();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeCertIndex]);

  return (
    <section id="proof" className="py-16 sm:py-24 border-b border-border">
      {/* Section Header */}
      <div className="space-y-3 mb-12 sm:mb-16">
        <p className="text-xs font-mono uppercase tracking-[0.25em] text-muted">
          04 / PROOF
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Recognition &amp; credentials.
        </h2>
        <p className="text-sm sm:text-base text-muted max-w-2xl leading-relaxed">
          Peer-reviewed research presentations, capstone system acceptance credentials, government engineering certifications, and technical accreditations.
        </p>
      </div>

      {/* Editorial Certification Rows */}
      <div className="divide-y divide-border">
        {certifications.map((cert, i) => (
          <motion.div
            key={cert.name}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.25, delay: i * 0.05 }}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => openCertificate(i)}
            className="group py-5 sm:py-6 grid sm:grid-cols-[90px_1fr_auto] gap-4 items-center cursor-pointer hover:bg-surface-hover/60 -mx-3 px-3 rounded-lg transition-colors"
          >
            {/* Year */}
            <span className="font-mono text-xs text-muted font-medium">
              {cert.year || cert.date.slice(-4)}
            </span>

            {/* Title & Issuer */}
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-foreground group-hover:text-foreground/80 transition-colors">
                  {cert.name}
                </h3>
                {cert.highlight && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono border border-border bg-surface text-subtle">
                    {cert.highlight}
                  </span>
                )}
              </div>
              <p className="text-xs font-mono text-muted">
                {cert.issuer} · {cert.date}
              </p>
            </div>

            {/* Action Trigger */}
            <div className="flex items-center gap-2 text-xs font-mono text-muted group-hover:text-foreground transition-colors justify-end">
              <span className="hidden sm:inline text-[11px] uppercase tracking-wider">View Proof</span>
              <ArrowUpRight
                size={14}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Full-Screen Certificate Modal / Lightbox */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {activeCert && (
              <>
                {/* Backdrop */}
                <motion.div
                  key="cert-backdrop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 z-[10001] bg-black/85 backdrop-blur-md"
                  onClick={closeCertificate}
                />

                {/* Modal Container */}
                <motion.div
                  key="cert-modal"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="fixed inset-0 z-[10002] p-4 sm:p-8 flex flex-col justify-between pointer-events-none"
                >
                  {/* Top Bar */}
                  <div className="flex items-center justify-between pointer-events-auto bg-black/40 backdrop-blur-md rounded-xl p-3 px-4 border border-white/10 text-white max-w-4xl mx-auto w-full">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-white/60">
                        {activeCert.issuer} · {activeCert.date}
                      </span>
                      <h4 className="text-xs sm:text-sm font-semibold truncate max-w-md">
                        {activeCert.name}
                      </h4>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setIsZoomed(!isZoomed)}
                        aria-label="Toggle zoom"
                        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                      >
                        {isZoomed ? <ZoomOut size={16} /> : <ZoomIn size={16} />}
                      </button>

                      {activeCert.link && activeCert.link !== "#" && (
                        <a
                          href={activeCert.link}
                          target="_blank"
                          rel="noreferrer"
                          aria-label="Open original"
                          className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}

                      <button
                        type="button"
                        onClick={closeCertificate}
                        aria-label="Close certificate modal"
                        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors ml-1"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Image Viewport */}
                  <div className="flex-1 flex items-center justify-center p-2 sm:p-6 overflow-auto pointer-events-auto">
                    <div
                      className={`relative transition-all duration-300 ${
                        isZoomed
                          ? "w-[95vw] sm:w-[85vw] h-[80vh] cursor-zoom-out"
                          : "max-w-3xl max-h-[70vh] w-full h-[60vh] cursor-zoom-in"
                      }`}
                      onClick={() => setIsZoomed(!isZoomed)}
                    >
                      <Image
                        src={activeCert.image}
                        alt={`${activeCert.name} proof`}
                        fill
                        className="object-contain drop-shadow-2xl rounded-lg"
                        priority
                      />
                    </div>
                  </div>

                  {/* Bottom Bar: Instructions */}
                  <div className="text-center pointer-events-auto text-[11px] font-mono text-white/50">
                    <span>Press Escape or click outside to close</span>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
}
