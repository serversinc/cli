import client from '../client.js'

async function listApplications(server_id?: string): Promise<any> {
  return (
    await client.get('/applications', {
      params: {
        server_id,
      },
    })
  ).data
}

async function getApplication(application_id: string): Promise<any> {
  return (await client.get(`/applications/${application_id}`)).data
}

export default {
  listApplications,
  getApplication,
}
