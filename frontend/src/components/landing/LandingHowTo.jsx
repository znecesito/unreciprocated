import React from "react";
import { PRIMARY_BTN } from "../../lib/classes.js";
import { cn } from "../../lib/utils.js";

const STEPS = [
  "Open Instagram → Profile → menu (☰) → Accounts Center.",
  "Your information and permissions → Download your information → Download or transfer information.",
  "Select your Instagram account. For a smaller file, choose Connections only; full export works too.",
  "Format: JSON. Delivery: Download to device (or email). Submit and wait for Meta's link.",
  "Download the .zip, then return here and upload it — or unzip first and pick the folder on desktop."
];

export default function LandingHowTo({ onGetStarted }) {
  return (
    <div className="landing-how-to">
      <p className="landing-how-to__intro">
        <strong>Tip:</strong> A Connections-only export is faster to download and unzip. Full exports
        include the same <code>followers_and_following</code> files we need.
      </p>
      <ol className="landing-how-to__steps">
        {STEPS.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>

      <div className="landing-how-to__cta-bar">
        <button type="button" className={cn(PRIMARY_BTN, "landing-how-to__cta")} onClick={onGetStarted}>
          Ready? Check my export
        </button>
      </div>
    </div>
  );
}
