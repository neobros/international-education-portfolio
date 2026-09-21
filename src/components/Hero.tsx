import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { BadgeCheck, Plane } from "lucide-react";
import { AUSTRALIA, HERO, PROFILE } from "../data/content";
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

export function Hero({ play }: { play: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // gentle mouse parallax on the photo
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(useTransform(mx, [-0.5, 0.5], [18, -18]), { stiffness: 60, damping: 20 });
  const py = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 60, damping: 20 });

  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = matchMedia("(min-width: 1024px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-[calc(100svh-96px)] flex-col overflow-hidden lg:flex-row lg:items-center"
      onPointerMove={(e) => {
        if (!desktop) return;
        mx.set(e.clientX / window.innerWidth - 0.5);
        my.set(e.clientY / window.innerHeight - 0.5);
      }}
    >
      {/* Photo: full-bleed on desktop, a top block on mobile */}
      <motion.div
        className="relative h-[56svh] w-full shrink-0 overflow-hidden [mask-image:linear-gradient(to_bottom,#000_0%,#000_50%,rgba(0,0,0,0.55)_72%,transparent_96%)] lg:absolute lg:inset-0 lg:h-auto lg:[mask-image:none]"
        initial={{ opacity: 0, scale: 1.15, filter: "blur(12px)" }}
        animate={play ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
        transition={{ duration: 1.8, ease: EASE }}
      >
        <motion.div className="absolute -inset-6" style={desktop ? { x: px, y: py } : undefined}>
          <motion.picture className="block size-full" style={desktop ? { y: imgY, scale: imgScale } : undefined}>
            <source media="(max-width: 1023px)" srcSet="/images/hero-thejan-mobile.webp" />
            <img
              src="/images/hero-thejan.webp"
              alt={`${PROFILE.name} at a desk with the Melbourne skyline at night in the background`}
              className="size-full object-cover object-[50%_15%] lg:object-[70%_center]"
              fetchPriority="high"
            />
          </motion.picture>
        </motion.div>
        {/* colour grade + legibility overlays */}
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(7,13,28,0.85)_0%,rgba(7,13,28,0.35)_40%,rgba(7,13,28,0.05)_65%,rgba(7,13,28,0.45)_100%)] lg:hidden" />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-night via-night/70 via-35% to-transparent to-65% lg:block" />
        <div className="absolute inset-x-0 bottom-0 hidden h-48 bg-gradient-to-t from-night to-transparent lg:block" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-night/70 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_75%_30%,rgba(255,150,80,0.12),transparent)] mix-blend-screen" />
      </motion.div>

      {/* Floating chips over the photo (desktop) */}
      <motion.div
        className="big-scale absolute right-[4%] top-[17%] z-10 hidden animate-float items-center gap-2 rounded-2xl border border-white/10 bg-night/70 px-4 py-3 text-sm font-semibold shadow-2xl backdrop-blur-xl xl:flex"
        initial={{ opacity: 0, x: 40 }}
        animate={play ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 1.6, duration: 0.9, ease: EASE }}
      >
        <BadgeCheck className="size-5 text-reef" /> Registered in Australia
      </motion.div>
      <motion.div
        className="big-scale absolute bottom-[8%] right-[4%] z-10 hidden animate-float [animation-delay:-3s] lg:block"
        initial={{ opacity: 0, y: 40 }}
        animate={play ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.8, duration: 0.9, ease: EASE }}
      >
        <TicketChip play={play} />
      </motion.div>

      {/* Text */}
      <motion.div style={desktop ? { y: textY, opacity: textOpacity } : undefined} className="wrap-wide relative z-10 -mt-24 pb-12 lg:mt-0 lg:pb-6 lg:pt-20">
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

          <h1 className="mt-5 font-display text-[clamp(48px,7.2vw,140px)] font-extrabold leading-[0.88] drop-shadow-[0_4px_30px_rgba(7,13,28,0.6)]" aria-label={PROFILE.name}>
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
            className="mt-10 lg:hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={play ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 1.3, ease: EASE }}
          >
            <TicketChip play={play} />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
