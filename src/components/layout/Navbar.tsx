"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "首页" },
  { href: "/assessment", label: "职业测评" },
  { href: "/jd-decoder", label: "JD解读" },
  { href: "/match", label: "匹配分析" },
  { href: "/resume", label: "简历优化" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-parchment/90 backdrop-blur-md border-b border-border-warm">
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-[60px] flex items-center justify-between">
        <Link href="/" className="font-serif text-lg font-medium text-near-black flex items-center gap-2 hover:text-terracotta transition-colors">
          知途 · ZhiTu
          <span className="bg-terracotta text-ivory text-[10px] font-medium px-2 py-0.5 rounded-full tracking-wide">
            CAREER
          </span>
        </Link>
        <ul className="hidden md:flex gap-8 list-none">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "text-sm transition-colors duration-200",
                  pathname === link.href
                    ? "text-near-black font-medium"
                    : "text-olive-gray hover:text-near-black"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
