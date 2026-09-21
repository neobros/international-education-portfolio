import { useLayoutEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { MapPin } from "lucide-react";
import { AUSTRALIA } from "../data/content";
import { Button, EASE, Reveal } from "./ui";

type City = (typeof AUSTRALIA.cities)[number];

function CityCard({ city, i, progress }: { city: City; i: number; progress: MotionValue<number> }) {
  const [a, b] = city.hue;
  // each card's big code drifts against the scroll for depth
  const shift = useTransform(progress, [0, 1], [80 - i * 20, -80 - i * 20]);
  const imgX = useTransform(progress, [0, 1], ["6%", "-6%"]);
  const [hasImage, setHasImage] = useState(true);
  return (
    <article
      className="group relative flex h-[68vh] max-h-[620px] w-[82vw] shrink-0 flex-col justify-between overflow-hidden rounded-[32px] border border-white/10 p-7 sm:w-[440px] md:p-9"
      style={{ background: `radial-gradient(120% 90% at 100% 0%, ${a}55, transparent 55%), radial-gradient(100% 80% at 0% 100%, ${b}66, transparent 60%), #0b1428` }}
      data-cursor="hover"
    >
      {hasImage && (
        <>
          <motion.img
            src={city.image}
            alt=""
            loading="lazy"
            onError={() => setHasImage(false)}
            style={{ x: imgX }}
            className="absolute inset-y-0 -left-[8%] h-full w-[116%] max-w-none object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-night via-night/60 to-night/20" />
          <div className="absolute inset-0 mix-blend-soft-light" style={{ background: `linear-gradient(160deg, ${a}66, transparent 50%, ${b}66)` }} />
        </>
      )}
      <motion.span
        aria-hidden
        style={{ x: shift }}
        className="pointer-events-none absolute -right-6 top-16 font-display text-[190px] font-extrabold leading-none text-white/[0.07] md:text-[230px]"
      >
        {city.code}
      </motion.span>

      <div className="relative flex items-center justify-between">
        <span className="glass flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold">
          <MapPin className="size-3.5 text-wattle" /> {city.state}
        </span>
        <span className="font-mono text-xs text-ink/60">0{i + 1} / 0{AUSTRALIA.cities.length}</span>
      </div>

      <div className="relative">
        <h3 className="font-display text-6xl font-extrabold md:text-7xl">{city.name}</h3>
        <p className="mt-4 max-w-[34ch] text-ink/75">{city.text}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {city.good.map((g) => (
            <span key={g} className="rounded-full border border-white/15 bg-night/40 px-3 py-1 text-xs font-semibold backdrop-blur">
              {g}
            </span>
          ))}
        </div>
      </div>
      <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-wattle to-ochre transition-transform duration-700 group-hover:scale-x-100" />
    </article>
  );
}

export function Australia() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      if (track.current) setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 25, mass: 0.4 });
  const x = useTransform(smooth, [0, 1], [0, -distance]);
  const bar = useTransform(smooth, [0, 1], ["0%", "100%"]);

  return (
    <>
      <section id="australia" className="relative overflow-hidden py-12 md:py-16">
        <div className="fade-y pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_80%_20%,rgba(255,122,82,0.18),transparent),radial-gradient(50%_50%_at_10%_80%,rgba(45,212,191,0.12),transparent)]" />
        <div className="wrap relative grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <Reveal y={16}>
              <span className="eyebrow">🇦🇺 Main focus</span>
            </Reveal>
            <motion.h2
              className="mt-5 font-display text-[clamp(48px,8vw,120px)] font-extrabold leading-[0.9]"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              transition={{ staggerChildren: 0.12 }}
            >
              {["Australia,", "done properly."].map((l, i) => (
                <span key={l} className="block overflow-hidden pb-2">
                  <motion.span
                    className={`block ${i === 1 ? "text-gradient" : ""}`}
                    variants={{ hidden: { y: "105%" }, show: { y: "0%", transition: { duration: 1, ease: EASE } } }}
                  >
                    {l}
                  </motion.span>
                </span>
              ))}
            </motion.h2>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-mute">{AUSTRALIA.intro}</p>
            </Reveal>
            <Reveal delay={0.3} className="mt-9">
              <Button href="#contact">Plan my Australia study</Button>
            </Reveal>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {AUSTRALIA.pillars.map((p, i) => (
              <motion.div
                key={p.title}
                className="glass rounded-3xl p-6"
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
                whileHover={{ scale: 1.03, rotate: i % 2 ? 1 : -1 }}
              >
                <span className="font-mono text-xs text-wattle">0{i + 1}</span>
                <h3 className="mt-6 text-xl font-bold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mute">{p.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pinned horizontal city scroll */}
      <section ref={section} className="relative" style={{ height: `calc(100vh + ${distance}px)` }} aria-label="Australian study cities">
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <div className="wrap mb-8 flex items-end justify-between gap-6">
            <div>
              <span className="eyebrow">Choose your city</span>
              <h2 className="mt-3 font-display text-4xl font-extrabold md:text-6xl">Five cities. One right fit.</h2>
            </div>
            <div className="hidden w-48 md:block">
              <div className="h-[2px] w-full overflow-hidden rounded bg-white/10">
                <motion.div className="h-full bg-gradient-to-r from-wattle to-ochre" style={{ width: bar }} />
              </div>
              <p className="mt-2 text-right font-mono text-[11px] uppercase tracking-widest text-mute">Scroll to explore</p>
            </div>
          </div>
          <motion.div ref={track} style={{ x }} className="flex w-max gap-5 px-5 md:px-[max(20px,calc((100vw-1240px)/2))]">
            {AUSTRALIA.cities.map((c, i) => (
              <CityCard key={c.code} city={c} i={i} progress={smooth} />
            ))}
            <div className="flex h-[68vh] max-h-[620px] w-[82vw] shrink-0 flex-col justify-center rounded-[32px] border border-dashed border-white/15 p-9 sm:w-[400px]">
              <p className="font-display text-4xl font-extrabold leading-tight">
                Not sure which city suits you<span className="text-gradient">?</span>
              </p>
              <p className="mt-4 text-mute">Send your profile and I'll suggest the cities, universities and courses that match your goals and budget.</p>
              <div className="mt-8">
                <Button href="#contact">Send your profile</Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
