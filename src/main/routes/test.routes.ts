import { Router} from 'express';
import { AdapterRoute } from '../adapters/express.adapter';
import { makeTestFactorie } from '../factories/test.factorie';

export default (router: Router): void => {
  // router.get('/prueba', (req, res) => {
  //   res.status(200).json({
  //     ok: true,
  //     body: 'server is ready'
  //   });
  // });
  router.get('/prueba', AdapterRoute(makeTestFactorie()));
};
