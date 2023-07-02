import { Test, TestingModule } from "@nestjs/testing";
import { UserResolver } from "./subject.resolver";
import { UserService } from "../services/subject.service";

describe("UserResolver", () => {
    let resolver: UserResolver;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UserResolver, UserService],
        }).compile();

        resolver = module.get<UserResolver>(UserResolver);
    });

    it("should be defined", () => {
        expect(resolver).toBeDefined();
    });
});
