import  app  from '../config/app';
import request from 'supertest';

describe('Routes test', () => {
  // let res: any = {};
  // let next: any = {};

  // beforeEach(() => {
  //   next = jest.fn();
  //   res = {
  //     status: jest.fn().mockReturnThis(),
  //     sendStatus: jest.fn(),
  //     send: jest.fn(),
  //     json: jest.fn(),
  //     render: jest.fn()
  //   };
  // });

  afterEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
  });

  it('should return ok ', (done) => {
    request(app)
      .get('/api/v1/test')
      .expect(200, {
        ok: true,
        body: 'server is ready'
      }, done);
  });
});
