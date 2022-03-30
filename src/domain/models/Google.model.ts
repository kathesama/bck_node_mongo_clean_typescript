import { IGoogleModelInterface } from '../../interfaces/useCaseDTO/Google.interfaces';

export class GoogleModel implements IGoogleModelInterface {
  // eslint-disable-next-line no-undef
  [x: string]: any;
  Ba: string;
  Ju: { AN: string; TW: string; iY: string; tf: string; wW: string; zv: string };
  accessToken: string;
  googleId: number;
  profileObj: { email: string; familyName: string; givenName: string; googleId: string; imageUrl: string; name: string };
  tokenId: string;
  tokenObj: {
    access_token: string;
    expires_at: string;
    expires_in: string;
    first_issued_at: string;
    id_token: string;
    idpId: string;
    login_hint: string;
    scope: string;
    session_state: {
      extraQueryParams: {
        authuser: string;
      };
    };
    token_type: string;
  };
  wc: string;

  constructor(data: IGoogleModelInterface) {
    this.Ba = data.Ba || '';
    this.Ju = data.Ju || { AN: '', TW: '', iY: '', tf: '', wW: '', zv: '' };
    this.accessToken = data.accessToken || '';
    this.googleId = data.googleId || null;
    this.profileObj = data.profileObj || { email: '', familyName: '', givenName: '', googleId: '', imageUrl: '', name: '' };
    this.tokenId = data.tokenId || '';
    this.tokenObj = data.tokenObj || {
      access_token: '',
      expires_at: '',
      expires_in: '',
      first_issued_at: '',
      id_token: '',
      idpId: '',
      login_hint: '',
      scope: '',
      session_state: {
        extraQueryParams: {
          authuser: '',
        },
      },
      token_type: '',
    };
    this.wc = data.wc || '';
  }

  toJson(): any {
    const obj = {
      Ba: this.Ba,
      Ju: this.Ju,
      accessToken: this.accessToken,
      googleId: this.googleId,
      profileObj: this.profileObj,
      tokenId: this.tokenId,
      tokenObj: this.tokenObj,
      wc: this.wc,
    };

    return JSON.stringify(obj);
  }
}
