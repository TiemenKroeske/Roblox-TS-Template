#!/usr/bin/env node
// Usage: node scripts/install.js @tiemenkroeske/some-package
// Acts as a drop-in for: npm install @tiemenkroeske/some-package
// Always regenerates default.project.json afterwards.

const { execSync } = require("child_process");

const args = process.argv.slice(2);

if (args.length === 0) {
  // No args = plain npm install (restore all deps)
  console.log("📦 Running npm install...");
  execSync("npm install", { stdio: "inherit" });
} else {
  console.log(`📦 Installing ${args.join(" ")}...`);
  execSync(`npm install ${args.join(" ")}`, { stdio: "inherit" });
}

console.log("🔧 Regenerating default.project.json...");
require("./generate-project.js");