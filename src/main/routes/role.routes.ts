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
  router.get('/role', AdapterRoute(makeGetAllRoleFactorie()));
  router.get('/role/:id', AdapterRoute(makeGetOneRoleFactorie()));
  router.post('/role/', AdapterRoute(makeRegisterRoleFactorie()));
  router.patch('/role/:id', AdapterRoute(makeUpdateRoleFactorie()));
  router.delete('/role/:id', AdapterRoute(makeDeleteRoleFactorie()));
};
