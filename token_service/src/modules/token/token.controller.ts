import { Controller, Post, Body, Get, Headers } from '@nestjs/common';
import { TokenService } from './token.service';

@Controller('api/token')
export class TokenController {
    constructor(private readonly tokenService: TokenService) {};

    @Post('generate')
    async generateToken(@Body() user: any) {
        const token = await this.tokenService.generateJwtToken(user);
        return { token };
    };

    @Get('validate')
    async validateToken(@Headers('Authorization') authHeader: string) {
        const token = authHeader.split(' ')[1];
        const isValid = await this.tokenService.validateJwtToken(token);
        return { isValid };
    };
};
