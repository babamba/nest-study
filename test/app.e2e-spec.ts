import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      // 테스팅에도 실제구동환경처럼 pipe를 적용 해줘야 transform이 작동해서 타입이 동일하게된다.
      new ValidationPipe({
        whitelist: true, // 타입에 맞지않는 정보를 req하면 진행을 중지
        forbidNonWhitelisted: true, // 타입에 맞지않는 정보를 req하면 진행을 중지
        transform: true, // 파라미터 데이터 타입을 변환시켜줌.(url로 오는 정보들은 무조건 string)
      }),
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to my Movie API');
  });

  describe('/movies', () => {
    it('GET', () => {
      return request(app.getHttpServer())
        .get('/movies')
        .expect(200)
        .expect([]);
    });

    it('POST 201', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'test movie',
          year: 2020,
          genres: ['test gen'],
        })
        .expect(201);
    });

    it('POST 400', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'test',
          year: 2000,
          genres: ['test'],
          other: 'thing',
        })
        .expect(400);
    });

    it('DELETE', () => {
      return request(app.getHttpServer())
        .delete('/movies')
        .expect(404);
    });
  });

  describe('/movies/:id', () => {
    it('GET 200', () => {
      return request(app.getHttpServer())
        .get('/movies/1')
        .expect(200);
    });

    it('GET 404', () => {
      return request(app.getHttpServer())
        .get('/movies/999')
        .expect(404);
    });

    it('PATCH', () => {
      return request(app.getHttpServer())
        .patch('/movies/1')
        .send({ title: 'updateTest' })
        .expect(200);
    });

    it('DELETE', () => {
      return request(app.getHttpServer())
        .delete('/movies/1')
        .expect(200);
    });
  });
});
