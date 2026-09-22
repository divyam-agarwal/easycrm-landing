import { Container, Eyebrow, Footer, Header } from "./components/site";
import { DemoForm } from "./components/demo-form";

// TODO: replace with a real endpoint (Formspree / Resend / your own API route).
// Until this is set, the demo form falls back to an email link.
const FORM_ENDPOINT = "";

const CONTACT_EMAIL = "admin@saatvikminchem.com";
const SITE_URL = "https://crm.saatvikminchem.com";

const features = [
  {
    title: "Quotations that speak your language",
    body: "Grade, assay, packing, incoterm and price per MT — built into the quote, not stuffed into a notes field. Revise a quote and every version stays on record.",
  },
  {
    title: "Batch and COA traceability",
    body: "Link each dispatch to its batch number and certificate of analysis. When a buyer queries a consignment two years later, it takes ten seconds to answer.",
  },
  {
    title: "Repeat-buyer intelligence",
    body: "See who reorders every quarter and who has gone quiet. EasyCRM flags the accounts drifting off their usual cycle before you lose them.",
  },
  {
    title: "Credit terms you can see",
    body: "Outstanding, ageing and credit limit sit on the account page. Your team knows before they promise 90 days to a buyer already 120 days overdue.",
  },
  {
    title: "Sample to order tracking",
    body: "Most industrial deals start with a sample. Track dispatch, follow-up and approval so samples turn into orders instead of quietly dying.",
  },
  {
    title: "Price lists that hold up",
    body: "Versioned price lists per buyer and per grade, with landed-cost workings attached. No more hunting for which rate was agreed in March.",
  },
];

const steps = [
  {
    n: "01",
    title: "Import what you already have",
    body: "Bring in your buyer list, product grades and open enquiries from Excel. You can be working the same day — no implementation consultant and no six-week onboarding.",
  },
  {
    n: "02",
    title: "Run enquiries through one pipeline",
    body: "Every enquiry, quote, sample and order moves through stages your team actually uses. Nothing sits in an inbox where only one person can see it.",
  },
  {
    n: "03",
    title: "Know your book cold",
    body: "Open quote value, expected dispatch, ageing receivables and reorder risk — on one screen, updated as your team works rather than at month end.",
  },
];

const tiers = [
  {
    name: "Starter",
    price: "₹2,400",
    unit: "/month",
    note: "Up to 3 users",
    body: "For a small trading desk getting off spreadsheets.",
    features: [
      "Buyer & supplier records",
      "Enquiry-to-order pipeline",
      "Quotations with grade specs",
      "Email support",
    ],
    cta: "Start free trial",
    featured: false,
  },
  {
    name: "Growth",
    price: "₹6,900",
    unit: "/month",
    note: "Up to 10 users",
    body: "For distributors running samples, credit and repeat accounts.",
    features: [
      "Everything in Starter",
      "Batch & COA traceability",
      "Credit limits and ageing",
      "Versioned price lists",
      "Reorder-risk alerts",
      "WhatsApp & email logging",
    ],
    cta: "Start free trial",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Talk to us",
    unit: "",
    note: "Unlimited users",
    body: "For multi-location operations with their own ERP.",
    features: [
      "Everything in Growth",
      "Tally / SAP / ERP sync",
      "Custom roles & approvals",
      "Onboarding & data migration",
      "Dedicated account manager",
    ],
    cta: "Book a demo",
    featured: false,
  },
];

const faqs = [
  {
    q: "Is this just a generic CRM with chemical words pasted on?",
    a: "No. Grades, assays, packing, batch numbers, COAs and price-per-tonne are first-class fields, not custom fields you have to build yourself. A generic CRM can be bent into this shape over several weeks of configuration — EasyCRM arrives that way.",
  },
  {
    q: "We already run Tally. Does this replace it?",
    a: "It does not. Tally stays your book of record for accounting. EasyCRM handles everything before the invoice — enquiries, quotes, samples, follow-ups — and syncs the resulting orders across on the Enterprise plan.",
  },
  {
    q: "How long does it take to get running?",
    a: "Importing buyers and open enquiries from Excel takes under an hour, so you can start working the same day. Batch traceability and price lists take a little longer to set up properly against your grade list.",
  },
  {
    q: "Our sales happen on WhatsApp. Is that a problem?",
    a: "It is the normal case in this industry, so EasyCRM is built for it. Conversations can be logged against the buyer record so the deal history survives a salesperson leaving.",
  },
  {
    q: "Can we try it before committing?",
    a: "Yes — 14 days, no card required. Send a slice of your real data and you can evaluate it against your own book rather than a demo dataset.",
  },
];


