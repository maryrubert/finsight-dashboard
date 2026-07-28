import { Router } from "express";

import {
  createReportController,
  deleteReportController,
  listReportsController,
  updateReportStatusController,
} from "../controllers/reports.controller";

export const reportsRoutes = Router();

reportsRoutes.get("/", listReportsController);

reportsRoutes.post("/", createReportController);

reportsRoutes.patch(
  "/:id/status",
  updateReportStatusController,
);

reportsRoutes.delete(
  "/:id",
  deleteReportController,
);