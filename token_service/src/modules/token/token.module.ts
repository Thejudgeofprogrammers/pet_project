import { Module } from "@nestjs/common";
import { TokenService } from "./token.service";
import { TokenController } from './token.controller';
import { JwtStrategy } from "src/strategy";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('secret_jwt'),
                signOptions: {
                    expiresIn: '1h',
                },
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [ TokenService, JwtStrategy ],
    exports: [ TokenService ],
    controllers: [ TokenController ]
})
export class TokenModule {};
