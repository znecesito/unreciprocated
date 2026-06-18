import React from "react";

const STEPS = [
  {
    number: 1,
    title: "Request your export",
    copy: "In Instagram's Accounts Center, export Connections only — JSON format, All time date range, to device or email."
  },
  {
    number: 2,
    title: "Load the ZIP or folder",
    copy: "Download from Meta, then open unreciprocated and choose the .zip (great on phone) or the unzipped folder."
  },
  {
    number: 3,
    title: "See who doesn't follow back",
    copy: "We compare followers and following from your export and list accounts that haven't followed you back."
  }
];

export default function LandingHowItWorks() {
  return (
    <div className="landing-steps">
      <p className="landing-steps__lede">
        Three steps from Meta's download to your list — nothing leaves your browser.
      </p>
      <ol className="landing-steps__list">
        {STEPS.map((step) => (
          <li key={step.number} className="landing-steps__item">
            <span className="landing-steps__number" aria-hidden>
              {step.number}
            </span>
            <div className="landing-steps__body">
              <h3 className="landing-steps__title">{step.title}</h3>
              <p className="landing-steps__copy">{step.copy}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
