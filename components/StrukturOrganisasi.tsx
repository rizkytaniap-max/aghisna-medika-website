type NodeBoxProps = {
  label: string;
  sub?: string;
  emphasis?: boolean;
};

function NodeBox({ label, sub, emphasis }: NodeBoxProps) {
  return (
    <div
      className={
        emphasis
          ? "rounded-xl bg-navy-800 px-4 py-3 text-center text-white shadow-card"
          : "rounded-xl border border-mist-200 bg-white px-4 py-3 text-center shadow-soft"
      }
    >
      <p
        className={
          emphasis
            ? "text-sm font-semibold"
            : "text-sm font-semibold text-navy-900"
        }
      >
        {label}
      </p>
      {sub && (
        <p
          className={
            emphasis
              ? "mt-0.5 text-xs text-white/70"
              : "mt-0.5 text-xs text-ink-faint"
          }
        >
          {sub}
        </p>
      )}
    </div>
  );
}

const MANAJER = [
  "Manajer Pelayanan Medis",
  "Manajer Logistik & Penunjang",
  "Manajer Umum, SDI & AIK",
  "Manajer Keuangan",
];

export default function StrukturOrganisasi() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center gap-0">
      <div className="w-56">
        <NodeBox label="Direktur PT" sub="PT. Aghisna Centra Medica" emphasis />
      </div>
      <div className="h-6 w-px bg-mist-200" />
      <div className="w-56">
        <NodeBox label="Direktur" emphasis />
      </div>
      <div className="h-6 w-px bg-mist-200" />
      <div className="w-56">
        <NodeBox label="Wakil Direktur" />
      </div>

      {/* SPI — jalur langsung ke Direktur */}
      <div className="relative w-full">
        <div className="mx-auto h-6 w-px bg-mist-200" />
      </div>

      <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-4">
        {MANAJER.map((m) => (
          <NodeBox key={m} label={m} />
        ))}
      </div>

      <div className="mt-6 flex items-center gap-2 self-start rounded-lg border border-dashed border-mist-200 bg-mist-50 px-3 py-2 text-xs text-ink-soft">
        <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
        SPI (Satuan Pengawas Internal) berada pada jalur pelaporan langsung
        ke Direktur.
      </div>
    </div>
  );
}
