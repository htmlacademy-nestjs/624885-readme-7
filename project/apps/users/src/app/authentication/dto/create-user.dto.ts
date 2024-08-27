import { IsEmail, IsOptional, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { AuthenticationErrorMessage } from '../authentication.constant';

export class CreateUserDto {
  @ApiProperty({
    description: 'User`s email',
    example: 'user@mail.local'
  })
  @IsEmail({}, {message: AuthenticationErrorMessage.EmailNotValid})
  public email: string;

  @ApiProperty({
    description: 'User`s name',
    example: 'Keks'
  })
  @IsString()
  public name: string;

  @ApiProperty({
    description: 'User`s password',
    example: '12345'
  })
  @IsString()
  public password: string;

  @IsString()
  @IsOptional()
  public avatar: string;
}
