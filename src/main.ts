import { PostStatusInterceptor } from './utils/interceptors/post-status.interceptor';
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ErrorFilter } from './utils/filters/error.filter';
import cookieParser = require('cookie-parser');
import { CustomValidationPipe } from './utils/pipes/custom-validation.pipe';
// import { TrimPipe } from './utils/pipes/trim.pipe';

// const cookieParser = require('cookie-parser');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('CapeOn API')
    .setDescription('Lorem ipsum dolor sits amet')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.useGlobalPipes(new CustomValidationPipe());
  app.useGlobalPipes(
    new ValidationPipe({ skipMissingProperties: true, whitelist: true }),
  );

  app.useGlobalInterceptors(new PostStatusInterceptor());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.use(cookieParser());

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new ErrorFilter(httpAdapter));
  await app.listen(3000);
}
bootstrap();
