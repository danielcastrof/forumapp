/* eslint-disable prettier/prettier */
import { Answers } from "@prisma/client";
import { Category } from "./category.enum";

export class Topics {
    id?: string;
    gameId: string;
    userId: string;
    theme: string;
    question: string;
    category: Category;
    createdAt?: Date;
    updatedAt?: Date;
    answers?: Answers[];
    token?: string;
}
