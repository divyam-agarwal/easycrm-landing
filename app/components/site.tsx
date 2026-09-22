import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-copper-600">
      {children}
    </p>
  );
}

export function Header() {
  const links = [
    ["Features", "#features"],
    ["How it works", "#how"],
    ["Pricing", "#pricing"],
    ["FAQ", "#faq"],
  ];
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink-950/85 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-6">
        <a href="#top" className="flex items-center gap-2.5 text-white">
          <Logo className="h-7 w-7" />
          <span className="text-[17px] font-semibold tracking-tight">
            Easy<span className="text-copper-400">CRM</span>
          </span>
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-sm text-white/65 transition-colors hover:text-white"
            >
              {label}
            </a>
          ))}
        </nav>
        <a
          href="#demo"
          className="rounded-md bg-copper-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-copper-600"
        >
          Book a demo
        </a>
      </Container>
    </header>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={className}>
      <rect width="32" height="32" rx="7" fill="#cc6b35" />
      <path
        d="M9 21.5 16 8l7 13.5H9Z"
        fill="none"
        stroke="#fff"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="17.5" r="2" fill="#fff" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="mt-auto border-t border-ink-700 bg-ink-950 py-12 text-white/55">
      <Container>
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5 text-white">
            <Logo className="h-6 w-6" />
            <span className="font-semibold tracking-tight">
              Easy<span className="text-copper-400">CRM</span>
            </span>
          </div>
          <nav className="flex flex-wrap gap-x-7 gap-y-3 text-sm">
            <a href="#features" className="hover:text-white">Features</a>
            <a href="#pricing" className="hover:text-white">Pricing</a>
            <a href="#faq" className="hover:text-white">FAQ</a>
            <a href="mailto:hello@saatvikminchem.com" className="hover:text-white">
              Contact
            </a>
          </nav>
        </div>
        <p className="mt-8 border-t border-white/10 pt-8 text-xs">
          © {new Date().getFullYear()} EasyCRM. Built for the people who move
          tonnes, not tickets.
        </p>
      </Container>
    </footer>
  );
}
