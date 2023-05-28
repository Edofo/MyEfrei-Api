import { Module } from '@nestjs/common';

import { UserService } from './services/user.service';
import { UserResolver } from './resolver/user.resolver';

import { DatabaseModule } from '../database/database.module';

@Module({
    imports: [DatabaseModule],
    providers: [UserService, UserResolver],
    exports: [UserService],
})
export class UserModule {}
