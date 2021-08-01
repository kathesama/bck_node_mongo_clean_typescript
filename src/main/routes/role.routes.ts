import { Router } from 'express';
import { AdapterRoute } from '../adapters/express.adapter';

import {
  makeGetAllRoleFactorie,
  makeGetOneRoleFactorie,
  makeRegisterRoleFactorie,
  makeUpdateRoleFactorie,
  makeDeleteRoleFactorie,
} from '../factories/role.factorie';

export default (router: Router): void => {
  router.get('/roles', AdapterRoute(makeGetAllRoleFactorie()));
  router.get('/roles/:id', AdapterRoute(makeGetOneRoleFactorie()));
  router.post('/roles/', AdapterRoute(makeRegisterRoleFactorie()));
  router.patch('/roles/:id', AdapterRoute(makeUpdateRoleFactorie()));
  router.delete('/roles/:id', AdapterRoute(makeDeleteRoleFactorie()));
};
