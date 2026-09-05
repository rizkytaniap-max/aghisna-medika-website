import Image from "next/image";
import { clsx } from "clsx";
import { RUMAH_SAKIT } from "@/data/rumah-sakit";

export default function AccreditationSeal({
  size = "md",
  className,
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const dimensions = { sm: 64, md: 88, lg: 128 }[size];

  return (
    <div
      className={clsx("relative inline-flex shrink-0", className)}
      style={{ width: dimensions, height: dimensions }}
    >
      <Image
        src={RUMAH_SAKIT.logo.badgeAkreditasi}
        alt={`Badge ${RUMAH_SAKIT.akreditasi}`}
        fill
        sizes={`${dimensions}px`}
        className="object-contain"
      />
    </div>
  );
}
