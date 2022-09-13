import { PostStatusInterceptor } from './core/interceptors/post-status.interceptor';
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ErrorFilter } from '@/src/core/filters/error.filter';
import { CustomValidationPipe } from './core/pipes/custom-validation.pipe';
import cookieParser = require('cookie-parser');
import { useContainer } from 'class-validator';

import moduleAlias from 'module-alias';
import path = require('path');
import { dirname } from 'path';

moduleAlias.addAliases({
  '@/': path.resolve(dirname('')),
});

console.log(dirname(''), __dirname);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const config = new DocumentBuilder()
    .setTitle('CapeOn API')
    .setDescription('Lorem ipsum dolor sits amet')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.useGlobalPipes(new CustomValidationPipe());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      enableDebugMessages: true,
      forbidNonWhitelisted: true,
      transform: true,
      forbidUnknownValues: false,
      validationError: { target: true },
      skipMissingProperties: true,
      skipNullProperties: true,
      skipUndefinedProperties: true,
      stopAtFirstError: true,
    }),
  );

  app.useGlobalInterceptors(new PostStatusInterceptor());
  // app.useGlobalInterceptors(new ExcludeNullInterceptor());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.use(cookieParser());

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new ErrorFilter(httpAdapter));

  app.enableCors();
  await app.listen(3000);
}
bootstrap();
