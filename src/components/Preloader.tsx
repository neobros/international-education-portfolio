import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion } from "motion/react";
import { Handshake, Plane } from "lucide-react";
import { DESTINATIONS, PARTNERS, PROFILE } from "../data/content";
import { MAP_PINS, MAP_VIEWBOX, ORIGIN } from "../data/worldmap";
import { EASE } from "./ui";

const DURATION = 3.4; // seconds for the 0 → 100 count

// Flight timeline, as fractions of DURATION. Australia leaves last and lands last.
type Flight = { code: string; d: string; start: number; dur: number; x: number; y: number; focus: boolean };
const AU_START = 0.36;
const AU_DUR = 0.46;
const LAND_MS = (AU_START + AU_DUR) * DURATION * 1000;

function arcPath(bx: number, by: number) {
  const { x: ax, y: ay } = ORIGIN;
  const dx = bx - ax;
  const dy = by - ay;
  const dist = Math.hypot(dx, dy);
  let nx = -dy / dist;
  let ny = dx / dist;
  if (ny > 0) {
    nx = -nx;
    ny = -ny;
  }
  const k = dist * 0.3;
  return `M ${ax} ${ay} Q ${(ax + bx) / 2 + nx * k} ${(ay + by) / 2 + ny * k} ${bx} ${by}`;
}

