import { GetTest } from "../../controllers/test/GetTest.controller";
import { GetTestUseCaseDB } from "../../data/backEndUseCases/getTest.Interface.db";

// inyeccion de dependencias
export const makeTestFactorie = (): GetTest => {

  const getTestDB = new GetTestUseCaseDB();

  const readTest = new GetTest(getTestDB);

  return readTest;
};
