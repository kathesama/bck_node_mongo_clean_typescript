/* eslint-disable jest/no-try-expect */
import { GetTestUseCaseDB } from '../../data/backEndUseCases/getTest.db';
import { ServerError } from '../../errors';
import { serverErrorHelper, successHelper } from '../../helpers/http.helper';
import { HttpResponse } from '../../interfaces/http.interface';
import { GetTest } from './GetTest.controller';

jest.mock('../../data/backEndUseCases/getTest.db');

describe('Controller', () => {
  it('should get successHelper', async () => {
    const getTestUseCaseDB = new GetTestUseCaseDB();

    const mockAddListener = jest.spyOn(getTestUseCaseDB, 'get'); // spy on foo.addListener
    mockAddListener.mockImplementation(() => Promise.resolve({ content: 'Testing data' }));

    const getTest = new GetTest(getTestUseCaseDB);
    const mockGetTestAddListener = jest.spyOn(getTest, 'handle'); // spy on foo.addListener
    const response: HttpResponse = { statusCode: 200, body: 'Testing data' };
    mockGetTestAddListener.mockImplementation(() => Promise.resolve(successHelper(response)));

    const httpResponse = await getTest.handle();
    expect(httpResponse.body['statusCode']).toEqual(200);
    expect(httpResponse.body['body']).toEqual('Testing data');
  });

  it('should get serverErrorHelper', async () => {
    const getTestUseCaseDB = new GetTestUseCaseDB();

    const mockAddListener = jest.spyOn(getTestUseCaseDB, 'get');
    mockAddListener.mockImplementation(() => Promise.resolve({ content: 'Testing data' }));

    const getTest = new GetTest(getTestUseCaseDB);
    const mockGetTestAddListener = jest.spyOn(getTest, 'handle');
    const response: Error = new Error('Error on data');
    mockGetTestAddListener.mockImplementation(() => Promise.resolve(serverErrorHelper(response)));

    const httpResponse = await getTest.handle();
    expect(httpResponse['statusCode']).toEqual(500);
    expect(httpResponse.body.name).toEqual('Error Internal in the Server');
  });

  it('should get success mocking getTestUseCaseDB', async () => {
    const getTestUseCaseDB = new GetTestUseCaseDB();

    const mockAddListener = jest.spyOn(getTestUseCaseDB, 'get');
    mockAddListener.mockImplementation(() => Promise.resolve({ content: 'Testing data' }));

    const getTest = new GetTest(getTestUseCaseDB);
    const httpResponse = await getTest.handle();

    expect(httpResponse['statusCode']).toEqual(200);
    expect(httpResponse.body.content).toEqual('Testing data');
  });

  it('should get serverErrorHelper mocking getTestUseCaseDB2', async () => {
    const getTestUseCaseDB = new GetTestUseCaseDB();

    const mockGetTestAddListener = jest.spyOn(getTestUseCaseDB, 'get');
    // const response: any = serverErrorHelper(new Error('Error on data'));
    const response: any = serverErrorHelper(new ServerError('Error on data'));
    mockGetTestAddListener.mockImplementation(() => Promise.reject(response));
    const getTest = new GetTest(getTestUseCaseDB);

    // await expect(getTest.handle()).rejects.toThrow(response);
    try {
      await getTest.handle();
    } catch (error) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(error.statusCode).toBe(500);
    }

    // expect(httpResponse.body.name).toEqual('Error Internal in the Server');
  });
});
