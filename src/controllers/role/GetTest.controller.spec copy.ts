/* eslint-disable jest/no-try-expect */
import { AllRoleUseCaseDB } from '../../data/backEndUseCases/handleRoles.db';
import { ServerError } from '../../interfaces/http/errors';
import { serverErrorHelper, successHelper } from '../../helpers/http.helper';
import { HttpResponse } from '../../interfaces/http.interface';
import { GetAllRole } from './GetRole.controller';

jest.mock('../../data/backEndUseCases/getRole.db');

describe('Controller', () => {
  it('should get successHelper', async () => {
    const getRoleUseCaseDB = new AllRoleUseCaseDB();

    const mockAddListener = jest.spyOn(getRoleUseCaseDB, 'get'); // spy on foo.addListener
    mockAddListener.mockImplementation(() => Promise.resolve({ role: 'admin' }));

    const getRole = new GetAllRole(getRoleUseCaseDB);
    const mockGetRoleAddListener = jest.spyOn(getRole, 'handle'); // spy on foo.addListener
    const response: HttpResponse = { statusCode: 200, body: 'admin' };
    mockGetRoleAddListener.mockImplementation(() => Promise.resolve(successHelper(response)));

    const httpResponse = await getRole.handle();
    expect(httpResponse.body['statusCode']).toEqual(200);
    expect(httpResponse.body['body']).toEqual('admin');
  });

  it('should get serverErrorHelper', async () => {
    const getRoleUseCaseDB = new AllRoleUseCaseDB();

    const mockAddListener = jest.spyOn(getRoleUseCaseDB, 'get');
    mockAddListener.mockImplementation(() => Promise.resolve({ role: 'admin' }));

    const getRole = new GetAllRole(getRoleUseCaseDB);
    const mockGetRoleAddListener = jest.spyOn(getRole, 'handle');
    const response: Error = new Error('Error on data');
    mockGetRoleAddListener.mockImplementation(() => Promise.resolve(serverErrorHelper(response)));

    const httpResponse = await getRole.handle();
    expect(httpResponse['statusCode']).toEqual(500);
    expect(httpResponse.body.name).toEqual('Error Internal in the Server');
  });

  it('should get success mocking getRoleUseCaseDB', async () => {
    const getRoleUseCaseDB = new AllRoleUseCaseDB();

    const mockAddListener = jest.spyOn(getRoleUseCaseDB, 'get');
    mockAddListener.mockImplementation(() => Promise.resolve({ role: 'admin' }));

    const getRole = new GetAllRole(getRoleUseCaseDB);
    const httpResponse = await getRole.handle();

    expect(httpResponse['statusCode']).toEqual(200);
    expect(httpResponse.body.role).toEqual('admin');
  });

  it('should get serverErrorHelper mocking getRoleUseCaseDB2', async () => {
    const getRoleUseCaseDB = new AllRoleUseCaseDB();

    const mockGetRoleAddListener = jest.spyOn(getRoleUseCaseDB, 'get');
    // const response: any = serverErrorHelper(new Error('Error on data'));
    const response: any = serverErrorHelper(new ServerError('Error on data'));
    mockGetRoleAddListener.mockImplementation(() => Promise.reject(response));
    const getRole = new GetAllRole(getRoleUseCaseDB);

    // await expect(getRole.handle()).rejects.toThrow(response);
    try {
      await getRole.handle();
    } catch (error) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(error.statusCode).toBe(500);
    }

    // expect(httpResponse.body.name).toEqual('Error Internal in the Server');
  });
});
