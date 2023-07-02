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

    @Query("gradesForTeacher")
    async findAllByTeacherUuid(@CurrentUser() user: User) {
        const grades = await this.gradesService.findAllByTeacherUuid(user.uuid);
        return grades || [];
    }

    @Mutation("updateGrade")
    async update(@Args("grade_uuid") grade_uuid: string, @Args("value") value: number, @CurrentUser() user: User) {
        console.log(grade_uuid, value, user.uuid);
        const grade = await this.gradesService.update(grade_uuid, value, user.uuid);
        return grade;
    }

    @Mutation("deleteGrade")
    async delete(@Args("grade_uuid") grade_uuid: string, @CurrentUser() user: User) {
        const grade = await this.gradesService.delete(grade_uuid, user.uuid);
        return grade;
    }

    @Mutation("createGrade")
    async create(
        @Args("value") value: number,
        @Args("coef") coef: number,
        @Args("subject_uuid") subject_uuid: string,
        @Args("student_uuid") student_uuid: string,
        @CurrentUser() user: User,
    ) {
        const grade = await this.gradesService.create(value, coef, subject_uuid, student_uuid, user.uuid);
        return grade;
    }
}
