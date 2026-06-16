import { CompareDirection, compareFollows } from "./compareFollows.js";
import { discoverConnectionFiles } from "./discoverConnections.js";
import { normalizeUsername, parseFollowersFile, parseFollowingFile } from "./parseConnections.js";

/**
 * @typedef {{ username: string, followedAtMs: number | null, isDeleted: boolean }} ResultRow
 */

/**
 * @param {File[]} files
 * @param {{ direction?: string }} [options]
 */
export async function loadConnectionsAnalysis(files, options = {}) {
  const direction = options.direction ?? CompareDirection.NOT_FOLLOWING_BACK;
  const { following, followerShards } = discoverConnectionFiles(files);

  if (!following) {
    throw new Error(
      "Couldn't find following.json. Export Connections from Instagram, or include followers_and_following in your export."
    );
  }
  if (followerShards.length === 0) {
    throw new Error(
      "Couldn't find followers_*.json. Export Connections from Instagram, or include followers_and_following in your export."
    );
  }

  const followingEntries = await parseFollowingFile(following);
  const followerEntries = [];
  for (const shard of followerShards) {
    followerEntries.push(...(await parseFollowersFile(shard)));
  }

  const followingUsernames = followingEntries.map((e) => e.username);
  const followerUsernames = followerEntries.map((e) => e.username);
  const unmatched = compareFollows(followerUsernames, followingUsernames, direction);

  const followingByUser = new Map(
    followingEntries.map((e) => [normalizeUsername(e.username), e])
  );

  /** @type {ResultRow[]} */
  const rows = unmatched.map((username) => ({
    username,
    followedAtMs: followingByUser.get(normalizeUsername(username))?.followedAtMs ?? null,
    isDeleted: username.startsWith("__deleted__")
  }));

  rows.sort((a, b) => a.username.localeCompare(b.username, undefined, { sensitivity: "base" }));

  return {
    stats: {
      followingCount: followingUsernames.length,
      followersCount: followerUsernames.length,
      notFollowingBackCount: rows.length
    },
    rows,
    direction
  };
}
