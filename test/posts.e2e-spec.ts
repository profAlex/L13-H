import {INestApplication} from "@nestjs/common";
import {Test, TestingModule} from "@nestjs/testing";
import {AppModule} from "../src/app.module";
import {appSetup} from "../src/setup/app.setup";
import request from "supertest";

describe('PostsController (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        appSetup(app); // не забываем подключить глобальные префиксы, пайпы
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    // Очищаем базу перед каждым тестом через специальный контроллер
    beforeEach(async () => {
        await request(app.getHttpServer()).delete('/testing/all-data');
    });

});