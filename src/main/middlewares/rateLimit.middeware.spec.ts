import request from 'supertest';
import { environmentConfig } from '../config';
import App from '../config/app';

describe('Middlewares', () => {
  const application = App;
  it('Should limit rate', async () => {
    application.app.get('/limit-rate', (req: any, res: any) => {
      res.send({ statusCode: 200, body: 'something' });
    });

    await request(application.app)
      .get('/limit-rate')
      .expect('X-RateLimit-Limit', environmentConfig().serverConfig.HOST_MAX_PETITIONS)
      .expect('X-RateLimit-Remaining', String(environmentConfig().serverConfig.HOST_MAX_PETITIONS - 1));
  });
});
