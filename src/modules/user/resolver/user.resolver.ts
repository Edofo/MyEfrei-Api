import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { User } from '@prisma/client';

import { UserService } from '../services/user.service';

@Resolver('User')
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Query('user')
    async getUser(@Args('id') id: string): Promise<User | null> {
        return this.userService.findById(id);
    }
}
