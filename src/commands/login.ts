import { BaseCommand } from '@adonisjs/ace'
import api from '../api/api.js'
import { writeToLocalDb } from '../lib/db.js'

export class Login extends BaseCommand {
  static commandName = 'login'
  static description = 'Authenticates user using API key and secret'

  promptAPIKey() {
    return this.prompt.ask('Enter API Key')
  }

  promptAPISecret() {
    return this.prompt.ask('Enter API Secret')
  }

  async run() {
    try {
      const api_key = await this.promptAPIKey()
      const api_secret = await this.promptAPISecret()

      const response = await api.auth.getTokenInfo(api_key, api_secret)

      await writeToLocalDb({
        api_key: api_key,
        api_secret: api_secret,
        user_id: response.user_id,
        workspace_id: response.workspace_id,
      })

      this.ui.logger.log(`${this.ui.icons.tick} User authenticated`)
    } catch (error) {
      console.log(error)
    }
  }
}
