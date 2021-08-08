import { Router } from 'express';
import validateRequestParams from '../validations/validateRequestParams.validation';

import { AdapterRoute } from '../adapters/express.adapter';
import {
  // makeGetAllUserFactorie,
  // makeGetOneUserFactorie,
  makeLoginFactorie,
  makeReauthenticationFactorie,
  // makeUpdateUserFactorie,
  // makeDeleteUserFactorie,
} from '../factories/session.factorie';
import * as userValidation from '../validations/userRequestParams.validation';
import { authorize } from '../validations/authorize.validation';
import { tokenTypes } from '../../domain/enums/token.enum';
// import { makeRegisterUserFactorie } from '../factories/user.factorie';

export default (router: Router): void => {
  router.route('/login/').post([validateRequestParams(userValidation.loginUser)], AdapterRoute(makeLoginFactorie()));
  router
    .route('/reauthenticate/')
    .post(
      [authorize(tokenTypes.REFRESH, 'ADMIN_ROLE', 'USER_ROLE'), validateRequestParams(userValidation.reauthenticateUser)],
      AdapterRoute(makeReauthenticationFactorie())
    );
};
