"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, X } from "lucide-react";
import { certifications } from "@/data/portfolio";

const MAX_VISIBLE = 5;

type Certification = (typeof certifications)[number];

const issuerColors: Record<string, string> = {
  "Davao del Norte State College": "bg-[var(--accent-light)] text-[var(--text)] border-[var(--border)]",
  "Davao Oriental State University / DNSC": "bg-[var(--accent-light)] text-[var(--text)] border-[var(--border)]",
  "CICTMO, City Government of Tagum": "bg-[var(--accent-light)] text-[var(--text)] border-[var(--border)]",
  "Cisco Networking Academy": "bg-[var(--accent-light)] text-[var(--text)] border-[var(--border)]",
};

function CertRow({
  cert,
  i,
  onOpen,
}: {
  cert: Certification;
  i: number;
  onOpen: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      key={cert.name}
      initial={{ opacity: 0, x: -5 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.18, delay: i * 0.04 }}
      className="group flex w-full items-center gap-3 py-3 text-left transition-colors hover:bg-[var(--accent-light)] -mx-2 px-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border)]"
    >
      <span className="relative h-14 w-20 shrink-0 overflow-hidden rounded-md border border-[var(--border)] bg-[var(--accent-light)]">
        <Image
          src={cert.image}
          alt={`${cert.name} certificate preview`}
          fill
          sizes="80px"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
        />
      </span>

      <span className="min-w-0 flex-1">
        <span className="mb-1 flex flex-wrap items-center gap-1.5">
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
              issuerColors[cert.issuer] ??
              "bg-[var(--accent-light)] text-[var(--text-muted)] border-[var(--border)]"
            }`}
          >
            {cert.issuer}
          </span>
          <span className="text-[11px] text-[var(--text-light)]">{cert.date}</span>
        </span>
        <span className="block text-xs font-medium leading-tight text-[var(--text)]">
          {cert.name}
        </span>
      </span>

      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[var(--text-light)] transition-colors group-hover:bg-[var(--card)] group-hover:text-[var(--text)]">
        <ArrowUpRight size={14} />
      </span>
    </motion.button>
  );
}

export default function RecentCertifications() {
  const [listModalOpen, setListModalOpen] = useState(false);
  const [activeCertIndex, setActiveCertIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const visible = certifications.slice(0, MAX_VISIBLE);
  const hasMore = certifications.length > MAX_VISIBLE;
  const activeCert = activeCertIndex !== null ? certifications[activeCertIndex] : null;

  function openCertificate(index: number) {
    setActiveCertIndex(index);
  }

  function closeCertificate() {
    setActiveCertIndex(null);
  }

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!listModalOpen && activeCertIndex === null) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }

      if (activeCertIndex !== null) {
        closeCertificate();
        return;
      }

      setListModalOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [listModalOpen, activeCertIndex]);

  return (
    <>
      <motion.section
        className="card p-5"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="flex items-center justify-between mb-3">
          <p className="section-label mb-0">Certifications</p>
          {hasMore && (
            <button
              type="button"
              onClick={() => setListModalOpen(true)}
              className="flex items-center gap-1 text-[11px] font-semibold text-[var(--accent-text)] hover:underline"
            >
              View All <ArrowUpRight size={12} />
            </button>
          )}
        </div>

        <div className="divide-y divide-[var(--border)]">
          {visible.map((cert, i) => (
            <CertRow cert={cert} i={i} key={cert.name} onOpen={() => openCertificate(i)} />
          ))}
        </div>
      </motion.section>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {listModalOpen && (
              <>
                <motion.div
                  key="certifications-backdrop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999]"
                  onClick={() => setListModalOpen(false)}
                />

                <motion.div
                  key="certifications-modal"
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="fixed inset-0 z-[10000] flex items-center justify-center p-4 pointer-events-none"
                >
                  <div
                    className="w-full max-w-lg bg-[var(--card)] border border-[var(--border)] rounded-lg shadow-2xl pointer-events-auto max-h-[80vh] flex flex-col"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
                      <div>
                        <h2 className="text-sm font-bold text-[var(--text)]">All Certifications</h2>
                        <p className="text-xs text-[var(--text-muted)] mt-0.5">
                          {certifications.length} total
                        </p>
                      </div>
                      <button
                        type="button"
                        aria-label="Close certifications"
                        onClick={() => setListModalOpen(false)}
                        className="p-1.5 rounded-lg hover:bg-[var(--accent-light)] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    <div className="overflow-y-auto px-5 py-3 divide-y divide-[var(--border)]">
                      {certifications.map((cert, i) => (
                        <CertRow cert={cert} i={i} key={cert.name + i} onOpen={() => openCertificate(i)} />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </>
            )}

            {activeCert && (
              <>
                <motion.div
                  key="certificate-image-backdrop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 z-[10001] bg-black/85 backdrop-blur-sm"
                  onClick={closeCertificate}
                />

                <motion.div
                  key="certificate-image-modal"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="fixed inset-0 z-[10002] p-4 pointer-events-none"
                >
                  <div className="relative flex h-full w-full items-center justify-center">
                    <div className="absolute left-0 top-0 max-w-[calc(100%-7rem)] rounded-md bg-white/10 px-3 py-2 text-white">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-white/70">
                        {activeCert.issuer}
                      </p>
                      <p className="truncate text-sm font-semibold">{activeCert.name}</p>
                    </div>

                    <div className="absolute right-0 top-0 flex items-center gap-2 pointer-events-auto">
                      {activeCert.link !== "#" && (
                        <a
                          href={activeCert.link}
                          target="_blank"
                          rel="noreferrer"
                          aria-label="Open certificate image"
                          className="flex h-10 w-10 items-center justify-center rounded-md bg-white/10 text-white transition-colors hover:bg-white/20"
                        >
                          <ExternalLink size={18} />
                        </a>
                      )}
                      <button
                        type="button"
                        aria-label="Close certificate image"
                        onClick={closeCertificate}
                        className="flex h-10 w-10 items-center justify-center rounded-md bg-white/10 text-white transition-colors hover:bg-white/20"
                      >
                        <X size={20} />
                      </button>
                    </div>

                    <div
                      className="relative h-full max-h-[82vh] w-full max-w-5xl pointer-events-auto"
                      onClick={(event) => event.stopPropagation()}
                    >
                      <Image
                        src={activeCert.image}
                        alt={`${activeCert.name} certificate`}
                        fill
                        sizes="90vw"
                        priority
                        className="object-contain"
                      />
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
