// src/client/main.client.ts
// Entry point for the CLIENT (runs on each player's machine).

import { Flamework } from "@flamework/core";
import { makeHelloClient } from "@tiemenkroeske/roblox-ts-package-template/out/client";
import { makeHelloShared } from "@tiemenkroeske/roblox-ts-package-template/out/shared";

Flamework.addPaths("src/client");
Flamework.addPaths("src/shared");

Flamework.ignite();

print(makeHelloShared("shared"));
print(makeHelloClient("client"));
