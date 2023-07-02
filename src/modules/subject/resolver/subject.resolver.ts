import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";

import { User } from "@prisma/client";

import { SubjectService } from "../services/subject.service";

import { CurrentUser } from "@/decorators/user.decorator";

@Resolver("Subject")
export class SubjectResolver {
    constructor(private readonly subjectService: SubjectService) {}

    @Query("subjectsForTeacher")
    async findAllByTeacherUuid(@CurrentUser() user: User) {
        const subjects = await this.subjectService.findAllByTeacherUuid(user.uuid);
        return subjects || [];
    }
}
