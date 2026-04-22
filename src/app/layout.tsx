import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { MobileTabBar } from "@/components/layout/MobileTabBar";

export const metadata: Metadata = {
  title: "知途 · ZhiTu Career — 为大学生点亮职业方向的灯",
  description: "AI 驱动的职业探索平台，通过科学测评认清自我，通过 JD 智能解读读懂岗位，将求职过程变成一场有趣的星图探索之旅。",
  keywords: ["职业规划", "大学生求职", "AI测评", "JD解读", "简历优化", "知途"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <MobileTabBar />
      </body>
    </html>
  );
}
