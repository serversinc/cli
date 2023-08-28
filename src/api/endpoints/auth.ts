import client from "../client.js";

async function getTokenInfo(token: string, secret: string): Promise<{ workspace_id: string, user_id: string}> {
  return (await client.post("/token", { token, secret })).data;
}

export default {
    getTokenInfo
}