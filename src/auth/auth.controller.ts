import {
  setResponse,
  ResponseType,
  baseResponse,
} from './../utils/helpers/response-helper';
import { ChangePasswordAuthDto } from './dto/change-password-auth.dto';
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
// import { Public } from '../../src/utils/decorators/public.decorator';
import { Public } from 'src/utils/decorators/public.decorator';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { Auth } from '@src/utils/decorators/auth.decorator';
// import { Auth } from 'src/utils/decorators/auth.decorator';
// import { Auth } from '../../src/utils/decorators/auth.decorator';
// import * as authDecorator from './../../src/utils/decorators/auth.decorator';

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

  @Post('refresh')
  async refresh(@Req() request: Request) {
    const message = 'refresh success';

    const refreshToken = await this.authService.refreshToken(
      (request as any)?.user,
    );
    const exp = await this.configService.get('JWT_EXPIRATION_TIME');

    const cookie = `Authentication=${refreshToken}; HttpOnly; Path=/; Max-Age=${exp}`;

    const response = baseResponse(
      { accessToken: refreshToken, refreshToken: null },
      { message },
    );

    request.res.setHeader('Set-Cookie', cookie).send(response);
  }

  @Public()
  @Post('logout')
  async logout(@Req() request: Request) {
    const message = 'logout success';

    request.res
      .setHeader('Set-Cookie', `Authentication=; HttpOnly; Path=/; Max-Age=0`)
      .send(baseResponse(null, { message }));
  }

  @Get('profile')
  async profile(@Auth() auth) {
    return setResponse(ResponseType.Read, auth);
  }

  @Post('change-password')
  async changePassword(
    @Auth() user,
    @Body() changePasswordAuthDto: ChangePasswordAuthDto,
  ) {
    await this.authService.changePassword(user, changePasswordAuthDto);
    return setResponse(ResponseType.Update, null, {
      message: 'success update password',
    });
  }
}
