"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function getCurrentUser() {
    const cookieStore = await cookies();
    const token = cookieStore.get("authToken")?.value;

    if (!token) return null;

    try {
        const decoded = jwt.decode(token) as { user_id: string } | null;
        return decoded?.user_id || null; // Retorna o UID do usuário autenticado
    } catch (error) {
        console.error("Erro ao decodificar token:", error);
        return null;
    }
}
