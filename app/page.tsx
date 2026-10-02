import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import AIStudio from "@/components/studio/AIStudio";
import Contact from "@/components/sections/Contact";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Work from "@/components/sections/Work";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <About />
        <Services />
        <Work />
        <AIStudio />
        <Contact />
      </main>

      <Footer />
    </>
  );
}