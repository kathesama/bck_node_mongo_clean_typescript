import bcryptjs from 'bcryptjs';
import { Cryptography, CryptographyValidation } from '../../interfaces/encryptor.interface';

export class BcryptAdapter implements Cryptography {
  private readonly salt: string;

  constructor(salt?: string) {
    this.salt = salt || bcryptjs.genSaltSync();
  }

  async encrypt(value: string): Promise<string> {
    const hash = bcryptjs.hashSync(value, this.salt);
    return hash;
  }
}

export class DcryptAdapter implements CryptographyValidation {
  async encryptValidate(value: string, challenge: string): Promise<boolean> {
    const comparyHash = bcryptjs.compareSync(value, challenge);
    return comparyHash;
  }
}
