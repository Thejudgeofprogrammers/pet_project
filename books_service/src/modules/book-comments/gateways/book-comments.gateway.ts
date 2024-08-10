import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { BookCommentsService } from '../book-comments.service';
import { Server } from 'socket.io';
import IBookCommentDTO from '../interface/book-comment.dto';

@WebSocketGateway()
export class BookCommentsGateway {
    @WebSocketServer()
    server: Server;

    constructor(private readonly bookCommentsService: BookCommentsService) {};

    @SubscribeMessage('getAllComments')
    async handleGetAllComments(@MessageBody() data: { bookId: string, token: string} ): Promise<IBookCommentDTO[]> {
        const { bookId, token } = data;
        const comments = await this.bookCommentsService.findAllComments(bookId, token);
        return comments;
    };

    @SubscribeMessage('addComment')
    async handleAddComment(@MessageBody() data: { bookId: string, comment: string, token: string }): Promise<IBookCommentDTO> {
        const { bookId, comment, token } = data;
        const newComment = await this.bookCommentsService.createComment(bookId, comment, token);
        this.server.emit('commentAdded', newComment);
        return newComment;
    };
};
