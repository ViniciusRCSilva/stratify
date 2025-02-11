"use client"

import { Button } from "@/app/_components/ui/button";
import { Separator } from "@/app/_components/ui/separator";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/app/_components/ui/form"
import { Input } from "@/app/_components/ui/input"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { loginWithEmail, loginWithGoogle } from "@/app/_services/authService";
import { createOrGetUser, getUser } from "@/app/_actions/user";
import { toast } from "@/app/_hooks/use-toast";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
    email: z.string().email({
        message: "Por favor, insira um email válido.",
    }),
    password: z.string(),
})

export const LoginForm = () => {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const { isSubmitting } = form.formState;

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const user = await loginWithEmail(values.email, values.password);
            if (user) {
                const currentUser = await getUser(user.uid);
                toast({
                    description: `Bem-vindo, ${currentUser?.name}`,
                    duration: 5000,
                })
                router.push("/");
            }
        } catch (error) {
            console.error("Login failed:", error);
            form.setError("root", {
                message: "Falha ao realizar o login. Verifique suas credenciais."
            });
        }
    }

    const handleGoogleLogin = async () => {
        try {
            const user = await loginWithGoogle();
            if (user) {
                await createOrGetUser({
                    id: user.uid,
                    name: user.displayName || "",
                    email: user.email || "",
                    avatar: user.photoURL || "",
                });
                const currentUser = await getUser(user.uid);
                toast({
                    description: `Bem-vindo, ${currentUser?.name}`,
                    duration: 5000,
                })
                router.push("/");
            }
        } catch (error) {
            console.error("Google login failed:", error);
            form.setError("root", {
                message: "Falha ao realizar o login com Google. Tente novamente."
            });
        }
    };

    return (
        <div className="w-full max-w-md space-y-8">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="email@exemplo.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Senha</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="********" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting}
                    >
                        {isSubmitting && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Entrar
                    </Button>
                </form>
            </Form>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <Separator />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Ou continue com
                    </span>
                </div>
            </div>

            <Button
                variant="outline"
                className="w-full"
                onClick={handleGoogleLogin}
            >
                <Image
                    src="/google.svg"
                    width={20}
                    height={20}
                    alt="Google"
                    className="mr-2"
                />
                Google
            </Button>
        </div>
    )
}