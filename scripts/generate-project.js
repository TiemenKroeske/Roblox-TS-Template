const fs = require("fs");
const path = require("path");

const FILE = "default.project.json";
const SCOPE_PATH = "node_modules/@tiemenkroeske";

if (!fs.existsSync(FILE)) {
  console.error("❌ default.project.json not found");
  process.exit(1);
}

const project = JSON.parse(fs.readFileSync(FILE, "utf8"));

if (!fs.existsSync(SCOPE_PATH)) {
  console.log("⚠️ No @tiemenkroeske packages found");
  process.exit(0);
}

const packages = fs
  .readdirSync(SCOPE_PATH)
  .filter((p) => fs.existsSync(path.join(SCOPE_PATH, p, "out")));

// ---------------- HELPERS ----------------

function ensure(obj, key, factory) {
  if (!obj[key]) obj[key] = factory();
  return obj[key];
}

function ensureFolder(obj, key) {
  return ensure(obj, key, () => ({
    $className: "Folder",
  }));
}

function ensureInclude(root) {
  if (!root.rbxts_include) {
    root.rbxts_include = {
      $className: "Folder"
    };
  }
  return root.rbxts_include;
}

// ---------------- BUILD TREE ----------------

function makePackage(pkg, mode) {
  return {
    $className: "Folder",
    out: {
      $className: "Folder",
      [mode]: {
        $path: `node_modules/@tiemenkroeske/${pkg}/out/${mode}`,
      },
      shared: {
        $path: `node_modules/@tiemenkroeske/${pkg}/out/shared`,
      },
    },
  };
}

// ---------------- SERVER ----------------

const serverService = ensureFolder(project.tree, "ServerScriptService");
const serverInclude = ensureInclude(serverService);
const serverNodeModules = ensureFolder(serverInclude, "node_modules");
const serverScope = ensureFolder(serverNodeModules, "@tiemenkroeske");

for (const pkg of packages) {
  if (!serverScope[pkg]) {
    serverScope[pkg] = makePackage(pkg, "server");
  }
}

// ---------------- CLIENT ----------------

const starterPlayer = ensureFolder(project.tree, "StarterPlayer");
const starterScripts = ensureFolder(starterPlayer, "StarterPlayerScripts");
const clientInclude = ensureInclude(starterScripts);
const clientNodeModules = ensureFolder(clientInclude, "node_modules");
const clientScope = ensureFolder(clientNodeModules, "@tiemenkroeske");

for (const pkg of packages) {
  if (!clientScope[pkg]) {
    clientScope[pkg] = makePackage(pkg, "client");
  }
}

// ---------------- SERVICES ----------------

if (!project.tree.Workspace) {
  project.tree.Workspace = {
    $className: "Workspace",
    $properties: { FilteringEnabled: true },
  };
}

if (!project.tree.HttpService) {
  project.tree.HttpService = {
    $className: "HttpService",
    $properties: { HttpEnabled: true },
  };
}

if (!project.tree.SoundService) {
  project.tree.SoundService = {
    $className: "SoundService",
    $properties: { RespectFilteringEnabled: true },
  };
}

// ---------------- WRITE ----------------

fs.writeFileSync(FILE, JSON.stringify(project, null, 2));

console.log(
  `✔ Fixed: no duplicate package nesting (${packages.length} packages)`,
);
