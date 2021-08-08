/* eslint-disable no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TokenModel } from '../../domain/models/Token.model';

// aca se crean las interfaces para luego ser implementadas en el useCase de DB
export interface ITokenModelInterface {
  token: string;
  fingerprint: string;
  user: string;
  type: string;
  expires: Date;
  blacklisted: boolean;
}

export interface GetTokenInterface {
  // eslint-disable-next-line no-unused-vars
  get: (props: Record<string, unknown>) => Promise<ITokenModelInterface>;
}
/*
export interface GetOneTokenInterface {
  // eslint-disable-next-line no-unused-vars
  getOne: (id: string) => Promise<ITokenModelInterface>;
}

export interface AddTokenInterface {
  // eslint-disable-next-line no-unused-vars
  add: (token: TokenModel) => Promise<ITokenModelInterface>;
}

export interface PatchTokenInterface {
  // eslint-disable-next-line no-unused-vars
  patch: (id: string, token: TokenModel) => Promise<ITokenModelInterface>;
}

export interface DeleteTokenInterface {
  // eslint-disable-next-line no-unused-vars
  delete: (id: string) => Promise<ITokenModelInterface>;
}
*/
