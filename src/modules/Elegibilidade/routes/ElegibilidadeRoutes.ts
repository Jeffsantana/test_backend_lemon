import { Router } from 'express';

import ElegibilidadeController from '../controllers/ElegibilidadeController';

const elegibilidade = Router();

elegibilidade.route('/elegibilidades/:id?').get(
  ElegibilidadeController.list,
);

elegibilidade.route('/elegibilidades').post(
  ElegibilidadeController.create,
);

elegibilidade.route('/elegibilidades/:id').patch(
  ElegibilidadeController.update,
);

export default elegibilidade;