// Structured data, derived from the arrays above so it always matches what is
// rendered. Only claims we can actually support — no ratings or review counts.
function StructuredData() {
  const organization = {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "EasyCRM",
    url: SITE_URL,
    email: CONTACT_EMAIL,
    description:
      "CRM software for chemicals and minerals distributors, covering quotations, batch traceability and repeat-buyer follow-ups.",
  };

  const software = {
    "@type": "SoftwareApplication",
    "@id": `${SITE_URL}/#software`,
    name: "EasyCRM",
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Customer Relationship Management",
    operatingSystem: "Web",
    url: SITE_URL,
    publisher: { "@id": `${SITE_URL}/#organization` },
    description:
      "A CRM built for chemicals and minerals distributors: grade-aware quotations, batch and COA traceability, credit terms and reorder-risk alerts.",
    offers: tiers
      .filter((t) => t.price.startsWith("\u20b9"))
      .map((t) => ({
        "@type": "Offer",
        name: t.name,
        price: t.price.replace(/[^0-9]/g, ""),
        priceCurrency: "INR",
        description: t.body,
      })),
  };

  const faqPage = {
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [organization, software, faqPage],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}

export default function Home() {
  return (
    <>
      <StructuredData />
      <Header />

      <main id="top">
        {/* Hero */}
        <section className="relative overflow-hidden bg-slate-950 text-white">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-40 left-1/2 h-[34rem] w-[64rem] -translate-x-1/2 rounded-full bg-teal-500/20 blur-[120px]"
          />
          <Container className="relative py-20 sm:py-28">
            <div className="max-w-3xl">
              <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-teal-300">
                Built for industrial manufacturers &amp; distributors
              </p>
              <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.4rem]">
                The CRM that understands tonnage, not just tickets.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
                EasyCRM keeps quotations, grade specs, batch records and
                repeat-buyer follow-ups in one place — so your desk stops
                running on spreadsheets, WhatsApp threads and the one person
                who remembers everything.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#demo"
                  className="rounded-md bg-teal-600 px-6 py-3 text-center text-sm font-medium transition-colors hover:bg-teal-700"
                >
                  Book a 20-minute demo
                </a>
                <a
                  href="#features"
                  className="rounded-md border border-white/20 px-6 py-3 text-center text-sm font-medium text-white/85 transition-colors hover:border-white/40 hover:text-white"
                >
                  See what it does
                </a>
              </div>
              <p className="mt-5 text-sm text-white/60">
                14-day trial · No card required · Import from Excel in an hour
              </p>
            </div>
          </Container>

          {/* Trust strip */}
          <div className="relative border-t border-white/10">
            <Container className="grid grid-cols-2 gap-px sm:grid-cols-4">
              {[
                ["Built for", "Manufacturers & distributors"],
                ["Setup", "Import from Excel"],
                ["Trial", "14 days, no card"],
                ["Support", "India, IST hours"],
              ].map(([label, value]) => (
                <div key={label} className="py-7 sm:py-8">
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/60">
                    {label}
                  </p>
                  <p className="mt-1.5 text-xl font-semibold text-teal-300">
                    {value}
                  </p>
                </div>
              ))}
            </Container>
          </div>
        </section>

        {/* Problem */}
        <section className="border-b border-slate-900/10 bg-teal-50/60 py-20 sm:py-24">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
              <div>
                <Eyebrow>The problem</Eyebrow>
                <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                  Your pipeline is real. It is just scattered across five
                  places.
                </h2>
              </div>
              <div className="space-y-5 text-lg leading-relaxed text-slate-700">
                <p>
                  The enquiry came in on WhatsApp. The quote is in someone&apos;s
                  Sent folder. The agreed rate was settled on a call. The COA
                  is a photo on a phone. The buyer&apos;s outstanding is in Tally,
                  which the sales team cannot open.
                </p>
                <p>
                  None of that is a discipline problem — it is what happens
                  when the tools were never built for how industrial distribution
                  actually works. Generic CRMs assume a software sales cycle:
                  clean stages, credit cards, no batch numbers, no 90-day terms.
                </p>
                <p className="font-medium text-slate-900">
                  EasyCRM starts from your workflow instead of asking you to
                  adopt someone else&apos;s.
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* Features */}
        <section id="features" className="scroll-mt-16 py-20 sm:py-28">
          <Container>
            <div className="max-w-2xl">
              <Eyebrow>What you get</Eyebrow>
              <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                Everything the desk needs. Nothing it doesn&apos;t.
              </h2>
            </div>
            <div className="mt-14 grid gap-px overflow-hidden rounded-xl bg-slate-900/10 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f) => (
                <div key={f.title} className="bg-white p-7 sm:p-8">
                  <h3 className="text-lg font-semibold tracking-tight">
                    {f.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-slate-700">{f.body}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* How it works */}
        <section
          id="how"
          className="scroll-mt-16 bg-slate-950 py-20 text-white sm:py-28"
        >
          <Container>
            <div className="max-w-2xl">
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-teal-400">
                How it works
              </p>
              <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                Three steps. No six-month rollout.
              </h2>
            </div>
            <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
              {steps.map((s) => (
                <li key={s.n} className="border-t border-white/15 pt-6">
                  <span className="font-mono text-sm text-teal-400">
                    {s.n}
                  </span>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight">
                    {s.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-white/65">{s.body}</p>
                </li>
              ))}
            </ol>
          </Container>
        </section>

        {/* Pricing */}
        <section id="pricing" className="scroll-mt-16 py-20 sm:py-28">
          <Container>
            <div className="max-w-2xl">
              <Eyebrow>Pricing</Eyebrow>
              <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                Priced for a trading desk, not a tech company.
              </h2>
              <p className="mt-4 text-lg text-slate-700">
                Billed monthly. Cancel any time. All plans include the full
                enquiry-to-order pipeline.
              </p>
            </div>
            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {tiers.map((t) => (
                <div
                  key={t.name}
                  className={`flex flex-col rounded-xl border p-7 sm:p-8 ${
                    t.featured
                      ? "border-teal-500 bg-slate-950 text-white shadow-xl shadow-slate-900/10"
                      : "border-slate-900/12 bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg font-semibold tracking-tight">
                      {t.name}
                    </h3>
                    {t.featured && (
                      <span className="rounded-full bg-teal-600 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider">
                        Most picked
                      </span>
                    )}
                  </div>
                  <p
                    className={`mt-1.5 text-sm ${
                      t.featured ? "text-white/55" : "text-slate-600"
                    }`}
                  >
                    {t.note}
                  </p>
                  <p className="mt-6 flex items-baseline gap-1.5">
                    <span className="text-4xl font-semibold tracking-tight">
                      {t.price}
                    </span>
                    <span
                      className={
                        t.featured ? "text-white/55" : "text-slate-600"
                      }
                    >
                      {t.unit}
                    </span>
                  </p>
                  <p
                    className={`mt-4 leading-relaxed ${
                      t.featured ? "text-white/70" : "text-slate-700"
                    }`}
                  >
                    {t.body}
                  </p>
                  <ul className="mt-6 flex-1 space-y-2.5 text-sm">
                    {t.features.map((f) => (
                      <li key={f} className="flex gap-2.5">
                        <span
                          aria-hidden
                          className={
                            t.featured ? "text-teal-400" : "text-teal-500"
                          }
                        >
                          ✓
                        </span>
                        <span
                          className={
                            t.featured ? "text-white/80" : "text-slate-700"
                          }
                        >
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#demo"
                    className={`mt-8 rounded-md px-5 py-3 text-center text-sm font-medium transition-colors ${
                      t.featured
                        ? "bg-teal-600 text-white hover:bg-teal-700"
                        : "border border-slate-900/15 hover:border-slate-900/35"
                    }`}
                  >
                    {t.cta}
                  </a>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* FAQ */}
        <section
          id="faq"
          className="scroll-mt-16 border-y border-slate-900/10 bg-teal-50/60 py-20 sm:py-28"
        >
          <Container>
            <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
              <div>
                <Eyebrow>Questions</Eyebrow>
                <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                  The questions worth asking before you switch.
                </h2>
              </div>
              <div className="divide-y divide-slate-900/12 border-y border-slate-900/12">
                {faqs.map((f) => (
                  <details key={f.q} className="group py-5">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-lg font-medium tracking-tight marker:content-none">
                      {f.q}
                      <span
                        aria-hidden
                        className="mt-1 shrslate-0 text-teal-500 transition-transform group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <p className="mt-3 max-w-2xl leading-relaxed text-slate-700">
                      {f.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* Demo / CTA */}
        <section
          id="demo"
          className="scroll-mt-16 bg-slate-950 py-20 text-white sm:py-28"
        >
          <Container>
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <p className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-teal-400">
                  Book a demo
                </p>
                <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                  Twenty minutes, your own data, no slide deck.
                </h2>
                <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/70">
                  Send us a slice of your buyer list and open enquiries. We will
                  load it in and walk your team through their own book — not a
                  demo account full of invented companies.
                </p>
                <p className="mt-8 text-sm text-white/60">
                  Prefer email?{" "}
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-teal-300 underline underline-offset-4 hover:text-teal-100"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </p>
              </div>

              <DemoForm endpoint={FORM_ENDPOINT} email={CONTACT_EMAIL} />
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}
