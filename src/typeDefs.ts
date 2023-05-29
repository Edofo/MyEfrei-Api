const typeDefs = `
scalar DateTime
scalar Decimal

enum UserRole {
    STUDENT
    TEACHER
}

type User {
    uuid: String!
    name: String!
    email: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    student: [Student!]!
    teacher: [Teacher!]!
}

type Student {
    uuid: String!
    userUuid: String!
    user: User
    grades: [Grade!]
    class: Class
}

type Teacher {
    uuid: String!
    userUuid: String!
    user: User!
    grades: [Grade!]
    subjects: [Subject!]
}

type Class {
    uuid: String!
    name: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    students: [Student!]
    subjects: [Subject!]
}

type Module {
    uuid: String!
    name: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    subjects: [Subject!]
}

type Subject {
    uuid: String!
    name: String!
    classUuid: String!
    class: Class!
    teacherUuid: String
    teacher: Teacher
    moduleUuid: String
    module: Module
    createdAt: DateTime!
    updatedAt: DateTime!
    grades: [Grade!]!
}

type Grade {
    uuid: String!
    value: Decimal!
    coef: Decimal!
    studentUuid: String!
    student: Student!
    teacherUuid: String!
    teacher: Teacher!
    subjectUuid: String!
    subject: Subject!
    createdAt: DateTime!
    updatedAt: DateTime!
}
`;

export default typeDefs;
