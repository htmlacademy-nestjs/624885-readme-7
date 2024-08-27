import { Transform } from 'class-transformer';
import { DEFAULT_PAGE_COUNT, DEFAULT_POST_COUNT_LIMIT, DEFAULT_SORT_BY, DEFAULT_SORT_DIRECTION } from './post.constant';
import { IsArray, IsIn, IsNumber, IsOptional } from 'class-validator';
import { SortBy, SortDirection } from '@project/core';

export class BlogPostQuery {
  @Transform(({value}) => +value || DEFAULT_POST_COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit: number = DEFAULT_POST_COUNT_LIMIT;


  @IsArray()
  @IsOptional()
  public tags: string[];

  @IsIn(Object.values(SortDirection))
  @IsOptional()
  public sortDirection: SortDirection = DEFAULT_SORT_DIRECTION;

  @IsIn(Object.values(SortBy))
  @IsOptional()
  public sortBy: SortBy = DEFAULT_SORT_BY;

  @Transform(({value}) => +value || DEFAULT_PAGE_COUNT)
  @IsNumber()
  @IsOptional()
  public page: number = DEFAULT_PAGE_COUNT;
}
