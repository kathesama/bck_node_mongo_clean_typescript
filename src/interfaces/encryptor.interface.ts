/* eslint-disable no-unused-vars */
export interface Cryptography {
  encrypt: (value: string) => Promise<string>;
}

export interface CryptographyValidation {
  encryptValidate: (value: string, challenge: string) => Promise<boolean>;
}
