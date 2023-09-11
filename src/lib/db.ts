import fs from "fs-extra";
import { join } from "path";
import { homedir } from "os";
import { cwd } from "process";

const { readJSON, outputJSON, pathExists } = fs;

interface Config {
  workspace_id: string;
  user_id: string;
  api_key: string;
  api_secret: string;
}

interface AppConfig {
  app: string;
  env: string;
}

export async function writeToLocalDb(config: Config) {
  const path = await getConfigPath();
  return await outputJSON(path, config);
}

export async function readLocalDb() {
  const path = await getConfigPath();
  return await readJSON(path);
}

export async function getConfigPath() {
  const path = join(homedir(), ".config", "serversinc", "config.json");
  return path;
}

/** Working in CWD() */

export async function getAppConfigPath() {
  const path = join(cwd(), ".config", "serversinc");
  if (!pathExists(path)) return null;
  return path;
}

export async function writeToAppConfig(appConfig: AppConfig) {
  const path = await getAppConfigPath();

  if (!path) return null;

  return await outputJSON(path, appConfig);
}

export async function readAppConfig(): Promise<AppConfig | null> {
  try {
    const path = await getAppConfigPath();

    if (!path) return null;

    return await readJSON(path);
  } catch (e) {
    return null;
  }
}
