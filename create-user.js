import { log } from "./log.js";
export const createHotspotUser = async (conn, username, password, options = {}) => {
  try {
    log(`Creating hotspot user: ${username}`);
    const existingUsers = await conn.write("/ip/hotspot/user/print", [`?name=${username}`]);

    if (existingUsers.length > 0) {
      throw new Error(`User ${username} already exists`);
    }

    const commands = ["=name=" + username, "=password=" + password];

    if (options.profile) commands.push("=profile=" + options?.profile);
    if (options.limitUptime) commands.push("=limit-uptime=" + options?.limitUptime);
    if (options.limitBytesTotal) commands.push("=limit-bytes-total=" + options?.limitBytesTotal);
    if (options.server) commands.push("=server=" + options?.server);
    if (options.disabled) commands.push("=disabled=" + options?.disabled);
    if (options.comment) commands.push("=comment=" + options?.comment);

    await conn.write("/ip/hotspot/user/add", commands);
    log("User created successfully");
    const newUser = await conn.write("/ip/hotspot/user/print", [`?name=${username}`]);
    if (newUser.length === 0) {
      throw new Error("User creation verification failed");
    }
    log("User details:");
    log({
      username: newUser[0].name,
      profile: newUser[0].profile,
      "uptime-limit": newUser[0]["limit-uptime"],
      "bytes-limit": newUser[0]["limit-bytes-total"],
      disabled: newUser[0].disabled,
    });

    return newUser[0];
  } catch (error) {
    log(`Error creating user: ${error.message}`, true);
    throw error;
  } finally {
    if (conn.connected) {
      await conn.close();
      log("Connection closed");
    }
  }
};
