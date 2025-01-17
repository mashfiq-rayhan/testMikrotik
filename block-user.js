// hotspotBlocker.js
import { log } from "./log.js";

export const blockHotspotUser = async (conn, username) => {
  try {
    log(`Checking hotspot user: ${username}`);

    const users = await conn.write("/ip/hotspot/user/print", [`?name=${username}`]);

    if (users.length === 0) {
      throw new Error(`User ${username} does not exist`);
    }

    const activeUsers = await conn.write("/ip/hotspot/active/print", [`?user=${username}`]);

    if (activeUsers.length > 0) {
      log(`Found ${activeUsers.length} active session(s) for user ${username}`);

      for (const activeUser of activeUsers) {
        log(`Removing active session: ${activeUser[".id"]}`);
        await conn.write("/ip/hotspot/active/remove", [`=.id=${activeUser[".id"]}`]);
      }
      log("All active sessions removed");

      const userId = users[0][".id"];
      await conn.write("/ip/hotspot/user/set", [`=.id=${userId}`, "=disabled=yes"]);
      log("User account disabled");

      const verifyUser = await conn.write("/ip/hotspot/user/print", [`?name=${username}`]);

      log("Updated user status:");
      log({
        username: verifyUser[0].name,
        disabled: verifyUser[0].disabled,
        profile: verifyUser[0].profile,
        lastLogout: new Date().toISOString(),
      });
    } else {
      log(`No active sessions found for user ${username}`);

      const userId = users[0][".id"];
      await conn.write("/ip/hotspot/user/set", [`=.id=${userId}`, "=disabled=yes"]);
      log("User account disabled");
    }

    return true;
  } catch (error) {
    log(`Error blocking user: ${error.message}`, true);
    throw error;
  }
};
