import { Router } from 'express';
import validate from '../validations/validate';

import { AdapterRoute } from '../adapters/express.adapter';
import {
  makeGetAllUserFactorie,
  makeGetOneUserFactorie,
  makeRegisterUserFactorie,
  makeUpdateUserFactorie,
  makeDeleteUserFactorie,
} from '../factories/user.factorie';
import * as userValidation from '../validations/user.validation';

export default (router: Router): void => {
  router
    .route('/users/')
    .get([validate(userValidation.getUsers)], AdapterRoute(makeGetAllUserFactorie()))
    .post([validate(userValidation.createUser)], AdapterRoute(makeRegisterUserFactorie()));

  router
    .route('/users/:userId')
    .get([validate(userValidation.getUser)], AdapterRoute(makeGetOneUserFactorie()))
    .patch([validate(userValidation.updateUser)], AdapterRoute(makeUpdateUserFactorie()))
    .delete([validate(userValidation.deleteUser)], AdapterRoute(makeDeleteUserFactorie()));
};
