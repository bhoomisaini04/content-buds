export default function About() {
  return (
    <section
      id="about"
      className="scroll-mt-20 border-t border-slate-100 bg-white px-5 py-20 sm:px-8 lg:px-12 lg:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left */}
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-violet-600">
              About
            </p>

            <h2 className="max-w-xl text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              Content creation should feel{" "}
              <span className="text-violet-600">clear, not complicated.</span>
            </h2>
          </div>

          {/* Right */}
          <div className="space-y-6 text-base leading-8 text-slate-600 sm:text-lg">
            <p>
              Content Buds brings strategy, creativity, and AI together in one
              simple workspace for modern content creation.
            </p>

            <p>
              Instead of starting with a blank page, turn a clear brief into
              useful content built around your audience, tone, and goals.
            </p>

            <div className="grid gap-4 pt-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-2xl font-bold text-slate-950">01</p>
                <p className="mt-2 text-sm font-medium text-slate-600">
                  Start with a brief
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-2xl font-bold text-slate-950">02</p>
                <p className="mt-2 text-sm font-medium text-slate-600">
                  Shape your direction
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-2xl font-bold text-slate-950">03</p>
                <p className="mt-2 text-sm font-medium text-slate-600">
                  Create with AI
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}