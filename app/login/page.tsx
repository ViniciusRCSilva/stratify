"use client"

import Image from "next/image";
import { Separator } from "../_components/ui/separator";
import { LoginForm } from "./_components/loginForm";
import { Button } from "../_components/ui/button";
import { useState } from "react";
import { RegisterForm } from "./_components/registerForm";

export default function Login() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-4 font-[family-name:var(--font-josefin-sans)] bg-dot-pattern bg-dot-lg before:absolute before:inset-0 before:w-[50vw] before:h-[50vh] before:bg-gradient-radial before:from-blue-500/20 before:via-transparent before:to-transparent before:animate-float before:opacity-50 before:-z-10">
            <div className="flex flex-col items-center lg:items-start justify-center gap-4 px-10 py-10">
                <div className="flex items-center gap-2">
                    <Image src="/logo.svg" alt="Logo" width={80} height={80} />
                    <h1 className="text-4xl font-light">STRATIFY</h1>
                </div>
                <Separator />
                <div className="space-y-2">
                    <h2 className="text-2xl font-semibold text-center lg:text-left">Estratégia e organização para impulsionar o seu negócio.</h2>
                    <p className="hidden lg:block text-lg font-light">Com o Stratify, você pode gerenciar o desempenho do seu negócio de forma eficiente e intuitiva. Acompanhe suas vendas e lucros, monitore as principais métricas e organize suas operações em um só lugar. Simplifique a gestão e tome decisões estratégicas com base em dados claros e acessíveis.</p>
                    <h3 className="hidden lg:block text-xl font-medium">Stratify: o futuro da gestão do seu negócio.</h3>
                </div>
            </div>

            <div className="flex items-center justify-center gap-4 px-10 py-10 bg-background">
                <div className="flex flex-col w-full lg:w-[400px] items-center lg:items-start gap-4">
                    {isLogin ? (
                        <>
                            <LoginForm />
                            <div className="flex items-center justify-center w-full">
                                <p className="text-sm font-light">Ainda não tem uma conta?</p>
                                <Button variant="link" onClick={() => setIsLogin(false)}>Cadastre-se</Button>
                            </div>
                        </>
                    ) : (
                        <>
                            <RegisterForm />
                            <div className="flex items-center justify-center w-full">
                                <p className="text-sm font-light">Já tenho conta!</p>
                                <Button variant="link" onClick={() => setIsLogin(true)}>Voltar</Button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};