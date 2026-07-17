import { Router } from 'express';

import { 
    createClientHandler,
    listClients,
    updateClientHandler,
 } from '../controllers/clients.controller';

export const clientsRoutes = Router();

clientsRoutes.get('/', listClients);

clientsRoutes.post('/', createClientHandler);

clientsRoutes.put("/:id", updateClientHandler);