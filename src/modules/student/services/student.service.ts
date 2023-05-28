import { Injectable } from '@nestjs/common';
import { CreateStudentInput } from '../dto/create-student.input';
import { UpdateStudentInput } from '../dto/update-student.input';

@Injectable()
export class StudentService {
    create(createStudentInput: CreateStudentInput) {
        return 'This action adds a new student';
    }

    findAll() {
        // Replace the string with the actual logic to retrieve and return all students
        return [
            /* Array of student objects */
        ];
    }

    findOne(id: number) {
        return `This action returns a #${id} student`;
    }

    update(id: number, updateStudentInput: UpdateStudentInput) {
        return `This action updates a #${id} student`;
    }

    remove(id: number) {
        return `This action removes a #${id} student`;
    }
}
