import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 타입에 맞지않는 정보를 req하면 진행을 중지
      forbidNonWhitelisted: true, // 타입에 맞지않는 정보를 req하면 진행을 중지
      transform: true, // 파라미터 데이터 타입을 변환시켜줌.(url로 오는 정보들은 무조건 string)
    }),
  );
  await app.listen(3000);
}
bootstrap();
