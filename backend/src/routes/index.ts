import { Router } from "express";

import { clientsRoutes } from "../features/clients/routes/clients.routes";
import { portfoliosRoutes } from "../features/portfolios/routes/portfolios.routes";
import { reportsRoutes } from "../features/reports/routes/reports.routes";

export const routes = Router();

routes.get("/health", (_request, response) => {
  return response.status(200).json({
    status: "ok",
    message: "FinSight Backend está funcionando!",
  });
});

routes.use("/clients", clientsRoutes);
routes.use("/portfolios", portfoliosRoutes);
routes.use("/reports", reportsRoutes);