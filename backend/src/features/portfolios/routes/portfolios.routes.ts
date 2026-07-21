import { Router } from 'express';

import {
  create,
  index,
  remove,
  update,
} from '../controllers/portfolios.controller';

export const portfoliosRoutes = Router();

portfoliosRoutes.get('/', index);
portfoliosRoutes.post('/', create);
portfoliosRoutes.put('/:id', update);
portfoliosRoutes.delete('/:id', remove);