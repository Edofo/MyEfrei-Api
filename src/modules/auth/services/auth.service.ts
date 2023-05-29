import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { User, Student, Teacher } from '@prisma/client';

import { UserService } from '@/modules/user/services/user.service';

import { RegisterInput } from '@/graphql';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

    async validateUser(email: string, password: string): Promise<User | null> {
        const user = await this.userService.findByEmail(email);

        if (user && bcrypt.compareSync(password, user.password)) {
            return user;
        }
        return null;
    }

    async validateUserPayload(payload: any): Promise<User | null> {
        const user = await this.userService.findByEmail(payload.email);

        if (user) {
            return user;
        }

        return null;
    }

    async login(email: string, password: string): Promise<{ accessToken: string } | null> {
        const user = await this.validateUser(email, password);

        if (!user) {
            return null;
        }

        const payload = { email: user.email, sub: user.uuid };

        return {
            accessToken: this.jwtService.sign(payload),
        };
    }

    async register(data: RegisterInput): Promise<Student | Teacher> {
        if (!data.password) {
            throw new Error('Password is required');
        }

        const hashPassword = bcrypt.hashSync(data.password, 10);

        return await this.userService.createUser({
            name: data.name,
            email: data.email,
            password: hashPassword,
        });
    }
}
