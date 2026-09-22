import Link from "next/link";
import { Container, Footer, Header } from "./components/site";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex flex-1 items-center bg-ink-950 py-28 text-white">
        <Container>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-copper-400">
            404
          </p>
          <h1 className="mt-4 max-w-2xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            This page has gone off-spec.
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/70">
            The link you followed does not exist. The rest of EasyCRM is still
            right where you left it.
          </p>
          <Link
            href="/"
            className="mt-8 inline-block rounded-md bg-copper-600 px-6 py-3 text-sm font-medium transition-colors hover:bg-copper-700"
          >
            Back to the homepage
          </Link>
        </Container>
      </main>
      <Footer />
    </>
  );
}
