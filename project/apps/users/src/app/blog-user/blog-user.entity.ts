import { AuthUser, Entity, StorableEntity} from '@project/core'

export class BlogUserEntity extends Entity implements StorableEntity<AuthUser> {
  public email: string;
  public name: string;
  public avatar: string;
  public passwordHash: string;

  constructor(user?: AuthUser) {
    super();

    if(user) {
      this.id = user.id ?? '';
      this.email = user.email;
      this.name = user.name;
      this.avatar = user.avatar ?? '';
      this.passwordHash = user.passwordHash;
    }
  }

  public toPOJO(): AuthUser {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      avatar: this.avatar,
      passwordHash: this.passwordHash
    }
  }
}
