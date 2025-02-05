'use server';

import { Prisma } from "@prisma/client";
import { db } from "../_lib/prisma";

export const getUser = async (id: string) => {
    return db.user.findUnique({
        where: { id }
    });
}

export const createUser = async (data: Prisma.UserCreateInput) => {
    return db.user.create({ data: data });
}

export const createOrGetUser = async (data: Prisma.UserCreateInput) => {
    if (!data.id) {
        throw new Error('User ID is required');
    }
    const existingUser = await getUser(data.id);
    if (existingUser) {
        return existingUser;
    }
    return createUser(data);
}