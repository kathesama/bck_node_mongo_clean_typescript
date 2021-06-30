import { TestModelHelper } from './test.model.helper';

describe('Helpers', () => {
  it('TestModelHelper should has content', () => {
    // eslint-disable-next-line prettier/prettier
    let testModelHelper = new TestModelHelper;

    testModelHelper = {
      content: 'testing',
    };

    expect(typeof testModelHelper.content).toEqual('string');
  });
});
