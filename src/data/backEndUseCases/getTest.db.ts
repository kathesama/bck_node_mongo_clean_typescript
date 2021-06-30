// import testService from '../../domain/services/test.service';
import TestService from '../../domain/services/test.service';
import { GetTestInterface, getTestModelInterface } from '../../interfaces/useCaseDTO/getTest.interfaces';

export class GetTestUseCaseDB implements GetTestInterface {
  testService: any;
  constructor() {
    this.testService = new TestService();
  }

  async get(): Promise<getTestModelInterface> {
    const testDB: any = await this.testService.getOne();

    return new Promise((resolve) => resolve(testDB));
  }
}
