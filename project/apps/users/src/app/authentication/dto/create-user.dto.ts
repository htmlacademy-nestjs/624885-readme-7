import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'User`s email',
    example: 'user.mail.local'
  })
  public email: string;

  @ApiProperty({
    description: 'User`s name',
    example: 'Keks'
  })
  public name: string;

  @ApiProperty({
    description: 'User`s password',
    example: '12345'
  })
  public password: string;
}
