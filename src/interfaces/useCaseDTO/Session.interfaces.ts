/* eslint-disable no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { SessionModel } from '../../domain/models/Session.model';

// aca se crean las interfaces para luego ser implementadas en el useCase de DB
export interface ISessionModelInterface {
  session: string;
  fingerprint: string;
  user: string;
  type: string;
  expires: Date;
  blacklisted: boolean;
}

export interface GetSessionInterface {
  // eslint-disable-next-line no-unused-vars
  get: (props: Record<string, unknown>) => Promise<ISessionModelInterface>;
}
/*
export interface GetOneSessionInterface {
  // eslint-disable-next-line no-unused-vars
  getOne: (id: string) => Promise<ISessionModelInterface>;
}

export interface AddSessionInterface {
  // eslint-disable-next-line no-unused-vars
  add: (session: SessionModel) => Promise<ISessionModelInterface>;
}

export interface PatchSessionInterface {
  // eslint-disable-next-line no-unused-vars
  patch: (id: string, session: SessionModel) => Promise<ISessionModelInterface>;
}

export interface DeleteSessionInterface {
  // eslint-disable-next-line no-unused-vars
  delete: (id: string) => Promise<ISessionModelInterface>;
}
*/
