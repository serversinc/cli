import { BaseCommand, flags } from '@adonisjs/ace'
import api from '../../api/api.js'
import { setAuth } from '../../api/client.js'

export class ApplicationsGet extends BaseCommand {
  static commandName = 'apps:get'
  static description = 'Display application details'

  @flags.string({ required: true, description: 'App ID' })
  declare id: string

  async run() {
    try {
      await setAuth()

      const { application } = await api.applications.getApplication(this.id)

      const auto_deploy = application.auto_deploy ? this.colors.green('Enabled') : this.colors.red('Disabled')

      this.ui
        .sticker()
        .add(`${application.name}`)
        .add('')
        .add(`Server:           ${this.colors.cyan(`${application.server.name}`)}`)
        .add(`Repository:       ${this.colors.cyan(`${application.repository}`)}`)
        .add(`Branch:           ${this.colors.cyan(`${application.branch}`)}`)
        .add(`Auto Deploy:      ${auto_deploy}`)
        .render()
    } catch (error) {
      console.log(error)
    }
  }
}
