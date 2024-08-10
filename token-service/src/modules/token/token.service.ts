import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
    constructor(private readonly jwtService: JwtService) {}

    async generateJwtToken(user: any): Promise<string> {
        const payload = { user };
        return this.jwtService.sign(payload);
    };

    async validateJwtToken(token: string): Promise<boolean> {
        try {
            const payload = this.jwtService.verify(token);
            return !!payload;
        } catch (error) {
            return false;
        };
    };
};
