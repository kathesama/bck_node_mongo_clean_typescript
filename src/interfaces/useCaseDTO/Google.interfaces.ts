// aca se crean las interfaces para luego ser implementadas en el useCase de DB
export interface IGoogleModelInterface {
  Ba: string;
  Ju: {
    AN: string;
    TW: string;
    iY: string;
    tf: string;
    wW: string;
    zv: string;
  };
  accessToken: string;
  googleId: number;
  profileObj: {
    email: string;
    familyName: string;
    givenName: string;
    googleId: string;
    imageUrl: string;
    name: string;
  };
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
  envelope: {
    alg: string;
    kid: string;
    typ: string;
  };
  payload: {
    iss: string;
    azp: string;
    aud: string;
    sub: string;
    email: string;
    email_verified: true;
    at_hash: string;
    name: string;
    picture: string;
    given_name: string;
    family_name: string;
    locale: string;
    iat: number;
    exp: string;
    jti: string;
  };

  toJson(): string;
}

export interface ValidateGoogleUserInterface {
  // eslint-disable-next-line no-unused-vars
  validate: (props: Record<string, unknown>) => Promise<IGoogleModelInterface>;
}
