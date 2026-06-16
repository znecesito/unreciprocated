function parseJsonText(raw, fileLabel) {
  try {
    return JSON.parse(raw);
  } catch {
    throw new Error(`Invalid JSON in ${fileLabel} file.`);
  }
}

/**
 * @param {string} username
 */
export function normalizeUsername(username) {
  return String(username || "")
    .trim()
    .toLowerCase();
}

function pickUsername(entry) {
  if (!entry || typeof entry !== "object") {
    return null;
  }

  if (typeof entry.title === "string" && entry.title.trim()) {
    return entry.title.trim();
  }

  if (typeof entry.username === "string" && entry.username.trim()) {
    return entry.username.trim();
  }

  if (typeof entry.value === "string" && entry.value.trim()) {
    return entry.value.trim();
  }

  if (Array.isArray(entry.string_list_data)) {
    for (const row of entry.string_list_data) {
      if (typeof row?.value === "string" && row.value.trim()) {
        return row.value.trim();
      }

      if (typeof row?.href === "string" && row.href.includes("instagram.com/")) {
        const normalized = row.href.replace(/\/+$/, "");
        const username = normalized.split("/").pop();
        if (username && username !== "_u") {
          return username.trim();
        }
      }
    }
  }

  return null;
}

function pickTimestampMs(entry) {
  const rows = entry?.string_list_data;
  if (!Array.isArray(rows)) {
    return null;
  }
  for (const row of rows) {
    const ts = row?.timestamp;
    if (typeof ts === "number" && Number.isFinite(ts)) {
      return ts * 1000;
    }
  }
  return null;
}

function isDirectUserEntry(item) {
  return Boolean(
    item &&
      typeof item === "object" &&
      (typeof item.title === "string" ||
        typeof item.username === "string" ||
        typeof item.value === "string" ||
        Array.isArray(item.string_list_data))
  );
}

function extractEntries(payload, nestedKey, label) {
  if (Array.isArray(payload)) {
    if (payload.every(isDirectUserEntry)) {
      return payload;
    }

    const nested = payload.flatMap((item) =>
      Array.isArray(item?.[nestedKey]) ? item[nestedKey] : []
    );
    if (nested.length > 0) {
      return nested;
    }
  }

  if (Array.isArray(payload?.[nestedKey])) {
    return payload[nestedKey];
  }

  throw new Error(
    `Unexpected ${label} format. Expected an array or ${nestedKey} array.`
  );
}

/**
 * @param {File} file
 * @returns {Promise<{ username: string, followedAtMs: number | null }[]>}
 */
export async function parseFollowingFile(file) {
  const payload = parseJsonText(await file.text(), "following");
  const followingArray = extractEntries(payload, "relationships_following", "following");

  const entries = [];
  for (const item of followingArray) {
    const username = pickUsername(item);
    if (username) {
      entries.push({
        username,
        followedAtMs: pickTimestampMs(item)
      });
    }
  }
  return entries;
}

/**
 * @param {File} file
 * @returns {Promise<{ username: string }[]>}
 */
export async function parseFollowersFile(file) {
  const label = file.name || "followers";
  const payload = parseJsonText(await file.text(), label);
  const followersArray = extractEntries(payload, "relationships_followers", "followers");

  const entries = [];
  for (const item of followersArray) {
    const username = pickUsername(item);
    if (username) {
      entries.push({ username });
    }
  }
  return entries;
}
