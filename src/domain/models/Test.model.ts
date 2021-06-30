import { TestModelHelper } from '../../helpers/test.model.helper';

export class TestModel {
  // eslint-disable-next-line no-unused-vars
  constructor(private data: TestModelHelper) {}

  get content(): string {
    return this.data.content;
  }
}
