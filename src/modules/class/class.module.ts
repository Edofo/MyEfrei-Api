import { Module } from "@nestjs/common";

import { DatabaseModule } from "@/modules/database/database.module";

import { ClassService } from "./services/class.service";
import { ClassResolver } from "./resolver/class.resolver";

@Module({
    imports: [DatabaseModule],
    providers: [ClassResolver, ClassService],
})
export class ClassModule {}
