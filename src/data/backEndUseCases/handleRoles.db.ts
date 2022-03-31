import { RoleModel } from '../../domain/models/Role.model';
import RoleService from '../../domain/services/role.service';
import {
  AddRoleInterface,
  DeleteRoleInterface,
  GetOneRoleInterface,
  GetRoleInterface,
  IRoleModelInterface,
  PatchRoleInterface,
  GetOneRoleByNameInterface,
} from '../../interfaces/useCaseDTO/Role.interfaces';

export class HandleRoleUseCaseDB
  implements GetRoleInterface, GetOneRoleInterface, AddRoleInterface, PatchRoleInterface, DeleteRoleInterface, GetOneRoleByNameInterface
{
  roleService: any;

  constructor() {
    this.roleService = RoleService;
  }

  async get(): Promise<IRoleModelInterface> {
    const roleDB: any = await this.roleService.get();

    return new Promise((resolve) => resolve(roleDB));
  }

  async getOne(role: string): Promise<IRoleModelInterface> {
    const roleDB: any = await this.roleService.getById(role);

    return new Promise((resolve) => resolve(roleDB));
  }

  async getOneByName(role: string): Promise<IRoleModelInterface> {
    const roleDB: any = await this.roleService.getByName(role);

    return new Promise((resolve) => resolve(roleDB));
  }

  async getOneById(role: any): Promise<IRoleModelInterface> {
    const roleDB: any = await this.roleService.getById(role);

    return new Promise((resolve) => resolve(roleDB));
  }

  async add(role: RoleModel): Promise<IRoleModelInterface> {
    const roleDB: any = await this.roleService.add(role);

    return new Promise((resolve) => resolve(roleDB));
  }

  async patch(id: string, role: RoleModel): Promise<IRoleModelInterface> {
    const roleDB: any = await this.roleService.patch(id, role);

    return new Promise((resolve) => resolve(roleDB));
  }

  async delete(id: string): Promise<IRoleModelInterface> {
    const roleDB: any = await this.roleService.delete(id);

    return new Promise((resolve) => resolve(roleDB));
  }
}
