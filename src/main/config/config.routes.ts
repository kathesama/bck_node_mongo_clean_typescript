// import fg from 'fast-glob';
import * as express from 'express';
// import swaggerUi from 'swagger-ui-express';
// import { environmentConfig } from './environment.config';
import { roleRoutes } from '../routes/role.routes';
import { sessionRoutes } from '../routes/session.routes';
import { testRoutes } from '../routes/test.routes';
import { userRoutes } from '../routes/user.routes';

export default (app: express.Express): void => {
  const routes: express.Router = express.Router();
  const basePath = '/api/v1';

  // routes.use(
  //   '/docs',
  //   swaggerUi.serve,
  //   swaggerUi.setup(undefined, {
  //     swaggerOptions: {
  //       url: '/swagger.json',
  //     },
  //   })
  // );

  routes.use('/tests', testRoutes);
  routes.use('/roles', roleRoutes);
  routes.use('/users', userRoutes);
  routes.use('/auths', sessionRoutes);

  app.use(basePath, routes);
  /*

    if (this.#environment['env'].ENV === 'development') {
      this.#app.use(this.docAPIPath, this.#environment['routes']['swagger']);
    }
  */
};
