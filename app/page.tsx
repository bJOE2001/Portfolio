import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Experience from "@/components/Experience";
import RecentProjects from "@/components/RecentProjects";
import TechStack from "@/components/TechStack";
import Gallery from "@/components/Gallery";
import RecentCertifications from "@/components/RecentCertifications";
import { profile } from "@/data/portfolio";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--bg)] transition-colors duration-300">
      <Navbar />

      {/* Page body */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* ── LEFT SIDEBAR ── */}
          <div className="lg:w-72 xl:w-80 shrink-0 lg:sticky lg:top-8 h-fit">
            <Sidebar />
          </div>

          {/* ── RIGHT MAIN CONTENT ── */}
          <div className="flex-1 min-w-0 space-y-5">
            <Experience />
            <TechStack />
            <RecentProjects />
            <RecentCertifications />
            <Gallery />

          </div>
        </div>

        {/* Global In-Container Footer */}
        <div className="mt-12 pt-8 border-t border-[var(--border)] text-center">
          <p className="text-[13px] font-medium text-[var(--text)]">
            &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
