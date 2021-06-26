import testService from '../../domain/services/test.service';
import { GetTestInterface, getTestModelInterface } from '../frontEndUseCases/getTest.interface';

export class GetTestUseCaseDB implements GetTestInterface {

  async get (): Promise<getTestModelInterface> {
    const testDB: any = await testService.get();

    return new Promise(resolve => resolve(
      testDB
    ));
  }
}
