import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        origin: 'https://stockexchange-6a9t.onrender.com/',
        methods: 'GET,POST,PUT',
        allowedHeaders: 'Content-Type, Accept, Access-Control-Allow-Headers, Authorization',
        credentials: true
    });
    await app.listen(3333);
}

bootstrap();
