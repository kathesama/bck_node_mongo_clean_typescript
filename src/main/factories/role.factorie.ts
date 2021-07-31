import { HandleRoleUseCaseDB } from '../../data/backEndUseCases/handleRoles.db';

import { GetAllRole, GetOneRole } from '../../controllers/role/GetRole.controller';
import { RegisterRoleFactorie } from '../../controllers/role/PostRole.controller';
import { PatchRoleFactorie } from '../../controllers/role/PatchRole.controller';
import { DeleteRoleFactorie } from '../../controllers/role/DeleteRole.controller';

// inyeccion de dependencias
export const makeGetAllRoleFactorie = (): GetAllRole => {
  const handleRoleDB = new HandleRoleUseCaseDB();

  const handledRoleRegister = new GetAllRole(handleRoleDB);

  return handledRoleRegister;
};

export const makeGetOneRoleFactorie = (): GetOneRole => {
  const handleRoleDB = new HandleRoleUseCaseDB();

  const handledRoleRegister = new GetOneRole(handleRoleDB);

  return handledRoleRegister;
};

export const makeRegisterRoleFactorie = (): RegisterRoleFactorie => {
  const handleRoleDB = new HandleRoleUseCaseDB();

  const handledRoleRegister = new RegisterRoleFactorie(handleRoleDB);

  return handledRoleRegister;
};

export const makeUpdateRoleFactorie = (): PatchRoleFactorie => {
  const handleRoleDB = new HandleRoleUseCaseDB();

  const handledRoleRegister = new PatchRoleFactorie(handleRoleDB);

  return handledRoleRegister;
};

export const makeDeleteRoleFactorie = (): DeleteRoleFactorie => {
  const handleRoleDB = new HandleRoleUseCaseDB();

  const handledRoleRegister = new DeleteRoleFactorie(handleRoleDB);

  return handledRoleRegister;
};
