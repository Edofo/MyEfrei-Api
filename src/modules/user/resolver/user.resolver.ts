import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";

import { User } from "@prisma/client";

import { UserService } from "../services/user.service";
import { CurrentUser } from "@/decorators/user.decorator";

@Resolver("User")
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Query("userInfos")
    async getUserInfo(@CurrentUser() user: User) {
        return await this.userService.getUserInfo(user.uuid);
    }
}
