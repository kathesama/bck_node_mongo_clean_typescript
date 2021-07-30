import { ControllerInterface } from '../../interfaces/controller.interface';
import { serverErrorHelper, successHelper } from '../../helpers/http.helper';
import { HttpResponse } from '../../interfaces/http.interface';

import { GetTestInterface } from '../../interfaces/useCaseDTO/getTest.interfaces';

// import { Get, Route, Tags } from 'tsoa';

// @Route('Prueba')
// @Tags('Prueba')
export class GetTest implements ControllerInterface {
  constructor(private readonly getTest: GetTestInterface) {
    this.getTest = getTest;
  }

  // @Get('/')
  async handle(): Promise<HttpResponse> {
    try {
      const test: any = await this.getTest.get();

      return successHelper(test);
    } catch (error) {
      throw serverErrorHelper(error);
    }
  }
}
