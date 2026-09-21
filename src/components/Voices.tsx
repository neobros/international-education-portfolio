import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Play, Quote, Star } from "lucide-react";
import { REVIEWS, STORIES, STORY_FILTERS } from "../data/content";
import { Button, EASE, Reveal, SectionHeading } from "./ui";

export function Stories() {
  const [filter, setFilter] = useState("all");
  const shown = STORIES.filter((s) => filter === "all" || s.r === filter);

  return (
    <section id="stories" className="relative overflow-hidden py-12 md:py-16">
      <div className="fade-y pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_20%_30%,rgba(124,58,237,0.16),transparent),radial-gradient(50%_40%_at_90%_80%,rgba(255,122,82,0.12),transparent)]" />
      <div className="wrap relative">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading eyebrow="Success stories" title="From dreams to study abroad." lede="Don't take my word for it. Hear from students I've helped." />
          <Reveal>
            <div className="glass flex flex-wrap gap-1 rounded-full p-1.5" role="group" aria-label="Filter stories by destination">
              {STORY_FILTERS.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  aria-pressed={filter === f.key}
                  onClick={() => setFilter(f.key)}
                  className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-colors ${filter === f.key ? "text-night" : "text-ink/70 hover:text-ink"}`}
                >
                  {filter === f.key && (
                    <motion.span layoutId="story-pill" className="absolute inset-0 rounded-full bg-gradient-to-r from-wattle to-coral" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
                  )}
                  <span className="relative">{f.label}</span>
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <motion.div layout className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {shown.map((s, i) => (
              <motion.article
                layout
                key={s.r}
                className="group overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03]"
                initial={{ opacity: 0, scale: 0.85, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: EASE }}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-b from-indigo-900/60 via-deep to-night">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,178,63,0.25),transparent_55%)] transition-transform duration-700 group-hover:scale-125" />
                  <span className="absolute left-5 top-5 text-3xl">{s.flag}</span>
                  <button
                    type="button"
                    className="absolute left-1/2 top-1/2 grid size-[72px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-ink text-night transition-transform duration-500 group-hover:scale-110"
                    aria-label={`Play story from student in ${s.country}`}
                  >
                    <Play className="ml-1 size-6 fill-current" />
                  </button>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night to-transparent p-5 pt-20">
                    <Quote className="size-5 text-wattle" />
                    <p className="mt-2 text-[15px] leading-snug text-ink/90">{s.quote}</p>
                  </div>
                </div>
                <div className="p-5">
                  <p className="font-display text-lg font-bold">{s.name}</p>
                  <p className="text-sm text-mute">
                    {s.country} · {s.program}
                  </p>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        <Reveal className="mt-12">
          <Button href="#social" variant="ghost">
            Watch more success stories
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

function ReviewCard({ r }: { r: (typeof REVIEWS)[number] }) {
  return (
    <figure className="w-[340px] shrink-0 rounded-[26px] border border-white/[0.08] bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-7 md:w-[400px]">
      <div className="flex gap-1 text-wattle" aria-label="5 out of 5 stars">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="size-4 fill-current" />
        ))}
      </div>
      <blockquote className="mt-5 text-lg leading-relaxed text-ink/90">“{r.text}”</blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-full bg-white/10 text-xl">{r.flag}</span>
        <span>
          <span className="block text-sm font-bold">{r.name}</span>
          <span className="block text-xs text-mute">{r.country}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export function Reviews() {
  const row = [...REVIEWS, ...REVIEWS];
  return (
    <section id="reviews" className="relative py-12 md:py-16">
      <div className="wrap">
        <SectionHeading eyebrow="Reviews" title="What students say." />
      </div>
      <div className="group relative mt-14 space-y-4 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
        {[0, 1].map((line) => (
          <motion.div
            key={line}
            className="flex w-max gap-4"
            animate={{ x: line ? ["-50%", "0%"] : ["0%", "-50%"] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          >
            {(line ? [...row].reverse() : row).map((r, i) => (
              <ReviewCard key={i} r={r} />
            ))}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
