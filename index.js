import { log } from "./log.js";
import { createHotspotUser } from "./create-user.js";
import { connectTorouter } from "./connect.js";

const runScript = async () => {
  log("Starting hotspot users check...");
  try {
    const connection = await connectTorouter();
    await createHotspotUser(connection, "john", "pass123");
    log("Script completed successfully");
  } catch (error) {
    log(`Unexpected error: ${error.message}`, true);
  }
};

runScript();
