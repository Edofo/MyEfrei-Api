import { Injectable } from "@nestjs/common";

import { PrismaService } from "@/modules/database/services/prisma.service";

@Injectable()
export class ClassService {
    constructor(private readonly prisma: PrismaService) {}

    async findClassByStudentUuid(uuid: string) {
        try {
            const student = await this.prisma.student.findUnique({
                where: {
                    uuid,
                },
                select: {
                    class: {
                        select: {
                            name: true,
                            createdAt: true,
                            updatedAt: true,
                            students: {
                                select: {
                                    user: {
                                        select: {
                                            name: true,
                                            email: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            });

            return student?.class;
        } catch (err) {
            throw new err();
        }
    }

    async findClassesByTeacherUuid(uuid: string) {
        try {
            const teacher = await this.prisma.teacher.findUnique({
                where: {
                    uuid,
                },
                select: {
                    subjects: {
                        select: {
                            class: {
                                select: {
                                    name: true,
                                    createdAt: true,
                                    updatedAt: true,
                                    students: {
                                        select: {
                                            user: {
                                                select: {
                                                    name: true,
                                                    email: true,
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            });

            const classes = teacher?.subjects?.map(subject => subject?.class);
            return classes;
        } catch (err) {
            throw new err();
        }
    }
}
