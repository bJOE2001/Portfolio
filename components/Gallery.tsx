"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { gallery } from "@/data/portfolio";

export default function Gallery() {
  const galleryItems = gallery;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  function getScrollStep(node: HTMLDivElement) {
    const firstCard = node.querySelector<HTMLElement>("[data-gallery-card='true']");
    const gapValue = window.getComputedStyle(node).gap || "0";
    const gap = Number.parseFloat(gapValue) || 0;

    return firstCard ? firstCard.offsetWidth + gap : node.clientWidth * 0.85;
  }

  function updateScrollState() {
    const node = scrollRef.current;

    if (!node) {
      return;
    }

    const maxScrollLeft = node.scrollWidth - node.clientWidth;
    const step = getScrollStep(node);

    setCanScrollLeft(node.scrollLeft > 4);
    setCanScrollRight(node.scrollLeft < maxScrollLeft - 4);
    setActiveIndex(
      Math.max(0, Math.min(galleryItems.length - 1, Math.round(node.scrollLeft / step)))
    );
  }

  function scrollToIndex(index: number) {
    const node = scrollRef.current;

    if (!node) {
      return;
    }

    const targetIndex = Math.max(0, Math.min(galleryItems.length - 1, index));
    const scrollAmount = getScrollStep(node);

    node.scrollTo({
      left: targetIndex * scrollAmount,
      behavior: "smooth",
    });
  }

  function openLightbox(index: number) {
    setLightboxIndex(index);
  }

  function closeLightbox() {
    setLightboxIndex(null);
  }

  function showPreviousLightboxImage() {
    setLightboxIndex((current) => {
      if (current === null) {
        return current;
      }

      return Math.max(0, current - 1);
    });
  }

  function showNextLightboxImage() {
    setLightboxIndex((current) => {
      if (current === null) {
        return current;
      }

      return Math.min(galleryItems.length - 1, current + 1);
    });
  }

  const canShowPreviousLightboxImage = lightboxIndex !== null && lightboxIndex > 0;
  const canShowNextLightboxImage =
    lightboxIndex !== null && lightboxIndex < galleryItems.length - 1;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const node = scrollRef.current;

    if (!node) {
      return;
    }

    updateScrollState();

    const handleResize = () => updateScrollState();
    const handleScroll = () => updateScrollState();

    node.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      node.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeLightbox();
      }

      if (event.key === "ArrowLeft" && canShowPreviousLightboxImage) {
        showPreviousLightboxImage();
      }

      if (event.key === "ArrowRight" && canShowNextLightboxImage) {
        showNextLightboxImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIndex, canShowPreviousLightboxImage, canShowNextLightboxImage]);

  return (
    <>
      <motion.section
        className="card p-5"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="mb-4 flex items-center justify-between">
          <p className="section-label mb-0">Gallery</p>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[var(--text-light)]">
              {activeIndex + 1} / {galleryItems.length}
            </span>

            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label="Previous gallery image"
                onClick={() => scrollToIndex(activeIndex - 1)}
                disabled={!canScrollLeft}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--card)] text-[var(--text)] transition-colors hover:bg-[var(--accent-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border)] disabled:cursor-not-allowed disabled:opacity-35"
              >
                <ChevronLeft size={15} />
              </button>

              <button
                type="button"
                aria-label="Next gallery image"
                onClick={() => scrollToIndex(activeIndex + 1)}
                disabled={!canScrollRight}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--card)] text-[var(--text)] transition-colors hover:bg-[var(--accent-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border)] disabled:cursor-not-allowed disabled:opacity-35"
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </div>

        <div className="relative">
          <div
            ref={scrollRef}
            className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 no-scrollbar scroll-smooth"
          >
            {galleryItems.map((item, i) => (
              <button
                key={`${item.image}-${i}`}
                type="button"
                data-gallery-card="true"
                onClick={() => openLightbox(i)}
                aria-label={`Open gallery image ${i + 1}`}
                className="group snap-start relative w-[132px] shrink-0 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--accent-light)] shadow-[0_1px_3px_rgba(15,23,42,0.04)] transition-shadow duration-200 ease-out hover:shadow-[0_8px_20px_rgba(15,23,42,0.08)] sm:w-[144px] md:w-[calc((100%-2.25rem)/4)] md:min-w-[calc((100%-2.25rem)/4)]"
              >
                <div className="relative h-[112px] overflow-hidden bg-[var(--card)] sm:h-[122px] lg:h-[132px]">
                  <Image
                    src={item.image}
                    alt={`Gallery image ${i + 1}`}
                    fill
                    sizes="(max-width: 640px) 132px, (max-width: 768px) 144px, 25vw"
                    className="object-cover transition-[transform,filter] duration-500 ease-out group-hover:scale-[1.04] group-hover:brightness-[1.03] group-hover:saturate-110"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/[0.03]" />
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5">
            {galleryItems.map((item, index) => (
              <button
                key={`${item.image}-${index}`}
                type="button"
                aria-label={`Go to gallery image ${index + 1}`}
                onClick={() => scrollToIndex(index)}
                className={`h-1.5 rounded-full transition-all ${
                  index === activeIndex
                    ? "w-5 bg-[var(--text)]"
                    : "w-1.5 bg-[var(--border)] hover:bg-[var(--text-light)]"
                }`}
              />
            ))}
          </div>

          <p className="text-[10px] text-[var(--text-light)]">
            Click an image to open the gallery
          </p>
        </div>
      </motion.section>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {lightboxIndex !== null && (
              <>
                <motion.div
                  key="gallery-backdrop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 z-[9998] bg-black/85 backdrop-blur-sm"
                  onClick={closeLightbox}
                />

                <motion.div
                  key="gallery-lightbox"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="fixed inset-0 z-[9999] p-4"
                >
                  <div className="relative flex h-full w-full items-center justify-center">
                    <div className="absolute left-0 top-0 rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white">
                      {lightboxIndex + 1} / {galleryItems.length}
                    </div>

                    <button
                      type="button"
                      aria-label="Close gallery"
                      onClick={closeLightbox}
                      className="absolute right-0 top-0 flex h-10 w-10 items-center justify-center rounded-md bg-white/10 text-white transition-colors hover:bg-white/20"
                    >
                      <X size={20} />
                    </button>

                    <button
                      type="button"
                      aria-label="Previous image"
                      onClick={showPreviousLightboxImage}
                      disabled={!canShowPreviousLightboxImage}
                      className="absolute left-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-md bg-white/10 text-white transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <ChevronLeft size={24} />
                    </button>

                    <div
                      className="relative h-full max-h-[82vh] w-full max-w-4xl"
                      onClick={(event) => event.stopPropagation()}
                    >
                      <Image
                        src={galleryItems[lightboxIndex].image}
                        alt={`Gallery image ${lightboxIndex + 1}`}
                        fill
                        sizes="90vw"
                        priority
                        className="object-contain"
                      />
                    </div>

                    <button
                      type="button"
                      aria-label="Next image"
                      onClick={showNextLightboxImage}
                      disabled={!canShowNextLightboxImage}
                      className="absolute right-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-md bg-white/10 text-white transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <ChevronRight size={24} />
                    </button>

                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-md bg-white/10 px-3 py-2 text-xs text-white/85">
                      Use arrow keys to navigate • ESC to close
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
