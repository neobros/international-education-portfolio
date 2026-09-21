import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, MotionConfig } from "motion/react";
import { lockScroll, startSmoothScroll } from "./lib/scroll";
import { Preloader } from "./components/Preloader";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Services, VelocityMarquee } from "./components/Services";
import { Australia } from "./components/Australia";
import { Destinations } from "./components/Destinations";
import { Credentials, Partnerships, Tours } from "./components/Proof";
import { Reviews, Stories } from "./components/Voices";
import { About, Process } from "./components/Journey";
import { Contact } from "./components/Contact";
import { FinalCta, Footer, Social } from "./components/Outro";
import { Cursor } from "./components/ui";

export default function App() {
  const [loading, setLoading] = useState(true);
  const done = useCallback(() => setLoading(false), []);

  useEffect(() => startSmoothScroll(), []);
  // no scrolling while the loading screen is up; always start at the top
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    lockScroll(loading);
  }, [loading]);

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>{loading && <Preloader onDone={done} />}</AnimatePresence>
      <Cursor />
      <div className="grain" aria-hidden />
      <Nav />
      <main>
        <Hero play={!loading} />
        <VelocityMarquee />
        <Services />
        <Australia />
        <Destinations />
        <Credentials />
        <Partnerships />
        <Tours />
        <Stories />
        <Reviews />
        <About />
        <Process />
        <Contact />
        <Social />
        <FinalCta />
      </main>
      <Footer />
    </MotionConfig>
  );
}
