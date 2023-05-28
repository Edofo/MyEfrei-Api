import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { BadRequestException } from '@nestjs/common';

import { User } from '@prisma/client';

import { RegisterInput } from '@/graphql';

import { AuthService } from '../services/auth.service';
import { Public } from '@/decorators/public.decorator';

@Resolver('Auth')
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Mutation('register')
    @Public()
    async register(@Args('data') data: RegisterInput): Promise<User> {
        return await this.authService.register(data);
    }

    @Mutation('login')
    @Public()
    async login(@Args('email') email: string, @Args('password') password: string): Promise<{ accessToken: string }> {
        const result = await this.authService.login(email, password);

        if (!result) {
            throw new BadRequestException('Invalid credentials');
        }

        return { accessToken: result.accessToken };
    }
}
