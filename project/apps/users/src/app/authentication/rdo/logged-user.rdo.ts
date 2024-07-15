import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class LoggedUserRdo {
  @ApiProperty({
    description: 'User`s ID',
    example: 'f3e4178f-f35b-4e23-b8ab-31b4f501d24d'
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'User`s email',
    example: 'user.mail.local'
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'Access token',
    example: 'f3e4178f-f35b-4e23-b8ab-31b4f501d24d'
  })
  @Expose()
  public accessToken: string;
}
