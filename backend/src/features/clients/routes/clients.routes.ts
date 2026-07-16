import { Router } from 'express';

import { listClients } from '../controllers/clients.controller';

export const clientsRoutes = Router();

clientsRoutes.get('/', listClients);