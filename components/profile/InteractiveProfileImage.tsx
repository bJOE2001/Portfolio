"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { MapPin } from "lucide-react";
import { useTheme } from "next-themes";
import { profile } from "@/data/portfolio";

interface InteractiveProfileImageProps {
  className?: string;
  showLocation?: boolean;
  location?: string;
  lightSrc?: string;
  lightHoverSrc?: string;
  darkSrc?: string;
  darkHoverSrc?: string;
  lightLabel?: string;
  darkLabel?: string;
  lightMessage?: string;
  darkMessage?: string;
}

export default function InteractiveProfileImage({
  className = "",
  showLocation = true,
  location = profile.location || "Carmen, Davao del Norte",
  lightSrc = profile.avatarUrl || "/profile.jpg",
  lightHoverSrc = profile.avatarHoverUrl || "/thumbsup.png",
  darkSrc = profile.darkAvatarUrl || "/sleeping.png",
  darkHoverSrc = profile.darkAvatarHoverUrl || "/sleepinghover.png",
  lightLabel = "WORK MODE",
  darkLabel = "DREAM MODE",
  lightMessage = "building things that matter",
  darkMessage = "probably debugging in my sleep",
}: InteractiveProfileImageProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isTapped, setIsTapped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Subtle tilt & translation physics (strictly bounded to ±1.5deg and ±1.5px)
  const mouseXRot = useMotionValue(0);
  const mouseYRot = useMotionValue(0);
  const mouseXTrans = useMotionValue(0);
  const mouseYTrans = useMotionValue(0);

  // Calibrated spring physics: organic, tactile, restrained
  const springConfig = { damping: 30, stiffness: 240, mass: 0.6 };
  const rotateX = useSpring(mouseYRot, springConfig);
  const rotateY = useSpring(mouseXRot, springConfig);
  const translateX = useSpring(mouseXTrans, springConfig);
  const translateY = useSpring(mouseYTrans, springConfig);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const normX = (e.clientX - centerX) / (rect.width / 2);
    const normY = (e.clientY - centerY) / (rect.height / 2);

    // Bounded tilt: max ±1.5 degrees
    mouseXRot.set(normX * 1.5);
    mouseYRot.set(-normY * 1.5);

    // Subtle parallax translation: max ±1.5px
    mouseXTrans.set(normX * 1.5);
    mouseYTrans.set(normY * 1.5);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseXRot.set(0);
    mouseYRot.set(0);
    mouseXTrans.set(0);
    mouseYTrans.set(0);
  };

  const handleTapToggle = () => {
    setIsTapped((prev) => !prev);
  };

  const isInteractiveActive = isHovered || isTapped;
  const currentLabel = isDark ? darkLabel : lightLabel;
  const currentMessage = isDark ? darkMessage : lightMessage;

  return (
    <div className={`flex flex-col items-center lg:items-end ${className}`}>
      {/* ── Location Text Directly Above Image ── */}
      {showLocation && (
        <div className="mb-2.5 flex items-center gap-1.5 text-xs font-mono text-muted">
          <MapPin size={11} className="text-subtle shrink-0" />
          <span>{location}</span>
        </div>
      )}

      {/* ── Portrait Frame (3D Tactile Perspective) ── */}
      <div style={{ perspective: 1000 }} className="relative select-none">
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleTapToggle}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleTapToggle();
            }
          }}
          tabIndex={0}
          role="button"
          aria-label={`Profile portrait of ${profile.name}. Currently in ${currentLabel}: ${currentMessage}.`}
          style={{
            rotateX: prefersReducedMotion ? 0 : rotateX,
            rotateY: prefersReducedMotion ? 0 : rotateY,
            x: prefersReducedMotion ? 0 : translateX,
            y: prefersReducedMotion ? 0 : translateY,
            transformStyle: "preserve-3d",
          }}
          whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
          whileTap={prefersReducedMotion ? {} : { scale: 0.99 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="group relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border border-border bg-surface shadow-sm hover:shadow-md hover:border-foreground/20 dark:hover:border-white/20 transition-all duration-350 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
        >
          {/* ── Image Layers: Smooth 350ms Crossfade ── */}
          <div className="relative h-full w-full pointer-events-none">
            {/* Light Mode Layer */}
            <div
              className={`absolute inset-0 transition-opacity duration-350 ease-out ${
                !isDark ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <img
                src={lightSrc}
                alt={`${profile.name} — Professional Portrait`}
                className={`h-full w-full object-cover transition-opacity duration-300 ${
                  isInteractiveActive ? "opacity-0" : "opacity-100"
                }`}
              />
              <img
                src={lightHoverSrc}
                alt={`${profile.name} — Thumbs Up Pose`}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                  isInteractiveActive ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>

            {/* Dark Mode Layer */}
            <div
              className={`absolute inset-0 transition-opacity duration-350 ease-out ${
                isDark ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <img
                src={darkSrc}
                alt={`${profile.name} — Dream Mode Resting`}
                className={`h-full w-full object-cover transition-opacity duration-300 ${
                  isInteractiveActive ? "opacity-0" : "opacity-100"
                }`}
              />
              <img
                src={darkHoverSrc}
                alt={`${profile.name} — Dream Mode Gesture`}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                  isInteractiveActive ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>
          </div>

          {/* ── Subtle Inner Bevel / Ring ── */}
          <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5 dark:ring-white/10 pointer-events-none" />

          {/* ── Natural Bottom Gradient (Only 26% height, never covers face or gesture) ── */}
          <motion.div
            initial={false}
            animate={{
              opacity: isInteractiveActive ? 1 : 0,
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute inset-x-0 bottom-0 h-[28%] bg-gradient-to-t from-black/55 via-black/20 to-transparent pointer-events-none"
          />

          {/* ── Refined In-Image Typography (Positioned ~14-18px from bottom) ── */}
          <motion.div
            initial={false}
            animate={{
              opacity: isInteractiveActive ? 1 : 0,
              y: isInteractiveActive ? 0 : 6,
            }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="hidden sm:flex absolute bottom-3.5 left-4 right-4 pointer-events-none flex-col justify-end text-left"
          >
            <span className="text-[10px] font-mono font-semibold uppercase tracking-[0.16em] text-white/90 drop-shadow-xs mb-0.5">
              {currentLabel}
            </span>
            <p className="text-[11px] font-sans text-white/80 font-normal leading-tight drop-shadow-xs">
              {currentMessage}
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Persistent Status Row Underneath (Always visible identity) ── */}
      <div className="mt-3 flex items-center justify-center lg:justify-end gap-2 text-xs font-mono text-muted">
        {/* Subtle Breathing Status Dot (Scale 1 → 1.08, Opacity 1 → 0.75 over 2.8s) */}
        <span className="relative flex h-2 w-2 shrink-0 items-center justify-center">
          <motion.span
            animate={
              prefersReducedMotion
                ? {}
                : {
                    scale: [1, 1.08, 1],
                    opacity: [1, 0.75, 1],
                  }
            }
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`inline-flex rounded-full h-2 w-2 ${
              isDark ? "bg-amber-400" : "bg-emerald-500"
            }`}
          />
        </span>

        {/* Mode Label */}
        <span className="font-semibold text-foreground tracking-wider uppercase text-[11px]">
          {currentLabel}
        </span>

        <span className="text-subtle">·</span>

        {/* Persistent Micro Message */}
        <span className="text-subtle text-[11px] whitespace-nowrap">
          {currentMessage}
        </span>
      </div>
    </div>
  );
}
