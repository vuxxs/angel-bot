class Logger {
  private static log(level: string, message: any): void {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [${level}] ${message.toString()}`);
  }

  public static info(message: any): void {
    this.log("INFO", message);
  }

  public static warn(message: any): void {
    this.log("WARN", message);
  }

  public static error(message: any): void {
    this.log("ERROR", message);
  }

  public static debug(message: any): void {
    this.log("DEBUG", message);
  }
}

export { Logger as drebinlogger };
