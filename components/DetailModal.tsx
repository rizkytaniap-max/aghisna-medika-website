"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X, type LucideIcon } from "lucide-react";
import { clsx } from "clsx";
import Image from "next/image";

export type DetailModalCta = {
  label: string;
  href: string;
  variant?: "primary" | "soft" | "gold" | "navy";
  external?: boolean;
};

export type DetailModalProps = {
  isOpen: boolean;
  onClose: () => void;
  icon?: LucideIcon;
  title: string;
  subtitle?: string; // mis. badge "6 Tempat Tidur" atau kategori
  description: string;
  note?: string; // mis. catatan "Draf — perlu dikonfirmasi ke pihak RS"
  imageSrc?: string | null; // foto banner di atas header, kalau ada
  bulletTitle?: string; // mis. "Yang Tersedia" / "Fasilitas dalam Kamar"
  bulletPoints?: string[];
  infoTambahan?: { label: string; value: string }[]; // mis. jam operasional
  ctaButtons?: DetailModalCta[];
};

const ctaVariantClass: Record<NonNullable<DetailModalCta["variant"]>, string> = {
  primary: "btn-primary",
  soft: "rounded-full bg-mist-100 px-6 py-3 text-sm font-semibold text-navy-800 transition-colors hover:bg-mist-200",
  gold: "btn-gold",
  navy: "btn-navy",
};

export default function DetailModal({
  isOpen,
  onClose,
  icon: Icon,
  title,
  subtitle,
  description,
  note,
  imageSrc,
  bulletTitle,
  bulletPoints,
  infoTambahan,
  ctaButtons,
}: DetailModalProps) {
  // Escape key menutup modal
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  // Lock scroll body selama modal terbuka
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop gelap transparan */}
          <div
            className="absolute inset-0 bg-navy-900/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />

          {/* Modal card */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className="relative flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-lift"
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Foto banner (kalau ada) */}
            {imageSrc && (
              <div className="relative h-44 w-full shrink-0 sm:h-52">
                <Image src={imageSrc} alt={title} fill className="object-cover" />
              </div>
            )}

            {/* Header ikon besar */}
            <div className="relative shrink-0 bg-navy-gradient px-6 pb-8 pt-6 text-white">
              <button
                onClick={onClose}
                aria-label="Tutup"
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              >
                <X size={18} />
              </button>
              {Icon && !imageSrc && (
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-gold-200">
                  <Icon size={30} />
                </span>
              )}
              <h2 className="mt-4 pr-10 font-display text-xl font-bold sm:text-2xl">
                {title}
              </h2>
              {subtitle && (
                <span className="mt-2 inline-flex items-center rounded-full bg-gold-400 px-3 py-1 text-xs font-semibold text-navy-900">
                  {subtitle}
                </span>
              )}
            </div>

            {/* Konten scrollable */}
            <div className="overflow-y-auto p-6">
              <p className="text-sm leading-relaxed text-ink-soft sm:text-base">
                {description}
              </p>

              {note && (
                <p className="mt-3 rounded-lg bg-gold-50 px-3 py-2 text-xs leading-relaxed text-ink-faint">
                  {note}
                </p>
              )}

              {infoTambahan && infoTambahan.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {infoTambahan.map((info) => (
                    <span
                      key={info.label}
                      className="rounded-full bg-mist-100 px-3 py-1.5 text-xs font-medium text-navy-800"
                    >
                      {info.label}: {info.value}
                    </span>
                  ))}
                </div>
              )}

              {bulletPoints && bulletPoints.length > 0 && (
                <div className="mt-5">
                  {bulletTitle && (
                    <h3 className="eyebrow mb-2.5">{bulletTitle}</h3>
                  )}
                  <ul className="space-y-2">
                    {bulletPoints.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2.5 text-sm text-ink-soft"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {ctaButtons && ctaButtons.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2.5 border-t border-mist-200 pt-5">
                  {ctaButtons.map((cta) => (
                    <a
                      key={cta.label}
                      href={cta.href}
                      target={cta.external === false ? undefined : "_blank"}
                      rel={cta.external === false ? undefined : "noopener noreferrer"}
                      className={clsx(ctaVariantClass[cta.variant ?? "primary"])}
                    >
                      {cta.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
