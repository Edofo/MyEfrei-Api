
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class RegisterInput {
    name: string;
    email: string;
    password: string;
}

export class CreateGradeInput {
    exampleField?: Nullable<number>;
}

export class UpdateGradeInput {
    id: number;
}

export class CreateStudentInput {
    id: number;
}

export class UpdateStudentInput {
    id: number;
}

export class User {
    uuid: string;
    name: string;
    email: string;
    password: string;
    createdAt: DateTime;
    updatedAt: DateTime;
}

export class AccessToken {
    accessToken: string;
}

export abstract class IMutation {
    abstract register(data: RegisterInput): User | Promise<User>;

    abstract login(email: string, password: string): AccessToken | Promise<AccessToken>;

    abstract createClass(name: string): Class | Promise<Class>;

    abstract updateClass(id: string, name: string): Class | Promise<Class>;

    abstract deleteClass(id: string): Class | Promise<Class>;

    abstract createGrade(createGradeInput: CreateGradeInput): Grade | Promise<Grade>;

    abstract updateGrade(updateGradeInput: UpdateGradeInput): Grade | Promise<Grade>;

    abstract removeGrade(id: number): Nullable<Grade> | Promise<Nullable<Grade>>;

    abstract createStudent(createStudentInput: CreateStudentInput): Student | Promise<Student>;

    abstract updateStudent(updateStudentInput: UpdateStudentInput): Student | Promise<Student>;

    abstract removeStudent(id: number): Nullable<Student> | Promise<Nullable<Student>>;
}

export class Class {
    uuid: string;
    name: string;
    createdAt: DateTime;
    updatedAt: DateTime;
}

export abstract class IQuery {
    abstract classes(): Class[] | Promise<Class[]>;

    abstract class(id: string): Nullable<Class> | Promise<Nullable<Class>>;

    abstract grades(): Nullable<Grade>[] | Promise<Nullable<Grade>[]>;

    abstract grade(id: number): Nullable<Grade> | Promise<Nullable<Grade>>;

    abstract students(): Nullable<Student>[] | Promise<Nullable<Student>[]>;

    abstract student(id: number): Nullable<Student> | Promise<Nullable<Student>>;

    abstract user(uuid: string): Nullable<User> | Promise<Nullable<User>>;
}

export class Grade {
    id?: Nullable<number>;
}

export class Student {
    id?: Nullable<number>;
    name?: Nullable<string>;
    email?: Nullable<string>;
}

export type DateTime = any;
type Nullable<T> = T | null;
