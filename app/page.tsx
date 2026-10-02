import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import AIStudio from "@/components/studio/AIStudio";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <AIStudio />
      </main>

      <Footer />
    </>
  );
}