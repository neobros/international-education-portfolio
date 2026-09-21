import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion, useAnimation } from "motion/react";
import { ChevronDown, Mail, MessageCircle, Pencil, Upload } from "lucide-react";
import { CONTACT, FORM_OPTIONS } from "../data/content";
import { PREFILL_EVENT } from "./Destinations";
import { Button, EASE, Reveal, SectionHeading } from "./ui";

type Values = {
  name: string;
  wa: string;
  email: string;
  qual: string;
  eng: string;
  area: string;
  budget: string;
  countries: string;
};

const INITIAL: Values = {
  name: "",
  wa: "",
  email: "",
  qual: "",
  eng: FORM_OPTIONS.english[0],
  area: "",
  budget: FORM_OPTIONS.budget[0],
  countries: "",
};

const RULES: Partial<Record<keyof Values, [(v: string) => boolean, string]>> = {
  name: [(v) => v.trim().length > 1, "Enter your name."],
  wa: [(v) => v.replace(/\D/g, "").length >= 8, "Enter a WhatsApp number with country code."],
  email: [(v) => /^\S+@\S+\.\S+$/.test(v), "Enter a valid email address."],
  qual: [(v) => !!v, "Select your qualification."],
};

function Field({
  id,
  label,
  error,
  full,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  full?: boolean;
  children: ReactNode;
}) {
  return (
    <div className={`relative ${full ? "sm:col-span-2" : ""}`}>
      {children}
      <label htmlFor={id} className="pointer-events-none absolute left-4 top-2 text-[11px] font-semibold uppercase tracking-wider text-mute">
        {label}
      </label>
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-err`}
            className="mt-1.5 pl-1 text-xs font-medium text-rose-400"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function SelectBox(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select {...props} className="field-input pr-10" />
      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-mute" />
    </div>
  );
}

export function Contact() {
  const [v, setV] = useState<Values>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [cv, setCv] = useState<string>("");
  const [sent, setSent] = useState(false);
  const shake = useAnimation();

  useEffect(() => {
    const fill = (e: Event) => setV((s) => ({ ...s, countries: (e as CustomEvent<string>).detail }));
    window.addEventListener(PREFILL_EVENT, fill);
    return () => window.removeEventListener(PREFILL_EVENT, fill);
  }, []);

  const set = (k: keyof Values) => (e: { target: { value: string } }) => {
    setV((s) => ({ ...s, [k]: e.target.value }));
    if (errors[k]) setErrors((s) => ({ ...s, [k]: undefined }));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    (Object.keys(RULES) as (keyof Values)[]).forEach((k) => {
      const [test, msg] = RULES[k]!;
      if (!test(v[k])) next[k] = msg;
    });
    setErrors(next);
    const first = Object.keys(next)[0];
    if (first) {
      shake.start({ x: [0, -10, 10, -6, 6, 0], transition: { duration: 0.45 } });
      document.getElementById(first)?.focus();
      return;
    }
    setSent(true);
  };

  const msg = `Hello, I'd like help choosing where to study.

Name: ${v.name}
WhatsApp: ${v.wa}
Email: ${v.email}
Highest qualification: ${v.qual}
English test: ${v.eng}
Study area: ${v.area || "-"}
Budget: ${v.budget}
Countries considering: ${v.countries || "-"}`;
  const waHref = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(msg)}`;
  const mailHref = `mailto:${CONTACT.email}?subject=${encodeURIComponent("Study abroad profile: " + v.name)}&body=${encodeURIComponent(msg)}`;

  const inputProps = (k: keyof Values) => ({
    id: k,
    value: v[k],
    onChange: set(k),
    "aria-invalid": !!errors[k],
    "aria-describedby": errors[k] ? `${k}-err` : undefined,
  });

  return (
    <section id="contact" className="relative overflow-hidden py-28 md:py-40">
      <div className="fade-y pointer-events-none absolute inset-0 bg-[radial-gradient(50%_50%_at_0%_50%,rgba(255,122,82,0.16),transparent),radial-gradient(40%_50%_at_100%_100%,rgba(45,212,191,0.12),transparent)]" />
      <div className="wrap relative grid items-start gap-14 lg:grid-cols-[1fr_1.2fr]">
        <div className="lg:sticky lg:top-32">
          <SectionHeading
            eyebrow="Send your profile"
            title="Not sure which country is right for you?"
            lede="Don't choose a country before you understand your options. Send your academic profile and I'll help you explore destinations that suit your background and goals."
          />
          <Reveal delay={0.3}>
            <p className="mt-6 text-mute">
              Prefer to talk first? <span className="font-semibold text-ink">Book a consultation</span> and mention it in the form.
            </p>
          </Reveal>
        </div>

        <motion.div
          className="glass relative rounded-[32px] p-6 md:p-9"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE }}
        >
          <AnimatePresence mode="wait">
            {!sent ? (
              <motion.form
                key="form"
                noValidate
                onSubmit={submit}
                animate={shake}
                exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
                transition={{ duration: 0.4 }}
                className="grid gap-4 sm:grid-cols-2"
              >
                <Field id="name" label="Full name" error={errors.name}>
                  <input {...inputProps("name")} autoComplete="name" className="field-input" />
                </Field>
                <Field id="wa" label="WhatsApp number" error={errors.wa}>
                  <input {...inputProps("wa")} type="tel" autoComplete="tel" placeholder="+94 …" className="field-input placeholder:text-mute/50" />
                </Field>
                <Field id="email" label="Email" error={errors.email} full>
                  <input {...inputProps("email")} type="email" autoComplete="email" className="field-input" />
                </Field>
                <Field id="qual" label="Highest qualification" error={errors.qual}>
                  <SelectBox {...inputProps("qual")}>
                    <option value="">Select</option>
                    {FORM_OPTIONS.qualifications.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </SelectBox>
                </Field>
                <Field id="eng" label="English test status">
                  <SelectBox {...inputProps("eng")}>
                    {FORM_OPTIONS.english.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </SelectBox>
                </Field>
                <Field id="area" label="Preferred study area">
                  <input {...inputProps("area")} placeholder="e.g. IT, nursing" className="field-input placeholder:text-mute/50" />
                </Field>
                <Field id="budget" label="Budget range (per year)">
                  <SelectBox {...inputProps("budget")}>
                    {FORM_OPTIONS.budget.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </SelectBox>
                </Field>
                <Field id="countries" label="Countries you're considering" full>
                  <input {...inputProps("countries")} placeholder="e.g. Australia, UK, open to ideas" className="field-input placeholder:text-mute/50" />
                </Field>

                <label
                  htmlFor="cv"
                  className="group flex cursor-pointer items-center gap-4 rounded-2xl border border-dashed border-white/15 p-4 transition hover:border-wattle/60 hover:bg-white/[0.03] sm:col-span-2"
                >
                  <span className="grid size-11 place-items-center rounded-xl bg-wattle/15 text-wattle transition group-hover:scale-110">
                    <Upload className="size-5" />
                  </span>
                  <span className="text-sm">
                    <span className="block font-semibold">{cv || "Upload CV (optional)"}</span>
                    <span className="text-mute">PDF, DOC or DOCX</span>
                  </span>
                  <input id="cv" type="file" accept=".pdf,.doc,.docx" className="sr-only" onChange={(e) => setCv(e.target.files?.[0]?.name ?? "")} />
                </label>

                <div className="pt-2 sm:col-span-2">
                  <Button type="submit">Send my profile</Button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="sent"
                role="status"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="py-6 text-center"
              >
                <svg viewBox="0 0 80 80" className="mx-auto size-24">
                  <motion.circle cx="40" cy="40" r="36" fill="none" stroke="url(#ok)" strokeWidth="4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8 }} />
                  <motion.path
                    d="M24 41 L35 52 L57 29"
                    fill="none"
                    stroke="#2dd4bf"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  />
                  <defs>
                    <linearGradient id="ok" x1="0" x2="1">
                      <stop offset="0" stopColor="#ffb23f" />
                      <stop offset="1" stopColor="#2dd4bf" />
                    </linearGradient>
                  </defs>
                </svg>
                <h3 className="mt-6 text-3xl font-extrabold">Profile ready to send</h3>
                <p className="mx-auto mt-3 max-w-[40ch] text-mute">Choose how to send it. {cv ? "Attach your CV in the message." : "Attach your CV in the message if you have one."}</p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <a href={waHref} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 font-bold text-night transition hover:scale-105">
                    <MessageCircle className="size-5" /> Send on WhatsApp
                  </a>
                  <a href={mailHref} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 font-bold transition hover:bg-white/5">
                    <Mail className="size-5" /> Send by email
                  </a>
                  <button type="button" onClick={() => setSent(false)} className="inline-flex items-center gap-2 rounded-full px-5 py-3.5 font-semibold text-mute hover:text-ink">
                    <Pencil className="size-4" /> Edit details
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
