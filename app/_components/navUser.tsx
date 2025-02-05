"use client"

import {
    BadgeCheck,
    Bell,
    ChevronRight,
    CreditCard,
    LogOut,
    Sparkles,
} from "lucide-react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/app/_components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/app/_components/ui/sidebar"
import { useEffect, useState } from "react"
import { User } from "@prisma/client"

export function NavUser({
    user,
    signOut
}: {
    user: () => Promise<User | null>,
    signOut: () => void
}) {
    const { isMobile } = useSidebar()
    const [userData, setUserData] = useState<User | null>(null)

    useEffect(() => {
        const loadUser = async () => {
            const data = await user()
            setUserData(data)
        }
        loadUser()
    }, [user])

    if (!userData) return null

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="bg-background transition-colors data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage src={userData.avatar || ""} alt={userData.name} />
                                <AvatarFallback className="rounded-lg">{userData.name?.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">{userData.name}</span>
                                <span className="truncate text-xs text-muted-foreground">{userData.email}</span>
                            </div>
                            <ChevronRight className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage src={userData.avatar || ""} alt={userData.name} />
                                    <AvatarFallback className="rounded-lg">{userData.name?.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">{userData.name}</span>
                                    <span className="truncate text-xs text-muted-foreground">{userData.email}</span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <Sparkles />
                                Torne-se Pro
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <BadgeCheck />
                                Minha conta
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <CreditCard />
                                Pagamentos
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Bell />
                                Notificações
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={signOut} className="text-destructive">
                            <LogOut />
                            Sair
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
