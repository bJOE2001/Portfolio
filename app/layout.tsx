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
  metadataBase: new URL("https://bellyjoe.dev"),
  title: {
    default: profile.seoTitle,
    template: `%s | ${profile.name}`,
  },
  description: profile.seoDescription,
  keywords: [
    "Belly Joe Basadre",
    "Full-Stack Developer",
    "Freelance Web Developer",
    "Laravel Developer",
    "Vue.js Developer",
    "Quasar Framework",
    "React Developer",
    "Next.js",
    "TypeScript",
    "SQL Server",
    "PostgreSQL",
    "Custom Web Applications",
    "Workflow Automation",
    "Philippines",
  ],
  authors: [{ name: profile.name, url: "https://bellyjoe.dev" }],
  creator: profile.name,
  alternates: {
    canonical: "/",
  },
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
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
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
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-md focus:bg-foreground focus:text-background focus:text-xs focus:font-mono focus:uppercase focus:tracking-wider"
        >
          Skip to main content
        </a>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
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
