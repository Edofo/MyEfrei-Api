import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { BadRequestException } from '@nestjs/common';

import { RegisterInput, Student, Teacher } from '@/graphql';

import { Public } from '@/decorators/public.decorator';

import { AuthService } from '../services/auth.service';

@Resolver('Auth')
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Mutation('register')
    @Public()
    async register(@Args('data') data: RegisterInput) {
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
