import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';

import { UserModule } from '@/modules/user/user.module';

import { AuthService } from './services/auth.service';

import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

import { AuthResolver } from './resolver/auth.resolver';
import { jwtConstants } from './constants/constant';
import { GqlAuthGuard } from './guards/qql-auth.guard';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60s' },
        }),

        UserModule,
    ],
    providers: [
        AuthResolver,
        AuthService,
        {
            provide: APP_GUARD,
            useClass: GqlAuthGuard,
        },
        LocalStrategy,
        JwtStrategy,
    ],
    exports: [AuthService],
})
export class AuthModule {}
