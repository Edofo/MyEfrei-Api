import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";

import { User } from "@prisma/client";

import { GradesService } from "../services/grades.service";

import { CurrentUser } from "@/decorators/user.decorator";

@Resolver("Grade")
export class GradesResolver {
    constructor(private readonly gradesService: GradesService) {}

    @Query("gradesForStudent")
    async findAllByStudentUuid(@CurrentUser() user: User) {
        const grades = await this.gradesService.findAllByStudentUuid(user.uuid);
        return grades || [];
    }
}
