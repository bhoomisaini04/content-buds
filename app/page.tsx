import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import AIStudio from "@/components/studio/AIStudio";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <AIStudio />
        <Contact />
      </main>

      <Footer />
    </>
  );
}