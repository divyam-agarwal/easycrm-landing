"use client";

import { useState, type FormEvent } from "react";

const inputClass =
  "w-full rounded-md border border-white/15 bg-ink-900 px-3.5 py-2.5 text-white placeholder:text-white/30 focus:border-copper-400 focus:outline-none focus:ring-1 focus:ring-copper-400";

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  required = true,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm text-white/70">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        className={inputClass}
      />
    </div>
  );
}

export function DemoForm({
  endpoint,
  email,
}: {
  endpoint: string;
  email: string;
}) {
  const [handedOff, setHandedOff] = useState(false);

  // With no form backend configured, compose the enquiry into the visitor's
  // own mail client. Set `endpoint` to post to Formspree/Resend instead.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    if (endpoint) return;
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const value = (key: string) => String(data.get(key) ?? "").trim();

    const subject = `Demo request — ${value("company") || value("name")}`;
    const body = [
      `Name: ${value("name")}`,
      `Company: ${value("company")}`,
      `Email: ${value("email")}`,
      `Phone: ${value("phone")}`,
      "",
      "What they trade in:",
      value("about") || "(not specified)",
    ].join("\n");

    window.location.href = `mailto:${email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setHandedOff(true);
  }

  if (handedOff) {
    return (
      <div className="flex flex-col items-start justify-center rounded-xl border border-copper-500/40 bg-white/[0.04] p-8 sm:p-10">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-copper-400">
          Almost there
        </p>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight">
          Your email client should be open.
        </h3>
        <p className="mt-3 leading-relaxed text-white/70">
          We have filled in the details for you — just hit send. If nothing
          opened, write to us directly at{" "}
          <a
            href={`mailto:${email}`}
            className="text-copper-300 underline underline-offset-4 hover:text-copper-100"
          >
            {email}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setHandedOff(false)}
          className="mt-6 text-sm text-white/50 underline underline-offset-4 hover:text-white"
        >
          Back to the form
        </button>
      </div>
    );
  }

  return (
    <form
      {...(endpoint ? { action: endpoint, method: "post" } : {})}
      onSubmit={handleSubmit}
      className="rounded-xl border border-white/12 bg-white/[0.04] p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" autoComplete="name" />
        <Field label="Company" name="company" autoComplete="organization" />
        <Field
          label="Work email"
          name="email"
          type="email"
          autoComplete="email"
        />
        <Field label="Phone" name="phone" type="tel" autoComplete="tel" />
      </div>
      <div className="mt-5">
        <label htmlFor="about" className="mb-2 block text-sm text-white/70">
          What do you trade in?
        </label>
        <textarea
          id="about"
          name="about"
          rows={3}
          placeholder="e.g. industrial minerals, 40 active buyers, 6 sales staff"
          className={inputClass}
        />
      </div>
      <button
        type="submit"
        className="mt-6 w-full rounded-md bg-copper-500 px-5 py-3 text-sm font-medium transition-colors hover:bg-copper-600"
      >
        Request a demo
      </button>
      <p className="mt-3 text-center text-xs text-white/40">
        We reply within one working day.
      </p>
    </form>
  );
}
