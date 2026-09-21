import { useEffect, useRef, useState, type ReactNode, type MouseEvent } from "react";
import { animate, motion, useInView, useMotionValue, useSpring, type Variants } from "motion/react";
import { ArrowUpRight } from "lucide-react";

export const EASE = [0.22, 1, 0.36, 1] as const;

/** Fades and lifts children into view once. */
export function Reveal({
  children,
  delay = 0,
  y = 40,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

const wordParent: Variants = { hidden: {}, show: (stagger: number) => ({ transition: { staggerChildren: stagger } }) };
const wordChild: Variants = {
  hidden: { y: "110%", rotate: 4 },
  show: { y: "0%", rotate: 0, transition: { duration: 0.9, ease: EASE } },
};

/** Splits text into words that slide up out of a mask. */
export function SplitWords({
  text,
  className = "",
  wordClassName = "",
  stagger = 0.06,
  play,
  as = "span",
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  stagger?: number;
  play?: boolean;
  as?: "span" | "h1" | "h2" | "h3" | "p";
}) {
  const Tag = motion[as];
  const controlled = play !== undefined;
  return (
    <Tag
      className={className}
      variants={wordParent}
      custom={stagger}
      initial="hidden"
      {...(controlled ? { animate: play ? "show" : "hidden" } : { whileInView: "show", viewport: { once: true, margin: "-40px" } })}
      aria-label={text}
    >
      {text.split(" ").map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
          <motion.span className={`inline-block ${wordClassName}`} variants={wordChild}>
            {w}
            {" "}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/** Pulls its child toward the pointer. */
export function Magnetic({ children, strength = 0.35 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 200, damping: 15, mass: 0.4 });
  const y = useSpring(0, { stiffness: 200, damping: 15, mass: 0.4 });
  const move = (e: MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  return (
    <motion.div
      ref={ref}
      className="inline-block"
      style={{ x, y }}
      onMouseMove={move}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

type BtnVariant = "primary" | "ghost" | "light";
const btnStyles: Record<BtnVariant, string> = {
  primary: "bg-gradient-to-r from-wattle via-coral to-ochre text-night shadow-[0_18px_50px_-15px_rgba(255,120,60,0.7)]",
  ghost: "border border-white/15 bg-white/[0.03] text-ink hover:border-white/40 backdrop-blur",
  light: "bg-ink text-night",
};

export function Button({
  href,
  children,
  variant = "primary",
  onClick,
  type,
  icon = true,
  className = "",
}: {
  href?: string;
  children: ReactNode;
  variant?: BtnVariant;
  onClick?: () => void;
  type?: "button" | "submit";
  icon?: boolean;
  className?: string;
}) {
  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      {icon && (
        <span className="relative z-10 grid size-7 place-items-center overflow-hidden rounded-full bg-night/10">
          <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:translate-x-4 group-hover:-translate-y-4" />
          <ArrowUpRight className="absolute size-4 -translate-x-4 translate-y-4 transition-transform duration-500 group-hover:translate-x-0 group-hover:translate-y-0" />
        </span>
      )}
      <span className="absolute inset-0 -translate-x-full bg-white/25 transition-transform duration-700 ease-out group-hover:translate-x-0" />
    </>
  );
  const cls = `group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-6 py-3.5 text-[15px] font-bold transition-colors ${btnStyles[variant]} ${className}`;
  return (
    <Magnetic strength={0.25}>
      {href ? (
        <a href={href} className={cls} data-cursor="hover" onClick={onClick}>
          {inner}
        </a>
      ) : (
        <button type={type ?? "button"} className={cls} data-cursor="hover" onClick={onClick}>
          {inner}
        </button>
      )}
    </Magnetic>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  className = "",
  titleClassName = "",
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  className?: string;
  titleClassName?: string;
}) {
  return (
    <div className={className}>
      <Reveal y={16}>
        <span className="eyebrow">{eyebrow}</span>
      </Reveal>
      <SplitWords as="h2" text={title} className={`h-section mt-5 max-w-[20ch] ${titleClassName}`} />
      {lede && (
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-mute">{lede}</p>
        </Reveal>
      )}
    </div>
  );
}

/** Counts up to `to` when scrolled into view. */
export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const c = animate(0, to, {
      duration: 1.8,
      ease: EASE,
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = Math.round(v) + suffix;
      },
    });
    return () => c.stop();
  }, [inView, to, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

/** Sets --x/--y CSS vars for the .spotlight hover effect. */
export function spotlight(e: MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
}

/** Dot + trailing ring that grows over interactive elements. Desktop only. */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [hidden, setHidden] = useState(true);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 350, damping: 30, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 350, damping: 30, mass: 0.5 });

  useEffect(() => {
    const fine = matchMedia("(pointer: fine)").matches && !matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(fine);
    if (!fine) return;
    document.documentElement.classList.add("has-cursor");
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHidden(false);
      const t = e.target as HTMLElement | null;
      setHover(!!t?.closest("a, button, [data-cursor='hover'], select, input, textarea, label"));
    };
    const leave = () => setHidden(true);
    window.addEventListener("pointermove", move);
    document.addEventListener("pointerleave", leave);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, [x, y]);

  if (!enabled) return null;
  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-wattle"
        style={{ x, y, opacity: hidden ? 0 : 1 }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] -translate-x-1/2 -translate-y-1/2 rounded-full border border-wattle/60 mix-blend-difference"
        style={{ x: rx, y: ry, opacity: hidden ? 0 : 1 }}
        animate={{ width: hover ? 64 : 34, height: hover ? 64 : 34, backgroundColor: hover ? "rgba(255,178,63,0.9)" : "rgba(255,178,63,0)" }}
        transition={{ duration: 0.3, ease: EASE }}
      />
    </>
  );
}
