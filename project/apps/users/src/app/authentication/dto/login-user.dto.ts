import { ApiProperty } from '@nestjs/swagger';
import { AuthenticationErrorMessage } from '../authentication.constant';
import { IsEmail, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    description: 'User`s email',
    example: 'user@mail.local'
  })
  @IsEmail({}, {message: AuthenticationErrorMessage.EmailNotValid})
  public email: string;

  @ApiProperty({
    description: 'User`s password',
    example: '12345'
  })
  @IsString()
  public password: string;
}
