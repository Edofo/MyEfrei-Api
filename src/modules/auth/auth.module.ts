import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { UserModule } from '@/modules/user/user.module';

import { AuthService } from './services/auth.service';

import { JwtStrategy } from './strategies/jwt.strategy';

import { AuthResolver } from './resolver/auth.resolver';
import { jwtConstants } from './constants/constant';
import { APP_GUARD } from '@nestjs/core';
import { GqlAuthGuard } from './guards/qql-auth.guard';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: jwtConstants.secret,
            // signOptions: { expiresIn: '60s' },
        }),

        UserModule,
    ],
    providers: [AuthResolver, AuthService, JwtStrategy, { provide: APP_GUARD, useClass: GqlAuthGuard }],
    exports: [AuthService],
})
export class AuthModule {}
