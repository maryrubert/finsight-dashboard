export type ReportType =
  | 'portfolio-performance'
  | 'client-summary'
  | 'risk-analysis';

export type ReportStatus =
  | 'processing'
  | 'completed'
  | 'failed';

export type ReportFormat = 'pdf' | 'csv';

export interface Report {
  id: string;
  name: string;
  type: ReportType;
  format: ReportFormat;
  status: ReportStatus;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateReportData {
  name: string;
  type: ReportType;
  format: ReportFormat;
  startDate: string;
  endDate: string;
}

export interface UpdateReportStatusData {
  status: ReportStatus;
}