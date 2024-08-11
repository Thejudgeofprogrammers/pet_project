import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDTO } from '../users/dto';
import { UserLoginDTO } from './dto';
import { UsersService } from '../users/users.service';
import { AuthUserResponse } from './Response';
import { AppError } from '../../common/constants/errors';
import * as bcrypt from "bcrypt";
import { HttpService } from "@nestjs/axios";
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly httpService: HttpService
    ) {};

    async validateUser(token: string): Promise<any> {
        try {
            const response = await lastValueFrom(
                this.httpService.get(`http://token_service/api/token/validate`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
            );
            return response.data;
        } catch (err) {
            throw new Error('Invalid token');
        };
    };
    
    async generateToken(user: any): Promise<string> {
        try {
            const response = await lastValueFrom(
                this.httpService.post(`http://token+service/api/token/generate`, { user })
            );
            return response.data.token;
        } catch (err) {
            throw new Error('Failed to generate token');
        };
    };

    public async signUp(dto: CreateUserDTO): Promise<CreateUserDTO> {
        try {
            const existUser = await this.userService.findUserByEmail(dto.email);
            if (existUser) throw new BadRequestException(AppError.USER_EXIST);
            return await this.userService.createUser(dto);
        } catch (err) {
            console.error(err);
            throw err;
        };
    };

    public async signIn(dto: UserLoginDTO): Promise<AuthUserResponse> {
        try {
            const existUser = await this.userService.findUserByEmail(dto.email);
            if (!existUser) throw new BadRequestException(AppError.USER_NOT_EXIST);
            const validatePassword = await bcrypt.compare(dto.password, existUser.password);
            if (!validatePassword) throw new BadRequestException(AppError.WRONG_DATA);
            const user = await this.userService.publicUser(dto.email);

            const token = await this.generateToken(user);

            return { user, token };
        } catch (err) {
            console.error(err);
            throw err;
        };
    };
};
