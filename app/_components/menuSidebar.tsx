"use client"

import { Building2, CreditCard, Grid2X2, Home, MessagesSquare, ReceiptText, Settings, ShoppingBasket } from "lucide-react"
import Image from "next/image"
import { usePathname } from "next/navigation"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
} from "@/app/_components/ui/sidebar"

import { NavUser } from "./navUser"
import Link from "next/link"

const data = {
    user: {
        name: "John Doe",
        email: "johndoe@example.com",
        avatar: "https://github.com/shadcn.png",
    },
    navMain: [
        { title: "Visão Geral", url: "/", icon: Home },
        { title: "Inventário", url: "/inventory", icon: Building2 },
    ],
    navSecondary: [
        { title: "Produtos", url: "/products", icon: Grid2X2 },
        { title: "Pedidos", url: "/orders", icon: ShoppingBasket },
        { title: "Faturas", url: "#", icon: ReceiptText },
        { title: "Preços", url: "#", icon: CreditCard },
    ],
    navThird: [
        { title: "Configurações", url: "#", icon: Settings },
        { title: "Ajuda e Suporte", url: "#", icon: MessagesSquare },
    ],
}

export function MenuSidebar() {
    const pathname = usePathname()
    return (
        <Sidebar className="border-r border-white/20" collapsible="icon">
            <SidebarContent>
                <SidebarGroup className="flex items-center justify-center gap-2 pt-10">
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <Link href="/" className="h-fit hover:bg-accent/20 text-white font-[family-name:var(--font-josefin-sans)]">
                                    <Image src="/logo.svg" alt="Logo" width={50} height={50} />
                                    <h1 className="text-2xl font-[family-name:var(--font-josefin-sans)] font-thin text-white">STRATIFY</h1>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel className="text-white/60 font-[family-name:var(--font-josefin-sans)]">MENU</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {data.navMain.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton tooltip={item.title} asChild>
                                        <Link
                                            href={item.url}
                                            className={`hover:bg-accent/20 text-white font-[family-name:var(--font-josefin-sans)] ${pathname === item.url ? 'bg-accent/20' : ''}`}
                                        >
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                            <SidebarSeparator className="bg-white/20" />
                            {data.navSecondary.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton tooltip={item.title} asChild>
                                        <Link
                                            href={item.url}
                                            className={`hover:bg-accent/20 text-white font-[family-name:var(--font-josefin-sans)] ${pathname === item.url ? 'bg-accent/20' : ''}`}
                                        >
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel className="text-white/60 font-[family-name:var(--font-josefin-sans)]">OUTROS</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {data.navThird.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton tooltip={item.title} asChild>
                                        <Link
                                            href={item.url}
                                            className={`hover:bg-accent/20 text-white font-[family-name:var(--font-josefin-sans)] ${pathname === item.url ? 'bg-accent/20' : ''}`}
                                        >
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
        </Sidebar>
    )
}