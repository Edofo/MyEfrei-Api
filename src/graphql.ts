
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum UserRole {
    STUDENT = "STUDENT",
    TEACHER = "TEACHER"
}

export class RegisterInput {
    name: string;
    email: string;
    userRole?: Nullable<UserRole>;
    password: string;
}

export class RegisterResponse {
    uuid: string;
    user: User;
}

export class AccessToken {
    accessToken: string;
}

export abstract class IMutation {
    abstract register(data: RegisterInput): RegisterResponse | Promise<RegisterResponse>;

    abstract login(email: string, password: string): AccessToken | Promise<AccessToken>;
}

export abstract class IQuery {
    abstract classes(): Class[] | Promise<Class[]>;

    abstract class(uuid: string): Nullable<Class> | Promise<Nullable<Class>>;

    abstract gradesForStudent(): Nullable<Grade>[] | Promise<Nullable<Grade>[]>;

    abstract userInfos(): Nullable<User> | Promise<Nullable<User>>;
}

export class User {
    uuid: string;
    name: string;
    email: string;
    createdAt: DateTime;
    updatedAt: DateTime;
    student: Student[];
    teacher: Teacher[];
}

export class Student {
    uuid: string;
    userUuid: string;
    user?: Nullable<User>;
    grades?: Nullable<Grade[]>;
    class?: Nullable<Class>;
}

export class Teacher {
    uuid: string;
    userUuid: string;
    user: User;
    grades?: Nullable<Grade[]>;
    subjects?: Nullable<Subject[]>;
}

export class Class {
    uuid: string;
    name: string;
    createdAt: DateTime;
    updatedAt: DateTime;
    students?: Nullable<Student[]>;
    subjects?: Nullable<Subject[]>;
}

export class Module {
    uuid: string;
    name: string;
    createdAt: DateTime;
    updatedAt: DateTime;
    subjects?: Nullable<Subject[]>;
}

export class Subject {
    uuid: string;
    name: string;
    classUuid: string;
    class: Class;
    teacherUuid?: Nullable<string>;
    teacher?: Nullable<Teacher>;
    moduleUuid?: Nullable<string>;
    module?: Nullable<Module>;
    createdAt: DateTime;
    updatedAt: DateTime;
    grades: Grade[];
}

export class Grade {
    uuid: string;
    value: Decimal;
    coef: Decimal;
    studentUuid: string;
    student: Student;
    teacherUuid: string;
    teacher: Teacher;
    subjectUuid: string;
    subject: Subject;
    createdAt: DateTime;
    updatedAt: DateTime;
}

export type DateTime = any;
export type Decimal = any;
type Nullable<T> = T | null;
