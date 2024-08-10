import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from "@nestjs/axios"
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
    private readonly authServiceUrl = 'http://auth-service/api/auth';

    constructor(private readonly httpService: HttpService) {}

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
        }
    }

    async getUserInfo(userId: string): Promise<any> {
        try {
            const response = await lastValueFrom(
                this.httpService.get(`${this.authServiceUrl}/users/${userId}`)
            );
            return response.data;
        } catch (err) {
            console.error('Ошибка получения информации о пользователе:', err.message);
            throw new HttpException('Failed to fetch user information', HttpStatus.BAD_REQUEST);
        }
    }
}