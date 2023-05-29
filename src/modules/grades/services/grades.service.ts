import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/modules/database/services/prisma.service';

@Injectable()
export class GradesService {
    constructor(private readonly prisma: PrismaService) {}

    async findAllByStudentUuid(studentUuid: string) {
        try {
            const grades = await this.prisma.grade.findMany({
                where: {
                    studentUuid,
                },
                select: {
                    uuid: true,
                    value: true,
                    coef: true,
                    teacher: {
                        select: {
                            user: {
                                select: {
                                    name: true,
                                },
                            },
                        },
                    },
                    subject: {
                        select: {
                            name: true,
                            module: {
                                select: {
                                    name: true,
                                },
                            },
                        },
                    },
                },
            });

            // sort grades by subject name and module name
            const tab = [];

            grades.forEach(grade => {
                if (!tab[grade.subject.name]) {
                    tab[grade.subject.name] = {};
                }

                if (!tab[grade.subject.name][grade.subject.module.name]) {
                    tab[grade.subject.name][grade.subject.module.name] = [];
                }

                tab[grade.subject.name][grade.subject.module.name].push(grade);
            });

            console.log(tab);

            return tab;
        } catch (error) {
            throw error;
        }
    }
}
