import { RouterOSAPI } from "node-routeros";
import { log } from "./log.js";

const config = {
  host: "192.168.31.128",
  user: "testuser",
  password: "testuser",
  port: 8728,
  timeout: 10,
};

export const connectTorouter = async () => {
  try {
    const conn = new RouterOSAPI({ ...config });
    log("Connecting to RouterOS...");
    await conn.connect();
    log("Connected successfully");
    return conn;
  } catch (error) {
    log(`Error: ${error.message}`, true);
    if (error.trace) {
      log(`Stack trace: ${error.trace}`, true);
    }
  }
};
