import { IRoleModelInterface } from '../../interfaces/useCaseDTO/Role.interfaces';

export class RoleModel implements IRoleModelInterface {
  role: string;

  constructor(role?: string) {
    this.role = role;
  }
}
