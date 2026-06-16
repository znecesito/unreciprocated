import React from "react";

const FEATURES = [
  {
    title: "One clear number",
    copy: "See how many accounts you follow who don't follow you back — plus your total following and follower counts."
  },
  {
    title: "Searchable list",
    copy: "Filter by username, sort A–Z or by when you followed them, and tap through to Instagram profiles."
  },
  {
    title: "Snapshot, not live",
    copy: "Results reflect your export file from Meta — handy for a periodic check, not real-time unfollow tracking."
  }
];

export default function LandingPreview() {
  return (
    <div className="landing-preview">
      <p className="landing-preview__lede">
        A focused read on your connections data — no Wrapped story deck, just the answer you came for.
      </p>
      <ul className="landing-preview__grid">
        {FEATURES.map((feature, index) => (
          <li key={feature.title} className="landing-preview__card">
            <div className="landing-preview-teaser">
              <p className="landing-preview__index">0{index + 1}</p>
              <p className="landing-preview-teaser__stat">
                {index === 0 ? "75" : index === 1 ? "A → Z" : "JSON"}
              </p>
            </div>
            <div className="landing-preview__meta">
              <h3 className="landing-preview__title">{feature.title}</h3>
              <p className="landing-preview__copy">{feature.copy}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
