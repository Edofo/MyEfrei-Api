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
                                                    uuid: true,
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

            const tab: any = [];
            /**
             * [{
             * name: "1A",
             * createdAt: "2021-04-12T14:00:00.000Z",
             * updatedAt: "2021-04-12T14:00:00.000Z",
             * students: [{
             * uuid: "41558ca2-9484-4f2a-8c95-f5f4e4d2a458",
             * name: "Jane Doe",
             * email: "student@a.a",
             * }]
             */

            // push class if not already in tab (to avoid duplicate) and push student in class
            teacher?.subjects.forEach(subject => {
                subject.class.students.forEach(student => {
                    const index = tab.findIndex(item => item.name === subject.class.name);

                    if (index === -1) {
                        tab.push({
                            name: subject.class.name,
                            createdAt: subject.class.createdAt,
                            updatedAt: subject.class.updatedAt,
                            students: [
                                {
                                    uuid: student.user.uuid,
                                    name: student.user.name,
                                    email: student.user.email,
                                },
                            ],
                        });
                    } else {
                        tab[index].students.push({
                            uuid: student.user.uuid,
                            name: student.user.name,
                            email: student.user.email,
                        });
                    }
                });
            });

            return tab;
        } catch (err) {
            throw new err();
        }
    }
}
