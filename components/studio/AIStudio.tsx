"use client";

import { FormEvent, useState } from "react";
import { Check, Copy, RefreshCw, Sparkles } from "lucide-react";

type FormData = {
  brief: string;
  contentType: string;
  audience: string;
  tone: string;
  keywords: string;
};

const initialFormData: FormData = {
  brief: "",
  contentType: "Social Media Post",
  audience: "",
  tone: "Professional",
  keywords: "",
};

export default function AIStudio() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [error, setError] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  function updateField(field: keyof FormData, value: string) {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));

    if (error) {
      setError("");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!formData.brief.trim() || !formData.audience.trim()) {
      setError("Please complete the brief and target audience.");
      return;
    }

    setError("");
    setGeneratedContent("");
    setCopied(false);
    setIsLoading(true);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = (await response.json()) as {
        content?: string;
        error?: string;
      };

      if (!response.ok) {
        throw new Error(data.error || "Unable to generate content.");
      }

      if (!data.content?.trim()) {
        throw new Error("The AI returned an empty response.");
      }

      setGeneratedContent(data.content);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  function handleClear() {
    setFormData(initialFormData);
    setError("");
    setGeneratedContent("");
    setCopied(false);
  }

  async function handleCopy() {
    if (!generatedContent) {
      return;
    }

    try {
      await navigator.clipboard.writeText(generatedContent);

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setError("Unable to copy the generated content.");
    }
  }

  return (
    <section
      id="ai-studio"
      className="border-t border-slate-200 bg-slate-50 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-600">
            AI Studio
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Turn your brief into better content.
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600">
            Tell us what you want to create. Content Buds will use your brief,
            audience, and tone to prepare content designed for your needs.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <form
            id="content-generator-form"
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="brief"
                className="block text-sm font-semibold text-slate-900"
              >
                What do you want to create?
              </label>

              <textarea
                id="brief"
                rows={5}
                value={formData.brief}
                onChange={(event) =>
                  updateField("brief", event.target.value)
                }
                placeholder="Example: Create a launch post for a sustainable coffee brand targeting young professionals."
                className="mt-2 w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="contentType"
                  className="block text-sm font-semibold text-slate-900"
                >
                  Content type
                </label>

                <select
                  id="contentType"
                  value={formData.contentType}
                  onChange={(event) =>
                    updateField("contentType", event.target.value)
                  }
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                >
                  <option>Social Media Post</option>
                  <option>Blog Introduction</option>
                  <option>Product Description</option>
                  <option>Email Copy</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="tone"
                  className="block text-sm font-semibold text-slate-900"
                >
                  Tone
                </label>

                <select
                  id="tone"
                  value={formData.tone}
                  onChange={(event) =>
                    updateField("tone", event.target.value)
                  }
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                >
                  <option>Professional</option>
                  <option>Friendly</option>
                  <option>Confident</option>
                  <option>Playful</option>
                  <option>Informative</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="audience"
                className="block text-sm font-semibold text-slate-900"
              >
                Target audience
              </label>

              <input
                id="audience"
                type="text"
                value={formData.audience}
                onChange={(event) =>
                  updateField("audience", event.target.value)
                }
                placeholder="Example: Young professionals aged 22–35"
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
              />
            </div>

            <div>
              <label
                htmlFor="keywords"
                className="block text-sm font-semibold text-slate-900"
              >
                Keywords
                <span className="ml-2 font-normal text-slate-400">
                  Optional
                </span>
              </label>

              <input
                id="keywords"
                type="text"
                value={formData.keywords}
                onChange={(event) =>
                  updateField("keywords", event.target.value)
                }
                placeholder="Example: sustainable, premium, morning routine"
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
              />

              <p className="mt-2 text-xs text-slate-500">
                Separate multiple keywords with commas.
              </p>
            </div>

            {error && (
              <div
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {error}
              </div>
            )}

            <div className="flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row">
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-violet-400"
              >
                {isLoading ? (
                  <>
                    <span
                      className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                      aria-hidden="true"
                    />
                    Generating...
                  </>
                ) : (
                  "Generate Content →"
                )}
              </button>

              <button
                type="button"
                onClick={handleClear}
                disabled={isLoading}
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Clear
              </button>
            </div>
          </form>

          {generatedContent && (
            <div className="mt-8 border-t border-slate-200 pt-8">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <div className="flex items-center gap-2 text-violet-600">
                    <Sparkles size={16} aria-hidden="true" />

                    <p className="text-xs font-semibold uppercase tracking-[0.18em]">
                      Generated Content
                    </p>
                  </div>

                  <h3 className="mt-2 text-lg font-semibold text-slate-950">
                    Your content is ready
                  </h3>
                </div>

                <span className="w-fit rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                  Ready
                </span>
              </div>

              <div className="mt-5 rounded-2xl border border-violet-100 bg-violet-50/50 p-5 sm:p-6">
                <p className="whitespace-pre-wrap text-sm leading-7 text-slate-700">
                  {generatedContent}
                </p>
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-slate-400 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
                >
                  {copied ? (
                    <>
                      <Check size={16} aria-hidden="true" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy size={16} aria-hidden="true" />
                      Copy
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
  const form = document.getElementById(
    "content-generator-form"
  ) as HTMLFormElement | null;

  form?.requestSubmit();
}}
                  disabled={isLoading}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <RefreshCw
                    size={16}
                    className={isLoading ? "animate-spin" : ""}
                    aria-hidden="true"
                  />

                  {isLoading ? "Regenerating..." : "Regenerate"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}