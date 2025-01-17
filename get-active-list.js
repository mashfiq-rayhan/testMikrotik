import { log } from "./log.js";
export const getHotspotUsers = async (conn) => {
  try {
    log("Fetching active hotspot users...");
    const activeHotspotUsers = await conn.write("/ip/hotspot/active/print");

    if (!activeHotspotUsers.length) {
      log("No active hotspot users found");
      return;
    }

    log(`Found ${activeHotspotUsers.length} active hotspot users`);

    activeHotspotUsers.forEach((user, index) => {
      log("\n=================================");
      log(`Active Hotspot User #${index + 1}`);
      log("=================================");
      log(`Username: ${user.user || "Anonymous"}`);
      log(`IP Address: ${user.address}`);
      log(`MAC Address: ${user["mac-address"]}`);
      log(`Login Time: ${user["uptime"]}`);
      log(`Server: ${user.server}`);
      log(`Connection Type: ${user["login-by"]}`);
      log(`Bytes Up: ${formatBytes(user["bytes-in"])}`);
      log(`Bytes Down: ${formatBytes(user["bytes-out"])}`);
      log("=================================");
    });

    log("\nFetching hotspot user profiles...");
    const userProfiles = await conn.write("/ip/hotspot/user/profile/print");

    log("\nHotspot Profiles:");
    userProfiles.forEach((profile) => {
      log(`- ${profile.name}`);
      log(`  Rate Limit: ${profile["rate-limit"] || "unlimited"}`);
      log(`  Session Timeout: ${profile["session-timeout"] || "unlimited"}`);
    });
  } catch (error) {
    log(`Error: ${error.message}`, true);
    if (error.trace) {
      log(`Stack trace: ${error.trace}`, true);
    }
  }
};

const formatBytes = (bytes) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};
