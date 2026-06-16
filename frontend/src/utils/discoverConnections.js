import { filePath } from "./exportIngest.js";

/**
 * @param {File[]} files
 */
export function discoverConnectionFiles(files) {
  const following = files.find((f) => {
    const path = filePath(f).toLowerCase();
    return path.endsWith("following.json") && !path.includes("recently_unfollowed");
  });

  const followerShards = files
    .filter((f) => /followers_\d+\.json$/i.test(filePath(f)))
    .sort((a, b) =>
      filePath(a).localeCompare(filePath(b), undefined, { numeric: true, sensitivity: "base" })
    );

  return { following, followerShards };
}

/**
 * @param {File[]} files
 */
export function hasConnectionFiles(files) {
  const { following, followerShards } = discoverConnectionFiles(files);
  return Boolean(following && followerShards.length > 0);
}
