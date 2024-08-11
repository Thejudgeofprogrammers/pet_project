import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './schemas/book.schema';
import { HttpModule } from '@nestjs/axios';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [MongooseModule.forFeature([
        { name: Book.name, schema: BookSchema },
    ]),
    HttpModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ],
    controllers: [BooksController],
    providers: [BooksService],
})
export class BooksModule {};
