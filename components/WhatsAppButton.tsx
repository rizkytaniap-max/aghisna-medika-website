"use client";

import { MessageCircle } from "lucide-react";
import { RUMAH_SAKIT, waLink } from "@/data/rumah-sakit";

export default function WhatsAppButton() {
  return (
    <a
      href={waLink(
        RUMAH_SAKIT.kontak.waCs,
        "Assalamu'alaikum, saya ingin bertanya seputar layanan RSU Aghisna Medika Sidareja."
      )}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hubungi Customer Care via WhatsApp"
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-teal-500 py-3 pl-3.5 pr-4 text-white shadow-lift transition-all hover:bg-teal-700 sm:bottom-7 sm:right-7"
    >
      <MessageCircle size={22} />
      <span className="hidden text-sm font-semibold sm:inline">
        Chat Customer Care
      </span>
    </a>
  );
}
