import request from 'supertest';
import App from '../config/app';

const application = App;
describe('Middlewares', () => {
  it('Should verify open cors', async () => {
    application.app.post('/test-cors', (req: any, res: any) => {
      res.send();
    });

    await request(application.app)
      .get('/test-cors')
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-headers', '*')
      .expect('access-control-allow-methods', '*');
  });
});
