import { ControllerInterface } from '../../interfaces/controller.interface';
import { GetTestInterface } from '../../domain/useCaseDTO/getTest.interfaces';
import { serverErrorHelper, successHelper } from '../../helpers/http.helper';
import { HttpResponse } from '../../interfaces/http.interface';

export class GetTest implements ControllerInterface {
  constructor(private readonly getTest: GetTestInterface) {
    this.getTest = getTest;
  }

  async handle(): Promise<HttpResponse> {
    try {
      const test: any = await this.getTest.get();

      return successHelper(test);
    } catch (error) {
      serverErrorHelper(error);
    }
  }
}
