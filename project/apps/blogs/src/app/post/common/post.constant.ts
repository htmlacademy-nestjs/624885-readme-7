import { SortBy, SortDirection } from '@project/core';

export const MAX_TAG_COUNT = 8;
export const MIN_TAG_LENGTH = 3;
export const MAX_TAG_LENGTH = 10;

export const DEFAULT_POST_COUNT_LIMIT = 25;
export const DEFAULT_PAGE_COUNT = 1;
export const DEFAULT_SORT_BY = SortBy.CreatedAt;
export const DEFAULT_SORT_DIRECTION = SortDirection.Desc;

export const PostErrorMessage = {
  InvalidId: 'Author Id must be MongoId.',
  IsDraftWrongType: 'isDraft must be boolean.',
  TypeError: 'Type must be VIDEO, TEXT, QUOTE, PHOTO or LINK',
  TagCount: `Max ${MAX_TAG_COUNT} tags allowed.`,
  TagLength: `Tag length must be from ${MIN_TAG_LENGTH} to ${MAX_TAG_LENGTH}`
} as const;

export const PostResponseMessage = {
  PostFound: 'Post found',
  PostNotFound: 'Post not found',
  PostCreated: 'Post created',
  PostsOk: 'Posts loaded',
  PostUpdated: 'Post updated'
}

export const TITLE_MIN_LENGTH = 20;
export const TITLE_MAX_LENGTH = 50;
export const ANNOUNCE_MIN_LENGTH = 50;
export const ANNOUNCE_MAX_LENGTH = 255;
export const TEXT_MIN_LENGTH = 100;
export const TEXT_MAX_LENGTH = 1024;
export const QUOTE_MIN_LENGTH = 20;
export const QUOTE_MAX_LENGTH = 300;
export const QUOTE_AUTHOR_MIN_LENGTH = 3;
export const QUOTE_AUTHOR_MAX_LENGTH = 50;
export const LINK_DESCRIPTION_MAX_LENGTH = 300;
