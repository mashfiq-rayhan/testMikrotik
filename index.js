import { log } from "./log.js";
import { createHotspotUser } from "./create-user.js";
import { connectTorouter } from "./connect.js";
import { getHotspotUsers } from "./get-active-list.js";
import { blockHotspotUser } from "./block-user.js";
import { checkUserBandwidth } from "./bandwidth-monitor.js";
const runScript = async () => {
  log("Starting hotspot users check...");
  try {
    const connection = await connectTorouter();
    // await createHotspotUser(connection, "john", "pass123");
    // await getHotspotUsers(connection);
    // await blockHotspotUser(connection, "john");
    log("Script completed successfully");
    await checkUserBandwidth(connection);
    if (connection.connected) {
      log("Closing connection...");
      await connection.close();
      log("Connection closed");
    }
  } catch (error) {
    log(`Unexpected error: ${error.message}`, true);
  }
};

runScript();
