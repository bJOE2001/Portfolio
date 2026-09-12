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
    const gap = 16;
    return firstCard ? firstCard.offsetWidth + gap : node.clientWidth * 0.8;
  }

  function updateScrollState() {
    const node = scrollRef.current;
    if (!node) return;

    const maxScrollLeft = node.scrollWidth - node.clientWidth;
    const step = getScrollStep(node);

    setCanScrollLeft(node.scrollLeft > 6);
    setCanScrollRight(node.scrollLeft < maxScrollLeft - 6);
    setActiveIndex(
      Math.max(0, Math.min(galleryItems.length - 1, Math.round(node.scrollLeft / step)))
    );
  }

  function scroll(direction: "left" | "right") {
    const node = scrollRef.current;
    if (!node) return;
    const amount = getScrollStep(node) * 1.5;
    node.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  }

  function openLightbox(index: number) {
    setLightboxIndex(index);
  }

  function closeLightbox() {
    setLightboxIndex(null);
  }

  function showPrevious() {
    setLightboxIndex((curr) => (curr !== null ? Math.max(0, curr - 1) : null));
  }

  function showNext() {
    setLightboxIndex((curr) =>
      curr !== null ? Math.min(galleryItems.length - 1, curr + 1) : null
    );
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const node = scrollRef.current;
    if (!node) return;

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
    if (lightboxIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIndex]);

  return (
    <section className="py-16 sm:py-24 border-b border-border">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
        <div className="space-y-3">
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-muted">
            06 / BEYOND THE CODE
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            A few moments.
          </h2>
          <p className="text-sm text-muted max-w-xl leading-relaxed">
            Snapshots from academic research presentations, system deployments, technical milestones, and collaborative builds.
          </p>
        </div>

        {/* Carousel Navigation Arrows */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
            className="p-2 rounded-md border border-border bg-surface text-foreground hover:bg-surface-hover transition-colors disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline-none"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            aria-label="Scroll right"
            className="p-2 rounded-md border border-border bg-surface text-foreground hover:bg-surface-hover transition-colors disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline-none"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Horizontal Strip */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-5 px-5 sm:-mx-8 sm:px-8 snap-x snap-mandatory"
      >
        {galleryItems.map((item, index) => (
          <motion.div
            key={item.image + index}
            data-gallery-card="true"
            onClick={() => openLightbox(index)}
            className="group relative shrink-0 w-72 sm:w-80 h-52 sm:h-56 rounded-xl overflow-hidden border border-border bg-surface cursor-pointer snap-start"
          >
            <Image
              src={item.image}
              alt={item.caption || `Moment ${index + 1}`}
              fill
              sizes="(max-width: 640px) 288px, 320px"
              className="object-cover grayscale contrast-105 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
              <p className="text-white text-xs font-medium leading-snug line-clamp-2">
                {item.caption || `Photo ${index + 1}`}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {lightboxIndex !== null && (
              <>
                {/* Backdrop */}
                <motion.div
                  key="lightbox-backdrop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 z-[10001] bg-black/90 backdrop-blur-md"
                  onClick={closeLightbox}
                />

                {/* Modal Viewport */}
                <motion.div
                  key="lightbox-modal"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 z-[10002] p-4 sm:p-8 flex flex-col justify-between pointer-events-none"
                >
                  {/* Top Bar */}
                  <div className="flex items-center justify-between text-white pointer-events-auto max-w-4xl mx-auto w-full">
                    <span className="text-xs font-mono text-white/60">
                      {lightboxIndex + 1} / {galleryItems.length}
                    </span>
                    <button
                      type="button"
                      onClick={closeLightbox}
                      aria-label="Close lightbox"
                      className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  {/* Main Image */}
                  <div className="flex-1 flex items-center justify-center p-2 relative pointer-events-auto">
                    {lightboxIndex > 0 && (
                      <button
                        type="button"
                        onClick={showPrevious}
                        aria-label="Previous image"
                        className="absolute left-2 sm:left-6 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                      >
                        <ChevronLeft size={20} />
                      </button>
                    )}

                    <div className="relative max-w-4xl max-h-[75vh] w-full h-[65vh]">
                      <Image
                        src={galleryItems[lightboxIndex].image}
                        alt={galleryItems[lightboxIndex].caption || "Gallery preview"}
                        fill
                        className="object-contain drop-shadow-2xl"
                        priority
                      />
                    </div>

                    {lightboxIndex < galleryItems.length - 1 && (
                      <button
                        type="button"
                        onClick={showNext}
                        aria-label="Next image"
                        className="absolute right-2 sm:right-6 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                      >
                        <ChevronRight size={20} />
                      </button>
                    )}
                  </div>

                  {/* Caption & Controls */}
                  <div className="text-center pointer-events-auto max-w-xl mx-auto">
                    {galleryItems[lightboxIndex].caption && (
                      <p className="text-white/80 text-xs sm:text-sm font-medium mb-1">
                        {galleryItems[lightboxIndex].caption}
                      </p>
                    )}
                    <span className="text-[10px] font-mono text-white/40">
                      Use Arrow keys to navigate · Esc to close
                    </span>
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
