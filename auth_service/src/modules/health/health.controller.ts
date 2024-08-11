import { Controller, Get } from '@nestjs/common';

@Controller('api/users/health')
export class HealthController {
    @Get()
    checkHealth() {
        return { status: 'ok', server_name: 'auth_service' };
    };
};
