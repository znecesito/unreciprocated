import React, { useEffect } from "react";
import LandingHero from "../components/landing/LandingHero.jsx";
import LandingHowItWorks from "../components/landing/LandingHowItWorks.jsx";
import LandingHowTo from "../components/landing/LandingHowTo.jsx";
import LandingPreview from "../components/landing/LandingPreview.jsx";
import { PAGE_TITLE } from "../lib/classes.js";

const HOW_TO_HASH = "#how-to";

function LandingSection({ id, title, children }) {
  return (
    <section id={id} className="landing-section" aria-labelledby={`${id}-heading`}>
      <div className="container">
        <h2 id={`${id}-heading`} className={PAGE_TITLE}>
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}

function scrollToHowTo() {
  document.getElementById("how-to")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function LandingPage({ onNavigate }) {
  useEffect(() => {
    if (window.location.hash !== HOW_TO_HASH) {
      return undefined;
    }
    const frame = requestAnimationFrame(scrollToHowTo);
    return () => cancelAnimationFrame(frame);
  }, []);

  const goToCheck = () => onNavigate("/check");
  const goToHowTo = () => {
    onNavigate(HOW_TO_HASH);
    requestAnimationFrame(scrollToHowTo);
  };

  return (
    <div className="landing-page">
      <LandingHero onGetStarted={goToCheck} onHowToExport={goToHowTo} />

      <LandingSection id="preview" title="What you get">
        <LandingPreview />
      </LandingSection>

      <LandingSection id="steps" title="How it works">
        <LandingHowItWorks />
      </LandingSection>

      <LandingSection id="how-to" title="How to get your export">
        <LandingHowTo onGetStarted={goToCheck} />
      </LandingSection>
    </div>
  );
}
