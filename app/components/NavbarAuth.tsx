"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type User = {
  _id: string;
  fullName: string;
  email: string;
  role: string;
  profileImage?: string;
};

function isAdminRole(role: string) {
  const normalizedRole = role.toUpperCase();
  return normalizedRole === "ADMIN" || normalizedRole === "SUPERADMIN";
}

export default function NavbarAuth() {
  const router = useRouter();
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        const data = await res.json();
        setUser(res.ok ? data.user : null);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMe();
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        event.target instanceof Node &&
        !menuRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) return;

      setUser(null);
      setOpen(false);
      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error("LOGOUT_ERROR:", error);
    }
  };

  if (loading) return null;

  if (!user) {
    return (
      <div className="flex shrink-0 items-center gap-3">
        <Link
          href="/login"
          className="btn btn-outline px-6 py-2.5 text-sm font-bold border-gray-200 hover:border-[#15803d] hover:text-[#15803d]"
        >
          Connexion
        </Link>
        <Link
          href="/register"
          className="rounded-full bg-[#15803d] px-6 py-2.5 text-sm font-black text-white shadow-lg shadow-green-100 transition-all hover:bg-black"
        >
          Inscription
        </Link>
      </div>
    );
  }

  return (
    <div ref={menuRef} className="relative shrink-0">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-3 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-sm transition hover:border-green-500 hover:shadow-md"
      >
        <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-gray-100 bg-[#15803d]">
          {user.profileImage ? (
            <Image
              src={user.profileImage}
              alt={user.fullName}
              width={36}
              height={36}
              unoptimized
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-sm font-bold text-white">
              {user.fullName?.charAt(0).toUpperCase()}
            </span>
          )}
        </div>

        <span className="hidden max-w-[140px] truncate lg:block">{user.fullName}</span>

        <svg
          className={`h-4 w-4 text-gray-400 transition-transform ${
            open ? "rotate-180" : ""
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.51a.75.75 0 01-1.08 0l-4.25-4.51a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 z-[9999] mt-3 w-64 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl">
          <div className="flex items-center gap-3 border-b border-gray-100 bg-gray-50/50 px-4 py-4">
            <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-gray-200 bg-white">
              {user.profileImage ? (
                <Image
                  src={user.profileImage}
                  alt=""
                  width={40}
                  height={40}
                  unoptimized
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-green-50 font-bold text-[#15803d]">
                  {user.fullName?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            <div className="overflow-hidden">
              <p className="truncate text-sm font-black text-gray-900">{user.fullName}</p>
              <p className="truncate text-xs font-medium text-gray-500">{user.email}</p>
            </div>
          </div>

          <div className="space-y-1 p-2">
            <Link
              href="/profile"
              onClick={() => setOpen(false)}
              className="block rounded-xl px-3 py-2 text-sm text-gray-700 transition hover:bg-green-50 hover:text-green-700"
            >
              Profil
            </Link>

            {isAdminRole(user.role) && (
              <Link
                href="/admin"
                onClick={() => setOpen(false)}
                className="block rounded-xl px-3 py-2 text-sm text-gray-700 transition hover:bg-green-50 hover:text-green-700"
              >
                Admin
              </Link>
            )}

            <button
              onClick={handleLogout}
              className="block w-full rounded-xl px-3 py-2 text-left text-sm text-red-600 transition hover:bg-red-50"
            >
              Deconnexion
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
