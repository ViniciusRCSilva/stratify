import { Building2, CreditCard, Grid2X2, Home, MessagesSquare, ReceiptText, Settings, ShoppingBasket } from "lucide-react"
import Image from "next/image"

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

import { NavUser } from "./nav-user"

const data = {
    user: {
        name: "John Doe",
        email: "johndoe@example.com",
        avatar: "https://github.com/shadcn.png",
    },
    navMain: [
        { title: "Visão Geral", url: "#", icon: Home },
        { title: "Inventário", url: "#", icon: Building2 },
    ],
    navSecondary: [
        { title: "Produtos", url: "#", icon: Grid2X2 },
        { title: "Pedidos de Compra", url: "#", icon: ShoppingBasket },
        { title: "Faturas", url: "#", icon: ReceiptText },
        { title: "Preços", url: "#", icon: CreditCard },
    ],
    navThird: [
        { title: "Configurações", url: "#", icon: Settings },
        { title: "Ajuda e Suporte", url: "#", icon: MessagesSquare },
    ],
}

export function MenuSidebar() {
    return (
        <Sidebar className="border-r border-white/20">
            <SidebarContent>
                <div className="flex items-center justify-center gap-2 p-4">
                    <Image src="/logo.svg" alt="Logo" width={50} height={50} />
                    <h1 className="text-2xl font-[family-name:var(--font-josefin-sans)] font-thin text-white">STRATIFY</h1>
                </div>
                <SidebarGroup>
                    <SidebarGroupLabel className="text-white/60 font-[family-name:var(--font-josefin-sans)]">MENU</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {data.navMain.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url} className="hover:bg-accent/20 hover:text-white text-white font-[family-name:var(--font-josefin-sans)]">
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                            <SidebarSeparator className="bg-white/20" />
                            {data.navSecondary.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url} className="hover:bg-accent/20 hover:text-white text-white font-[family-name:var(--font-josefin-sans)]">
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
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
                                    <SidebarMenuButton asChild>
                                        <a href={item.url} className="hover:bg-accent/20 hover:text-white text-white font-[family-name:var(--font-josefin-sans)]">
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
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