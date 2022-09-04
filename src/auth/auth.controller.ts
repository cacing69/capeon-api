import { Request } from 'express';
import { baseResponse, baseResponseRead } from './../utils/helpers';
import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/utils/decorators/public.decorator';
import { ConfigService } from '@nestjs/config';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerAuthDto: RegisterAuthDto) {
    const message = 'register success';
    return baseResponse(await this.authService.register(registerAuthDto), {
      message,
    });
  }

  @Public()
  @Post('login')
  async login(@Body() loginAuthDto: LoginAuthDto, @Req() request: Request) {
    const message = 'auth success';

    const getToken = await this.authService.getToken(loginAuthDto);
    const exp = await this.configService.get('JWT_EXPIRATION_TIME');

    const cookie = `Authentication=${getToken}; HttpOnly; Path=/; Max-Age=${exp}`;

    const response = baseResponse(
      { accessToken: getToken, refreshToken: null },
      { message },
    );

    request.res.setHeader('Set-Cookie', cookie).send(response);
  }

  @Public()
  @Post('logout')
  async logout(@Req() request: Request) {
    const message = 'logout success';

    request.res.setHeader(
      'Set-Cookie',
      `Authentication=; HttpOnly; Path=/; Max-Age=0`,
    );
    return baseResponse(null, { message });
  }

  @Get('check')
  async check(@Req() request) {
    return baseResponseRead(request?.user);
  }
}
