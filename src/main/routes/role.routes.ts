import { Router } from 'express';
import { authorize } from '../../main/validations/authorize.validation';
import { tokenTypes } from '../../domain/enums/token.enum';
// import { authorize } from '../../main/validations/authorize.validation';
import { AdapterRoute } from '../adapters/express.adapter';

import {
  makeGetAllRoleFactorie,
  makeGetOneRoleFactorie,
  makeRegisterRoleFactorie,
  makeUpdateRoleFactorie,
  makeDeleteRoleFactorie,
} from '../factories/role.factorie';

const router: Router = Router();

router.get('/', [authorize(tokenTypes.ACCESS, 'ADMIN_ROLE', 'USER_ROLE')], AdapterRoute(makeGetAllRoleFactorie()));
router.get('/:id', AdapterRoute(makeGetOneRoleFactorie()));
router.post('/', AdapterRoute(makeRegisterRoleFactorie()));
router.patch('/:id', AdapterRoute(makeUpdateRoleFactorie()));
router.delete('/:id', AdapterRoute(makeDeleteRoleFactorie()));

export { router as roleRoutes };
