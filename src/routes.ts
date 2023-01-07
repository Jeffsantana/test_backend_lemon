import { Router } from 'express';

import newModule from './modules/NewModule/routes/NewModuleRoutes';

const routes = Router();

routes.use(newModule)
export default routes;
