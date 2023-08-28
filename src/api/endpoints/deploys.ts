import client from '../client.js'

async function listDeploys(application_id?: string): Promise<any> {
  return (await client.get(`/applications/${application_id}/deploys`)).data
}

async function getDeploy(application_id: string, deploy_id: string): Promise<any> {
  return (await client.get(`/applications/${application_id}/deploys/${deploy_id}`)).data
}

export default {
  listDeploys,
  getDeploy,
}
