import { Router } from 'express';

import NewModuleController from '../controllers/NewModuleController';

const newModule = Router();

newModule.route('/newModules/:id?').get(
  NewModuleController.list,
);

newModule.route('/newModules').post(
  NewModuleController.create,
);

newModule.route('/newModules/:id').patch(
  NewModuleController.update,
);

export default newModule;
