// jest.mock('../../data/backEndUseCases/getTest.db');
// import { GetTestUseCaseDB } from '../../data/backEndUseCases/getTest.db';
// import { GetTest } from './GetTest.controller';
// import { getTestModelInterface } from '../../domain/useCaseDTO/getTest.interfaces';

import { GetTestUseCaseDB } from '../../data/backEndUseCases/getTest.db';
jest.mock('../../data/backEndUseCases/getTest.db');

// const GetTestUseCaseDBMock = GetTestUseCaseDB as jest.MockedClass<typeof GetTestUseCaseDB>;

describe('Controller', () => {
  it('should run please', async () => {
    const getTestUseCaseDB = new GetTestUseCaseDB();
    const mockAddListener = jest.spyOn(getTestUseCaseDB, 'get'); // spy on foo.addListener

    mockAddListener.mockImplementation(() => Promise.resolve({ content: 'Testing data' }));

    const testDB2: any = await getTestUseCaseDB.get();
    expect(testDB2['content']).toEqual('Testing data');
  });
});
