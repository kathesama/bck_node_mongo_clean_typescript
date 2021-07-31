import { RoleModel } from './Role.model';

describe('Models', () => {
  it('Class Test: should return properly values', () => {
    const testModel = new RoleModel('admin');

    expect(testModel.role).toEqual('admin');
  });
});
