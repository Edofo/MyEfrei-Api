import { CreateStudentInput } from './create-student.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateStudentInput extends PartialType(CreateStudentInput) {
  id: number;
}
