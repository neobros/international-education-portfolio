import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useAnimationFrame, useScroll, useTransform } from "motion/react";
import { BadgeCheck, Plane } from "lucide-react";
import { AUSTRALIA, DESTINATIONS, HERO, PROFILE } from "../data/content";
import { Button, EASE, SplitWords } from "./ui";

export function Aurora({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <div className="absolute -left-[10%] -top-[20%] size-[60vmax] animate-aurora rounded-full bg-[radial-gradient(circle,rgba(255,122,82,0.35),transparent_60%)] blur-3xl" />
      <div className="absolute -right-[15%] top-[10%] size-[55vmax] animate-aurora rounded-full bg-[radial-gradient(circle,rgba(45,212,191,0.22),transparent_60%)] blur-3xl [animation-delay:-6s]" />
      <div className="absolute bottom-[-30%] left-[25%] size-[50vmax] animate-aurora rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.25),transparent_60%)] blur-3xl [animation-delay:-12s]" />
    </div>
  );
}

function FlapText({ text }: { text: string }) {
  return (
    <span className="inline-flex gap-[2px]">
      {text.split("").map((ch, i) => (
        <span key={i} className="relative inline-block overflow-hidden rounded-[4px] bg-white/10 px-[3px] [perspective:200px]">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={text + i}
              className="inline-block"
              initial={{ rotateX: -90, opacity: 0 }}
              animate={{ rotateX: 0, opacity: 1 }}
              exit={{ rotateX: 90, opacity: 0 }}
              transition={{ duration: 0.35, delay: i * 0.05, ease: "easeOut" }}
            >
              {ch}
            </motion.span>
          </AnimatePresence>
        </span>
      ))}
    </span>
  );
}

/** Compact flight ticket: Colombo to a rotating Australian city. */
function TicketChip({ play }: { play: boolean }) {
  const [idx, setIdx] = useState(0);
  const city = AUSTRALIA.cities[idx];
  useEffect(() => {
    if (!play) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % AUSTRALIA.cities.length), 3200);
    return () => clearInterval(t);
  }, [play]);

  return (
    <div className="w-[300px] overflow-hidden rounded-2xl border border-white/10 bg-night/75 backdrop-blur-xl shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)]">
      <div className="flex items-center justify-between bg-gradient-to-r from-wattle via-coral to-ochre px-4 py-2 text-night">
        <span className="font-display text-xs font-extrabold tracking-wide">STUDENT PASS</span>
        <span className="font-mono text-[10px] font-bold">EDU · 2026</span>
      </div>
      <div className="flex items-center gap-3 px-4 py-3">
        <div>
          <p className="font-mono text-2xl font-bold">CMB</p>
          <p className="text-[10px] text-ink/60">Colombo</p>
        </div>
        <div className="relative h-5 flex-1">
          <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-white/30" />
          <motion.div className="absolute top-0" animate={{ left: ["0%", "80%"] }} transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}>
            <Plane className="size-5 rotate-45 text-wattle" />
          </motion.div>
        </div>
        <div className="text-right">
          <p className="font-mono text-2xl font-bold">
            <FlapText text={city.code} />
          </p>
          <AnimatePresence mode="wait">
            <motion.p key={city.name} className="text-[10px] text-ink/60" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}>
              {city.name}, AU
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/**
 * 3D-style stage: the portrait stands in the middle, a plane orbits around it and
 * country labels rotate past underneath. Positions are computed per frame so the
 * plane and the labels pass correctly behind the portrait and in front of it.
 */
