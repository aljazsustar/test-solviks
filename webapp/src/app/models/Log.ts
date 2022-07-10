export interface Log {
  id: number;
  timestamp: Date;
  severity_level: number;
  source: string;
  content: string;
  project_id: number;
}
