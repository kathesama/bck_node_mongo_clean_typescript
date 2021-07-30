import { RoleModel } from '../../domain/models/Role.model';
import RoleService from '../../domain/services/role.service';
import { GetRoleInterface, IRoleModelInterface } from '../../interfaces/useCaseDTO/Role.interfaces';

export class AllRoleUseCaseDB implements GetRoleInterface {
  roleService: any;

  constructor() {
    this.roleService = new RoleService();
  }

  async get(): Promise<IRoleModelInterface> {
    const roleDB: any = await this.roleService.get();

    return new Promise((resolve) => resolve(roleDB));
  }

  async getOne(role: string): Promise<IRoleModelInterface> {
    const roleDB: any = await this.roleService.getById(role);

    return new Promise((resolve) => resolve(roleDB));
  }

  async add(role: RoleModel): Promise<IRoleModelInterface> {
    const roleDB: any = await this.roleService.add(role);

    return new Promise((resolve) => resolve(roleDB));
  }
}
