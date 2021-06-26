import { TestModel } from "../../domain/models/Test.model";

export interface getTestModelInterface{
  content: string;
}

export interface GetTestInterface {
  get: () => Promise<TestModel>;
}
