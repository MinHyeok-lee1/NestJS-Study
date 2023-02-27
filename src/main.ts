import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { MonsterModule } from './monster/monster.module';
import { UserModule } from './user/user.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // decorator(@)가 없는 속성이 들어오면 해당 속성은 제거하고 받아들입니다.
      forbidNonWhitelisted: false, // true로 설정하면 화이트리스트에 없는 속성을 제거하는 대신 유효성 검사기가 예외를 발생시킵니다.
      transform: true, // 클라이언트에서 값을 받자마자 타입을 정의한대로 자동 형변환을 합니다.
      disableErrorMessages: true, // 자세한 에메지 출력 활성화
    }),
  );

  // Swagger 문서툴 설정
  const swaggerConfig = new DocumentBuilder()
    .setTitle('API server')
    .setDescription("The API server's API description")
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  const options = new DocumentBuilder()
    .setTitle('Users example')
    .setDescription('The users API description')
    .setVersion('1.0')
    .build();
  const userDocument = SwaggerModule.createDocument(app, options, {
    include: [UserModule],
  });

  SwaggerModule.setup('api/users', app, userDocument);

  const secondOptions = new DocumentBuilder()
    .setTitle('Monsters example')
    .setDescription('The monsters API description')
    .setVersion('1.0')
    .build();

  const monstersDocument = SwaggerModule.createDocument(app, secondOptions, {
    ignoreGlobalPrefix: true,
    include: [MonsterModule],
  });
  SwaggerModule.setup('api/monsters', app, monstersDocument);

  // 서버 실행
  await app.listen(3000);
}
bootstrap();
