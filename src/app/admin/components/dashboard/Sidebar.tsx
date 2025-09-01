"use client";

import { Home, BarChart2, LogOut, Mail } from "lucide-react"; // 👈 removed List
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { logout } from "@/app/login/logout";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
  isLogout?: boolean;
  active?: boolean;
}

const NavItem = ({ icon, label, href, isLogout = false, active = false, onClick }: NavItemProps) => {
  const baseClasses =
    "flex items-center gap-3 w-full text-left px-3 py-2 rounded-lg transition-colors";
  const activeClasses = "bg-gray-200 text-orange-500 font-medium";
  const inactiveClasses = "text-slate-600 hover:bg-slate-100";

  const content = (
    <span className={baseClasses}>
      {icon}
      {label}
    </span>
  );

  if (isLogout) {
    return (
      <form action={logout}>
        <button
          type="submit"
          className={`w-full ${active ? activeClasses : inactiveClasses}`}
          onClick={onClick}
        >
          {content}
        </button>
      </form>
    );
  }

  return (
    <Link
      href={href || "#"}
      className={`block ${active ? activeClasses : inactiveClasses}`}
      aria-current={active ? "page" : undefined}
      onClick={onClick}
    >
      {content}
    </Link>
  );
};

export default function Sidebar() {
  const pathname = usePathname();

  // ✅ Orders removed from here
  const navItems = [
    { icon: <Home size={18} />, label: "Home", href: "/admin" },
    { icon: <BarChart2 size={18} />, label: "Products", href: "/admin/products" },
    { icon: <Mail size={18} />, label: "Messages", href: "/admin/messages" },
  ];

  return (
    <aside className="w-full mt-22 bg-white shadow-md py-6 flex flex-col justify-between">
      <div>
        <h1 className="text-xl font-bold text-black pt-8 pl-4 mb-8">Dashboard</h1>
        <nav className="space-y-4">
          {navItems.map(({ icon, label, href }) => (
            <NavItem
              key={label}
              icon={icon}
              label={label}
              href={href}
              active={pathname === href}
            />
          ))}

          <NavItem icon={<LogOut size={18} />} label="Log out" isLogout />
        </nav>
      </div>
    </aside>
  );
}
