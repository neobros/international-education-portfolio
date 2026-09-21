import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { NAV, PROFILE } from "../data/content";
import { lockScroll, scrollToId } from "../lib/scroll";
import { Button, EASE } from "./ui";

export function Nav() {
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 400 && !open);
    setSolid(y > 40);
  });

  const toggle = (v: boolean) => {
    setOpen(v);
    lockScroll(v);
  };
  const go = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    toggle(false);
    setTimeout(() => scrollToId(href), 60);
  };

  return (
    <>
      <motion.div className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-wattle via-coral to-reef" style={{ scaleX: progress }} />

      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <div className="wrap-wide pt-3">
          <div
            className={`flex h-16 items-center justify-between gap-4 rounded-full px-3 pl-5 transition-all duration-500 ${
              solid || open ? "glass shadow-[0_10px_40px_-15px_rgba(0,0,0,0.6)]" : "border border-transparent"
            }`}
          >
            <a href="#top" className="flex items-center gap-3" onClick={() => toggle(false)}>
              <span className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-wattle to-ochre font-display text-sm font-extrabold text-night">
                {PROFILE.initials}
              </span>
              <span className="leading-tight">
                <span className="block whitespace-nowrap font-display text-[15px] font-bold">{PROFILE.name}</span>
                <span className="hidden whitespace-nowrap text-[11px] text-mute sm:block lg:hidden xl:block">{PROFILE.role}</span>
              </span>
            </a>

            <nav aria-label="Main" className="hidden lg:block">
              <ul className="flex gap-0 xl:gap-1">
                {NAV.map((n) => (
                  <li key={n.href}>
                    <a href={n.href} className="group relative block whitespace-nowrap rounded-full px-3 py-2 text-sm xl:px-4 text-ink/75 transition-colors hover:text-ink">
                      {n.label}
                      <span className="absolute inset-x-4 bottom-1 h-px origin-left scale-x-0 bg-wattle transition-transform duration-500 group-hover:scale-x-100" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <div className="hidden sm:block">
                <Button href="#contact" className="!px-5 !py-2.5 !text-sm whitespace-nowrap" icon={false}>
                  Send your profile
                </Button>
              </div>
              <button
                className="relative grid size-11 place-items-center rounded-full border border-white/15 lg:hidden"
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                onClick={() => toggle(!open)}
              >
                <motion.span className="absolute h-[2px] w-5 rounded bg-ink" animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }} />
                <motion.span className="absolute h-[2px] w-5 rounded bg-ink" animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }} />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col justify-end bg-night/95 px-6 pb-12 backdrop-blur-xl lg:hidden"
            initial={{ clipPath: "circle(0% at 92% 5%)" }}
            animate={{ clipPath: "circle(150% at 92% 5%)" }}
            exit={{ clipPath: "circle(0% at 92% 5%)" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <ul className="space-y-1">
              {NAV.map((n, i) => (
                <li key={n.href} className="overflow-hidden">
                  <motion.a
                    href={n.href}
                    onClick={(e) => go(e, n.href)}
                    className="flex items-baseline gap-4 py-2 font-display text-5xl font-bold"
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    transition={{ delay: 0.15 + i * 0.06, duration: 0.7, ease: EASE }}
                  >
                    <span className="font-mono text-xs text-wattle">0{i + 1}</span>
                    {n.label}
                  </motion.a>
                </li>
              ))}
            </ul>
            <motion.div className="mt-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
              <Button
                href="#contact"
                onClick={() => {
                  toggle(false);
                  setTimeout(() => scrollToId("#contact"), 60);
                }}
              >
                Send your profile
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
