import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';

import { AuthService } from '../services/auth.service';
import { jwtConstants } from '../constants/constant';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payload: any): Promise<any> {
        const user = await this.authService.validateUser(payload.email, null);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
