import { BaseCommand, flags } from "@adonisjs/ace";
import dotenv from "dotenv";
import { join } from "path";
import { cwd } from "process";

import api from "../../api/api.js";
import { setAuth } from "../../api/client.js";
import { readFileSync } from "fs";
import { readAppConfig, writeToAppConfig } from "../../lib/db.js";

export class EnvSync extends BaseCommand {
  static commandName = "env:sync";
  static description = "Syncs local .env file with ServerSinc";

  @flags.string({ required: false, description: "App ID" })
  declare app: string;

  @flags.string({ required: false, description: "File Name (i.e .env)" })
  declare env: string;

  @flags.boolean({ required: false, description: "Saves flags to local config file for quick use" })
  declare saveconfig: boolean;

  async run() {
    try {
      await setAuth();

      let app_id = "";
      let env_file = "";

      /** If no app or env flag, read from local config */
      if (!this.app || !this.env) {
        const config = await readAppConfig();

        if (!config) {
          return this.ui.logger.error("No local config file detected. Please run using --app & --env or set --saveConfig to true");
        }

        app_id = config.app;
        env_file = config.env;
      } else {
        app_id = this.app;
        env_file = this.env;
      }

      if (this.saveconfig) {
        await writeToAppConfig({
          app: app_id,
          env: env_file,
        });
      }

      const envPath = join(cwd(), env_file);
      const envConfig = dotenv.parse(readFileSync(envPath));

      // Convert the parsed data into an array of objects
      const envArray = [];
      for (const key in envConfig) {
        envArray.push({ key, value: envConfig[key] });
      }

      const res = await api.envs.postEnvVariables(app_id, envArray);

      if (res.application.id) {
        this.ui.logger.info(`${env_file} updated with ServerSinc - App #${app_id}`);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
