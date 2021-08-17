import { HandleTokenUseCaseDB } from '../../data/backEndUseCases/handleTokens.db';
// import { RegisterTokenFactorie } from '../../controllers/token/PostToken.controller';

import { GetLoginToken } from '../../controllers/token/GetLoginToken.controller';
import { GetReauthenticationToken } from '../../controllers/token/GetReauthToken.controller';
import { DcryptAdapter } from '../adapters/bcrypt.adapter';
import { GetLogoutToken } from '../../controllers/token/GetLogoutToken.controller';
import UserService from '../../domain/services/user.service';

// inyeccion de dependencias
export const makeLoginFactorie = (): GetLoginToken => {
  const dcryptAdapter = new DcryptAdapter();
  const handleTokenDB = new HandleTokenUseCaseDB();
  const userService = UserService;

  const handledTokenRegister = new GetLoginToken(handleTokenDB, dcryptAdapter, userService);

  return handledTokenRegister;
};

export const makeLogoutFactorie = (): GetLogoutToken => {
  const handleTokenDB = new HandleTokenUseCaseDB();

  const handledTokenRegister = new GetLogoutToken(handleTokenDB);

  return handledTokenRegister;
};

export const makeReauthenticationFactorie = (): GetReauthenticationToken => {
  const handleTokenDB = new HandleTokenUseCaseDB();

  const handledTokenRegister = new GetReauthenticationToken(handleTokenDB);

  return handledTokenRegister;
};
