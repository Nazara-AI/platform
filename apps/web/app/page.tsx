"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";

export default function Home() {
  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // No backend wired up yet — swap this for a real API call / form service.
    setSubmitted(true);
  }

  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900">
      <header className="sticky top-0 z-10 border-b border-gray-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-2">
          <div className="flex items-center gap-0">
            <Image src="/logo.svg" alt="Nazara AI" width={160} height={160} />
            <span className="-ml-4 text-xl font-bold tracking-tight">Nazara AI</span>
          </div>
          <a
            href="#early-access"
            className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700"
          >
            Join Early Access
          </a>
        </div>
      </header>

      <main className="flex-1">
        <section className="bg-gradient-to-b from-green-50 to-white px-6 py-24 text-center">
          <div className="mx-auto max-w-3xl">
            <Image
              src="/logo.svg"
              alt="Nazara AI"
              width={220}
              height={220}
              className="mx-auto mb-6"
            />
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              AI for Offshore Structural Design
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg text-gray-600">
              AI-powered QA/QC checks and reviews for structural engineers.
            </p>
            <a
              href="#early-access"
              className="mt-8 inline-block rounded-lg bg-green-600 px-8 py-3 font-semibold text-white transition hover:bg-green-700"
            >
              Request Early Access
            </a>
          </div>
        </section>

        <section className="px-6 py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight">What We Do</h2>
            <p className="mt-4 text-base leading-relaxed text-gray-600">
              Nazara AI builds intelligent AI agents that assist structural engineers
              by automating Quality Assurance (QA) and Quality Control (QC) checks
              and reviews. Our goal is to reduce repetitive manual work, improve
              design accuracy, and accelerate engineering workflows.
            </p>
          </div>
        </section>

        <section id="early-access" className="bg-gray-50 px-6 py-20">
          <div className="mx-auto max-w-md">
            <h2 className="text-center text-3xl font-bold tracking-tight">
              Join Our Early Access Program
            </h2>
            <p className="mt-3 text-center text-gray-600">
              Be among the first to bring AI-powered QA/QC to your structural
              design workflow.
            </p>

            {submitted ? (
              <div className="mt-8 rounded-xl border border-green-200 bg-white p-8 text-center">
                <p className="text-lg font-semibold">You&apos;re on the list.</p>
                <p className="mt-2 text-gray-600">
                  Thanks for signing up — we&apos;ll be in touch soon.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mt-8 flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-8"
              >
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="company" className="text-sm font-medium text-gray-700">
                    Company <span className="text-gray-400">(optional)</span>
                  </label>
                  <input
                    id="company"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-2 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
                >
                  Join Waitlist / Request Early Access
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 px-6 py-12 text-center text-gray-400">
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 flex items-center justify-center gap-0">
            <Image src="/logo.svg" alt="Nazara AI" width={72} height={72} />
            <span className="-ml-3 font-bold text-white">Nazara AI</span>
          </div>
          <div className="mb-4 flex justify-center gap-6 text-sm">
            <a href="mailto:info@nazara.ai" className="hover:text-white">
              info@nazara.ai
            </a>
            <a href="mailto:contact@nazara.ai" className="hover:text-white">
              contact@nazara.ai
            </a>
          </div>
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Nazara AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
