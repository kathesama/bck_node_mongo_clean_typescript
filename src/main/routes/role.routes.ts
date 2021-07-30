import { Router } from 'express';
import { AdapterRoute } from '../adapters/express.adapter';

import { makeGetAllRoleFactorie, makeGetOneRoleFactorie, makeRegisterRoleFactorie } from '../factories/role.factorie';

export default (router: Router): void => {
  router.get('/role', AdapterRoute(makeGetAllRoleFactorie()));
  router.get('/role/:id', AdapterRoute(makeGetOneRoleFactorie()));
  router.post('/role/', AdapterRoute(makeRegisterRoleFactorie()));
};
