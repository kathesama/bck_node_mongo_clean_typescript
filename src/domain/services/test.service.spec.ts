import TestRepository from '../repositories/test.repository';
import TestService from './test.service';

describe('Data -> backEndUseCases', () => {
  it('Should return a properly value due getOne', async () => {
    const getTestUseCaseDB = TestService;

    const mockAddListener = jest.spyOn(getTestUseCaseDB, 'getOne'); // spy on foo.addListener

    mockAddListener.mockImplementation(() => Promise.resolve({ content: 'Testing from service' }));

    const testDB: any = await getTestUseCaseDB.getOne();
    expect(testDB['content']).toEqual('Testing from service');
  });

  it('Should return a properly value due Repository.finOne', async () => {
    const testRepository = TestRepository;
    const testService = TestService;

    testRepository.findOne = jest.fn().mockImplementationOnce(() => Promise.resolve({ content: 'Testing from service' }));

    const spy = jest.spyOn(testRepository, 'findOne');
    const getOne: any = await testService.getOne();

    expect(spy).toHaveBeenCalled();
    expect(getOne['content']).toEqual('Testing from service');
  });
});
