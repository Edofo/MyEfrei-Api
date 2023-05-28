import { Module } from '@nestjs/common';
import { StudentService } from './services/student.service';
import { StudentResolver } from './resolver/student.resolver';

@Module({
    providers: [StudentResolver, StudentService],
})
export class StudentModule {}
