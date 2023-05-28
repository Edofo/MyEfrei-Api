import { ConflictException, Injectable } from '@nestjs/common';

import { PrismaService } from '@/modules/database/services/prisma.service';

import { CreateUserDto } from '../dto/create-user.dto';

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

    async createUser(data: CreateUserDto) {
        // check if user already exists
        const user = await this.findByEmail(data.email);

        if (user) {
            throw new ConflictException('User already exists');
        }

        return await this.prisma.user.create({
            data,
        });
    }
}
