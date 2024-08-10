import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, Headers } from '@nestjs/common';
import { BookCommentsService } from './book-comments.service';
import { Response } from 'express';

@Controller('api/books/comments')
export class BookCommentsController {
    constructor(private readonly bookCommentsService: BookCommentsService) {};

    @Post()
    async createComment(
        @Headers('Authorization') authHeader: string,
        @Body('bookId') bookId: string, 
        @Body('comment') comment: string, 
        @Res() res: Response
    ): Promise<void> {
        try {
            const token = authHeader.split(' ')[1];
            const data = await this.bookCommentsService.createComment(bookId, comment, token);
            res.status(HttpStatus.CREATED).json({ message: 'Комментарий успешно создан', data });
        } catch (err) {
            res.status(HttpStatus.BAD_REQUEST).json({ message: err.message });
            console.error('Комментарий не создан', err);
        };
    };

    @Get(':bookId')
    async findAllComments(
        @Headers('Authorization') authHeader: string,
        @Param('bookId') bookId: string, 
        @Res() res: Response
    ): Promise<void> {
        try {
            const token = authHeader.split(' ')[1];
            const dataArray = await this.bookCommentsService.findAllComments(bookId, token);
            res.status(HttpStatus.OK).json(dataArray);
        } catch (err) {
            res.status(HttpStatus.BAD_REQUEST).json({ message: err.message });
            console.error('Комментарии не найдены', err);
        };
    };

    @Put(':id')
    async updateComment(
        @Headers('Authorization') authHeader: string,
        @Param('id') id: string, 
        @Body('comment') comment: string, 
        @Res() res: Response
    ): Promise<void> {
        try {
            const token = authHeader.split(' ')[1];
            await this.bookCommentsService.updateComment(id, { comment }, token);
            res.status(HttpStatus.OK).json({ message: 'Комментарий успешно обновлён' });
        } catch (err) {
            res.status(HttpStatus.BAD_REQUEST).json({ message: err.message });
            console.error('Комментарий не обновлён', err);
        };
    };

    @Delete(':id')
    async deleteComment(
        @Headers('Authorization') authHeader: string,
        @Param('id') id: string, 
        @Res() res: Response
    ): Promise<void> {
        try {
            const token = authHeader.split(' ')[1];
            await this.bookCommentsService.deleteComment(id, token);
            res.status(HttpStatus.OK).json({ message: 'Комментарий успешно удалён' });
        } catch (err) {
            res.status(HttpStatus.BAD_REQUEST).json({ message: err.message });
            console.error('Комментарий не удалён', err);
        };
    };
};
