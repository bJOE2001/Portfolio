import Hero from "@/components/hero/Hero";
import Projects from "@/components/projects/Projects";
import Services from "@/components/Services";
import TechStack from "@/components/TechStack";
import Experience from "@/components/Experience";
import ContactCTA from "@/components/contact/ContactCTA";
import { profile, coreSpecializations } from "@/data/portfolio";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: "https://bellyjoe.dev",
    jobTitle: "Full-Stack Developer",
    description: profile.seoDescription,
    address: {
      "@type": "PostalAddress",
      addressCountry: "PH",
    },
    knowsAbout: coreSpecializations,
    sameAs: profile.social.map((s) => s.href),
  };

  return (
    <main
      id="main-content"
      className="mx-auto w-full max-w-5xl px-5 sm:px-8 lg:px-10"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <Projects />
      <Services />
      <TechStack />
      <Experience />
      <ContactCTA />
    </main>
  );
}
