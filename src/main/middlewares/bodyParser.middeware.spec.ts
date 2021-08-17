import request from 'supertest';
import App from '../config/app';

const application = App;

describe('Middlewares', () => {
  it('Should Body-Parse', async () => {
    application.app.post('/body-parser', (req: any, res: any) => {
      res.send(req.body);
    });

    await request(application.app).post('/body-parser').send({ name: 'Katherine' }).expect({ name: 'Katherine' });
  });
});
