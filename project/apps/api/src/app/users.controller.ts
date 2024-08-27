import 'multer';
import { HttpService } from '@nestjs/axios';
import { Body, Controller, Get, HttpStatus, Post, Req, UploadedFile, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';

import { AuthenticationResponseMessage, CreateUserDto, LoggedUserRdo, LoginUserDto, UserRdo } from '@users/authentication';
import { ApplicationServiceURL } from './app.config';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { FileInterceptor } from '@nestjs/platform-express';
import { InjectUserIdInterceptor } from '@project/interceptors';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
@UseFilters(AxiosExceptionFilter)
export class UsersController {
  constructor(
    private readonly httpService: HttpService
  ) {}

  @ApiOperation({
    summary: 'Register user',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: AuthenticationResponseMessage.UserCreated,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: AuthenticationResponseMessage.UserExist,
  })
  @Post('register')
  @UseInterceptors(FileInterceptor('file'))
  public async register(@Body() dto: CreateUserDto, @UploadedFile() file?: Express.Multer.File) {
    let avatar = '';
    if(file) {
      const formData = new FormData();
      formData.append('file', new Blob([file.buffer], {type: file.mimetype}), file.originalname);
      const { data: fileData } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Files}/upload`, formData);
      avatar = `${fileData.subDirectory}/${fileData.hashName}`;
    }
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/register`, {...dto, avatar});
    return data;
  }

  @ApiOperation({
    summary: 'Login user',
  })
  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: AuthenticationResponseMessage.LoggedSuccess,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AuthenticationResponseMessage.LoggedError,
  })
  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/login`, loginUserDto);
    return data;
  }

  @ApiOperation({
    summary: 'Refresh tokens',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AuthenticationResponseMessage.RefreshToken
  })
  @Post('refreshTokens')
  public async refreshToken(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/refresh`, null, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }

  @ApiOperation({
    summary: 'Get logged user info',
  })
  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: AuthenticationResponseMessage.UserFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: AuthenticationResponseMessage.UserNotFound,
  })
  @Get('/')
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  public async show(@Body() body) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}/${body.authorId}`);
    return data;
  }
}
