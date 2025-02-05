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

import { useRouter } from "next/navigation";
import { createAccountWithEmailAndPassword } from "@/app/_services/authService";
import { createOrGetUser } from "@/app/_actions/user";
import { toast } from "@/app/_hooks/use-toast";

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Por favor, insira seu nome.",
    }),
    email: z.string().email({
        message: "Por favor, insira um email válido.",
    }),
    password: z.string().min(6, {
        message: "Senha deve ter pelo menos 6 caracteres.",
    }),
    confirmPassword: z.string().min(6, {
        message: "Senha deve ter pelo menos 6 caracteres.",
    }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não correspondem",
    path: ["confirmPassword"],
});

export const RegisterForm = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
            name: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const user = await createAccountWithEmailAndPassword(values.email, values.password);
            if (user) {
                await createOrGetUser({
                    id: user.uid,
                    name: values.name,
                    email: values.email,
                    avatar: user.photoURL || "",
                });
                toast({
                    description: `Conta criada com sucesso. Redirecionando...`,
                    duration: 5000,
                })
                router.push("/");
            }
        } catch (error) {
            console.error("Registration failed:", error);
            form.setError("root", {
                message: "Falha ao realizar o cadastro. Tente novamente."
            });
        }
    }

    return (
        <div className="w-full max-w-md space-y-8">
            <h1 className="text-4xl font-light">Bem-vindo!</h1>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome</FormLabel>
                                <FormControl>
                                    <Input placeholder="Seu nome" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
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
                                    <Input type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirmar Senha</FormLabel>
                                <FormControl>
                                    <Input type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full">Criar Conta</Button>
                </form>
            </Form>
        </div>
    )
}