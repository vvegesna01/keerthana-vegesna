const { execSync } = require("child_process");

// Read the last commit date at build time. Falls back to "now" if git
// isn't available, so a build never fails over a footer.
function lastCommitDate() {
  try {
    return execSync("git log -1 --format=%cI").toString().trim();
  } catch {
    return new Date().toISOString();
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: { NEXT_PUBLIC_LAST_UPDATED: lastCommitDate() },
};
console.log(lastCommitDate())
module.exports = nextConfig;