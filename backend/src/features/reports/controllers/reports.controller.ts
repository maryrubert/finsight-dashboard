import type { Request, Response } from "express";

import {
  createReport,
  deleteReport,
  getReports,
  updateReportStatus,
} from "../services/reports.service";

import type {
  CreateReportData,
  ReportStatus,
} from "../types/reports";

export async function listReportsController(
  _request: Request,
  response: Response,
) {
  try {
    const reports = await getReports();

    return response.status(200).json(reports);
  } catch (error) {
    console.error("Erro ao listar relatórios:", error);

    return response.status(500).json({
      message: "Não foi possível listar os relatórios.",
    });
  }
}

export async function createReportController(
  request: Request,
  response: Response,
) {
  try {
    const {
      name,
      type,
      format,
      startDate,
      endDate,
    } = request.body as {
      name?: string;
      type?: string;
      format?: string;
      startDate?: string;
      endDate?: string;
    };

    if (
      !name ||
      !type ||
      !format ||
      !startDate ||
      !endDate
    ) {
      return response.status(400).json({
        message: "Preencha todos os campos obrigatórios.",
      });
    }

    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);

    if (
      Number.isNaN(parsedStartDate.getTime()) ||
      Number.isNaN(parsedEndDate.getTime())
    ) {
      return response.status(400).json({
        message: "Informe datas válidas.",
      });
    }

    if (parsedStartDate > parsedEndDate) {
      return response.status(400).json({
        message:
          "A data inicial não pode ser posterior à data final.",
      });
    }

    const allowedTypes = [
      "portfolio-performance",
      "client-summary",
      "risk-analysis",
    ];

    const allowedFormats = ["pdf", "csv"];

    if (!allowedTypes.includes(type)) {
      return response.status(400).json({
        message: "Tipo de relatório inválido.",
      });
    }

    if (!allowedFormats.includes(format)) {
      return response.status(400).json({
        message: "Formato de relatório inválido.",
      });
    }

    const data: CreateReportData = {
      name: name.trim(),
      type: type as CreateReportData["type"],
      format: format as CreateReportData["format"],
      startDate: parsedStartDate,
      endDate: parsedEndDate,
    };

    const report = await createReport(data);

    return response.status(201).json(report);
  } catch (error) {
    console.error("Erro ao criar relatório:", error);

    return response.status(500).json({
      message: "Não foi possível criar o relatório.",
    });
  }
}

export async function updateReportStatusController(
  request: Request,
  response: Response,
) {
  try {
    const { id } = request.params;
    const { status } = request.body as {
      status?: ReportStatus;
    };

    const allowedStatuses: ReportStatus[] = [
      "processing",
      "completed",
      "failed",
    ];

    if (!status || !allowedStatuses.includes(status)) {
      return response.status(400).json({
        message: "Status de relatório inválido.",
      });
    }

    const report = await updateReportStatus(
      id,
      status,
    );

    return response.status(200).json(report);
  } catch (error) {
    console.error(
      "Erro ao atualizar status do relatório:",
      error,
    );

    return response.status(500).json({
      message:
        "Não foi possível atualizar o status do relatório.",
    });
  }
}

export async function deleteReportController(
  request: Request,
  response: Response,
) {
  try {
    const { id } = request.params;

    await deleteReport(id);

    return response.status(204).send();
  } catch (error) {
    console.error("Erro ao excluir relatório:", error);

    return response.status(500).json({
      message: "Não foi possível excluir o relatório.",
    });
  }
}