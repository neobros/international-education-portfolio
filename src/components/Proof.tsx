import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BadgeCheck, ChevronLeft, ChevronRight, Hourglass, Maximize2, Play, X } from "lucide-react";
import { CREDENTIALS, PARTNERS, PARTNERSHIPS, TOURS } from "../data/content";
import { lockScroll } from "../lib/scroll";
import { Button, EASE, Reveal, SectionHeading, spotlight } from "./ui";

export function Credentials() {
  return (
    <section id="credentials" className="relative py-12 md:py-16">
      <div className="wrap">
        <SectionHeading
          eyebrow="Credentials"
          title="Professional registrations you can trust."
          lede="Education guidance backed by recognised industry registrations. Each new registration is added here as it's granted."
        />
        <div className="mt-10 md:mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {CREDENTIALS.map((c, i) => (
            <motion.div
              key={c.country}
              onMouseMove={spotlight}
              className={`spotlight flex min-h-[300px] flex-col rounded-[28px] p-7 ${
                c.featured
                  ? "ring-conic bg-gradient-to-br from-ochre/20 via-deep to-deep lg:col-span-1"
                  : c.soon
                    ? "border border-dashed border-white/15"
                    : "border border-white/[0.08] bg-white/[0.03]"
              }`}
              initial={{ opacity: 0, y: 60, rotateX: -25 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.9, delay: i * 0.1, ease: EASE }}
              style={{ transformPerspective: 900 }}
            >
              <div className="flex items-center justify-between">
                <span className="text-5xl">{c.flag}</span>
                <span
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
                    c.soon ? "bg-white/5 text-mute" : "bg-reef/15 text-reef"
                  }`}
                >
                  {c.soon ? <Hourglass className="size-3.5" /> : <BadgeCheck className="size-3.5" />}
                  {c.status}
                </span>
              </div>
              <h3 className="mt-8 text-2xl font-bold">{c.country}</h3>
              <p className="mt-2 text-sm text-mute">{c.title}</p>
              {!c.soon && (
                <div className="mt-auto grid place-items-center rounded-2xl border border-dashed border-white/15 px-4 py-5 text-center text-xs text-mute">
                  Certificate or badge image · ID number
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Bento tile for one partnership photo. */
function GalleryTile({ p, i, span, onOpen }: { p: (typeof PARTNERSHIPS)[number]; i: number; span: string; onOpen: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      className={`group relative overflow-hidden rounded-[22px] border border-white/[0.08] text-left ${span}`}
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, delay: (i % 4) * 0.07, ease: EASE }}
    >
      <img
        src={p.src}
        alt={p.caption}
        loading="lazy"
        className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-night via-night/35 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />
      <span className="absolute inset-x-0 bottom-0 p-4">
        <span className="block text-sm font-semibold leading-snug">{p.caption}</span>
        {p.place && <span className="mt-0.5 block text-xs text-ink/60">{p.place}</span>}
      </span>
      <span className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-night/70 opacity-0 backdrop-blur transition group-hover:opacity-100">
        <Maximize2 className="size-4" />
      </span>
    </motion.button>
  );
}

/** Full-screen viewer with keyboard and arrow navigation. */
function Lightbox({ index, onClose, onStep }: { index: number; onClose: () => void; onStep: (dir: number) => void }) {
  const p = PARTNERSHIPS[index];
  useEffect(() => {
    lockScroll(true);
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
    };
    window.addEventListener("keydown", key);
    return () => {
      lockScroll(false);
      window.removeEventListener("keydown", key);
    };
  }, [onClose, onStep]);

  return (
    <motion.div
      className="fixed inset-0 z-[80] grid place-items-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label={p.caption}
    >
      <div className="absolute inset-0 bg-night/85 backdrop-blur-md" onClick={onClose} />
      <motion.figure
        key={p.src}
        className="relative m-0 max-h-[86vh] w-full max-w-[1100px]"
        initial={{ scale: 0.94, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        <img src={p.src} alt={p.caption} className="max-h-[72vh] w-full rounded-2xl object-contain" />
        <figcaption className="mt-4 text-center">
          <p className="font-semibold">{p.caption}</p>
          {p.place && <p className="mt-1 text-sm text-mute">{p.place}</p>}
          <p className="mt-1 font-mono text-xs text-mute">
            {index + 1} / {PARTNERSHIPS.length}
          </p>
        </figcaption>
      </motion.figure>

      <button onClick={onClose} className="absolute right-4 top-4 grid size-12 place-items-center rounded-full border border-white/15 bg-night/60 transition hover:rotate-90 hover:bg-white/10" aria-label="Close">
        <X className="size-5" />
      </button>
      <button
        onClick={() => onStep(-1)}
        className="absolute left-2 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-night/60 transition hover:bg-white/10 md:left-6"
        aria-label="Previous photo"
      >
        <ChevronLeft className="size-6" />
      </button>
      <button
        onClick={() => onStep(1)}
        className="absolute right-2 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-night/60 transition hover:bg-white/10 md:right-6"
        aria-label="Next photo"
      >
        <ChevronRight className="size-6" />
      </button>
    </motion.div>
  );
}

// bento pattern: a few tiles get extra width or height
const TILE_SPANS = [
  "col-span-2 row-span-2",
  "",
  "row-span-2",
  "",
  "col-span-2",
  "",
  "row-span-2",
  "col-span-2 row-span-2",
  "",
  "",
  "col-span-2",
  "",
  "row-span-2",
  "",
  "col-span-2",
  "",
  "",
  "",
];

export function Partnerships() {
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const step = useCallback((dir: number) => setOpen((i) => (i === null ? i : (i + dir + PARTNERSHIPS.length) % PARTNERSHIPS.length)), []);

  return (
    <section id="partnerships" className="relative py-12 md:py-16">
      <div className="wrap">
        <SectionHeading
          eyebrow="Partnerships"
          title="Building connections across global education."
          lede="Relationships with universities, institutions and industry partners across multiple international markets."
        />
        <div className="mt-10 grid auto-rows-[150px] grid-cols-2 gap-3 sm:grid-cols-3 md:auto-rows-[180px] lg:grid-cols-4">
          {PARTNERSHIPS.map((p, i) => (
            <GalleryTile key={p.src} p={p} i={i} span={TILE_SPANS[i % TILE_SPANS.length]} onOpen={() => setOpen(i)} />
          ))}
        </div>

        <Reveal className="mt-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="eyebrow">Trusted partners</span>
              <h3 className="mt-4 text-3xl font-bold md:text-4xl">Working together with {PARTNERS.length}+ partners</h3>
            </div>
            <p className="max-w-[40ch] text-mute">Education, recruitment, media and community partners across Australia and Sri Lanka.</p>
          </div>
        </Reveal>
      </div>

      <div className="group mt-8 space-y-4 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        {[PARTNERS.slice(0, Math.ceil(PARTNERS.length / 2)), PARTNERS.slice(Math.ceil(PARTNERS.length / 2))].map((row, r) => (
          <div key={r} className="overflow-hidden">
            <div
              className={`flex w-max gap-4 pr-4 [animation-duration:60s] group-hover:[animation-play-state:paused] ${r ? "animate-marquee-rev" : "animate-marquee"}`}
            >
              {[...row, ...row].map((p, i) => (
                <div
                  key={i}
                  className="flex w-48 shrink-0 flex-col items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-5 transition duration-500 hover:-translate-y-1 hover:border-wattle/50 hover:bg-white/[0.06]"
                >
                  <img src={p.logo} alt={p.name} loading="lazy" className="h-16 w-auto max-w-[150px] rounded-lg object-contain" />
                  <span className="text-center text-xs font-semibold text-ink/70">{p.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>{open !== null && <Lightbox index={open} onClose={close} onStep={step} />}</AnimatePresence>
    </section>
  );
}

function TourCard({ t, i }: { t: (typeof TOURS)[number]; i: number }) {
  const [playing, setPlaying] = useState(false);
  return (
    <motion.article
      className="group overflow-hidden rounded-[26px] border border-white/[0.08] bg-white/[0.03]"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.9, delay: i * 0.1, ease: EASE }}
    >
      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-panel via-deep to-night">
        {playing && t.youtubeId ? (
          <iframe
            className="absolute inset-0 size-full"
            src={`https://www.youtube-nocookie.com/embed/${t.youtubeId}?autoplay=1`}
            title={t.title}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            {t.youtubeId && (
              <img
                src={`https://i.ytimg.com/vi/${t.youtubeId}/hqdefault.jpg`}
                alt=""
                className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            )}
            <span className="absolute left-4 top-4 z-10 text-3xl">{t.flag}</span>
            <span className="absolute bottom-3 right-4 z-10 font-display text-6xl font-extrabold text-white/[0.06]">0{i + 1}</span>
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="absolute inset-0 z-10 grid place-items-center"
              aria-label={`Play ${t.title}`}
              disabled={!t.youtubeId}
            >
              <span className="relative grid size-16 place-items-center rounded-full bg-gradient-to-br from-wattle to-ochre text-night shadow-[0_10px_40px_-5px_rgba(255,120,60,0.7)] transition-transform duration-500 group-hover:scale-110">
                <span className="absolute inset-0 animate-ping rounded-full bg-wattle/40" />
                <Play className="relative ml-0.5 size-6 fill-current" />
              </span>
            </button>
          </>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold leading-snug">{t.title}</h3>
        <p className="mt-1 text-sm text-mute">{t.country}</p>
      </div>
    </motion.article>
  );
}

export function Tours() {
  return (
    <section id="tours" className="relative py-12 md:py-16">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading eyebrow="University tours" title="Explore universities with me." lede="Real campuses and first-hand information from visits." />
          <Reveal>
            <Button href="#social" variant="ghost">
              View all university tours
            </Button>
          </Reveal>
        </div>
        <div className="mt-10 md:mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TOURS.map((t, i) => (
            <TourCard key={i} t={t} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
