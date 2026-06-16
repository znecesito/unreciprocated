import React from "react";
import { PRIMARY_BTN } from "../../lib/classes.js";
import { cn } from "../../lib/utils.js";

const TRUST_ITEMS = [
  "Runs on your device",
  "Never uploaded",
  "No login",
  "JSON export only"
];

function LandingPhoneMock() {
  return (
    <div className="landing-hero__mock" aria-hidden>
      <div className="landing-hero__phone">
        <div className="landing-hero__phone-notch" />
        <div className="landing-hero__phone-screen">
          <p className="landing-hero__phone-eyebrow">Your Instagram</p>
          <p className="landing-hero__phone-title">unreciprocated</p>
          <p className="landing-hero__phone-handle">75 accounts</p>
          <ul className="landing-hero__phone-list">
            <li>@cloiey</li>
            <li>@brianreyes.media</li>
            <li>@unityliondance</li>
          </ul>
          <p className="landing-hero__phone-lede">Tap any name to open their profile.</p>
        </div>
      </div>
    </div>
  );
}

export default function LandingHero({ onGetStarted, onHowToExport }) {
  return (
    <section id="hero" className="landing-hero" aria-labelledby="landing-hero-heading">
      <div className="container landing-hero__inner">
        <div className="landing-hero__copy">
          <h1 id="landing-hero-heading" className="landing-hero__headline">
            Who isn&apos;t following you back?
          </h1>
          <p className="landing-hero__subhead">
            Upload your official Instagram export and see which accounts you follow that don&apos;t
            follow you — privately, in your browser. No scraping, no login.
          </p>

          <div className="landing-hero__ctas">
            <button type="button" className={cn(PRIMARY_BTN, "landing-hero__cta-primary")} onClick={onGetStarted}>
              Check my export
            </button>
            <button type="button" className="landing-hero__cta-secondary" onClick={onHowToExport}>
              How to export
            </button>
          </div>

          <ul className="landing-hero__trust" aria-label="Privacy and access">
            {TRUST_ITEMS.map((item, index) => (
              <React.Fragment key={item}>
                {index > 0 ? (
                  <li className="landing-hero__trust-sep" aria-hidden>
                    ·
                  </li>
                ) : null}
                <li>{item}</li>
              </React.Fragment>
            ))}
          </ul>
        </div>

        <LandingPhoneMock />
      </div>
    </section>
  );
}
