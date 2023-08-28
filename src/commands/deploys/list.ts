import { BaseCommand, flags } from '@adonisjs/ace'
import api from '../../api/api.js'
import { setAuth } from '../../api/client.js'

export class DeploysList extends BaseCommand {
  static commandName = 'deploys:list'
  static description = 'Lists all deploys for an app'

  @flags.string({ required: true, description: 'App ID' })
  declare app: string

  async run() {
    try {
      await setAuth()

      const { deploys } = await api.deploys.listDeploys(this.app)

      const table = this.ui.table()
      table.head(['Id', 'Commit Message', 'Status'])

      // Optionally define column widths
      table.columnWidths([10, 30, 30])

      // Add new rows
      deploys.map((deploy: any) => {
        table.row([deploy.id, deploy.commit_description, deploy.status])
      })

      // Render the table
      table.render()
    } catch (error) {
      console.log(error)
    }
  }
}
