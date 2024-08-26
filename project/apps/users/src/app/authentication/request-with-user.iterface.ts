import { BlogUserEntity } from '@users/blog-user';

export interface RequestWithUser {
  user?: BlogUserEntity;
}
