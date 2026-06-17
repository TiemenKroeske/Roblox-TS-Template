// src/client/main.client.ts
// Entry point for the CLIENT (runs on each player's machine).

import { Flamework } from "@flamework/core";

Flamework.addPaths("src/client");
Flamework.addPaths("src/shared");

Flamework.ignite();
