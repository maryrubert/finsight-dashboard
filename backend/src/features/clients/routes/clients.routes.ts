import { Router } from 'express';

import { 
    createClientHandler,
    listClients,
    updateClientHandler,
    deleteClientHandler,
 } from '../controllers/clients.controller';

export const clientsRoutes = Router();

clientsRoutes.get('/', listClients);

clientsRoutes.post('/', createClientHandler);

clientsRoutes.put("/:id", updateClientHandler);

clientsRoutes.delete("/:id", deleteClientHandler);