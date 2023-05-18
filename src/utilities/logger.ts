enum LogLevel {
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
}

function log(level: LogLevel, message: string): void {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [${level}] ${message}`);
}

export { LogLevel, log as angelogger };
