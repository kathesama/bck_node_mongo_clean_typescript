import { TestModel } from '../models/Test.model';
// aca se crean las interfaces para luego ser implementadas en el useCase de DB
export interface getTestModelInterface {
  content: string;
}

export interface GetTestInterface {
  get: () => Promise<TestModel>;
}
