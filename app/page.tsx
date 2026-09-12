import Hero from "@/components/hero/Hero";
import Projects from "@/components/projects/Projects";
import Experience from "@/components/Experience";
import TechStack from "@/components/TechStack";
import RecentCertifications from "@/components/RecentCertifications";
import GithubContributions from "@/components/GithubContributions";
import Gallery from "@/components/Gallery";
import ContactCTA from "@/components/contact/ContactCTA";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-5xl px-5 sm:px-8 lg:px-10">
      <Hero />
      <Projects />
      <Experience />
      <TechStack />
      <RecentCertifications />
      <GithubContributions />
      <Gallery />
      <ContactCTA />
    </main>
  );
}
