import { MapPin, PhoneCall } from "lucide-react";
import Section from "@/components/Section";
import { RUMAH_SAKIT, waLink } from "@/data/rumah-sakit";

export default function CtaPeta() {
  return (
    <Section tone="navy">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
        <div>
          <span className="eyebrow text-gold-200">Kunjungi Kami</span>
          <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
            Kami Siap Melayani Anda Kapan Saja
          </h2>
          <p className="mt-4 max-w-md text-white/75">
            Datang langsung ke lokasi kami, atau hubungi tim kami melalui
            WhatsApp untuk membuat perjanjian maupun kebutuhan darurat.
          </p>
          <div className="mt-6 flex items-start gap-2.5 text-sm text-white/80">
            <MapPin size={18} className="mt-0.5 shrink-0 text-gold-200" />
            <span>{RUMAH_SAKIT.alamat}</span>
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={waLink(RUMAH_SAKIT.kontak.waIgd)} target="_blank" rel="noopener noreferrer" className="btn-gold">
              <PhoneCall size={17} /> Hubungi IGD
            </a>
            <a href={waLink(RUMAH_SAKIT.kontak.waPendaftaran)} target="_blank" rel="noopener noreferrer" className="btn-outline">
              Buat Perjanjian
            </a>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/15 shadow-lift">
          <iframe
            title="Lokasi RSU Aghisna Medika Sidareja"
            src={`https://www.google.com/maps?q=${encodeURIComponent(
              RUMAH_SAKIT.maps.embedQuery
            )}&output=embed`}
            width="100%"
            height="360"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </Section>
  );
}
