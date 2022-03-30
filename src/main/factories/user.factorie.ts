import { HandleUserUseCaseDB } from '../../data/backEndUseCases/handleUsers.db';
import { HandleRoleUseCaseDB } from '../../data/backEndUseCases/handleRoles.db';
import { MakeResetPasswordFactorie, MakeVerifyGoogleUserFactory, RegisterUserFactorie } from '../../controllers/user/PostUser.controller';

import { GetAllUser, GetOneUser, GetVerifyMailUser } from '../../controllers/user/GetUser.controller';
import { PatchUserFactorie, RunResetPasswordFactorie } from '../../controllers/user/PatchUser.controller';
import { DeleteUserFactorie } from '../../controllers/user/DeleteUser.controller';
import { BcryptAdapter } from '../adapters/bcrypt.adapter';
import { HandleTokenUseCaseDB } from '../../data/backEndUseCases/handleTokens.db';
import { HandleUserUseCaseAPI } from '../../data/backEndUseCases/handleGoogleUsers.api';
import UserService from '../../domain/services/user.service';

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
  const handleRolesDB = new HandleRoleUseCaseDB();

  const handledUserRegister = new RegisterUserFactorie(handleUserDB, dcryptAdapter, handleTokenDB, handleRolesDB);

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

export const RunRequestResetPasswordFactorie = (): RunResetPasswordFactorie => {
  const handleUserDB = new HandleUserUseCaseDB();
  const handleTokenDB = new HandleTokenUseCaseDB();
  const dcryptAdapter = new BcryptAdapter();

  const handledUserRegister = new RunResetPasswordFactorie(handleUserDB, dcryptAdapter, handleTokenDB);

  return handledUserRegister;
};

export const MakeRequestResetPasswordFactorie = (): MakeResetPasswordFactorie => {
  const handleUserDB = new HandleUserUseCaseDB();
  const handleTokenDB = new HandleTokenUseCaseDB();

  const handledUserRegister = new MakeResetPasswordFactorie(handleUserDB, handleTokenDB);

  return handledUserRegister;
};

export const MakeValidateGoogleUserFactory = (): MakeVerifyGoogleUserFactory => {
  const handleGoogleUser = new HandleUserUseCaseAPI();
  const handleTokenDB = new HandleTokenUseCaseDB();
  const userService = UserService;

  const handledGoogleUserValidate = new MakeVerifyGoogleUserFactory(handleGoogleUser, handleTokenDB, userService);

  return handledGoogleUserValidate;
};
