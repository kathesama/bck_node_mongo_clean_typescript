// import { HandleTokenUseCaseDB } from '../../data/backEndUseCases/handleTokens.db';
// import { RegisterTokenFactorie } from '../../controllers/token/PostToken.controller';

// import { GetLoginToken } from '../../controllers/token/GetLoginToken.controller';
// import { PatchTokenFactorie } from '../../controllers/token/PatchToken.controller';
// import { DeleteTokenFactorie } from '../../controllers/token/DeleteToken.controller';

// inyeccion de dependencias
// export const makeGetAllTokenFactorie = (): GetAllToken => {
//   const handleTokenDB = new HandleTokenUseCaseDB();

//   const handledTokenRegister = new GetAllToken(handleTokenDB);

//   return handledTokenRegister;
// };

// export const makeGetOneTokenFactorie = (): GetLoginToken => {
//   const handleTokenDB = new HandleTokenUseCaseDB();

//   const handledTokenRegister = new GetLoginToken(handleTokenDB);

//   return handledTokenRegister;
// };

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
