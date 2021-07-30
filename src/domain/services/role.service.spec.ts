import RoleRepository from '../repositories/role.repository';
import RoleService from './role.service';

describe('Data -> backEndUseCases', () => {
  it('Should return a properly value due getOne', async () => {
    const roleService = new RoleService();

    const mockAddListener = jest.spyOn(roleService, 'getById');

    mockAddListener.mockImplementation(() => Promise.resolve({ id: '60a1a86b9322714290408891' }));

    const roleDB: any = await roleService.getById('60a1a86b9322714290408891');
    expect(roleDB['id']).toEqual('60a1a86b9322714290408891');
  });

  it('Should return a properly value due Repository.finOne', async () => {
    const roleRepository = RoleRepository;
    const roleService = new RoleService();

    roleRepository.findOne = jest.fn().mockImplementationOnce(() => Promise.resolve({ role: 'admin' }));

    const spy = jest.spyOn(roleRepository, 'findOne');
    const getOne: any = await roleService.getById('60a1a86b9322714290408891');

    expect(spy).toHaveBeenCalled();
    expect(getOne['role']).toEqual('admin');
  });
});
