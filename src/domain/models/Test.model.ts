import { getTestModelInterface } from '../useCaseDTO/getTest.interfaces';

export class TestModel implements getTestModelInterface {
  get content(): string {
    return this.content;
  }
}
