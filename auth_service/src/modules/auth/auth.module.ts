import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { HttpModule } from '@nestjs/axios';

@Module({
    controllers: [AuthController],
    providers: [ AuthService ],
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: process.env.SECRET,
            signOptions: { expiresIn: process.env.EXPIRE_JWT },
        }),
        UsersModule, HttpModule
    ],
    exports: [PassportModule, JwtModule]
})
export class AuthModule {};
