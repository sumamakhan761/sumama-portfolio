import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/sections/Hero";

// Dynamically import sections that are below the fold
const About = dynamic(() => import("@/sections/About"), { ssr: true });
const Skills = dynamic(() => import("@/sections/Skills"), { ssr: true });
const Experience = dynamic(() => import("@/sections/Experience"), { ssr: true });
const Projects = dynamic(() => import("@/sections/Projects"), { ssr: true });
const Contact = dynamic(() => import("@/sections/Contact"), { ssr: true });

// Loading components
const SectionLoading = () => (
  <div className="w-full h-screen flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Add structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Sumama Khan",
            url: "https://sumamakhan.vercel.app",
            jobTitle: "Full Stack Developer",
            knowsAbout: ["Web Development", "Next.js", "React", "TypeScript", "Python", "AI/ML"],
            sameAs: [
              "https://github.com/sumamakhan761",
              "https://linkedin.com/in/sumama-khan",
              "https://twitter.com/sumamakhan761"
            ]
          })
        }}
      />

      <Navbar />
      <Hero />

      <Suspense fallback={<SectionLoading />}>
        <About />
      </Suspense>

      <Suspense fallback={<SectionLoading />}>
        <Skills />
      </Suspense>

      <Suspense fallback={<SectionLoading />}>
        <Experience />
      </Suspense>

      <Suspense fallback={<SectionLoading />}>
        <Projects />
      </Suspense>

      <Suspense fallback={<SectionLoading />}>
        <Contact />
      </Suspense>

      <Footer />
    </main>
  );
}
