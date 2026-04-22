"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/assessment", label: "测评", icon: "🧭" },
  { href: "/jd-decoder", label: "JD解读", icon: "🔍" },
  { href: "/match", label: "匹配", icon: "📊" },
  { href: "/resume", label: "简历", icon: "📄" },
];

export function MobileTabBar() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-ivory/95 backdrop-blur-md border-t border-border-warm safe-area-bottom">
      <div className="flex items-center justify-around h-[64px] px-2">
        {tabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "flex flex-col items-center justify-center gap-1 min-w-[64px] py-1 rounded-lg transition-colors",
              pathname === tab.href
                ? "text-terracotta"
                : "text-stone-gray hover:text-olive-gray"
            )}
          >
            <span className="text-xl">{tab.icon}</span>
            <span className="text-[11px] font-medium">{tab.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
