import Link from "next/link";
import { clsx } from "clsx";
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "outline" | "gold" | "navy";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  icon?: ReactNode;
  external?: boolean;
  className?: string;
};

const variantClass: Record<ButtonVariant, string> = {
  primary: "btn-primary",
  outline: "btn-outline",
  gold: "btn-gold",
  navy: "btn-navy",
};

export default function Button({
  href,
  children,
  variant = "primary",
  icon,
  external,
  className,
}: ButtonProps) {
  const classes = clsx(variantClass[variant], className);

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
        {icon}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
      {icon}
    </Link>
  );
}
