import RoleRepository from '../repositories/role.repository';
import RoleService from './role.service';

describe('Data -> backEndUseCases', () => {
  it('Should return a properly value due getOne', async () => {
    const roleService = RoleService;

    const mockAddListener = jest.spyOn(roleService, 'getById');

    mockAddListener.mockImplementation(() => Promise.resolve({ id: '61057d45c10af6309cfe278b' }));

    const roleDB: any = await roleService.getById('61057d45c10af6309cfe278b');
    expect(roleDB['id']).toEqual('61057d45c10af6309cfe278b');
  });

  it('Should return a properly value due Repository.finOne', async () => {
    const roleRepository = RoleRepository;
    const roleService = RoleService;

    roleRepository.find = jest.fn().mockImplementationOnce(() => Promise.resolve({ role: 'ADMIN_ROLE' }));

    const spy = jest.spyOn(roleRepository, 'find');
    const getOne: any = await roleService.getById('61057d45c10af6309cfe278b');

    expect(spy).toHaveBeenCalled();
    expect(getOne['role']).toEqual('ADMIN_ROLE');
  });
});
