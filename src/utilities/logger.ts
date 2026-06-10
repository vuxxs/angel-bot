class Logger {
  private static log(level: string, message: unknown): void {
    const timestamp = new Date().toISOString();
    const text =
      message instanceof Error
        ? (message.stack ?? message.message)
        : String(message);
    console.log(`[${timestamp}] [${level}] ${text}`);
  }

  public static info(message: unknown): void {
    this.log("INFO", message);
  }

  public static warn(message: unknown): void {
    this.log("WARN", message);
  }

  public static error(message: unknown): void {
    this.log("ERROR", message);
  }

  public static debug(message: unknown): void {
    this.log("DEBUG", message);
  }
}

export { Logger as drebinLogger };
