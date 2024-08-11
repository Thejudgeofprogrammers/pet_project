import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { BookComment, BookCommentDocument } from './schemas/book-comment.schema';
import IBookCommentDTO from './interface/book-comment.dto';
import { WsException } from '@nestjs/websockets';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class BookCommentsService {
    constructor(
        @InjectModel(BookComment.name) private readonly bookCommentModel: Model<BookCommentDocument>,
        private readonly httpService: HttpService,
    ) {};

    private readonly authServiceUrl = 'http://auth_service/api/auth';

    async validateUser(token: string): Promise<any> {
        try {
            const response = await lastValueFrom(
                this.httpService.get(`${this.authServiceUrl}/validate`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
            );
            return response.data;
        } catch (err) {
            console.error('Ошибка проверки токена:', err.message);
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        };
    };

    async createComment(bookId: string, comment: string, token: string): Promise<IBookCommentDTO> {
        try {
            await this.validateUser(token);
            const newComment = await this.bookCommentModel.create({ bookId: new Types.ObjectId(bookId), comment });
            return await newComment.save();
        } catch (err) {
            console.error('Комментарий не создан', err);
            throw new WsException('Ошибка создания комментария');
        };
    };

    async findAllComments(bookId: string, token: string): Promise<IBookCommentDTO[]> {
        try {
            await this.validateUser(token);
            const comments = await this.bookCommentModel.find({ bookId: new Types.ObjectId(bookId) }).select('-__v').exec();
            return Promise.all(comments);
        } catch (err) {
            console.error('Комментарии не найдены', err);
            throw new WsException('Ошибка поиска комментариев');
        };
    };

    async updateComment(id: string, updateData: Partial<{ comment: string}>, token: string): Promise<IBookCommentDTO> {
        try {
            await this.validateUser(token);
            if (!updateData) {
                throw new WsException('Комментарий не найден');
            };
            return await this.bookCommentModel.findByIdAndUpdate(new Types.ObjectId(id), updateData, { new: true }).select('-__v').exec();
        } catch (err) {
            console.error('Комментарий не обновлён', err);
            throw new WsException('Ошибка обновления комментария');
        };
    };

    async deleteComment(id: string, token: string): Promise<IBookCommentDTO> {
        try {
            await this.validateUser(token);
            const deletedComment = await this.bookCommentModel.findByIdAndDelete(new Types.ObjectId(id)).select('-__v').exec();
            if (!deletedComment) {
                throw new WsException('Комментарий не найден');
            };
            return deletedComment;
        } catch (err) {
            console.error('Комментарий не удалён', err);
            throw new WsException('Ошибка удаления комментария');
        };
    };
};
