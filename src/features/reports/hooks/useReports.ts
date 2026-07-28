import { useEffect, useState } from 'react';

import {
  createReport,
  deleteReport,
  getReports,
  updateReportStatus,
} from '../services/reports.service';

import type {
  CreateReportData,
  Report,
} from '../types/report';

const PROCESSING_TIME_IN_MS = 2000;

export function useReports() {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    void loadReports();
  }, []);

  async function loadReports() {
    try {
      setIsLoading(true);

      const data = await getReports();

      setReports(data);
    } finally {
      setIsLoading(false);
    }
  }

  async function create(data: CreateReportData) {
    const report = await createReport(data);

    setReports((previousReports) => [
      report,
      ...previousReports,
    ]);

    window.setTimeout(() => {
      void completeReport(report.id);
    }, PROCESSING_TIME_IN_MS);
  }

  async function completeReport(reportId: string) {
    try {
      const completedReport = await updateReportStatus(
        reportId,
        'completed',
      );

      setReports((previousReports) =>
        previousReports.map((report) =>
          report.id === reportId
            ? completedReport
            : report,
        ),
      );
    } catch (error) {
      console.error(
        'Não foi possível concluir o relatório:',
        error,
      );

      try {
        const failedReport = await updateReportStatus(
          reportId,
          'failed',
        );

        setReports((previousReports) =>
          previousReports.map((report) =>
            report.id === reportId
              ? failedReport
              : report,
          ),
        );
      } catch (statusError) {
        console.error(
          'Não foi possível atualizar o relatório para falha:',
          statusError,
        );
      }
    }
  }

  async function remove(id: string) {
    await deleteReport(id);

    setReports((previousReports) =>
      previousReports.filter(
        (report) => report.id !== id,
      ),
    );
  }

  return {
    reports,
    isLoading,
    create,
    remove,
    reload: loadReports,
  };
}