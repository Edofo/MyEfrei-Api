import { Resolver } from '@nestjs/graphql';

import { ClassService } from '../services/class.service';

@Resolver('Class')
export class ClassResolver {
    constructor(private readonly classService: ClassService) {}
}