const FLIGHTS: Flight[] = (() => {
  const others = DESTINATIONS.filter((d) => !d.focus && MAP_PINS[d.c]);
  const focus = DESTINATIONS.filter((d) => d.focus && MAP_PINS[d.c]);
  return [
    ...others.map((d, k) => ({ code: d.c, d: arcPath(MAP_PINS[d.c].x, MAP_PINS[d.c].y), start: 0.05 + k * 0.03, dur: 0.32, ...MAP_PINS[d.c], focus: false })),
    ...focus.map((d) => ({ code: d.c, d: arcPath(MAP_PINS[d.c].x, MAP_PINS[d.c].y), start: AU_START, dur: AU_DUR, ...MAP_PINS[d.c], focus: true })),
  ];
})();

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/** Dotted world map with flights from Colombo to every destination. */
function WorldFlights({ register }: { register: (update: (p: number) => void) => void }) {
  const trails = useRef<(SVGPathElement | null)[]>([]);
  const planes = useRef<(SVGGElement | null)[]>([]);
  const pins = useRef<(SVGGElement | null)[]>([]);

  useEffect(() => {
    const lens = trails.current.map((t) => t?.getTotalLength() ?? 0);
    trails.current.forEach((t, i) => {
      if (!t) return;
      t.style.strokeDasharray = String(lens[i]);
      t.style.strokeDashoffset = String(lens[i]);
    });
    register((p) => {
      FLIGHTS.forEach((f, i) => {
        const trail = trails.current[i];
        const plane = planes.current[i];
        const pin = pins.current[i];
        if (!trail || !plane || !pin) return;
        const local = Math.min(1, Math.max(0, (p - f.start) / f.dur));
        const e = easeInOut(local);
        const len = lens[i];
        trail.style.strokeDashoffset = String(len * (1 - e));
        const pt = trail.getPointAtLength(len * e);
        const ahead = trail.getPointAtLength(Math.min(len, len * e + 0.3));
        const angle = (Math.atan2(ahead.y - pt.y, ahead.x - pt.x) * 180) / Math.PI;
        plane.setAttribute("transform", `translate(${pt.x} ${pt.y}) rotate(${angle}) scale(${f.focus ? 1.5 : 1})`);
        plane.style.opacity = local > 0 && local < 1 ? "1" : "0";
        pin.style.opacity = local >= 1 ? "1" : "0";
      });
    });
  }, [register]);

  return (
    <div
      className="pointer-events-none relative -mx-5 mt-8 aspect-[116/60] w-[calc(100%+40px)] md:-mx-10 md:w-[calc(100%+80px)] lg:absolute lg:right-[2vw] lg:top-[84px] lg:mx-0 lg:mt-0 lg:h-[calc(100vh-320px)] lg:w-auto lg:max-w-[72vw]"
      aria-hidden
    >
      <motion.img
        src="/images/world-dots.svg"
        style={{ maskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, #000 55%, transparent 100%)", WebkitMaskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, #000 55%, transparent 100%)" }}
        alt=""
        className="absolute inset-0 size-full"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 0.32, scale: 1 }}
        transition={{ duration: 1.2, ease: EASE }}
      />
      <svg
        viewBox={`0 0 ${MAP_VIEWBOX.w} ${MAP_VIEWBOX.h}`}
        className="absolute inset-0 size-full overflow-visible [filter:drop-shadow(0_0_1.5px_rgba(255,178,63,0.55))]"
      >
        <defs>
          <linearGradient id="au-trail" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffb23f" />
            <stop offset="1" stopColor="#ff5a36" />
          </linearGradient>
        </defs>

        {FLIGHTS.map((f, i) => (
          <path
            key={`t-${f.code}`}
            ref={(el) => {
              trails.current[i] = el;
            }}
            d={f.d}
            fill="none"
            stroke={f.focus ? "url(#au-trail)" : "rgba(45,212,191,0.75)"}
            strokeWidth={f.focus ? 0.38 : 0.16}
            strokeLinecap="round"
          />
        ))}

        {/* origin */}
        <g>
          <circle cx={ORIGIN.x} cy={ORIGIN.y} r="0.6" fill="#2dd4bf" />
          <circle cx={ORIGIN.x} cy={ORIGIN.y} r="0.6" fill="none" stroke="#2dd4bf" strokeWidth="0.15">
            <animate attributeName="r" values="0.6;3" dur="1.6s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;0" dur="1.6s" repeatCount="indefinite" />
          </circle>
          <text x={ORIGIN.x - 1.2} y={ORIGIN.y + 2.6} className="fill-reef font-mono" fontSize="1.6" fontWeight="700">
            {ORIGIN.code}
          </text>
        </g>

        {/* arrival pins */}
        {FLIGHTS.map((f, i) => (
          <g
            key={`p-${f.code}`}
            ref={(el) => {
              pins.current[i] = el;
            }}
            style={{ opacity: 0, transition: "opacity 0.3s" }}
          >
            <circle cx={f.x} cy={f.y} r={f.focus ? 0.75 : 0.45} fill={f.focus ? "#ffb23f" : "#eef2ff"} />
            <circle cx={f.x} cy={f.y} r="0.5" fill="none" stroke={f.focus ? "#ffb23f" : "#2dd4bf"} strokeWidth="0.12">
              <animate attributeName="r" values={f.focus ? "0.7;4" : "0.5;2.2"} dur="1.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;0" dur="1.4s" repeatCount="indefinite" />
            </circle>
            <text
              x={f.x}
              y={f.y - (f.focus ? 1.6 : 1)}
              textAnchor="middle"
              className={`font-mono ${f.focus ? "fill-wattle" : "fill-ink"}`}
              fontSize={f.focus ? 1.9 : 1.1}
              fontWeight="700"
            >
              {f.code}
            </text>
          </g>
        ))}

        {/* planes */}
        {FLIGHTS.map((f, i) => (
          <g
            key={`pl-${f.code}`}
            ref={(el) => {
              planes.current[i] = el;
            }}
            style={{ opacity: 0 }}
          >
            <path d="M1.3 0 L-0.8 -0.75 L-0.35 0 L-0.8 0.75 Z" fill={f.focus ? "#ffb23f" : "#eef2ff"} />
          </g>
        ))}
      </svg>
    </div>
  );
}

