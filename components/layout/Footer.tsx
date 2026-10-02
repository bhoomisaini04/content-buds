const footerLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "AI Studio", href: "#ai-studio" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500 text-sm font-bold">
                CB
              </span>

              <span className="text-lg font-bold">Content Buds</span>
            </div>

            <p className="max-w-sm text-sm leading-6 text-slate-400">
              Strategy, creativity, and AI working together to help modern
              brands create content that matters.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-4">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-slate-400 transition hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 border-t border-slate-800 pt-6">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Content Buds. Built for better
            content.
          </p>
        </div>
      </div>
    </footer>
  );
}