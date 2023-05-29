import { ConflictException, Injectable } from '@nestjs/common';

import { PrismaService } from '@/modules/database/services/prisma.service';

import { CreateUserDto } from '../dto/create-user.dto';
import { UserRole } from '@/graphql';
import { Student, Teacher } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async findById(uuid: string) {
        return await this.prisma.user.findUnique({
            where: {
                uuid,
            },
        });
    }

    async findByEmail(email: string) {
        return await this.prisma.user.findUnique({
            where: {
                email,
            },
        });
    }

    async createUser(data: CreateUserDto): Promise<Student | Teacher> {
        // check if user already exists
        const checkUser = await this.findByEmail(data.email);

        if (checkUser) {
            throw new ConflictException('User already exists');
        }

        const user = await this.prisma.user.create({
            data,
        });

        // create student or teacher
        if (data?.role === UserRole.TEACHER) {
            return await this.prisma.teacher.create({
                data: {
                    userUuid: user.uuid,
                },
                include: {
                    user: true,
                },
            });
        }

        return await this.prisma.student.create({
            data: {
                userUuid: user.uuid,
            },
            include: {
                user: true,
            },
        });
    }
}
