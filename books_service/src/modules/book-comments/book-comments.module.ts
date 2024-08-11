import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookCommentSchema, BookComment } from './schemas/book-comment.schema';
import { BookCommentsService } from './book-comments.service';
import { BookCommentsController } from './book-comments.controller';
import { BookCommentsGateway } from './gateways/book-comments.gateway';
import { HttpModule } from '@nestjs/axios';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [
        MongooseModule.forFeature([ { name: BookComment.name, schema: BookCommentSchema } ]),
        HttpModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
    ],
    providers: [BookCommentsService, BookCommentsGateway],
    controllers: [BookCommentsController]
})
export class BookCommentsModule {};
