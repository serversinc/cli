import client from "../client.js";

async function postEnvVariables(application_id: string, envs: { key: string; value: string }[]): Promise<any> {
  return (await client.post(`/applications/${application_id}/envs`, { envs })).data;
}

export default {
  postEnvVariables,
};
