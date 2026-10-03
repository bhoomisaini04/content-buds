"use client";

import { FormEvent, useState } from "react";

type ContactForm = {
  name: string;
  email: string;
  message: string;
};

const initialForm: ContactForm = {
  name: "",
  email: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function updateField(field: keyof ContactForm, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    if (submitted) {
      setSubmitted(false);
    }

    if (error) {
      setError("");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Please complete all fields.");
      return;
    }

    setSubmitted(false);
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = (await response.json()) as {
        success?: boolean;
        message?: string;
        error?: string;
      };

      if (!response.ok) {
        throw new Error(data.error || "Unable to send your message.");
      }

      setSubmitted(true);
      setForm(initialForm);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to send your message right now."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section
      id="contact"
      className="scroll-mt-20 border-t border-slate-200 bg-white px-5 py-20 sm:px-8 lg:px-12 lg:py-28"
    >
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-violet-600">
            Contact
          </p>

          <h2 className="mt-4 max-w-md text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Have an idea?
            <span className="block text-violet-600">Let&apos;s build it.</span>
          </h2>

          <p className="mt-6 max-w-md text-base leading-7 text-slate-600">
            Tell us what you&apos;re working on, what you need, or where
            you&apos;re stuck. We&apos;ll help turn your idea into content
            that connects.
          </p>

          <div className="mt-8 rounded-2xl border border-violet-100 bg-violet-50 p-5">
            <p className="text-sm font-semibold text-slate-950">
              Content Buds
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Strategy, creativity, and AI working together to help modern
              brands create better content.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="contact-name"
                className="mb-2 block text-sm font-semibold text-slate-950"
              >
                Name
              </label>

              <input
                id="contact-name"
                type="text"
                value={form.name}
                onChange={(event) => updateField("name", event.target.value)}
                placeholder="Your name"
                required
                disabled={isLoading}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100 disabled:cursor-not-allowed disabled:bg-slate-100"
              />
            </div>

            <div>
              <label
                htmlFor="contact-email"
                className="mb-2 block text-sm font-semibold text-slate-950"
              >
                Email
              </label>

              <input
                id="contact-email"
                type="email"
                value={form.email}
                onChange={(event) => updateField("email", event.target.value)}
                placeholder="you@example.com"
                required
                disabled={isLoading}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100 disabled:cursor-not-allowed disabled:bg-slate-100"
              />
            </div>
          </div>

          <div className="mt-6">
            <label
              htmlFor="contact-message"
              className="mb-2 block text-sm font-semibold text-slate-950"
            >
              Tell us about your project
            </label>

            <textarea
              id="contact-message"
              rows={6}
              value={form.message}
              onChange={(event) => updateField("message", event.target.value)}
              placeholder="What would you like to create?"
              required
              disabled={isLoading}
              className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100 disabled:cursor-not-allowed disabled:bg-slate-100"
            />
          </div>

          {error && (
            <div
              role="alert"
              className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {error}
            </div>
          )}

          {submitted && (
            <div
              role="status"
              className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
            >
              Thanks! Your message has been received.
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-violet-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-violet-400"
          >
            {isLoading ? "Sending..." : "Send message →"}
          </button>

          <p className="mt-4 text-center text-xs text-slate-500">
            We&apos;ll get back to you as soon as possible.
          </p>
        </form>
      </div>
    </section>
  );
}