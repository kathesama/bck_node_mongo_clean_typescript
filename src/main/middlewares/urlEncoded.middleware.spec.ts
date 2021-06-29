import App from '../config/app';
import request from 'supertest';

describe('Middlewares', () => {
  const application = new App();

  it('has a parser', async () => {
    const formData = {
      age: 25,
      fruits: ['Apple', 'Orange'],
      name: 'John Doe',
    };

    application.app.get('/form-data', (req, res) => {
      res.status(200).json({ statusCode: 200, body: req.body });
    });

    await request(application.app)
      .get('/form-data')
      .set('Accept-Language', 'es')
      .send(formData)
      .expect((response) => {
        expect(response.status).toBe(200);
        expect(response.body['body']).toEqual(formData);
      });
  });
});
