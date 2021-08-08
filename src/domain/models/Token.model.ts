import { ITokenModelInterface } from '../../interfaces/useCaseDTO/Token.interfaces';
import { tokenTypes } from '../enums/token.enum';

export class TokenModel implements ITokenModelInterface {
  token: string;
  fingerprint: string;
  user: string;
  type: string;
  expires: Date;
  blacklisted: boolean;

  constructor(token: string, fingerprint: string, user: string, type: string = tokenTypes.ACCESS, expires: Date = new Date(), blacklisted = false) {
    this.token = token;
    this.fingerprint = fingerprint;
    this.user = user;
    this.type = type;
    this.expires = expires;
    this.blacklisted = blacklisted;
  }

  toJson(): string {
    const obj = {
      token: this.token,
      fingerprint: this.fingerprint,
      user: this.user,
      type: this.type,
      expires: this.expires,
      blacklisted: this.blacklisted,
    };

    return JSON.stringify(obj);
  }
}
