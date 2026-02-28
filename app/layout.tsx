import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Your Name — AI Engineer & Full-Stack Developer",
  description:
    "Personal portfolio of a full-stack software engineer specializing in AI, web applications, and modern tech solutions.",
  keywords: ["portfolio", "software engineer", "AI", "full-stack", "developer"],
  openGraph: {
    title: "Your Name — AI Engineer & Full-Stack Developer",
    description: "Personal portfolio showcasing projects, experience, and more.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-[#f5f5f5] antialiased">{children}</body>
    </html>
  );
}
