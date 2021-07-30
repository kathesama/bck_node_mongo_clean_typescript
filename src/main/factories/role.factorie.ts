import { GetAllRole, GetOneRole } from '../../controllers/role/GetRole.controller';
import { RegisterRoleFactorie } from '../../controllers/role/PostRole.controller';
import { AllRoleUseCaseDB } from '../../data/backEndUseCases/handleRoles.db';
// import { AddRoleInterface } from '../../interfaces/useCaseDTO/Role.interfaces';

// inyeccion de dependencias
export const makeGetAllRoleFactorie = (): GetAllRole => {
  const getRoleDB = new AllRoleUseCaseDB();

  const readRole = new GetAllRole(getRoleDB);

  return readRole;
};

export const makeGetOneRoleFactorie = (): GetOneRole => {
  const getRoleDB = new AllRoleUseCaseDB();

  const readRole = new GetOneRole(getRoleDB);

  return readRole;
};

export const makeRegisterRoleFactorie = (): RegisterRoleFactorie => {
  const AddRoleDB = new AllRoleUseCaseDB();

  const addRole = new RegisterRoleFactorie(AddRoleDB);

  return addRole;
};
