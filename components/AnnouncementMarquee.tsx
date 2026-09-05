import type { PengumumanDTO } from "@/lib/types";

export default function AnnouncementMarquee({
  pengumuman,
}: {
  pengumuman: PengumumanDTO | null;
}) {
  if (!pengumuman || !pengumuman.aktif || !pengumuman.teks.trim()) return null;

  return (
    <div className="w-full overflow-hidden bg-black py-1.5">
      <div className="flex items-center gap-3 px-3 sm:container-page sm:gap-4 sm:px-0">
        {/* Warna badge ini sengaja DIPERTAHANKAN (tidak ikut retint ke hijau brand) sesuai permintaan */}
        <span className="shrink-0 rounded bg-[#6FBAB6] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-navy-900 sm:px-2.5 sm:text-[11px]">
          Pengumuman
        </span>
        <div className="relative flex-1 overflow-hidden">
          <div className="flex w-max animate-marquee whitespace-nowrap">
            <span className="px-4 text-xs text-white/90 sm:text-sm">
              {pengumuman.teks}
            </span>
            <span aria-hidden className="px-4 text-xs text-white/90 sm:text-sm">
              {pengumuman.teks}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