function HeroStage({ play }: { play: boolean }) {
  const stage = useRef<HTMLDivElement>(null);
  const labels = useRef<(HTMLSpanElement | null)[]>([]);
  const plane = useRef<HTMLSpanElement>(null);
  const size = useRef(520);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const measure = () => {
      if (stage.current) size.current = stage.current.offsetWidth;
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (stage.current) ro.observe(stage.current);
    return () => ro.disconnect();
  }, []);

  useAnimationFrame((t) => {
    const time = reduced.current ? 0 : t / 1000;
    const s = size.current;

    // country ring: wide, low ellipse under the portrait
    const n = DESTINATIONS.length;
    labels.current.forEach((el, i) => {
      if (!el) return;
      const a = (i / n) * Math.PI * 2 + time * 0.22;
      const sin = Math.sin(a);
      const depth = (sin + 1) / 2; // 0 = far behind, 1 = closest to the viewer
      const x = Math.cos(a) * s * 0.44;
      const y = s * 0.28 + sin * s * 0.11;
      const scale = 0.6 + depth * 0.5;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${scale})`;
      el.style.opacity = String(0.2 + depth * 0.8);
      el.style.zIndex = sin > 0.05 ? "20" : "1";
      el.style.filter = depth < 0.45 ? `blur(${(0.45 - depth) * 4}px)` : "none";
    });

    // plane: tighter orbit, a little higher up
    if (plane.current) {
      const a = time * 0.62;
      const sin = Math.sin(a);
      const cos = Math.cos(a);
      const depth = (sin + 1) / 2;
      const x = cos * s * 0.46;
      const y = s * 0.04 + sin * s * 0.13;
      const scale = 0.7 + depth * 0.6;
      const heading = sin > 0 ? 0 : 180; // face the direction of travel
      const bank = -cos * 16;
      plane.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${scale}) rotate(${heading + bank}deg)`;
      plane.current.style.zIndex = sin > 0.05 ? "20" : "1";
      plane.current.style.opacity = String(0.55 + depth * 0.45);
    }
  });

  return (
    <motion.div
      ref={stage}
      className="relative mx-auto aspect-square w-[min(80vw,420px)] sm:w-[min(70vw,480px)] lg:w-[min(46vw,620px)]"
      initial={{ opacity: 0, scale: 0.92 }}
      animate={play ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 1.4, delay: 0.5, ease: EASE }}
    >
      {/* glow + orbit guides */}
      <div className="pointer-events-none absolute inset-[10%] rounded-full bg-[radial-gradient(circle,rgba(255,122,82,0.30),transparent_65%)] blur-2xl" />
      <div className="pointer-events-none absolute left-1/2 top-[78%] h-[22%] w-[96%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-dashed border-white/10" />
      <div className="pointer-events-none absolute left-1/2 top-[54%] h-[26%] w-[96%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-dashed border-wattle/25" />
      <div className="pointer-events-none absolute left-1/2 top-[70%] h-[30%] w-[70%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse,rgba(45,212,191,0.25),transparent_70%)] blur-2xl" />

      {/* countries rotating underneath */}
      {DESTINATIONS.map((d, i) => (
        <span
          key={d.c}
          ref={(el) => {
            labels.current[i] = el;
          }}
          className="absolute left-1/2 top-1/2 flex origin-center items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-night/70 px-3 py-1.5 text-[13px] font-semibold text-ink/85 backdrop-blur will-change-transform"
        >
          <span className="text-base">{d.f}</span>
          <span className={d.focus ? "text-gradient" : ""}>{d.n}</span>
        </span>
      ))}

      {/* portrait */}
      <img
        src="/images/hero-portrait.webp"
        alt={`${PROFILE.name}, ${PROFILE.role}`}
        fetchPriority="high"
        className="pointer-events-none absolute bottom-[6%] left-1/2 z-10 h-[88%] w-auto max-w-none -translate-x-1/2 [mask-image:radial-gradient(ellipse_60%_70%_at_50%_42%,#000_58%,transparent_100%)]"
      />

      {/* orbiting plane */}
      <span
        ref={plane}
        className="absolute left-1/2 top-1/2 will-change-transform"
        style={{ zIndex: 20 }}
      >
        <Plane className="size-10 rotate-90 fill-wattle text-wattle drop-shadow-[0_0_16px_rgba(255,178,63,0.9)]" />
      </span>

      {/* floating credential chip */}
      <motion.div
        className="absolute -right-2 top-[8%] z-30 flex items-center gap-2 rounded-2xl border border-white/10 bg-night/75 px-4 py-3 text-sm font-semibold shadow-2xl backdrop-blur-xl"
        initial={{ opacity: 0, x: 30 }}
        animate={play ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 1.5, duration: 0.8, ease: EASE }}
      >
        <BadgeCheck className="size-5 text-reef" /> Registered in Australia
      </motion.div>
    </motion.div>
  );
}

