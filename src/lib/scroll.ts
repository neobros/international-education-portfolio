import Lenis from "lenis";

let lenis: Lenis | null = null;

export function startSmoothScroll() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};
  lenis = new Lenis({ lerp: 0.09, anchors: { offset: -80 } });
  let frame = 0;
  const raf = (t: number) => {
    lenis?.raf(t);
    frame = requestAnimationFrame(raf);
  };
  frame = requestAnimationFrame(raf);
  return () => {
    cancelAnimationFrame(frame);
    lenis?.destroy();
    lenis = null;
  };
}

export function scrollToId(id: string) {
  const el = document.querySelector(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -80 });
  else el.scrollIntoView({ behavior: "smooth" });
}

const blockTouch = (e: TouchEvent) => e.preventDefault();

export function lockScroll(locked: boolean) {
  if (locked) lenis?.stop();
  else lenis?.start();
  document.documentElement.style.overflow = locked ? "hidden" : "";
  document.body.style.overflow = locked ? "hidden" : "";
  if (locked) window.addEventListener("touchmove", blockTouch, { passive: false });
  else window.removeEventListener("touchmove", blockTouch);
}
