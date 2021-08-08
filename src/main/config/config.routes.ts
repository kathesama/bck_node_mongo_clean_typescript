import fg from 'fast-glob';
import { Express, Router } from 'express';
import swaggerUi from 'swagger-ui-express';
// import { environmentConfig } from './environment.config';

const loadRoutes = (router: Router) => {
  fg.sync('**/src/main/routes/**routes.ts', { ignore: [] }).map(async (file) => (await import(`../../../${file}`)).default(router));
};

export default (app: Express): void => {
  const router = Router();

  app.use(
    '/docs',
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
      swaggerOptions: {
        url: '/swagger.json',
      },
    })
  );

  // const env = environmentConfig().ENV;
  // console.log(env);

  app.use('/api/v1', router);

  loadRoutes(router);

  /*

    if (this.#environment['env'].ENV === 'development') {
      this.#app.use(this.docAPIPath, this.#environment['routes']['swagger']);
    }
  */
};
