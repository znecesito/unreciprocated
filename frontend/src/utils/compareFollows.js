import { normalizeUsername } from "./parseConnections.js";

export const CompareDirection = {
  NOT_FOLLOWING_BACK: "not_following_back",
  YOU_DONT_FOLLOW_BACK: "fans"
};

function uniqueNormalized(list) {
  const seen = new Set();
  const out = [];
  for (const item of list) {
    const normalized = normalizeUsername(item);
    if (!normalized || seen.has(normalized)) {
      continue;
    }
    seen.add(normalized);
    out.push(normalized);
  }
  return out;
}

/**
 * @param {string[]} followers
 * @param {string[]} following
 * @param {typeof CompareDirection[keyof typeof CompareDirection]} direction
 * @returns {string[]} canonical usernames (first-seen casing from source lists)
 */
export function compareFollows(followers, following, direction = CompareDirection.NOT_FOLLOWING_BACK) {
  const followerSet = new Set(uniqueNormalized(followers));
  const followingSet = new Set(uniqueNormalized(following));

  if (direction === CompareDirection.NOT_FOLLOWING_BACK) {
    return pickFromFollowingNotInSet(following, followerSet);
  }

  if (direction === CompareDirection.YOU_DONT_FOLLOW_BACK) {
    return pickFromFollowingNotInSet(followers, followingSet);
  }

  throw new Error(`Unknown compare direction: ${direction}`);
}

function pickFromFollowingNotInSet(sourceList, excludeSet) {
  const seen = new Set();
  const out = [];
  for (const username of sourceList) {
    const normalized = normalizeUsername(username);
    if (!normalized || excludeSet.has(normalized) || seen.has(normalized)) {
      continue;
    }
    seen.add(normalized);
    out.push(username.trim());
  }
  return out;
}
