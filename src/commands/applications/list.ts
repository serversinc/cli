import { BaseCommand, flags } from '@adonisjs/ace'
import api from '../../api/api.js'
import { setAuth } from '../../api/client.js'

export class ApplictionsList extends BaseCommand {
  static commandName = 'apps:list'
  static description = 'Lists all applications in current Workspace'

  @flags.string({ required: false, description: 'Server ID' })
  declare server: string

  async run() {
    try {
      await setAuth()

      const { applications } = await api.applications.listApplications(
        this.server ? this.server : undefined
      )

      const table = this.ui.table()
      table.head(['Id', 'Name', 'Domain'])

      // Optionally define column widths
      table.columnWidths([10, 30, 30])

      // Add new rows
      applications.map((app: any) => {
        table.row([app.id, app.name, app.domain ? app.domain.domain : ''])
      })

      // Render the table
      table.render()
    } catch (error) {
      console.log(error)
    }
  }
}
