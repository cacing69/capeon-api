import { IsUniqueConstraint } from './core/decorators/is-unique.decorator';
import { IsExistConstraint } from './core/decorators/is-exist.decorator';
import { DatabaseModule } from './core/database.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { ExamplesModule } from './examples/examples.module';
import { CoreModule } from './core/core.module';
import JwtAuthenticationGuard from './core/guards/jwt-authentication.guard';
import Joi = require('@hapi/joi');

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
    CoreModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthenticationGuard,
    },
    IsExistConstraint,
    IsUniqueConstraint,
  ],
})
export class AppModule {}
