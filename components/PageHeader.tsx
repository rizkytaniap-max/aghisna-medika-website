import type { ReactNode } from "react";

export default function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-gradient text-white">
      <div
        className="pointer-events-none absolute inset-0 bg-seal-radial"
        aria-hidden
      />
      <div className="container-page relative py-14 sm:py-16 lg:py-20">
        <span className="eyebrow text-gold-200">{eyebrow}</span>
        <h1 className="mt-4 max-w-2xl font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-[2.75rem]">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-xl text-white/75">{description}</p>
        )}
        {children}
      </div>
    </section>
  );
}
