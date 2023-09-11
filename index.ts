import { HelpCommand, Kernel, ListLoader } from "@adonisjs/ace";

import { Login } from "./src/commands/login.js";

import { ServersList } from "./src/commands/servers/list.js";
import { ServersGet } from "./src/commands/servers/get.js";

import { ApplictionsList } from "./src/commands/applications/list.js";
import { ApplicationsGet } from "./src/commands/applications/get.js";

import { DeploysList } from "./src/commands/deploys/list.js";
import { DeploysGet } from "./src/commands/deploys/get.js";

import { EnvSync } from "./src/commands/env/sync.js";

export const kernel = Kernel.create();

kernel.defineFlag("help", {
  type: "boolean",
  description: HelpCommand.description,
});

kernel.on("help", async (command, $kernel, parsed) => {
  parsed.args.unshift(command.commandName);
  await new HelpCommand($kernel, parsed, kernel.ui, kernel.prompt).exec();
  return $kernel.shortcircuit();
});

kernel.addLoader(new ListLoader([HelpCommand, Login, ServersList, ServersGet, ApplictionsList, ApplicationsGet, DeploysList, DeploysGet, EnvSync]));
