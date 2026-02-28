import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Experience from "@/components/Experience";
import RecentProjects from "@/components/RecentProjects";
import WhatIBuild from "@/components/WhatIBuild";
import CurrentlyLearning from "@/components/CurrentlyLearning";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <Navbar />

      {/* Page body */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* ── LEFT SIDEBAR ── */}
          <div className="lg:w-72 xl:w-80 shrink-0">
            <Sidebar />
          </div>

          {/* ── RIGHT MAIN CONTENT ── */}
          <div className="flex-1 min-w-0 space-y-5">
            <Experience />
            <RecentProjects />
            <WhatIBuild />
            <CurrentlyLearning />
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}
