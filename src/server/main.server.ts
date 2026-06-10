// src/server/main.server.ts
// This is the entry point for the SERVER.
// It tells Flamework to find all @Service classes and start them up.

import { Flamework } from "@flamework/core";
import {
  Shared,
  makeHelloServer,
} from "@tiemenkroeske/roblox-ts-package-template/out/server";

// Tell Flamework where to look for Services.
// The path here is relative to this file — it scans the whole server folder.
Flamework.addPaths("src/server");

// Also scan shared, so shared singletons/components are picked up too.
Flamework.addPaths("src/shared");

// This starts everything — calls onStart() on all services/controllers.
Flamework.ignite();

print(makeHelloServer("server"));
print(Shared.makeHelloShared("shared"));
