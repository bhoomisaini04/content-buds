import {
  ArrowRight,
  Check,
  Copy,
  Sparkles,
  WandSparkles,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div
  className="absolute left-1/2 top-0 -z-10 h-125 w-125 -translate-x-1/2 rounded-full bg-violet-100/60 blur-3xl"
  aria-hidden="true"
/>

      <div className="mx-auto grid min-h-[calc(100vh-72px)] max-w-7xl items-center gap-16 px-6 py-20 lg:grid-cols-2 lg:px-8 lg:py-24">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-medium text-violet-700">
            <Sparkles size={16} aria-hidden="true" />
            Strategy, creativity & AI in one place
          </div>

          <h1 className="max-w-3xl text-5xl font-bold tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
            Turn ideas into
            <span className="text-violet-600"> content that connects.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Content Buds helps brands, creators, and growing businesses plan
            smarter, write faster, and create meaningful content with the
            support of AI.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#ai-studio"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 focus-visible:ring-offset-2"
            >
              Try AI Studio
              <ArrowRight size={17} aria-hidden="true" />
            </a>

            <a
              href="#work"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 focus-visible:ring-offset-2"
            >
              Explore our work
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500">
            <span className="flex items-center gap-2">
              <Check
                size={16}
                className="text-violet-600"
                aria-hidden="true"
              />
              Built for real briefs
            </span>

            <span className="flex items-center gap-2">
              <Check
                size={16}
                className="text-violet-600"
                aria-hidden="true"
              />
              Multiple content formats
            </span>

            <span className="flex items-center gap-2">
              <Check
                size={16}
                className="text-violet-600"
                aria-hidden="true"
              />
              Ready in seconds
            </span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          <div
            className="absolute -left-8 -top-8 h-40 w-40 rounded-full bg-violet-200/60 blur-3xl"
            aria-hidden="true"
          />

          <div
            className="absolute -bottom-10 -right-6 h-44 w-44 rounded-full bg-fuchsia-100 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-200/70">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600 text-white">
                  <WandSparkles size={18} aria-hidden="true" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-950">
                    Content Buds AI
                  </p>
                  <p className="text-xs text-slate-500">
                    Content generation workspace
                  </p>
                </div>
              </div>

              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                Ready
              </span>
            </div>

            <div className="space-y-5 p-5 sm:p-6">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Your brief
                </p>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm leading-6 text-slate-700">
                    Create a launch caption for a sustainable coffee brand
                    targeting young professionals.
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
                      Social caption
                    </span>

                    <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
                      Friendly
                    </span>

                    <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
                      Young professionals
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-200" />

                <div className="flex items-center gap-2 text-xs font-medium text-violet-600">
                  <Sparkles size={14} aria-hidden="true" />
                  AI generated
                </div>

                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Generated content
                  </p>

                  <button
                    type="button"
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                    aria-label="Copy generated content preview"
                  >
                    <Copy size={16} aria-hidden="true" />
                  </button>
                </div>

                <div className="rounded-2xl border border-violet-100 bg-violet-50/60 p-4">
                  <p className="text-sm leading-6 text-slate-700">
                    Your morning coffee can do more than wake you up. ☕ Meet
                    thoughtfully sourced coffee made for busy days, better
                    rituals, and a lighter footprint.
                  </p>

                  <p className="mt-3 text-sm font-medium text-violet-700">
                    #BetterCoffee #SustainableLiving #MorningRitual
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                <p className="text-xs text-slate-400">
                  Preview of Content Buds AI Studio
                </p>

                <div className="flex items-center gap-1 text-xs font-medium text-violet-600">
                  Generate
                  <ArrowRight size={14} aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}