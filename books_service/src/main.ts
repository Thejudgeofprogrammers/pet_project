import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        origin: ['http://127.0.0.2', 'http://localhost:3000'],
        methods: 'GET,POST,PUT,DELETE,OPTIONS,PATCH',
        allowedHeaders: 'Content-Type, Authorization',
    });
    const configService = app.get(ConfigService);
    const port = configService.get('port');
    await app.listen(port);
};
bootstrap();
