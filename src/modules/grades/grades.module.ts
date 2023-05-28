import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/modules/database/database.module';

import { GradesService } from './services/grades.service';
import { GradesResolver } from './resolver/grades.resolver';

@Module({
    imports: [DatabaseModule],
    providers: [GradesResolver, GradesService],
})
export class GradesModule {}
