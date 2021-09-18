import { v4 as uuidv4 } from 'uuid';
import { IUserModelInterface } from '../../interfaces/useCaseDTO/User.interfaces';

export class UserModel implements IUserModelInterface {
  // eslint-disable-next-line no-undef
  [x: string]: any;
  userId: string;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  password: string;
  image: string;
  role: string;
  isActive: boolean;

  constructor(
    email: string,
    password: string,
    firstName?: string,
    lastName?: string,
    age?: number,
    image?: string,
    role?: string,
    isActive?: boolean
  ) {
    this.userId = uuidv4();
    this.password = password;
    this.email = email;
    this.firstName = firstName || 'Unknown';
    this.lastName = lastName || 'Doe';
    this.age = age || 0;
    this.image = image || '';
    this.role = role || 'USER_ROLE';
    this.isActive = isActive || false;
  }

  toJson(): any {
    const obj = {
      userId: this.userId,
      email: this.email,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      age: this.age,
      image: this.image,
      role: this.role,
      isActive: this.isActive,
    };

    return JSON.stringify(obj);
  }
}
