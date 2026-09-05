import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Skema warna hijau (identitas Muhammadiyah) — menggantikan navy/teal
        // sejak rebrand RSU Aghisna Medika Sidareja bergabung dengan
        // Muhammadiyah Gombong Group. Nama kelas "navy-*"/"teal-*" DIPERTAHANKAN
        // di seluruh komponen agar tidak perlu rename massal — hanya nilai
        // hex-nya yang diganti hijau. Alias "brand-*" ditambahkan agar kode
        // baru bisa memakai nama yang lebih sesuai.
        navy: {
          50: "#E8F5EC",
          100: "#C6E8D0",
          300: "#6FBE86",
          500: "#20773F",
          700: "#164F2A", // hijau tua sekunder (dulunya secondary navy)
          800: "#0E4A28", // hijau tua utama — header/footer (dulunya primary navy)
          900: "#082F1A", // hijau paling gelap (footer / overlay, dulunya deepest navy)
        },
        teal: {
          50: "#E8F5EC",
          100: "#C6E8D0",
          300: "#6CC48A",
          500: "#1E9E52", // aksen hijau utama — tombol/badge/ikon aktif (dulunya primary teal)
          700: "#146B39",
        },
        brand: {
          50: "#E8F5EC",
          100: "#C6E8D0",
          300: "#6CC48A",
          500: "#1E9E52",
          700: "#146B39",
          800: "#0E4A28",
          900: "#082F1A",
        },
        gold: {
          50: "#FBF6E9",
          200: "#EAD79A",
          400: "#CDA34A", // accent gold
          600: "#A9812F",
        },
        ink: {
          DEFAULT: "#1B2430",
          soft: "#4B5666",
          faint: "#8593A3",
        },
        mist: {
          50: "#F7F9FA", // page background
          100: "#EEF2F5",
          200: "#E3E9ED", // borders / dividers
        },
      },
      fontFamily: {
        display: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 10px rgba(14,74,40,0.06)",
        card: "0 8px 24px rgba(14,74,40,0.08)",
        lift: "0 16px 40px rgba(14,74,40,0.14)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      backgroundImage: {
        "navy-gradient":
          "linear-gradient(135deg, #082F1A 0%, #0E4A28 55%, #164F2A 100%)",
        "seal-radial":
          "radial-gradient(circle at 30% 30%, rgba(205,163,74,0.18), rgba(205,163,74,0) 60%)",
      },
      maxWidth: {
        content: "1240px",
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease-out forwards",
        "fade-in": "fadeIn 0.6s ease-out forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
