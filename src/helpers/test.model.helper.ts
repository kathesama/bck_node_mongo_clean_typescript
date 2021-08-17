import { getTestModelInterface } from '../interfaces/useCaseDTO/getTest.interfaces';

export class TestModelHelper implements getTestModelInterface {
  content: string;

  constructor(content: string) {
    this.content = content || '';
  }
}
