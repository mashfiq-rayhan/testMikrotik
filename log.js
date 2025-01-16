export const log = (message, error = false) => {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}`;
  error ? console.error(logMessage) : console.log(logMessage);
};
