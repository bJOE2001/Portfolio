import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { profile } from "@/data/portfolio";
import { ThemeProvider } from "@/components/ThemeProvider";
import ScrollProgress from "@/components/layout/ScrollProgress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/layout/Footer";
import Chatbot from "@/components/Chatbot";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: profile.seoTitle || "Belly Joe Basadre — Full-Stack Developer",
  description:
    profile.seoDescription ||
    "Full-stack developer building modern web applications, enterprise systems, and digital products with Next.js, Laravel, TypeScript, and modern web technologies.",
  keywords: [
    "Belly Joe Basadre",
    "Full-Stack Developer",
    "Next.js",
    "Laravel",
    "TypeScript",
    "React",
    "FastAPI",
    "Software Engineer",
    "Tagum City",
    "Philippines",
  ],
  authors: [{ name: profile.name, url: "https://bellyjoe.dev" }],
  creator: profile.name,
  openGraph: {
    title: profile.seoTitle,
    description: profile.seoDescription,
    url: "https://bellyjoe.dev",
    siteName: `${profile.name} — Portfolio`,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: profile.seoTitle,
    description: profile.seoDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-foreground selection:text-background transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <ScrollProgress />
          <Navbar />
          {children}
          <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-10">
            <Footer />
          </div>
          <Chatbot />
        </ThemeProvider>
      </body>
    </html>
  );
}
