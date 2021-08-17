import App from '../config/app';
import request from 'supertest';

describe('Middlewares', () => {
  const application = App;

  it('Has a fingerprint', async () => {
    application.app.get('/fingerprint', (req: any, res: any) => {
      const fingerprint = req.fingerprint.hash;
      res.status(200).json({ fingerprint });
    });

    await request(application.app)
      .get('/fingerprint')
      .set('Accept-Language', 'es')
      .send()
      .expect((response) => {
        expect(response.status).toBe(200);
        expect(response.body['fingerprint']).toEqual('cffec6fb1273c60d6f125740bbf8f3ed');
      });
  });
});
