import { Injectable } from "@nestjs/common";

import { PrismaService } from "@/modules/database/services/prisma.service";

@Injectable()
export class SubjectService {
    constructor(private readonly prisma: PrismaService) {}

    async findAllByTeacherUuid(teacherUuid: string) {
        try {
            const subjects = await this.prisma.subject.findMany({
                where: {
                    teacherUuid,
                },
                select: {
                    uuid: true,
                    name: true,
                    class: {
                        select: {
                            uuid: true,
                            name: true,
                        },
                    },
                    module: {
                        select: {
                            uuid: true,
                            name: true,
                        },
                    },
                },
            });

            return subjects;
        } catch (error) {
            throw error;
        }
    }
}
