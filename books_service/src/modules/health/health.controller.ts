import { Controller, Get } from '@nestjs/common';

@Controller('api/books/health')
export class HealthController {
    @Get()
    checkHealth() {
        return { status: 'ok', server_name: 'books_service' };
    };
};
