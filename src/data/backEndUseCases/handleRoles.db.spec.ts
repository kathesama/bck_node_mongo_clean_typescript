import { mocked } from 'ts-jest/utils';

import { GetTestUseCaseDB } from './getTest.db';
import TestService from '../../domain/services/test.service';

const mockTestServiceFile = jest.fn();

jest.mock('../../domain/services/test.service', () => {
  return jest.fn().mockImplementation(() => {
    return { getOne: mockTestServiceFile };
  });
});
// jest.mock('../../data/backEndUseCases/getTest.db');

describe('Data -> backEndUseCases', () => {
  beforeEach(() => {
    mockTestServiceFile.mockClear();
    // TestService.mockClear();
    mocked(TestService).mockClear();
  });

  it('Should return a properly value', async () => {
    const getTestUseCaseDB = new GetTestUseCaseDB();
    const mockAddListener = jest.spyOn(getTestUseCaseDB, 'get'); // spy on foo.addListener

    mockAddListener.mockImplementation(() => Promise.resolve({ content: 'Testing data' }));

    // const testDB: any = await getTestUseCaseDB.get().then((content) => { return  content;}); // will call addListener with a callback
    const testDB2: any = await getTestUseCaseDB.get();
    expect(testDB2['content']).toEqual('Testing data');
  });

  it('We can check if the getTest called the class constructor', () => {
    // eslint-disable-next-line no-unused-vars
    const getTest = new GetTestUseCaseDB();
    expect(getTest).toBeTruthy();
  });

  it('We can check if TestService was called and used', async () => {
    const testService = new TestService();

    const mockAddListener = jest.spyOn(testService, 'getOne');

    mockAddListener.mockImplementation(() => Promise.resolve({ content: 'Testing from service' }));

    const getTestUseCaseDB = new GetTestUseCaseDB();
    getTestUseCaseDB.testService = testService;
    const data = await getTestUseCaseDB.get();
    expect(TestService).toHaveBeenCalledTimes(2);
    expect(data.content).toBe('Testing from service');
  });
});
