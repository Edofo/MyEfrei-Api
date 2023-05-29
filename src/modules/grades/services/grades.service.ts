import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/modules/database/services/prisma.service";

@Injectable()
export class GradesService {
    constructor(private readonly prisma: PrismaService) {}

    async findAllByStudentUuid(studentUuid: string) {
        try {
            const modules: any = await this.prisma.module.findMany({
                where: {
                    subjects: {
                        some: {
                            grades: {
                                some: {
                                    studentUuid,
                                },
                            },
                        },
                    },
                },
                select: {
                    name: true,
                    subjects: {
                        select: {
                            name: true,
                            teacher: {
                                select: {
                                    user: {
                                        select: {
                                            name: true,
                                        },
                                    },
                                },
                            },
                            grades: {
                                select: {
                                    value: true,
                                    coef: true,
                                },
                            },
                        },
                    },
                },
            });

            const tab: any = [];

            modules.forEach((module: { subjects: any[]; name: any }) => {
                let moduleMoyenne = 0;

                module.subjects.forEach(subject => {
                    let moyenne = 0;

                    let numberOfGrades = 0;
                    subject.grades.forEach(grade => {
                        numberOfGrades += 1 * Number(grade.coef);
                        moyenne += Number(grade.value) * Number(grade.coef);
                    });

                    moyenne /= numberOfGrades;

                    subject.moyenne = moyenne;
                    moduleMoyenne += moyenne;
                });

                moduleMoyenne /= module.subjects.length;

                tab.push({
                    module: module.name,
                    moyenne: moduleMoyenne,
                    subjects: module.subjects.map(subject => {
                        let numberOfGrades = 0;
                        const moyenne = subject.grades.reduce((acc: number, grade: { coef: any; value: any }) => {
                            numberOfGrades += 1 * Number(grade.coef);
                            return acc + Number(grade.value) * Number(grade.coef);
                        }, 0);

                        return {
                            subject: subject.name,
                            teacher: subject.teacher.user.name,
                            moyenne: moyenne / numberOfGrades,
                            grades: subject.grades,
                        };
                    }),
                });
            });

            return tab;
        } catch (error) {
            throw error;
        }
    }
}
