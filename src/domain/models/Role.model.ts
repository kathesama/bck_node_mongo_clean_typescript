import { IRoleModelInterface } from '../../interfaces/useCaseDTO/Role.interfaces';

export class RoleModel implements IRoleModelInterface {
  role: string;
  isActive: boolean;

  constructor(role?: string) {
    this.role = role || 'USER_ROLE';
    this.isActive = true;
  }

  toJson(): any {
    const obj = {
      role: this.role,
      isActive: this.isActive,
    };

    return JSON.stringify(obj);
  }
}
