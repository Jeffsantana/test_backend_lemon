import { Router } from 'express';

import newModule from './modules/Elegibilidade/routes/ElegibilidadeRoutes';

const routes = Router();

routes.use(newModule)
export default routes;
