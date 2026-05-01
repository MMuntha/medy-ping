"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    label: "Medications",
    href: "/medications",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3" />
        <line x1="9" y1="9" x2="15" y2="9" />
        <line x1="9" y1="13" x2="15" y2="13" />
        <line x1="9" y1="17" x2="12" y2="17" />
      </svg>
    ),
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-[260px] flex-col h-screen bg-surface border-r border-border fixed left-0 top-0 z-30">
        {/* Brand */}
        <div className="flex items-center gap-3 px-6 py-6 border-b border-border">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
            <span className="text-white text-sm font-bold">M</span>
          </div>
          <span className="text-lg font-semibold text-text-primary tracking-tight">
            MedyPing
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                pathname.startsWith(item.href + "/");
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`
                      flex items-center gap-3 px-3 py-2.5 rounded-lg
                      text-sm font-medium transition-all duration-150
                      ${
                        isActive
                          ? "bg-accent-subtle text-accent"
                          : "text-text-secondary hover:text-text-primary hover:bg-card"
                      }
                    `}
                  >
                    <span className="flex-shrink-0">{item.icon}</span>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User section */}
        <div className="px-4 py-4 border-t border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
              <span className="text-xs font-medium text-accent">JD</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-primary truncate">
                John Doe
              </p>
              <p className="text-xs text-text-muted truncate">
                john@example.com
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-border z-30 px-2 py-1">
        <ul className="flex justify-around">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              pathname.startsWith(item.href + "/");
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`
                    flex flex-col items-center gap-1 px-4 py-2 rounded-lg
                    text-xs transition-all duration-150
                    ${
                      isActive
                        ? "text-accent"
                        : "text-text-muted hover:text-text-secondary"
                    }
                  `}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
