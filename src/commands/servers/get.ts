import { BaseCommand, flags } from '@adonisjs/ace'
import api from '../../api/api.js'
import { setAuth } from '../../api/client.js'

export class ServersGet extends BaseCommand {
  static commandName = 'servers:get'
  static description = 'Display server details'

  @flags.string({ required: true, description: 'Server ID' })
  declare id: string

  async run() {
    try {
      await setAuth()

      const { server } = await api.servers.getServer(this.id)

      const status = server.status === 'active' ? this.colors.green('●') : this.colors.yellow('●')

      this.ui
        .sticker()
        .add(`${status} ${server.name} - ${this.colors.cyan(server.ip)}`)
        .add('')
        .add(`CPU / RAM / DISK:        ${this.colors.cyan(`${server.cpu} vCPU | ${server.memory}MB | ${server.disk}GB`)}`)
        .add(`Provider:                ${this.colors.cyan(`${server.provider} | ${server.location}`)}`)
        .render()
    } catch (error) {
      console.log(error)
    }
  }
}
