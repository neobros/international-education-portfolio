import { useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "motion/react";
import { DESTINATIONS, SERVICES } from "../data/content";
import { SERVICE_ICONS } from "./icons";
import { Counter, EASE, Reveal, SectionHeading, spotlight } from "./ui";

/** Infinite marquee that speeds up and flips direction with scroll velocity. */
export function VelocityMarquee({ baseVelocity = -2 }: { baseVelocity?: number }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(velocity, [0, 1000], [0, 5], { clamp: false });
  const skew = useTransform(velocity, [-2000, 2000], [8, -8]);
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const dir = useRef(1);

  useAnimationFrame((_, delta) => {
    let move = dir.current * baseVelocity * (delta / 1000);
    const f = factor.get();
    if (f < 0) dir.current = -1;
    else if (f > 0) dir.current = 1;
    move += dir.current * move * f;
    baseX.set(baseX.get() + move);
  });

  const items = [...DESTINATIONS, ...DESTINATIONS];
  return (
    <div className="relative overflow-hidden border-y border-white/[0.07] bg-deep/60 py-4" aria-hidden>
      <motion.div className="flex w-max gap-10 whitespace-nowrap" style={{ x, skewX: skew }}>
        {items.map((d, i) => (
          <span key={i} className="flex items-center gap-4 font-display text-4xl font-extrabold md:text-[56px]">
            <span className="text-3xl md:text-4xl">{d.f}</span>
            <span className={d.focus ? "text-gradient" : i % 2 ? "text-outline" : "text-ink/90"}>{d.n}</span>
            <span className="text-wattle">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

const STATS = [
  { n: 14, s: "", label: "Study destinations" },
  { n: 3, s: "", label: "Active registrations" },
  { n: 6, s: "", label: "Step guided process" },
  { n: 1, s: "", label: "Profile, many options" },
];

function ServiceCard({ s, i, span }: { s: (typeof SERVICES)[number]; i: number; span: string }) {
  const Icon = SERVICE_ICONS[s.icon];
  const big = span !== "";
  const [hasImage, setHasImage] = useState(true);
  return (
    <motion.article
      onMouseMove={spotlight}
      className={`spotlight group relative flex min-h-[340px] flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-7 ${span}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: (i % 3) * 0.1, ease: EASE }}
      whileHover={{ y: -6 }}
    >
      {hasImage && (
        <>
          <img
            src={s.image}
            alt=""
            loading="lazy"
            onError={() => setHasImage(false)}
            className="absolute inset-0 -z-10 size-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-night via-night/75 to-night/10" />
        </>
      )}
      <div className="flex items-start justify-between">
        <span className="grid size-14 place-items-center rounded-2xl bg-night/40 bg-gradient-to-br from-wattle/25 to-ochre/10 text-wattle ring-1 ring-wattle/25 backdrop-blur transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110">
          <Icon className="size-6" />
        </span>
        <span className="font-mono text-xs text-ink/60">0{i + 1}</span>
      </div>
      <h3 className={`mt-auto pt-10 font-bold ${big ? "text-3xl" : "text-2xl"}`}>{s.title}</h3>
      <p className={`mt-3 max-w-[40ch] ${hasImage ? "text-ink/75" : "text-mute"}`}>{s.text}</p>
      {big && !hasImage && (
        <span className="pointer-events-none absolute -bottom-10 -right-6 font-display text-[160px] font-extrabold leading-none text-white/[0.03]">
          0{i + 1}
        </span>
      )}
    </motion.article>
  );
}

export function Services() {
  // bento spans for 7 cards on a 3-column grid
  const spans = ["lg:col-span-2", "", "", "", "", "", "lg:col-span-2"];
  return (
    <section id="help" className="relative py-28 md:py-40">
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <SectionHeading eyebrow="How I help" title="Your journey starts with the right advice." />
          <Reveal delay={0.2}>
            <p className="text-lg leading-relaxed text-mute">
              Choosing a country and university is more than submitting an application. I help you understand your options based on your academic background,
              budget, career goals, English level and future plans.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.title} s={s} i={i} span={spans[i]} />
          ))}
        </div>

        <div className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.08] md:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="bg-night p-8">
              <p className="font-display text-6xl font-extrabold text-gradient">
                <Counter to={s.n} suffix={s.s} />
              </p>
              <p className="mt-2 text-sm text-mute">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
