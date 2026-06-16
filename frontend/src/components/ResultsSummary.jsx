import React from "react";

export default function ResultsSummary({ stats }) {
  return (
    <div className="results-summary" role="group" aria-label="Summary">
      <div className="results-summary__card">
        <p className="results-summary__value">{stats.followingCount.toLocaleString()}</p>
        <p className="results-summary__label">You follow</p>
      </div>
      <div className="results-summary__card">
        <p className="results-summary__value">{stats.followersCount.toLocaleString()}</p>
        <p className="results-summary__label">Follow you</p>
      </div>
      <div className="results-summary__card results-summary__card--accent">
        <p className="results-summary__value">{stats.notFollowingBackCount.toLocaleString()}</p>
        <p className="results-summary__label">Don&apos;t follow back</p>
      </div>
    </div>
  );
}
