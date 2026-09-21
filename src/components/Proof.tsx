import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { BadgeCheck, Camera, Hourglass, Play } from "lucide-react";
import { CREDENTIALS, PARTNERS, PARTNERSHIPS, TOURS } from "../data/content";
import { Button, EASE, Reveal, SectionHeading, spotlight } from "./ui";

export function Credentials() {
  return (
    <section id="credentials" className="relative py-28 md:py-36">
      <div className="wrap">
        <SectionHeading
          eyebrow="Credentials"
          title="Professional registrations you can trust."
          lede="Education guidance backed by recognised industry registrations. Each new registration is added here as it's granted."
        />
        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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

function GalleryTile({ p, i }: { p: (typeof PARTNERSHIPS)[number]; i: number }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const hues = [
    "from-ochre/60 via-fuchsia-700/40 to-indigo-900",
    "from-reef/50 via-sky-700/40 to-indigo-950",
    "from-wattle/50 via-orange-700/40 to-rose-950",
    "from-sky-500/40 via-violet-700/40 to-night",
    "from-pink-500/40 via-orange-800/30 to-night",
  ];
  return (
    <motion.figure
      ref={ref}
      className={`group relative m-0 overflow-hidden rounded-[28px] border border-white/[0.08] ${i === 0 ? "row-span-2 md:col-span-2" : ""}`}
      initial={{ clipPath: "inset(100% 0 0 0)" }}
      whileInView={{ clipPath: "inset(0% 0 0 0)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.2, delay: i * 0.08, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Replace this placeholder with <img src="..." className="absolute inset-[-12%] h-[124%] w-full object-cover" /> */}
      <motion.div style={{ y }} className={`absolute inset-[-12%] bg-gradient-to-br ${hues[i % hues.length]} transition-transform duration-700 group-hover:scale-110`}>
        <div className="grid-lines absolute inset-0 opacity-60" />
      </motion.div>
      <div className="absolute inset-0 grid place-items-center text-white/60">
        <span className="flex flex-col items-center gap-2 text-xs font-semibold uppercase tracking-widest">
          <Camera className="size-6" /> Add photo
        </span>
      </div>
      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/95 via-night/50 to-transparent p-5 pt-16">
        <p className="font-semibold">{p.caption}</p>
        <p className="mt-1 text-xs text-ink/65">{p.place}</p>
      </figcaption>
    </motion.figure>
  );
}

export function Partnerships() {
  return (
    <section id="partnerships" className="relative py-28 md:py-36">
      <div className="wrap">
        <SectionHeading
          eyebrow="Partnerships"
          title="Building connections across global education."
          lede="Relationships with universities, institutions and industry partners across multiple international markets."
        />
        <div className="mt-16 grid auto-rows-[220px] grid-cols-1 gap-4 sm:grid-cols-2 md:auto-rows-[240px] md:grid-cols-4">
          {PARTNERSHIPS.map((p, i) => (
            <GalleryTile key={i} p={p} i={i} />
          ))}
        </div>

        <Reveal className="mt-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="eyebrow">Trusted partners</span>
              <h3 className="mt-4 text-3xl font-bold md:text-4xl">Working together with {PARTNERS.length}+ partners</h3>
            </div>
            <p className="max-w-[40ch] text-mute">Education, recruitment, media and community partners across Australia and Sri Lanka.</p>
          </div>
        </Reveal>
      </div>

      <div className="group mt-10 space-y-4 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
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
    <section id="tours" className="relative py-28 md:py-36">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading eyebrow="University tours" title="Explore universities with me." lede="Real campuses and first-hand information from visits." />
          <Reveal>
            <Button href="#social" variant="ghost">
              View all university tours
            </Button>
          </Reveal>
        </div>
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TOURS.map((t, i) => (
            <TourCard key={i} t={t} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
