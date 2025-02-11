"use client";

import { usePathname, useRouter } from "next/navigation";
import { Header } from "./_components/header";
import { SidebarProvider } from "./_components/ui/sidebar";
import { MenuSidebar } from "./_components/menuSidebar";
import { useAuth } from "./_hooks/useAuth";
import { useEffect, useState } from "react";
import { Loading } from "./_components/loading";
import React from "react";

const pageTitles: { [key: string]: string } = {
    "/": "Visão Geral",
    "/inventory": "Inventário",
    "/products": "Produtos",
    "/orders": "Pedidos",
    "/invoices": "Faturas",
    "/clients": "Clientes",
};

export default function Template({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const pathname = usePathname();
    const router = useRouter();
    const title = pageTitles[pathname] || "Visão Geral";
    const [isNavigating, setIsNavigating] = useState(false);

    useEffect(() => {
        if (!loading && !user && pathname !== '/login') {
            setIsNavigating(true);
            router.push('/login');
        } else {
            setIsNavigating(false);
        }
    }, [user, pathname, router, loading]);

    if (loading || isNavigating) {
        return <Loading />;
    }

    return (
        <>
            {pathname === "/login" ? (
                <div className="flex w-full h-screen justify-center">
                    {children}
                </div>
            ) : (
                <SidebarProvider className="font-[family-name:var(--font-josefin-sans)]">
                    <MenuSidebar />
                    <div className="w-full flex flex-col gap-4 px-10 pb-10">
                        <Header title={title} />
                        {children}
                    </div>
                </SidebarProvider>
            )}
        </>
    );
}
