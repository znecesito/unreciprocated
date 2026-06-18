import React from "react";
import { PRIMARY_BTN } from "../../lib/classes.js";
import { cn } from "../../lib/utils.js";

const STEPS = [
  "Open Instagram → Profile → menu (☰) → Accounts Center.",
  "Your information and permissions → Download your information → Download or transfer information.",
  "Select your Instagram account, then choose Connections only — not your full account export.",
  "Set the date range to All time. A shorter range only includes recent follow/unfollow changes and will give wrong counts.",
  "Format: JSON. Delivery: Download to device (or email). Submit and wait for Meta's link.",
  "Download the .zip, then return here and upload it — or unzip first and pick the folder on desktop."
];

export default function LandingHowTo({ onGetStarted }) {
  return (
    <div className="landing-how-to">
      <p className="landing-how-to__intro">
        <strong>Important:</strong> Use <strong>Connections only</strong> and <strong>All time</strong>.
        Connections keeps the file small; All time ensures your full follower and following lists are
        included. A partial date range can make it look like people don&apos;t follow you back when
        they actually do.
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
