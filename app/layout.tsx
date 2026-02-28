import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

import { profile } from "@/data/portfolio";

export const metadata: Metadata = {
  title: profile.seoTitle || "Portfolio",
  description: profile.seoDescription || "Personal portfolio showcasing projects, experience, and more.",
  keywords: ["portfolio", "software engineer", "AI", "full-stack", "developer"],
  openGraph: {
    title: profile.seoTitle || "Portfolio",
    description: profile.seoDescription || "Personal portfolio showcasing projects, experience, and more.",
    type: "website",
  },
};

import { ThemeProvider } from "@/components/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-[var(--bg)] antialiased transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
