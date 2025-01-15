import { Bell } from "lucide-react"
import { Button } from "./ui/button"
import { SidebarTrigger } from "./ui/sidebar"

interface HeaderProps {
    title: string;
}

export function Header({ title }: HeaderProps) {
    return (
        <div className="sticky top-0 pt-10 pb-4 flex items-center justify-between gap-2 bg-background/50 backdrop-blur z-50">
            <div className="flex items-center gap-1">
                <SidebarTrigger />
                <h1 className="text-2xl md:text-3xl font-thin">{title}</h1>
            </div>
            <Button className="flex items-center" variant="outline" size="icon">
                <Bell />
            </Button>
        </div>
    );
}