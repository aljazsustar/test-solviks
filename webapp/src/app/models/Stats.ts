export interface Stats {
  logs_last_24h: number;
  logs_last_1h: number;
  by_severity: {
    emergency: number;
    alert: number;
    critical: number;
    error: number;
    warning: number;
    notice: number;
    informational: number;
    debug: number;
  }

}
