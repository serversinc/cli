import fs from 'fs-extra'
import { join } from 'path'
import { homedir } from 'os'

const { readJSON, outputJSON } = fs

interface Config {
  workspace_id: string
  user_id: string
  api_key: string
  api_secret: string
}

export async function writeToLocalDb(config: Config) {
  const path = await getConfigPath()
  return await outputJSON(path, config)
}

export async function readLocalDb() {
  const path = await getConfigPath()
  return await readJSON(path)
}

export async function getConfigPath() {
  return join(homedir(), '.config', 'serversinc', 'config.json')
}
