import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { join } from 'path';

import { DatabaseModule } from '@/modules/database/database.module';

import { AuthModule } from '@/modules/auth/auth.module';
import { GradesModule } from '@/modules/grades/grades.module';
import { UserModule } from '@/modules/user/user.module';
import { ClassModule } from '@/modules/class/class.module';

import typeDefs from '@/typeDefs';

@Module({
    imports: [
        DatabaseModule,

        AuthModule,
        UserModule,
        GradesModule,
        ClassModule,

        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            typePaths: ['./**/*.graphql'],
            definitions: {
                path: join(process.cwd(), 'src/graphql.ts'),
                outputAs: 'class',
            },
            typeDefs: [typeDefs],
        }),
    ],
    providers: [],
})
export class AppModule {}
