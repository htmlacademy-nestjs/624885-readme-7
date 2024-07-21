import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    description: 'User`s email',
    example: 'user@mail.local'
  })
  public email: string;

  @ApiProperty({
    description: 'User`s password',
    example: '12345'
  })
  public password: string;
}
