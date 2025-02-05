import { auth, googleProvider } from "../_lib/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { getFirebaseErrorMessage } from "../_utils/firebaseErrors";
import { User } from "firebase/auth";
import { signOut } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { toast } from "@/app/_hooks/use-toast";
import Cookies from "js-cookie";

const isFirebaseError = (error: unknown): error is FirebaseError => {
    return error instanceof FirebaseError;
};

const handleAuthError = (error: unknown, defaultMessage: string) => {
    const errorMessage = isFirebaseError(error)
        ? getFirebaseErrorMessage(error.code)
        : defaultMessage;

    toast({
        variant: "destructive",
        title: "Erro",
        description: errorMessage,
    });

    throw new Error(errorMessage);
};

export const createAccountWithEmailAndPassword = async (email: string, password: string): Promise<User> => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error: unknown) {
        return handleAuthError(error, "Erro desconhecido ao fazer cadastro.");
    }
};

export const loginWithEmail = async (email: string, password: string): Promise<User> => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const token = await user.getIdToken();
        Cookies.set("authToken", token, { expires: 7, secure: true });

        return user;
    } catch (error: unknown) {
        return handleAuthError(error, "Erro desconhecido ao fazer login.");
    }
};

export const loginWithGoogle = async (): Promise<User> => {
    try {
        const userCredential = await signInWithPopup(auth, googleProvider);
        const user = userCredential.user;

        const token = await user.getIdToken();
        Cookies.set("authToken", token, { expires: 7, secure: true });

        return user;
    } catch (error: unknown) {
        return handleAuthError(error, "Erro desconhecido ao fazer login.");
    }
};

export const logout = async (): Promise<void> => {
    try {
        await signOut(auth);
        Cookies.remove("authToken");
    } catch (error: unknown) {
        if (isFirebaseError(error)) {
            throw new Error(getFirebaseErrorMessage(error.code));
        }
        throw new Error("Erro desconhecido ao fazer logout.");
    }
};