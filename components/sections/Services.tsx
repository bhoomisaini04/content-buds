const services = [
  {
    number: "01",
    title: "Content Strategy",
    description:
      "Turn ideas into clear content directions built around your audience, goals, and brand.",
  },
  {
    number: "02",
    title: "AI Content Creation",
    description:
      "Generate useful first drafts for social posts, campaigns, and other content using AI.",
  },
  {
    number: "03",
    title: "Brand Messaging",
    description:
      "Shape consistent messaging with the right tone, keywords, and positioning for your audience.",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="scroll-mt-20 border-t border-slate-200 bg-slate-50"
    >
      <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 lg:py-28">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-violet-600">
            Services
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Better content starts with
            <span className="text-violet-600"> better direction.</span>
          </h2>

          <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
            From strategy to AI-assisted creation, Content Buds helps turn
            simple ideas into focused content that is easier to create and
            ready to use.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.number}
              className="rounded-2xl border border-slate-200 bg-white p-6 transition duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              <p className="text-sm font-semibold text-violet-600">
                {service.number}
              </p>

              <h3 className="mt-5 text-xl font-bold text-slate-950">
                {service.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}