import { Transform } from 'class-transformer';
import { DEFAULT_PAGE_COUNT, DEFAULT_POST_COUNT_LIMIT, DEFAULT_SORT_DIRECTION } from './post.constant';
import { IsArray, IsIn, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { SortDirection } from '@project/core';

export class BlogPostQuery {
  @Transform(({value}) => +value || DEFAULT_POST_COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit: number = DEFAULT_POST_COUNT_LIMIT;

  @IsUUID('all', {each: true})
  @IsArray()
  @IsOptional()
  public tags: string[];

  @IsIn(Object.values(SortDirection))
  @IsOptional()
  public sortDirection: SortDirection = DEFAULT_SORT_DIRECTION;

  @Transform(({value}) => +value || DEFAULT_PAGE_COUNT)
  @IsNumber()
  @IsOptional()
  public page: number = DEFAULT_PAGE_COUNT;
}
