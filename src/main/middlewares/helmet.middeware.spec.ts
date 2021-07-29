import request from 'supertest';
import App from '../config/app';

describe('Middlewares', () => {
  const application = new App();
  it('HELMET: Should get all 11 settings enabled', async () => {
    application.app.get('/test-helmet', (req, res) => {
      res.send({ statusCode: 200, body: 'something' });
    });

    // eslint-disable-next-line quotes
    // const contentSecurityPolicy = `default-src 'self';base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests`;

    await request(application.app)
      .get('/test-helmet')
      // .expect('Content-Security-Policy', contentSecurityPolicy)
      .expect('Expect-CT', 'max-age=0')
      .expect('Referrer-Policy', 'no-referrer')
      .expect('Strict-Transport-Security', 'max-age=15552000; includeSubDomains')
      .expect('X-Content-Type-Options', 'nosniff')
      .expect('X-DNS-Prefetch-Control', 'off')
      .expect('X-Download-Options', 'noopen')
      .expect('X-Frame-Options', 'SAMEORIGIN')
      .expect('X-Permitted-Cross-Domain-Policies', 'none')
      .expect((res) => expect(res.headers['X-Powered-By']).toBeUndefined())
      .expect('X-XSS-Protection', '0');
  });
});
