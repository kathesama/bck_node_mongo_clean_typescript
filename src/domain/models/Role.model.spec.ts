// import { IRoleModelInterface } from '../../interfaces/useCaseDTO/Role.interfaces';
import { RoleModel } from './Role.model';

describe('Models', () => {
  it('Class Test: should return properly values', () => {
    // const testObj: RoleModel = {
    //   role: 'admin',
    // };

    const testModel = new RoleModel('admin');

    expect(testModel.role).toEqual('admin');
  });
});
