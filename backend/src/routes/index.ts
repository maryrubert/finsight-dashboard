import { Router } from 'express';

import { clientsRoutes } from '../features/clients/routes/clients.routes';
import { portfoliosRoutes } from '../features/portfolios/routes/portfolios.routes';

export const routes = Router();

routes.get('/health', (_request, response) => {
  return response.status(200).json({
    status: 'ok',
    message: 'FinSight Backend está funcionando!',
  });
});

routes.use('/clients', clientsRoutes);
routes.use('/portfolios', portfoliosRoutes);