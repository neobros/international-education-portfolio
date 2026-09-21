import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { DISCLAIMER, NAV, PROFILE, ROUTE, SOCIALS, TOPICS } from "../data/content";
import { BrandIcons } from "./icons";
import { Aurora } from "./Hero";
import { Button, EASE, Reveal, SectionHeading, SplitWords } from "./ui";

export function Social() {
  return (
    <section id="social" className="relative py-28 md:py-36">
      <div className="wrap">
        <SectionHeading eyebrow="Social" title="Follow my education journey." />
        <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-5">
          {SOCIALS.map((s, i) => {
            const Icon = BrandIcons[s.key];
            return (
              <motion.a
                key={s.key}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener"
                className="group relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-white/[0.03] p-6"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.07, ease: EASE }}
                whileHover={{ y: -6 }}
              >
                <span className="absolute inset-0 translate-y-full bg-gradient-to-t from-wattle to-coral transition-transform duration-500 ease-out group-hover:translate-y-0" />
                <span className="relative flex items-start justify-between">
                  <Icon className="size-7 transition-colors duration-500 group-hover:text-night" />
                  <ArrowUpRight className="size-5 text-mute transition duration-500 group-hover:rotate-45 group-hover:text-night" />
                </span>
                <span className="relative mt-10 block font-display text-xl font-bold transition-colors duration-500 group-hover:text-night">{s.label}</span>
                <span className="relative block text-sm text-mute transition-colors duration-500 group-hover:text-night/70">{s.handle}</span>
              </motion.a>
            );
          })}
        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          {TOPICS.map((t, i) => (
            <motion.span
              key={t}
              className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-ink/80"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.05, type: "spring", stiffness: 300, damping: 20 }}
            >
              {t}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.88, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], [80, 40]);

  return (
    <section ref={ref} className="px-3 py-10 md:px-4">
      <motion.div style={{ scale, borderRadius: radius }} className="relative overflow-hidden bg-deep py-28 md:py-40">
        <Aurora />
        <div className="grid-lines pointer-events-none absolute inset-0" />
        <div className="wrap relative text-center">
          <Reveal y={16}>
            <span className="eyebrow justify-center">Your next chapter</span>
          </Reveal>
          <SplitWords as="h2" text="Your future has more than one destination." className="mx-auto mt-6 max-w-[14ch] font-display text-[clamp(44px,8vw,120px)] font-extrabold leading-[0.92]" />
          <Reveal delay={0.2}>
            <p className="mx-auto mt-8 max-w-[44ch] text-lg text-ink/70">Let's find the option that fits your profile, goals and future.</p>
          </Reveal>

          <div className="relative mx-auto mt-12 max-w-4xl overflow-hidden" aria-label="Australia, New Zealand, UK, Europe, Asia, Canada, UAE">
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-mono text-sm md:text-base">
              {ROUTE.map((r, i) => (
                <motion.span
                  key={r.c}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.6, ease: EASE }}
                >
                  <span className={`rounded-full px-3 py-1.5 ${i === 0 ? "bg-gradient-to-r from-wattle to-ochre font-bold text-night" : "border border-white/15 text-wattle"}`}>
                    {r.f} {r.c}
                  </span>
                  {i < ROUTE.length - 1 && <span className="text-mute">✈</span>}
                </motion.span>
              ))}
            </div>
          </div>

          <Reveal delay={0.4} className="mt-12 flex flex-wrap justify-center gap-3">
            <Button href="#contact">Book a consultation</Button>
            <Button href="#contact" variant="ghost">
              Send your profile
            </Button>
          </Reveal>
        </div>
      </motion.div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden pt-20">
      <div className="wrap">
        <div className="flex flex-wrap items-start justify-between gap-10 border-b border-white/[0.08] pb-12">
          <div>
            <p className="font-display text-2xl font-bold">{PROFILE.name}</p>
            <p className="text-mute">{PROFILE.role}</p>
          </div>
          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-12 gap-y-2 text-sm text-ink/75">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="transition hover:text-wattle">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a href="#top" className="group grid size-14 place-items-center rounded-full border border-white/15 transition hover:border-wattle hover:bg-wattle hover:text-night" aria-label="Back to top">
            <ArrowUp className="size-5 transition group-hover:-translate-y-1" />
          </a>
        </div>
        <div className="flex flex-wrap justify-between gap-4 py-8 text-xs text-mute">
          <span>© 2026 {PROFILE.name} · {PROFILE.role}</span>
          <span className="max-w-[70ch]">{DISCLAIMER}</span>
        </div>
      </div>
      <motion.p
        aria-hidden
        className="pointer-events-none select-none whitespace-nowrap text-center font-display text-[17vw] font-extrabold leading-[0.75] text-white/[0.04]"
        initial={{ y: "40%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: EASE }}
      >
        {PROFILE.firstName.toUpperCase()}
      </motion.p>
    </footer>
  );
}
