import { log } from "./log.js";
import { blockHotspotUser } from "./block-user.js";

export const checkUserBandwidth = async (conn) => {
  try {
    log("Starting bandwidth check for active users...");

    // Get all active users with their bytes-out (download) and bytes-in (upload)
    const activeUsers = await conn.write("/ip/hotspot/active/print");

    if (activeUsers.length === 0) {
      log("No active users found");
      return;
    }

    log(`Found ${activeUsers.length} active users`);

    // Check each user's bandwidth usage
    for (const user of activeUsers) {
      const bytesIn = parseInt(user["bytes-in"]) || 0;
      const bytesOut = parseInt(user["bytes-out"]) || 0;

      // Convert to MB (1MB = 1024 * 1024 bytes)
      const mbIn = bytesIn / (1024 * 1024);
      const mbOut = bytesOut / (1024 * 1024);
      const totalMB = mbIn + mbOut;

      log(
        `User ${user.user || "unknown"}: ${totalMB.toFixed(2)}MB total (↓${mbIn.toFixed(2)}MB, ↑${mbOut.toFixed(2)}MB)`
      );

      // Check if total usage exceeds 2MB
      if (totalMB > 10) {
        log(`⚠️ User ${user.user} exceeded 10MB limit (${totalMB.toFixed(2)}MB used)`);

        // Block and logout user
        try {
          await blockHotspotUser(conn, user.user);
          log(`🚫 User ${user.user} has been blocked and logged out`);
        } catch (blockError) {
          log(`Failed to block user ${user.user}: ${blockError.message}`, true);
        }
      }
    }
  } catch (error) {
    log(`Error checking bandwidth: ${error.message}`, true);
    throw error;
  }
};
