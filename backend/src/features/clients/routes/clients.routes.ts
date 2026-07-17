import { Router } from 'express';

import { 
    createClientHandler,
    listClients,
 } from '../controllers/clients.controller';

export const clientsRoutes = Router();

clientsRoutes.get('/', listClients);

clientsRoutes.post('/', createClientHandler);