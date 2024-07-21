import { genSalt, hash } from 'bcrypt';

import { Hasher } from './hasher';
import { SALT_ROUNDS } from '@users/blog-user'

export class BcryptHasher implements Hasher {
  public async hash(data: string): Promise<string> {
    const salt = await genSalt(SALT_ROUNDS);
    return hash(data, salt);
  }
}

