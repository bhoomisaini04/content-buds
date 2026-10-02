const projects = [
  {
    category: "SOCIAL CONTENT",
    title: "Product Launch Campaign",
    description:
      "A focused social campaign built around clear messaging, audience targeting, and AI-assisted content creation.",
    tags: ["Strategy", "Social Media", "AI Content"],
  },
  {
    category: "BRAND CONTENT",
    title: "Sustainable Coffee Brand",
    description:
      "Content direction and launch messaging designed to communicate a modern, sustainable brand story.",
    tags: ["Brand Voice", "Copywriting", "Campaign"],
  },
  {
    category: "AI WORKFLOW",
    title: "Content Buds AI Studio",
    description:
      "An AI-powered workspace that transforms a simple brief into audience-aware content in seconds.",
    tags: ["AI", "Ollama", "Content Generation"],
  },
];

export default function Work() {
  return (
    <section
      id="work"
      className="scroll-mt-20 border-t border-slate-200 bg-white"
    >
      <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 lg:py-28">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-violet-600">
              Work
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Ideas turned into
              <span className="text-violet-600"> meaningful content.</span>
            </h2>
          </div>

          <p className="max-w-md text-sm leading-7 text-slate-600 sm:text-base">
            A look at the kind of strategy, messaging, and AI-assisted content
            Content Buds can help create.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group flex min-h-72 flex-col rounded-2xl border border-slate-200 bg-slate-50 p-6 transition duration-200 hover:-translate-y-1 hover:bg-white hover:shadow-lg"
            >
              <p className="text-xs font-semibold tracking-[0.2em] text-violet-600">
                {project.category}
              </p>

              <h3 className="mt-6 text-xl font-bold text-slate-950">
                {project.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                {project.description}
              </p>

              <div className="mt-auto flex flex-wrap gap-2 pt-8">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}