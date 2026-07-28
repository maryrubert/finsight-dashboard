import type { Report } from "../../../../generated/prisma/client";
import { prisma } from "../../../lib/prisma";

import type { CreateReportData } from "../types/reports";

export async function getReports() {
  return prisma.report.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function createReport(
  data: CreateReportData,
): Promise<Report> {
  return prisma.report.create({
    data: {
      ...data,
      status: "processing",
    },
  });
}

export async function updateReportStatus(
  id: string,
  status: Report["status"],
): Promise<Report> {
  return prisma.report.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });
}

export async function deleteReport(
  id: string,
): Promise<void> {
  await prisma.report.delete({
    where: {
      id,
    },
  });
}