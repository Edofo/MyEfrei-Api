import { Query, Resolver } from "@nestjs/graphql";

import { User } from "@prisma/client";

import { CurrentUser } from "@/decorators/user.decorator";

import { ClassService } from "../services/class.service";

@Resolver("Class")
export class ClassResolver {
    constructor(private readonly classService: ClassService) {}

    @Query("classForStudent")
    async findClassByStudent(@CurrentUser() user: User) {
        const classe = await this.classService.findClassByStudentUuid(user.uuid);
        return classe || {};
    }
}
