import { Router } from 'express';

import validateRequestParams from '../validations/validateRequestParams.validation';

import { AdapterRoute } from '../adapters/express.adapter';
import { makeLoginFactorie, makeReauthenticationFactorie, makeLogoutFactorie } from '../factories/session.factorie';
import { authorize } from '../validations/authorize.validation';
import { tokenTypes } from '../../domain/enums/token.enum';
import * as userValidation from '../validations/userRequestParams.validation';

const router: Router = Router();

router.route('/login/').post([validateRequestParams(userValidation.loginUser)], AdapterRoute(makeLoginFactorie()));
router
  .route('/reauthenticate/')
  .post(
    [authorize(tokenTypes.REFRESH, 'ADMIN_ROLE', 'USER_ROLE'), validateRequestParams(userValidation.reauthenticateUser)],
    AdapterRoute(makeReauthenticationFactorie())
  );
router
  .route('/logout/')
  .post(
    [authorize(tokenTypes.REFRESH, 'ADMIN_ROLE', 'USER_ROLE'), validateRequestParams(userValidation.logoutUser)],
    AdapterRoute(makeLogoutFactorie())
  );

export { router as sessionRoutes };