/** Spins through destinations, slowing down, then lands on Australia. */
function useDestinationSlot() {
  const others = DESTINATIONS.filter((d) => !d.focus);
  const final = DESTINATIONS.find((d) => d.focus) ?? DESTINATIONS[0];
  const [current, setCurrent] = useState(others[0]);
  const [landed, setLanded] = useState(false);

  useEffect(() => {
    const timers: number[] = [];
    let t = 250;
    let gap = 95;
    let i = 1;
    while (t < LAND_MS - 380) {
      const d = others[i % others.length];
      timers.push(window.setTimeout(() => setCurrent(d), t));
      t += gap;
      gap *= 1.14;
      i++;
    }
    timers.push(
      window.setTimeout(() => {
        setCurrent(final);
        setLanded(true);
      }, LAND_MS),
    );
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { current, landed };
}

function Row({ items, reverse, className }: { items: React.ReactNode[]; reverse?: boolean; className?: string }) {
  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
      <div className={`flex w-max gap-3 pr-3 ${reverse ? "animate-marquee-rev" : "animate-marquee"} ${className ?? ""}`}>
        {items}
        {items}
      </div>
    </div>
  );
}

export function Preloader({ onDone }: { onDone: () => void }) {
  const barRef = useRef<HTMLDivElement>(null);
  const jetRef = useRef<HTMLDivElement>(null);
  const flightsUpdate = useRef<(p: number) => void>(() => {});
  const registerFlights = useCallback((fn: (p: number) => void) => {
    flightsUpdate.current = fn;
  }, []);
  const { current, landed } = useDestinationSlot();

  useEffect(() => {
    const c = animate(0, 100, {
      duration: DURATION,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => {
        if (barRef.current) barRef.current.style.scale = `${v / 100} 1`;
        if (jetRef.current) {
          // taxi along the runway, lift off in the last stretch
          const lift = v > 78 ? ((v - 78) / 22) ** 2 : 0;
          jetRef.current.style.left = `${v}%`;
          jetRef.current.style.transform = `translate(-50%, ${-50 - lift * 60}%) rotate(${-lift * 12}deg)`;
        }
        flightsUpdate.current(v / 100);
      },
      onComplete: () => setTimeout(onDone, 600),
    });
    return () => c.stop();
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex flex-col justify-between overflow-hidden bg-night px-5 py-6 md:px-10 md:py-8"
      initial={{ clipPath: "inset(0 0 0% 0)" }}
      exit={{ clipPath: "inset(0 0 100% 0)", transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }}
    >
      {/* colour grade: same palette on every screen size */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,122,82,0.13)_0%,rgba(124,58,237,0.06)_50%,rgba(45,212,191,0.09)_100%)] lg:bg-[radial-gradient(90%_60%_at_0%_0%,rgba(255,122,82,0.22),transparent_60%),radial-gradient(80%_60%_at_100%_100%,rgba(45,212,191,0.16),transparent_60%),radial-gradient(70%_50%_at_60%_55%,rgba(124,58,237,0.16),transparent_70%)]" />
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(50%_40%_at_75%_30%,rgba(255,178,63,0.14),transparent_70%)]"
          animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.08, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-night/40 via-transparent to-night/70" />
      </div>

      {/* top bar */}
      <motion.div
        className="relative flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-mute"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="flex items-center gap-2">
          <span className="relative flex size-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-reef" />
            <span className="relative size-2 rounded-full bg-reef" />
          </span>
          Now boarding
        </span>
        <span className="hidden sm:inline">{PROFILE.role}</span>
        <span>Gate · 2026</span>
      </motion.div>

      {/* centre */}
      <div className="relative my-auto py-6 lg:static lg:py-0">
        <h1 className="relative z-10 flex flex-wrap gap-x-[0.25em] font-display text-[13vw] font-extrabold leading-[0.9] md:text-[7vw] lg:text-[5.4vw]" aria-label={PROFILE.name}>
          {[PROFILE.firstName, PROFILE.lastName].map((word, w) => (
            <span key={word} className="inline-flex whitespace-nowrap" aria-hidden>
              {word.split("").map((l, i) => (
                <span key={i} className="overflow-hidden pb-[0.08em]">
                  <motion.span
                    className={`inline-block ${w === 0 ? "text-ink" : "text-gradient"}`}
                    initial={{ y: "110%", rotate: 8 }}
                    animate={{ y: "0%", rotate: 0 }}
                    transition={{ duration: 0.9, delay: 0.1 + (w * PROFILE.firstName.length + i) * 0.035, ease: EASE }}
                  >
                    {l}
                  </motion.span>
                </span>
              ))}
            </span>
          ))}
        </h1>

        {/* destination slot */}
        <motion.div
          className="relative z-10 mt-6 flex flex-wrap items-center gap-x-4 gap-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-mute">Destination</span>
          <div
            className={`relative flex h-14 min-w-[260px] items-center overflow-hidden rounded-2xl border px-4 transition-colors duration-500 md:h-16 ${
              landed ? "border-wattle/60 bg-wattle/10" : "border-white/10 bg-white/[0.04]"
            }`}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={current.c}
                className="flex items-center gap-3 whitespace-nowrap font-display text-2xl font-extrabold md:text-3xl"
                initial={{ y: "120%", opacity: 0, filter: "blur(4px)" }}
                animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                exit={{ y: "-120%", opacity: 0, filter: "blur(4px)" }}
                transition={{ duration: landed ? 0.5 : 0.12, ease: landed ? EASE : "linear" }}
              >
                <span className="text-3xl">{current.f}</span>
                <span className={landed ? "text-gradient" : "text-ink"}>{current.n}</span>
              </motion.span>
            </AnimatePresence>
          </div>
          <AnimatePresence>
            {landed && (
              <motion.span
                className="rounded-full bg-reef/15 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-reef"
                initial={{ opacity: 0, scale: 0.6, x: -10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
              >
                ✓ Registered agent
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>

        <WorldFlights register={registerFlights} />

      </div>

      {/* bottom */}
      <div className="relative space-y-3">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8, ease: EASE }}>
          <p className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-mute">
            <Handshake className="size-3.5 text-wattle" /> Our partners
          </p>
          <Row
            className="[animation-duration:80s]"
            items={PARTNERS.map((p) => (
              <span key={p.name} className="flex items-center gap-2.5 whitespace-nowrap rounded-full border border-white/10 bg-white/[0.04] py-1 pl-1 pr-4 text-sm font-semibold text-ink/85">
                <img src={p.logo} alt="" className="size-8 rounded-full bg-white/10 object-contain" />
                {p.name}
              </span>
            ))}
          />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65, duration: 0.8, ease: EASE }}>
          <Row
            reverse
            items={DESTINATIONS.map((d) => (
              <span key={d.c} className="flex items-center gap-2 whitespace-nowrap px-2 font-display text-xl font-bold text-ink/50">
                <span>{d.f}</span>
                {d.n}
                <span className="ml-2 text-wattle/60">✦</span>
              </span>
            ))}
          />
        </motion.div>

        <div className="flex items-center justify-between pt-3 font-mono text-[11px] uppercase tracking-[0.2em]">
          <span className="text-reef">CMB · Colombo</span>
          <span className="hidden text-mute sm:inline">Preparing your journey</span>
          <span className="text-wattle">AUS · Australia</span>
        </div>

        {/* runway: the plane flies left to right as the site loads */}
        <div className="relative h-12">
          <div className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 rounded bg-white/10" />
          <div className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 [background:repeating-linear-gradient(90deg,rgba(255,255,255,0.25)_0_14px,transparent_14px_30px)] [mask-image:linear-gradient(90deg,#000,#000)]" />
          <div ref={barRef} className="absolute inset-x-0 top-1/2 h-[3px] origin-left -translate-y-1/2 scale-x-0 rounded bg-gradient-to-r from-reef via-wattle to-coral shadow-[0_0_14px_rgba(255,178,63,0.8)]" />
          <span className="absolute left-0 top-1/2 size-2.5 -translate-y-1/2 rounded-full bg-reef shadow-[0_0_10px_#2dd4bf]" />
          <span className="absolute right-0 top-1/2 size-2.5 -translate-y-1/2 rounded-full bg-wattle shadow-[0_0_10px_#ffb23f]" />
          <div ref={jetRef} className="absolute left-0 top-1/2" style={{ transform: "translate(-50%, -50%)" }}>
            <div className="relative">
              <span className="absolute right-full top-1/2 mr-1 h-[2px] w-16 -translate-y-1/2 rounded bg-gradient-to-l from-wattle/80 to-transparent" />
              <Plane className="size-8 rotate-45 fill-wattle text-wattle drop-shadow-[0_0_12px_rgba(255,178,63,0.9)]" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
