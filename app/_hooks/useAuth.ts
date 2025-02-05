"use client";

import { useEffect, useState } from "react";
import { auth } from "@/app/_lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

interface AuthState {
    user: User | null;
    loading: boolean;
}

export function useAuth(): AuthState {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    return { user, loading };
}