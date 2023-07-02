import { Module } from "@nestjs/common";

import { SubjectService } from "./services/subject.service";
import { SubjectResolver } from "./resolver/subject.resolver";

import { DatabaseModule } from "../database/database.module";

@Module({
    imports: [DatabaseModule],
    providers: [SubjectService, SubjectResolver],
    exports: [SubjectService],
})
export class SubjectModule {}
