import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { ArrowUpRight, ChevronDown, RotateCcw, X } from "lucide-react";
import {
  DEST_INFO,
  DEST_INFO_KEYS,
  DESTINATIONS,
  PRIORITIES,
  STUDY_FIELDS,
  type Destination,
  type FieldKey,
  type PriorityKey,
} from "../data/content";
import { lockScroll, scrollToId } from "../lib/scroll";
import { EASE, Reveal, SectionHeading, spotlight } from "./ui";

export const PREFILL_EVENT = "prefill-country";

function Modal({ d, onClose }: { d: Destination; onClose: () => void }) {
  useEffect(() => {
    lockScroll(true);
    const key = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", key);
    return () => {
      lockScroll(false);
      window.removeEventListener("keydown", key);
    };
  }, [onClose]);

  const info = DEST_INFO[d.c] ?? {};
  const ask = () => {
    window.dispatchEvent(new CustomEvent(PREFILL_EVENT, { detail: d.n }));
    onClose();
    setTimeout(() => scrollToId("#contact"), 80);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[80] grid place-items-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="dlg-title"
    >
      <motion.div className="absolute inset-0 bg-night/70 backdrop-blur-md" onClick={onClose} />
      <motion.div
        className="relative flex max-h-[88vh] w-full max-w-[640px] flex-col overflow-hidden rounded-[28px] border border-white/10 bg-deep shadow-2xl"
        initial={{ y: 60, scale: 0.94, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 40, scale: 0.96, opacity: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <div className="relative flex items-center gap-4 overflow-hidden border-b border-white/10 p-6">
          <div className="absolute inset-0 bg-gradient-to-r from-wattle/15 via-transparent to-reef/10" />
          <motion.span className="relative text-5xl" initial={{ rotate: -20, scale: 0.5 }} animate={{ rotate: 0, scale: 1 }} transition={{ type: "spring", delay: 0.15 }}>
            {d.f}
          </motion.span>
          <div className="relative">
            <h3 id="dlg-title" className="text-3xl font-extrabold">
              {d.n}
            </h3>
            <p className="text-sm text-mute">{d.st === "reg" ? "Registered destination" : "Enquire for current options"}</p>
          </div>
          <button onClick={onClose} className="relative ml-auto grid size-11 place-items-center rounded-full border border-white/15 transition hover:rotate-90 hover:bg-white/10" aria-label="Close">
            <X className="size-5" />
          </button>
        </div>
        <dl className="grid overflow-y-auto p-6 sm:grid-cols-[180px_1fr]" data-lenis-prevent>
          {DEST_INFO_KEYS.map((k) => (
            <Fragment key={k}>
              <dt className="border-t border-white/[0.06] pt-3 text-sm font-bold sm:pb-3">{k}</dt>
              <dd className={`border-white/[0.06] pb-3 text-sm sm:border-t sm:pt-3 ${info[k] ? "text-ink/85" : "text-mute"}`}>{info[k] ?? "Ask for current details"}</dd>
            </Fragment>
          ))}
        </dl>
        <div className="border-t border-white/10 p-6">
          <button
            onClick={ask}
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-wattle via-coral to-ochre px-6 py-3.5 font-bold text-night"
          >
            Ask about {d.n} <ArrowUpRight className="size-4 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Destinations() {
  const [field, setField] = useState<FieldKey | "">("");
  const [prios, setPrios] = useState<PriorityKey[]>([]);
  const [open, setOpen] = useState<Destination | null>(null);
  const close = useCallback(() => setOpen(null), []);

  const matches = (d: Destination) => (!field || d.fields.includes(field)) && prios.every((p) => d.p.includes(p));
  const active = !!field || prios.length > 0;

  const sorted = useMemo(() => {
    if (!active) return DESTINATIONS;
    return [...DESTINATIONS].sort((a, b) => Number(matches(b)) - Number(matches(a)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field, prios]);
  const count = DESTINATIONS.filter(matches).length;

  const message = !active
    ? "All 14 destinations shown. Select any country for details."
    : count
      ? `${count} destination${count > 1 ? "s" : ""} worth discussing for your profile. Faded ones may still work, so ask.`
      : "No close matches for this combination. Send your profile and I'll look at it personally.";

  return (
    <section id="destinations" className="relative py-28 md:py-40">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[600px] bg-[radial-gradient(50%_60%_at_50%_0%,rgba(56,189,248,0.10),transparent)]" />
      <div className="wrap relative">
        <SectionHeading
          eyebrow="Destination finder"
          title="One profile. Multiple possibilities."
          lede="Your academic background may open doors in more than one country. Tell me a little about yourself and see where to start the conversation."
        />

        <div className="mt-16 grid items-start gap-6 lg:grid-cols-[340px_1fr]">
          <motion.aside
            className="glass rounded-[28px] p-6 lg:sticky lg:top-28"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <h3 className="text-xl font-bold">Your quick profile</h3>
            <p className="mt-1 text-sm text-mute">A starting point, not an assessment. Send your full profile for personal advice.</p>

            <label htmlFor="f-study" className="mt-6 block text-sm font-semibold">
              What do you want to study?
            </label>
            <div className="relative mt-2">
              <select
                id="f-study"
                value={field}
                onChange={(e) => setField(e.target.value as FieldKey | "")}
                className="w-full appearance-none rounded-2xl border border-white/10 bg-night/60 px-4 py-3.5 pr-10 text-[15px] font-medium outline-none transition focus:border-wattle"
              >
                {STUDY_FIELDS.map((f) => (
                  <option key={f.value} value={f.value}>
                    {f.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-mute" />
            </div>

            <p className="mt-6 text-sm font-semibold">What matters most?</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {PRIORITIES.map((p) => {
                const on = prios.includes(p.value);
                return (
                  <motion.button
                    key={p.value}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setPrios((s) => (on ? s.filter((x) => x !== p.value) : [...s, p.value]))}
                    whileTap={{ scale: 0.92 }}
                    className={`relative rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                      on ? "border-transparent text-night" : "border-white/15 text-ink/80 hover:border-white/40"
                    }`}
                  >
                    {on && <motion.span layoutId={`chip-bg-${p.value}`} className="absolute inset-0 rounded-full bg-gradient-to-r from-wattle to-coral" />}
                    <span className="relative">{p.label}</span>
                  </motion.button>
                );
              })}
            </div>

            <AnimatePresence>
              {active && (
                <motion.button
                  type="button"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  onClick={() => {
                    setField("");
                    setPrios([]);
                  }}
                  className="mt-5 flex items-center gap-2 text-sm font-semibold text-mute hover:text-ink"
                >
                  <RotateCcw className="size-4" /> Clear filters
                </motion.button>
              )}
            </AnimatePresence>
          </motion.aside>

          <div>
            <div className="mb-5 min-h-[1.6em] overflow-hidden" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.p
                  key={message}
                  className="text-[15px] text-ink/80"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {message}
                </motion.p>
              </AnimatePresence>
            </div>

            <LayoutGroup>
              <Reveal className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
                {sorted.map((d) => {
                  const ok = matches(d);
                  return (
                    <motion.button
                      layout
                      key={d.c}
                      type="button"
                      onClick={() => setOpen(d)}
                      onMouseMove={spotlight}
                      initial={false}
                      animate={{ opacity: ok ? 1 : 0.32, scale: ok ? 1 : 0.96, filter: ok ? "grayscale(0)" : "grayscale(1)" }}
                      transition={{ layout: { duration: 0.6, ease: EASE }, default: { duration: 0.5 } }}
                      whileHover={{ y: -4 }}
                      className={`spotlight group relative overflow-hidden rounded-3xl border p-5 text-left ${
                        d.focus
                          ? "ring-conic col-span-2 border-transparent bg-gradient-to-br from-ochre/25 via-deep to-deep sm:col-span-1"
                          : active && ok
                            ? "border-wattle/50 bg-white/[0.04]"
                            : "border-white/[0.08] bg-white/[0.03]"
                      }`}
                    >
                      <span className="block text-4xl leading-none transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110">{d.f}</span>
                      {d.st === "reg" && (
                        <span className="absolute right-4 top-4 rounded-full bg-reef/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-reef">
                          {d.focus ? "Main focus" : "Registered"}
                        </span>
                      )}
                      <span className="mt-6 block font-display text-lg font-bold">{d.n}</span>
                      <span className="mt-0.5 flex items-center gap-1 text-xs text-mute">
                        {d.st === "reg" ? "Full guidance available" : "Enquire for options"}
                        <ArrowUpRight className="size-3 opacity-0 transition group-hover:opacity-100" />
                      </span>
                    </motion.button>
                  );
                })}
              </Reveal>
            </LayoutGroup>
            <p className="mt-5 text-xs text-mute">Matching is a guide only. Every profile is different, so ask about any destination.</p>
          </div>
        </div>
      </div>

      <AnimatePresence>{open && <Modal d={open} onClose={close} />}</AnimatePresence>
    </section>
  );
}
