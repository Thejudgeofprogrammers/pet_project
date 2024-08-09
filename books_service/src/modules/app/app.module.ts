import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configurations from '../../configurations';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { loggerMiddleware } from 'src/middlewares/logger.middleware';
import { BookCommentsModule } from '../book-comments/book-comments.module';
import { BooksModule } from '../books/books.module';
import { HealthModule } from '../health/health.module';

@Module({
    imports: [
        ConfigModule.forRoot({
        isGlobal: true,
        load: [configurations]
    }),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION),
    BookCommentsModule, BooksModule, HealthModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(loggerMiddleware)
            .forRoutes('*')
    };
}
