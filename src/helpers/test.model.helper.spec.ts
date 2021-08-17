import { TestModelHelper } from './test.model.helper';

describe('Helpers', () => {
  it('TestModelHelper should has content', () => {
    // eslint-disable-next-line prettier/prettier
    const testModelHelper = new TestModelHelper('testing');

    // testModelHelper = {
    //   content: 'testing',
    // };

    expect(typeof testModelHelper.content).toEqual('string');
  });
});
