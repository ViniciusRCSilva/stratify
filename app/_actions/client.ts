import { Prisma } from "@prisma/client";
import { db } from "../_lib/prisma";

export const createClient = async (data: Prisma.ClientCreateInput) => {
    return db.client.create({ data: data });
}

export const getClientById = async (id: string) => {
    return db.client.findUnique({ where: { id } });
}