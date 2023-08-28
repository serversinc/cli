import client from '../client.js'

async function listServers(): Promise<any> {
  return (await client.get('/servers')).data
}

async function getServer(server_id: string): Promise<any> {
  return (await client.get(`/servers/${server_id}`)).data
}

export default {
  listServers,
  getServer,
}
