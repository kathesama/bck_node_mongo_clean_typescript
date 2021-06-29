import { GetTestUseCaseDB } from '../../data/backEndUseCases/getTest.db';
jest.mock('../../data/backEndUseCases/getTest.db');

describe('Data -> backEndUseCases', () => {
  it('Should return a properly value', async () => {
    const getTestUseCaseDB = new GetTestUseCaseDB();
    const mockAddListener = jest.spyOn(getTestUseCaseDB, 'get'); // spy on foo.addListener

    mockAddListener.mockImplementation(() => Promise.resolve({ content: 'Testing data' }));

    // const testDB: any = await getTestUseCaseDB.get().then((content) => { return  content;}); // will call addListener with a callback
    const testDB2: any = await getTestUseCaseDB.get();
    expect(testDB2['content']).toEqual('Testing data');
  });
});
