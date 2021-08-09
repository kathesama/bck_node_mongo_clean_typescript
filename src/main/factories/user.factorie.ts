import { HandleUserUseCaseDB } from '../../data/backEndUseCases/handleUsers.db';
import { RegisterUserFactorie } from '../../controllers/user/PostUser.controller';

import { GetAllUser, GetOneUser, GetVerifyMailUser } from '../../controllers/user/GetUser.controller';
import { PatchUserFactorie } from '../../controllers/user/PatchUser.controller';
import { DeleteUserFactorie } from '../../controllers/user/DeleteUser.controller';
import { BcryptAdapter } from '../adapters/bcrypt.adapter';
import { HandleTokenUseCaseDB } from '../../data/backEndUseCases/handleTokens.db';

// inyeccion de dependencias
export const makeGetAllUserFactorie = (): GetAllUser => {
  const handleUserDB = new HandleUserUseCaseDB();

  const handledUserRegister = new GetAllUser(handleUserDB);

  return handledUserRegister;
};

export const makeGetOneUserFactorie = (): GetOneUser => {
  const handleUserDB = new HandleUserUseCaseDB();

  const handledUserRegister = new GetOneUser(handleUserDB);

  return handledUserRegister;
};

export const makeRegisterUserFactorie = (): RegisterUserFactorie => {
  const handleUserDB = new HandleUserUseCaseDB();
  const dcryptAdapter = new BcryptAdapter();
  const handleTokenDB = new HandleTokenUseCaseDB();

  const handledUserRegister = new RegisterUserFactorie(handleUserDB, dcryptAdapter, handleTokenDB);

  return handledUserRegister;
};

export const makeUpdateUserFactorie = (): PatchUserFactorie => {
  const handleUserDB = new HandleUserUseCaseDB();

  const handledUserRegister = new PatchUserFactorie(handleUserDB);

  return handledUserRegister;
};

export const makeDeleteUserFactorie = (): DeleteUserFactorie => {
  const handleUserDB = new HandleUserUseCaseDB();

  const handledUserRegister = new DeleteUserFactorie(handleUserDB);

  return handledUserRegister;
};

export const makeVerifyUserEmailFactorie = (): GetVerifyMailUser => {
  const handleUserDB = new HandleUserUseCaseDB();
  const handleTokenDB = new HandleTokenUseCaseDB();

  const handledUserRegister = new GetVerifyMailUser(handleUserDB, handleTokenDB);

  return handledUserRegister;
};
