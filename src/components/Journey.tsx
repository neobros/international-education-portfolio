import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { ABOUT, PROFILE, STEPS } from "../data/content";
import { Button, EASE, Reveal, SplitWords } from "./ui";

function ScrubWord({ word, range, progress }: { word: string; range: [number, number]; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="inline">
      {word}{" "}
    </motion.span>
  );
}

/** Paragraph whose words light up as you scroll through it. */
function ScrubText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className} aria-label={text}>
      <span aria-hidden>
        {words.map((w, i) => (
          <ScrubWord key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
        ))}
      </span>
    </p>
  );
}

function RotatingBadge() {
  const text = `${PROFILE.name} • Study in Australia • `;
  return (
    <div className="absolute -right-2 -top-6 grid size-32 place-items-center rounded-full bg-night md:-right-10 md:size-36">
      <svg viewBox="0 0 100 100" className="absolute inset-0 animate-spin-slow">
        <defs>
          <path id="circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
        </defs>
        <text className="fill-ink font-mono text-[7.4px] uppercase tracking-[0.12em]">
          <textPath href="#circle" textLength="236" lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      <span className="text-2xl">🇦🇺</span>
    </div>
  );
}

export function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5], [1.2, 1]);

  return (
    <section id="about" ref={ref} className="relative py-12 md:py-16">
      <div className="wrap grid items-center gap-16 lg:grid-cols-[440px_1fr]">
        <motion.div
          className="relative mx-auto w-full max-w-[440px]"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE }}
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-[220px] rounded-b-[32px] border border-white/10">
            <motion.img
              src="/images/about-thejan.webp"
              alt={`Portrait of ${PROFILE.name}`}
              loading="lazy"
              style={{ y: imgY, scale: imgScale }}
              className="absolute inset-0 size-full object-cover object-top"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/90 to-transparent p-6 pt-20">
              <p className="font-display text-2xl font-bold">{PROFILE.name}</p>
              <p className="text-sm text-ink/70">{PROFILE.role}</p>
            </div>
          </div>
          <RotatingBadge />
        </motion.div>

        <div>
          <Reveal y={16}>
            <span className="eyebrow">About me</span>
          </Reveal>
          <SplitWords as="h2" text={ABOUT.heading} className="h-section mt-5 max-w-[14ch]" />
          <div className="mt-10 space-y-6">
            {ABOUT.paragraphs.map((p) => (
              <ScrubText key={p} text={p} className="max-w-[48ch] text-[clamp(20px,2vw,26px)] font-medium leading-snug" />
            ))}
          </div>
          <Reveal className="mt-12">
            <blockquote className="border-l-2 border-wattle pl-6 font-display text-[clamp(24px,2.8vw,36px)] font-bold leading-tight">
              <span className="text-gradient">{ABOUT.motto}</span>
            </blockquote>
          </Reveal>
          <Reveal className="mt-10" delay={0.1}>
            <Button href="#contact" variant="ghost">
              Talk to me
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Process() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const line = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="process" className="relative overflow-clip rounded-[40px] bg-sand py-12 text-earth md:mx-4 md:py-16">
      <div className="pointer-events-none absolute -right-40 -top-40 size-[520px] rounded-full bg-[radial-gradient(circle,rgba(255,122,82,0.35),transparent_65%)] blur-2xl" />
      <div className="wrap relative grid gap-16 lg:grid-cols-[1fr_1.3fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal y={16}>
            <span className="eyebrow !text-ochre">How it works</span>
          </Reveal>
          <SplitWords as="h2" text="Six clear steps to your future." className="h-section mt-5 max-w-[12ch]" />
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-[40ch] text-lg text-earth/70">A simple, guided process from your first message to your first week overseas.</p>
          </Reveal>
          <Reveal delay={0.3} className="mt-9">
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 rounded-full bg-earth px-6 py-3.5 font-bold text-sand transition hover:bg-ochre"
            >
              Start with step 1 <span className="transition group-hover:translate-x-1">→</span>
            </a>
          </Reveal>
        </div>

        <ol ref={ref} className="relative space-y-4 pl-10 md:pl-14">
          <span className="absolute bottom-6 left-[15px] top-6 w-[2px] bg-earth/10 md:left-[23px]" />
          <motion.span style={{ scaleY: line }} className="absolute bottom-6 left-[15px] top-6 w-[2px] origin-top bg-gradient-to-b from-wattle to-ochre md:left-[23px]" />
          {STEPS.map((s, i) => (
            <motion.li
              key={s.title}
              className="relative rounded-[26px] bg-white/70 p-7 shadow-[0_20px_50px_-30px_rgba(60,30,10,0.35)] backdrop-blur"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <motion.span
                className="absolute -left-10 top-7 grid size-8 place-items-center rounded-full bg-earth font-mono text-xs font-bold text-sand md:-left-14 md:size-12 md:text-sm"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.2 }}
              >
                {String(i + 1).padStart(2, "0")}
              </motion.span>
              <h3 className="text-2xl font-bold md:text-3xl">{s.title}</h3>
              <p className="mt-2 text-earth/65">{s.text}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
