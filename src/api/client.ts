import axios from "axios";
import { readLocalDb } from "../lib/db.js";

const client = axios.create({
  baseURL: "https://oasis-api.serversinc.io/api",
  auth: {
    username: "",
    password: "",
  },
});

export default client;

export async function setAuth() {
  const { api_key, api_secret } = await readLocalDb();

  client.interceptors.request.use(function (config) {
    if (!config.auth) {
      return config;
    }

    if (!api_key || !api_secret) {
      throw Error("No API credentials found, please add them using argo login");
    }

    config.auth.username = api_key;
    config.auth.password = api_secret;
    return config;
  });
}
