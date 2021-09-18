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

router.get('/', [authorize(tokenTypes.ACCESS, 'ADMIN_ROLE')], AdapterRoute(makeGetAllRoleFactorie()));
router.get('/:id', [authorize(tokenTypes.ACCESS, 'ADMIN_ROLE')], AdapterRoute(makeGetOneRoleFactorie()));
router.post('/', [authorize(tokenTypes.ACCESS, 'ADMIN_ROLE')], AdapterRoute(makeRegisterRoleFactorie()));
router.patch('/:id', [authorize(tokenTypes.ACCESS, 'ADMIN_ROLE')], AdapterRoute(makeUpdateRoleFactorie()));
router.delete('/:id', [authorize(tokenTypes.ACCESS, 'ADMIN_ROLE')], AdapterRoute(makeDeleteRoleFactorie()));

export { router as roleRoutes };
