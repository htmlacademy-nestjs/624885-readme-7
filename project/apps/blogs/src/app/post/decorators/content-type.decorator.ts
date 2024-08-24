import { Constructor } from "@nestjs/common/utils/merge-with-values.util";
import { PostType } from '@prisma/client';


const BlogContentTarget = {};
const BlogContentMetadata = Symbol('BlogContentMetadata');

export const VALIDATORS_METADATA_KEY = 'validators';

export const BlogContent = (type: PostType) => (constructor: Constructor<any>) => {
  let definedValidators: Map<PostType, Constructor<any>> | undefined = Reflect.getOwnMetadata(VALIDATORS_METADATA_KEY, BlogContent);
  if (!definedValidators) {
    definedValidators = new Map();
  }
  definedValidators.set(type, constructor);

  Reflect.defineMetadata(VALIDATORS_METADATA_KEY, definedValidators, BlogContent)
}
