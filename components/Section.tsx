import { clsx } from "clsx";
import type { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  id?: string;
  className?: string;
  tone?: "light" | "mist" | "navy";
};

const toneClass: Record<NonNullable<SectionProps["tone"]>, string> = {
  light: "bg-white",
  mist: "bg-mist-50",
  navy: "bg-navy-gradient text-white",
};

export default function Section({
  children,
  id,
  className,
  tone = "light",
}: SectionProps) {
  return (
    <section id={id} className={clsx("py-16 sm:py-20 lg:py-24", toneClass[tone], className)}>
      <div className="container-page">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
}) {
  return (
    <div
      className={clsx(
        "max-w-2xl",
        align === "center" && "mx-auto text-center"
      )}
    >
      {eyebrow && (
        <span className={clsx("eyebrow mb-3", light && "text-gold-200")}>
          {eyebrow}
        </span>
      )}
      <h2
        className={clsx(
          "font-display text-3xl font-bold sm:text-4xl",
          light ? "text-white" : "text-navy-900"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={clsx(
            "mt-4 text-base leading-relaxed sm:text-lg",
            light ? "text-white/75" : "text-ink-soft"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
