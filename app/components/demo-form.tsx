const inputClass =
  "w-full rounded-md border border-white/15 bg-slate-900 px-3.5 py-2.5 text-white placeholder:text-white/50 focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-400";

function Field({
  label,
  name,
  type = "text",
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
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
        required
        className={inputClass}
      />
    </div>
  );
}

// No form backend is configured, so the enquiry is composed into the visitor's
// own mail client. This is deliberately plain DOM rather than a React client
// component: it keeps the whole page free of the client-side React runtime.
function handoffScript(email: string) {
  return `
(function () {
  var form = document.getElementById('demo-form');
  var done = document.getElementById('demo-sent');
  if (!form || !done) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var v = function (id) {
      var el = document.getElementById(id);
      return el ? el.value.trim() : '';
    };
    var subject = 'Demo request \\u2014 ' + (v('company') || v('name'));
    var body = [
      'Name: ' + v('name'),
      'Company: ' + v('company'),
      'Email: ' + v('email'),
      'Phone: ' + v('phone'),
      '',
      'What they trade in:',
      v('about') || '(not specified)'
    ].join('\\n');
    window.location.href = 'mailto:${email}?subject=' +
      encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    form.hidden = true;
    done.hidden = false;
  });
  var back = document.getElementById('demo-back');
  if (back) back.addEventListener('click', function () {
    done.hidden = true;
    form.hidden = false;
  });
})();`;
}

export function DemoForm({
  endpoint,
  email,
}: {
  endpoint: string;
  email: string;
}) {
  return (
    <>
      <form
        id="demo-form"
        {...(endpoint ? { action: endpoint, method: "post" } : {})}
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
          className="mt-6 w-full rounded-md bg-teal-600 px-5 py-3 text-sm font-medium transition-colors hover:bg-teal-700"
        >
          Request a demo
        </button>
        <p className="mt-3 text-center text-xs text-white/60">
          We reply within one working day.
        </p>
      </form>

      <div
        id="demo-sent"
        hidden
        className="flex flex-col items-start justify-center rounded-xl border border-teal-600/40 bg-white/[0.04] p-8 sm:p-10"
      >
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-teal-400">
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
            className="text-teal-300 underline underline-offset-4 hover:text-teal-100"
          >
            {email}
          </a>
          .
        </p>
        <button
          type="button"
          id="demo-back"
          className="mt-6 text-sm text-white/60 underline underline-offset-4 hover:text-white"
        >
          Back to the form
        </button>
      </div>

      <script dangerouslySetInnerHTML={{ __html: handoffScript(email) }} />
    </>
  );
}
