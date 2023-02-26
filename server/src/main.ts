import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        origin: '*',
        methods: 'GET,POST,PUT',
        allowedHeaders: 'Content-Type, Accept, Access-Control-Allow-Headers, Authorization, Access-Control-Allow-Origin',
        credentials: true
    });
    await app.listen(3333);
}

bootstrap();
