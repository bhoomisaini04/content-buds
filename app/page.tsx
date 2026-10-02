import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <section className="mx-auto flex min-h-[70vh] max-w-7xl items-center px-6 py-24 lg:px-8">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-violet-600">
              Content Buds
            </p>

            <h1 className="max-w-4xl text-5xl font-bold tracking-tight text-slate-950 md:text-6xl">
              Better content starts with better ideas.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              We combine strategy, creativity, and AI to help modern brands
              turn ideas into content people actually want to engage with.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}