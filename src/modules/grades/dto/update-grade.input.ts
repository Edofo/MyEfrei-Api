import { CreateGradeInput } from './create-grade.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateGradeInput extends PartialType(CreateGradeInput) {
  id: number;
}
