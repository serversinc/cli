import { BaseCommand, flags } from '@adonisjs/ace'
import api from '../../api/api.js'
import { setAuth } from '../../api/client.js'

export class DeploysGet extends BaseCommand {
  static commandName = 'deploys:get'
  static description = 'Display deploy details'

  @flags.string({ required: true, description: 'App ID' })
  declare app: string

  @flags.string({ required: true, description: 'Deploy ID' })
  declare id: string

  async run() {
    try {
      await setAuth()

      const { deploy } = await api.deploys.getDeploy(this.app, this.id)

      const status = deploy.status === 'deployed' ? this.colors.green('Deployed') : this.colors.red('Deploying')

      this.ui
        .sticker()
        .add(`Commit #${deploy.commit_id}`)
        .add('')
        .add(`Initiated by:        ${this.colors.cyan(`${deploy.gh_username}`)}`)
        .add(`Deployed at:         ${this.colors.cyan(`${new Date(deploy.created_at).toLocaleString()}`)}`)
        .add(`Branch:              ${this.colors.cyan(`${deploy.branch}`)}`)
        .add(`Status:              ${status}`)
        .render()
    } catch (error) {
      console.log(error)
    }
  }
}
