import testService from '../../domain/services/test.service';
import { GetTestInterface, getTestModelInterface } from '../../domain/useCaseDTO/getTest.interfaces';

export class GetTestUseCaseDB implements GetTestInterface {
  async get(): Promise<getTestModelInterface> {
    const testDB: any = await testService.getOne();

    return new Promise((resolve) => resolve(testDB));
  }
}
