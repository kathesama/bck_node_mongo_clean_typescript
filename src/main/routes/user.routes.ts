import { Router } from 'express';
import validateRequestParams from '../validations/validateRequestParams.validation';
import { AdapterRoute } from '../adapters/express.adapter';
import { authorize } from '../validations/authorize.validation';
import { tokenTypes } from '../../domain/enums/token.enum';
import * as userValidation from '../validations/userRequestParams.validation';

import {
  makeGetAllUserFactorie,
  makeGetOneUserFactorie,
  makeVerifyUserEmailFactorie,
  makeUpdateUserFactorie,
  makeDeleteUserFactorie,
  makeRegisterUserFactorie,
  RunRequestResetPasswordFactorie,
  MakeRequestResetPasswordFactorie,
} from '../factories/user.factorie';

const router: Router = Router();
/* /users */
router
  .route('/signup/')
  .post([authorize(tokenTypes.ACCESS, 'ADMIN_ROLE'), validateRequestParams(userValidation.createUser)], AdapterRoute(makeRegisterUserFactorie()));

router.route('/verify-user/').get([validateRequestParams(userValidation.verifyUserEmail)], AdapterRoute(makeVerifyUserEmailFactorie()));

router
  .route('/reset-password/')
  .post([validateRequestParams(userValidation.requestResetUserPassword)], AdapterRoute(MakeRequestResetPasswordFactorie()));

router
  .route('/reset-password/:key')
  .patch([validateRequestParams(userValidation.runResetUserPassword)], AdapterRoute(RunRequestResetPasswordFactorie()));

router
  .route('/:userId')
  .get(
    [authorize(tokenTypes.ACCESS, 'ADMIN_ROLE', 'USER_ROLE'), validateRequestParams(userValidation.getUser)],
    AdapterRoute(makeGetOneUserFactorie())
  )
  .patch([authorize(tokenTypes.ACCESS, 'ADMIN_ROLE'), validateRequestParams(userValidation.updateUser)], AdapterRoute(makeUpdateUserFactorie()))
  .delete([authorize(tokenTypes.ACCESS, 'ADMIN_ROLE'), validateRequestParams(userValidation.deleteUser)], AdapterRoute(makeDeleteUserFactorie()));

router
  .route('/')
  .get(
    [authorize(tokenTypes.ACCESS, 'ADMIN_ROLE', 'USER_ROLE'), validateRequestParams(userValidation.getUsers)],
    AdapterRoute(makeGetAllUserFactorie())
  );
export { router as userRoutes };
