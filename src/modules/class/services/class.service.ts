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

            const tab: any = [];

            student?.class.students.forEach(student => {
                tab.push({
                    name: student.user.name,
                    email: student.user.email,
                });
            });

            return {
                name: student?.class.name,
                createdAt: student?.class.createdAt,
                updatedAt: student?.class.updatedAt,
                students: tab,
            };
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
                                    uuid: true,
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

            teacher?.subjects.forEach(subject => {
                subject.class.students.forEach(student => {
                    const classIndex = tab.findIndex(item => item.name === subject.class.name);

                    const studentIndex =
                        classIndex > -1 ? tab[classIndex].students.findIndex(s => s.uuid === student.user.uuid) : -1;

                    if (classIndex === -1) {
                        tab.push({
                            uuid: subject.class.uuid,
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
                    } else if (studentIndex === -1) {
                        tab[classIndex].students.push({
                            uuid: student.user.uuid,
                            name: student.user.name,
                            email: student.user.email,
                        });
                    }
                });
            });

            return tab;
        } catch (err) {
            throw err;
        }
    }
}
