import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/modules/database/services/prisma.service';

import { CreateGradeInput } from '../dto/create-grade.input';
import { UpdateGradeInput } from '../dto/update-grade.input';

@Injectable()
export class GradesService {
    constructor(private readonly prisma: PrismaService) {}

    create(createGradeInput: CreateGradeInput) {
        return 'This action adds a new grade';
    }

    async findAll() {
        try {
            const grades = await this.prisma.grade.findMany();

            console.log('grades', grades);

            return grades;
        } catch (error) {
            throw error;
        }
    }

    findOne(id: number) {
        return `This action returns a #${id} grade`;
    }

    update(id: number, updateGradeInput: UpdateGradeInput) {
        return `This action updates a #${id} grade`;
    }

    remove(id: number) {
        return `This action removes a #${id} grade`;
    }
}
