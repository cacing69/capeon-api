import { IsUniqueConstraint } from './utils/decorators/is-unique.decorator';
import { IsExistConstraint } from './utils/decorators/is-exist.decorator';
import { DatabaseService } from 'src/database/database.service';
import { DatabaseModule } from './database/database.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import Joi = require('@hapi/joi');
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ExamplesModule } from './examples/examples.module';
import JwtAuthenticationGuard from './utils/guards/jwt-authentication.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
        DATABASE_USER: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.number().required(),
        HASHIDS_SALT: Joi.string().required(),
        HASHIDS_PADDING: Joi.number().required(),
      }),
      envFilePath: ['.env'],
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    ExamplesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthenticationGuard,
    },
    // AppService,
    // {
    // provide: APP_INTERCEPTOR,
    // useClass: JwtAuthenticationGuard,
    // },
    IsExistConstraint,
    IsUniqueConstraint,
  ],
})
export class AppModule {}
