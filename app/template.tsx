"use client";

import { usePathname } from "next/navigation";
import { Header } from "./_components/header";

const pageTitles: { [key: string]: string } = {
    "/": "Visão Geral",
    "/inventory": "Inventário",
};

export default function Template({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const title = pageTitles[pathname] || "Visão Geral";

    return (
        <div className="w-full flex flex-col gap-4 px-10 pb-10">
            <Header title={title} />
            {children}
        </div>
    );
}
