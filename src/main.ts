/* eslint-disable prettier/prettier */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
    transform: true,
  }),
  );

  const config = new DocumentBuilder()
  .setTitle('Documentação com Swagger - Fórum')
  .setDescription('Fórum destinado a biblioteca de jogos')
  .setVersion('1.0')
  .addTag('Tópicos')
  .addTag('Respostas')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(7100);
}
bootstrap();
