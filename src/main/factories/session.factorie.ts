import { HandleTokenUseCaseDB } from '../../data/backEndUseCases/handleTokens.db';
// import { RegisterTokenFactorie } from '../../controllers/token/PostToken.controller';

import { GetLoginToken } from '../../controllers/token/GetLoginToken.controller';
import { GetReauthenticationToken } from '../../controllers/token/GetReauthToken.controller';
// import { JwtAdapter } from '../adapters/jwt.adapter';
// import { PatchTokenFactorie } from '../../controllers/token/PatchToken.controller';
// import { DeleteTokenFactorie } from '../../controllers/token/DeleteToken.controller';
import { DcryptAdapter } from '../adapters/bcrypt.adapter';

// inyeccion de dependencias
// export const makeGetAllTokenFactorie = (): GetAllToken => {
//   const handleTokenDB = new HandleTokenUseCaseDB();

//   const handledTokenRegister = new GetAllToken(handleTokenDB);

//   return handledTokenRegister;
// };

export const makeLoginFactorie = (): GetLoginToken => {
  // const jwtAdapter = new JwtAdapter(process.env.SEED, process.env.EXPIRES_IN);
  const dcryptAdapter = new DcryptAdapter();
  const handleTokenDB = new HandleTokenUseCaseDB();

  const handledTokenRegister = new GetLoginToken(handleTokenDB, dcryptAdapter);

  return handledTokenRegister;
};

export const makeReauthenticationFactorie = (): GetReauthenticationToken => {
  // const jwtAdapter = new JwtAdapter(process.env.SEED, process.env.EXPIRES_IN);
  const dcryptAdapter = new DcryptAdapter();
  const handleTokenDB = new HandleTokenUseCaseDB();

  const handledTokenRegister = new GetReauthenticationToken(handleTokenDB, dcryptAdapter);

  return handledTokenRegister;
};

// export const makeRegisterTokenFactorie = (): RegisterTokenFactorie => {
//   const handleTokenDB = new HandleTokenUseCaseDB();

//   const handledTokenRegister = new RegisterTokenFactorie(handleTokenDB);

//   return handledTokenRegister;
// };

// export const makeUpdateTokenFactorie = (): PatchTokenFactorie => {
//   const handleTokenDB = new HandleTokenUseCaseDB();

//   const handledTokenRegister = new PatchTokenFactorie(handleTokenDB);

//   return handledTokenRegister;
// };

// export const makeDeleteTokenFactorie = (): DeleteTokenFactorie => {
//   const handleTokenDB = new HandleTokenUseCaseDB();

//   const handledTokenRegister = new DeleteTokenFactorie(handleTokenDB);

//   return handledTokenRegister;
// };
