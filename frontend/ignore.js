const branchName = process.env.VERCEL_GIT_COMMIT_REF;

if (branchName === "gh-pages") {
  console.log("Skipping deployment for branch:", branchName);
  process.exit(0);
} else {
  process.exit(1);
}
