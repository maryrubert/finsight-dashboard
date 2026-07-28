export type ReportType =
  | "portfolio-performance"
  | "client-summary"
  | "risk-analysis";

export type ReportFormat = "pdf" | "csv";

export type ReportStatus =
  | "processing"
  | "completed"
  | "failed";

export interface CreateReportData {
  name: string;
  type: ReportType;
  format: ReportFormat;
  startDate: Date;
  endDate: Date;
}

export interface UpdateReportStatusData {
  status: ReportStatus;
}