import { BaseCommand } from '@adonisjs/ace'
import api from '../../api/api.js'
import { setAuth } from '../../api/client.js'

export class ServersList extends BaseCommand {
  static commandName = 'servers:list'
  static description = 'Lists all servers in current Workspace'

  async run() {
    try {
      await setAuth()

      const response = await api.servers.listServers()

      const table = this.ui.table()
      table.head(['Id', 'Name', 'Provider', 'IP Address'])

      // Optionally define column widths
      table.columnWidths([50, 20, 20, 20])

      // Add new rows
      response.servers.map((server: any) => {
        table.row([server.id, server.name, server.provider, server.ip])
      })

      // Render the table
      table.render()
    } catch (error) {
      console.log(error)
    }
  }
}
