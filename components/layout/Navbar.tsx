"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about", id: "about" },
  { label: "Services", href: "#services", id: "services" },
  { label: "Work", href: "#work", id: "work" },
  { label: "AI Studio", href: "#ai-studio", id: "ai-studio" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    const sectionIds = [
      "about",
      "services",
      "work",
      "ai-studio",
      "contact",
    ];

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries.length > 0) {
          setActiveSection(visibleEntries[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: "-25% 0px -60% 0px",
        threshold: [0.1, 0.25, 0.5],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <nav
        className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 lg:px-8"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-2" onClick={closeMenu}>
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600 text-sm font-bold text-white">
            CB
          </span>

          <span className="text-lg font-bold tracking-tight text-slate-950">
            Content Buds
          </span>
        </a>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;

            return (
              <a
                key={link.label}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`relative text-sm font-medium transition-colors ${
                  isActive
                    ? "text-violet-600"
                    : "text-slate-600 hover:text-violet-600"
                }`}
              >
                {link.label}

                {isActive && (
                  <span className="absolute -bottom-2 left-0 h-0.5 w-full rounded-full bg-violet-600" />
                )}
              </a>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <a
            href="#contact"
            aria-current={activeSection === "contact" ? "page" : undefined}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold text-white! transition-colors ${
              activeSection === "contact"
                ? "bg-violet-600"
                : "bg-slate-950 hover:bg-violet-600"
            }`}
          >
            Let&apos;s talk
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-50 md:hidden"
          onClick={() => setMenuOpen((current) => !current)}
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          {menuOpen ? (
            <X size={20} aria-hidden="true" />
          ) : (
            <Menu size={20} aria-hidden="true" />
          )}
        </button>
      </nav>

      {/* Mobile navigation */}
      {menuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-slate-200 bg-white px-6 py-5 md:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;

              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={closeMenu}
                  aria-current={isActive ? "page" : undefined}
                  className={`rounded-xl px-4 py-3 text-base font-medium transition ${
                    isActive
                      ? "bg-violet-50 text-violet-600"
                      : "text-slate-700 hover:bg-slate-50 hover:text-violet-600"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}

            {/* Mobile CTA */}
            <a
              href="#contact"
              onClick={closeMenu}
              aria-current={activeSection === "contact" ? "page" : undefined}
              className={`mt-3 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold text-white! transition-colors ${
                activeSection === "contact"
                  ? "bg-violet-600"
                  : "bg-slate-950 hover:bg-violet-600"
              }`}
            >
              Let&apos;s talk
            </a>
          </div>
        </div>
      )}
    </header>
  );
}