export function Hero({ play }: { play: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  // background image is optional: without the file the section keeps its gradient
  const [hasBg, setHasBg] = useState(true);

  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = matchMedia("(min-width: 1024px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <section ref={ref} id="top" className="relative flex min-h-[calc(100svh-96px)] items-center overflow-hidden pb-10 pt-28 lg:pt-24">
      {/* background image (optional) + colour grade */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {hasBg && (
          <motion.picture className="block size-full" style={desktop ? { y: bgY } : undefined}>
            <source media="(max-width: 767px)" srcSet="/images/hero-bg-mobile.webp" />
            <img
              src="/images/hero-bg.webp"
              alt=""
              onError={() => setHasBg(false)}
              className="size-full scale-105 object-cover opacity-95"
            />
          </motion.picture>
        )}
        {/* keeps the text readable whatever the image looks like */}
        {hasBg && <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(7,13,28,0.95)_6%,rgba(7,13,28,0.78)_34%,rgba(7,13,28,0.35)_62%,rgba(7,13,28,0.55)_100%)]" />}
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_10%_0%,rgba(255,122,82,0.20),transparent_60%),radial-gradient(70%_60%_at_95%_25%,rgba(45,212,191,0.14),transparent_60%),radial-gradient(60%_50%_at_60%_100%,rgba(124,58,237,0.18),transparent_70%)]" />
        {!hasBg && <div className="grid-lines absolute inset-0" />}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-night to-transparent" />
      </div>

      <motion.div
        style={desktop ? { y, opacity } : undefined}
        className="wrap-wide relative z-10 grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-6"
      >
        <div className="big-scale max-w-[640px] lg:max-w-[min(46vw,900px)]">
          <motion.div
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-ink/90"
            initial={{ opacity: 0, y: 20 }}
            animate={play ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          >
            <span className="relative flex size-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-reef" />
              <span className="relative size-2 rounded-full bg-reef" />
            </span>
            {HERO.eyebrow}
          </motion.div>

          <h1 className="mt-5 font-display text-[clamp(48px,7.2vw,140px)] font-extrabold leading-[0.88]" aria-label={PROFILE.name}>
            <SplitWords text={PROFILE.firstName} play={play} className="block" />
            <SplitWords text={PROFILE.lastName} play={play} className="block" wordClassName="text-gradient" />
          </h1>

          <div className="mt-5 space-y-0.5 font-display text-[clamp(20px,1.8vw,36px)] font-semibold leading-tight">
            {HERO.promise.map((line, i) => (
              <div key={line} className="overflow-hidden">
                <motion.p
                  className={i === 2 ? "text-gradient-reef" : i === 1 ? "text-ink/75" : ""}
                  initial={{ y: "100%" }}
                  animate={play ? { y: "0%" } : {}}
                  transition={{ duration: 0.9, delay: 0.6 + i * 0.12, ease: EASE }}
                >
                  {line}
                </motion.p>
              </div>
            ))}
          </div>

          <motion.p
            className="mt-5 max-w-[48ch] text-base leading-relaxed text-ink/70 md:text-[17px] 2xl:text-[clamp(17px,1vw,22px)]"
            initial={{ opacity: 0, y: 20 }}
            animate={play ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 1, ease: EASE }}
          >
            {HERO.sub}
          </motion.p>

          <motion.div
            className="mt-7 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={play ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 1.15, ease: EASE }}
          >
            <Button href="#contact">Send your profile</Button>
            <Button href="#contact" variant="ghost">
              Book a consultation
            </Button>
          </motion.div>

          <motion.div
            className="mt-8 hidden sm:block lg:hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={play ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 1.3, ease: EASE }}
          >
            <TicketChip play={play} />
          </motion.div>
        </div>

        <HeroStage play={play} />
      </motion.div>
    </section>
  );
}
