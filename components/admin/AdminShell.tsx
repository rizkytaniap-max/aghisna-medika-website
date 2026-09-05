"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Stethoscope,
  BedDouble,
  Newspaper,
  Briefcase,
  ShieldCheck,
  Megaphone,
  ImageIcon,
  LogOut,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { clsx } from "clsx";

const ADMIN_BASE = "/admin-rsam-2026";
const SIDEBAR_STORAGE_KEY = "rsam-admin-sidebar-collapsed";

const MENU = [
  { href: ADMIN_BASE, label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: `${ADMIN_BASE}/pengaturan-beranda`, label: "Pengaturan Beranda", icon: ImageIcon },
  { href: `${ADMIN_BASE}/layanan`, label: "Layanan & Fasilitas", icon: Stethoscope },
  { href: `${ADMIN_BASE}/kamar`, label: "Kamar Rawat Inap", icon: BedDouble },
  { href: `${ADMIN_BASE}/dokter`, label: "Dokter & Jadwal", icon: Stethoscope },
  { href: `${ADMIN_BASE}/berita`, label: "Berita & Artikel", icon: Newspaper },
  { href: `${ADMIN_BASE}/karir`, label: "Lowongan Karir", icon: Briefcase },
  { href: `${ADMIN_BASE}/asuransi`, label: "Asuransi Rekanan", icon: ShieldCheck },
  { href: `${ADMIN_BASE}/pengumuman`, label: "Pengumuman", icon: Megaphone },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // Default collapsed=true dulu (aman untuk SSR/mobile), lalu disesuaikan
  // setelah mount: pakai preferensi tersimpan kalau ada, atau otomatis
  // terbuka di layar desktop untuk kunjungan pertama.
  const [collapsed, setCollapsed] = useState(true);
  const [siap, setSiap] = useState(false);

  useEffect(() => {
    const tersimpan = localStorage.getItem(SIDEBAR_STORAGE_KEY);
    if (tersimpan !== null) {
      setCollapsed(tersimpan === "1");
    } else if (window.innerWidth >= 1024) {
      setCollapsed(false);
    }
    setSiap(true);
  }, []);

  function toggleCollapsed() {
    setCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem(SIDEBAR_STORAGE_KEY, next ? "1" : "0");
      return next;
    });
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push(`${ADMIN_BASE}/login`);
    router.refresh();
  }

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900">
      {/* Backdrop mobile — cuma muncul kalau sidebar terbuka penuh di layar kecil */}
      {!collapsed && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={toggleCollapsed}
          aria-hidden
        />
      )}

      <aside
        className={clsx(
          "fixed inset-y-0 left-0 z-40 flex shrink-0 flex-col border-r border-gray-200 bg-white lg:relative lg:z-auto",
          siap && "transition-[width] duration-200 ease-in-out",
          collapsed ? "w-[72px]" : "w-64"
        )}
      >
        {/* Tombol toggle — lingkaran mengambang di tepi kanan sidebar */}
        <button
          onClick={toggleCollapsed}
          aria-label={collapsed ? "Buka sidebar" : "Tutup sidebar"}
          className="absolute -right-3 top-6 z-50 flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm transition-colors hover:bg-gray-50 hover:text-teal-600"
        >
          {collapsed ? <ChevronRight size={13} /> : <ChevronLeft size={13} />}
        </button>

        <div className={clsx("border-b border-gray-200 px-5 py-4", collapsed && "px-0")}>
          {collapsed ? (
            <div className="flex justify-center">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-500 text-xs font-bold text-white">
                AA
              </span>
            </div>
          ) : (
            <>
              <p className="font-semibold text-gray-900">Admin RSU Aghisna</p>
              <p className="text-xs text-gray-500">Panel Pengelolaan Konten</p>
            </>
          )}
        </div>

        <nav className={clsx("flex-1 space-y-1 overflow-y-auto p-3", collapsed && "px-2")}>
          {MENU.map((item) => {
            const active = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "group relative flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  collapsed && "justify-center px-0 py-2.5",
                  active
                    ? "bg-teal-50 text-teal-700"
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                <Icon size={17} className="shrink-0" />
                {!collapsed && item.label}
                {collapsed && (
                  <span className="pointer-events-none absolute left-full ml-2 whitespace-nowrap rounded-md bg-navy-900 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lift transition-opacity duration-150 group-hover:opacity-100">
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className={clsx("space-y-1 border-t border-gray-200 p-3", collapsed && "px-2")}>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(
              "group relative flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100",
              collapsed && "justify-center px-0 py-2.5"
            )}
          >
            <ExternalLink size={17} className="shrink-0" />
            {!collapsed && "Lihat Situs Publik"}
            {collapsed && (
              <span className="pointer-events-none absolute left-full ml-2 whitespace-nowrap rounded-md bg-navy-900 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lift transition-opacity duration-150 group-hover:opacity-100">
                Lihat Situs Publik
              </span>
            )}
          </a>
          <button
            onClick={logout}
            className={clsx(
              "group relative flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50",
              collapsed && "justify-center px-0 py-2.5"
            )}
          >
            <LogOut size={17} className="shrink-0" />
            {!collapsed && "Keluar"}
            {collapsed && (
              <span className="pointer-events-none absolute left-full ml-2 whitespace-nowrap rounded-md bg-navy-900 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lift transition-opacity duration-150 group-hover:opacity-100">
                Keluar
              </span>
            )}
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-x-hidden p-6 sm:p-8">{children}</main>
    </div>
  );
}
