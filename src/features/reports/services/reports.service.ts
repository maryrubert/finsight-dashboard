import { api } from '@/services/api';

import type {
  CreateReportData,
  Report,
  ReportStatus,
} from '../types/report';

export async function getReports(): Promise<Report[]> {
  const response = await api.get<Report[]>('/reports');

  return response.data;
}

export async function createReport(
  data: CreateReportData,
): Promise<Report> {
  const response = await api.post<Report>(
    '/reports',
    data,
  );

  return response.data;
}

export async function updateReportStatus(
  reportId: string,
  status: ReportStatus,
): Promise<Report> {
  const response = await api.patch<Report>(
    `/reports/${reportId}/status`,
    {
      status,
    },
  );

  return response.data;
}

export async function deleteReport(
  reportId: string,
): Promise<void> {
  await api.delete(`/reports/${reportId}`);
}