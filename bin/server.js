import { startServer } from "../server.js";

try {
  await startServer();
} catch (error) {
  console.error("Failed to start app server:", error);
  process.exitCode = 1;
}
