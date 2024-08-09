import { MiddlewareConsumer, Module, NestMiddleware } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configurations from '../../configurations';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { loggerMiddleware } from '../../middlewares/logger.middleware';
import { HealthModule } from '../health/health.module';
import { TokenModule } from '../token/token.module';

@Module({
    imports: [
        ConfigModule.forRoot({
        isGlobal: true,
        load: [configurations]
    }),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION),
    HealthModule, TokenModule    
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
};
