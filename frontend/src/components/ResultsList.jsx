import React, { useMemo, useState } from "react";

function formatFollowedDate(ms) {
  if (!ms) {
    return null;
  }
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(new Date(ms));
}

function profileUrl(username) {
  return `https://www.instagram.com/${encodeURIComponent(username)}/`;
}

export default function ResultsList({ rows }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("alpha");
  const [hideDeleted, setHideDeleted] = useState(false);

  const filtered = useMemo(() => {
    let list = rows;
    if (hideDeleted) {
      list = list.filter((row) => !row.isDeleted);
    }
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter((row) => row.username.toLowerCase().includes(q));
    }
    if (sort === "recent") {
      return [...list].sort((a, b) => (b.followedAtMs ?? 0) - (a.followedAtMs ?? 0));
    }
    return [...list].sort((a, b) =>
      a.username.localeCompare(b.username, undefined, { sensitivity: "base" })
    );
  }, [rows, query, sort, hideDeleted]);

  const deletedCount = useMemo(() => rows.filter((r) => r.isDeleted).length, [rows]);

  return (
    <div className="results-list">
      <div className="results-list__toolbar">
        <label className="results-list__search">
          <span className="sr-only">Search usernames</span>
          <input
            type="search"
            placeholder="Search usernames…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="results-list__search-input"
          />
        </label>
        <label className="results-list__sort">
          <span className="results-list__sort-label">Sort</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="results-list__sort-select"
          >
            <option value="alpha">A → Z</option>
            <option value="recent">Followed recently</option>
          </select>
        </label>
      </div>

      {deletedCount > 0 ? (
        <label className="results-list__filter">
          <input
            type="checkbox"
            checked={hideDeleted}
            onChange={(e) => setHideDeleted(e.target.checked)}
          />
          Hide deleted accounts ({deletedCount})
        </label>
      ) : null}

      <p className="results-list__count muted" role="status">
        Showing {filtered.length.toLocaleString()} of {rows.length.toLocaleString()}
      </p>

      {filtered.length === 0 ? (
        <p className="results-list__empty">No accounts match your filters.</p>
      ) : (
        <ul className="results-list__items">
          {filtered.map((row) => {
            const followedLabel = formatFollowedDate(row.followedAtMs);
            return (
              <li key={row.username} className="results-list__item">
                <a
                  href={profileUrl(row.username)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="results-list__link"
                >
                  @{row.username}
                </a>
                <div className="results-list__meta">
                  {row.isDeleted ? <span className="results-list__badge">Deleted</span> : null}
                  {followedLabel ? (
                    <span className="results-list__date">Followed {followedLabel}</span>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
