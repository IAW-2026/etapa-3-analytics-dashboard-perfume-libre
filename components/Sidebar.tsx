"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/overview", label: "overview" },
  { href: "/transacciones", label: "transacciones" },
  { href: "/usuarios", label: "usuarios" },
  { href: "/productos", label: "productos" },
  { href: "/moderacion", label: "moderacion" },
];
export function Sidebar() {
  const pathname = usePathname();

  return (
    <div>
      {navItems.map((item) => {
        const isActive = pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`block px-4 py-2 rounded-md ${
              isActive
                ? "bg-indigo-50 text-indigo-700 font-medium"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
