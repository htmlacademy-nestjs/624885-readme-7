import { SortBy, SortDirection } from '@project/core';

export const Tag = {
  MaxCount : 8,
  MinLength : 3,
  MaxLength : 10
};

export const DEFAULT_POST_COUNT_LIMIT = 25;
export const DEFAULT_PAGE_COUNT = 1;
export const DEFAULT_SORT_BY = SortBy.CreatedAt;
export const DEFAULT_SORT_DIRECTION = SortDirection.Desc;

export const PostErrorMessage = {
  InvalidId: 'Author Id must be MongoId.',
  IsDraftWrongType: 'isDraft must be boolean.',
  TypeError: 'Type must be VIDEO, TEXT, QUOTE, PHOTO or LINK',
  TagCount: `Max ${Tag.MaxCount} tags allowed.`,
  TagLength: `Tag length must be from ${Tag.MinLength} to ${Tag.MaxLength}`
} as const;

export const PostResponseMessage = {
  PostFound: 'Post found',
  PostNotFound: 'Post not found',
  PostCreated: 'Post created',
  PostsOk: 'Posts loaded',
  PostUpdated: 'Post updated'
}

export const Title = {
  MinLength : 20,
  MaxLength : 50
};
export const Announce = {
  MinLength : 50,
  MaxLength : 255
};
export const Text = {
  MinLength : 100,
  MaxLength : 1024
};
export const Quote = {
  MinLength : 20,
  MaxLength : 300
};
export const QuoteAuthor = {
  MinLength : 3,
  MaxLength : 50
};
export const LINK_DESCRIPTION_MAX_LENGTH = 300;
