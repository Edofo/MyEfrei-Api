import { PrismaClient } from "@prisma/client";

import * as bcrypt from "bcrypt";

import users from "./seed/user";
import teachers from "./seed/teacher";
import students from "./seed/student";
import classes from "./seed/class";
import modules from "./seed/module";
import subjects from "./seed/subject";
import grades from "./seed/grade";

const prisma = new PrismaClient();

const seed = async () => {
    try {
        await Promise.all(
            users.map(async user => {
                const hashPwd = await bcrypt.hash(user.password, 10);
                await prisma.user.create({
                    data: {
                        ...user,
                        password: hashPwd,
                    },
                });
            }),
        );
        console.log("Users seeded");

        await Promise.all(
            teachers.map(async teacher => {
                await prisma.teacher.create({
                    data: teacher,
                });
            }),
        );
        console.log("Teachers seeded");

        await Promise.all(
            students.map(async student => {
                await prisma.student.create({
                    data: student,
                });
            }),
        );
        console.log("Students seeded");

        await Promise.all(
            classes.map(async class_ => {
                await prisma.class.create({
                    data: class_,
                });
            }),
        );
        console.log("Classes seeded");

        await Promise.all(
            modules.map(async module => {
                await prisma.module.create({
                    data: module,
                });
            }),
        );
        console.log("Modules seeded");

        await Promise.all(
            subjects.map(async subject => {
                await prisma.subject.create({
                    data: subject,
                });
            }),
        );
        console.log("Subjects seeded");

        await Promise.all(
            grades.map(async grade => {
                await prisma.grade.create({
                    data: grade,
                });
            }),
        );
        console.log("Grades seeded");

        console.log("Database seeded");
    } catch (error) {
        console.log(error);
    } finally {
        await prisma.$disconnect();
    }
};

seed();
