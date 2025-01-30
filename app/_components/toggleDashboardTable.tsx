"use client"

import { useState } from "react";
import { Button } from "./ui/button"
import { Separator } from "./ui/separator"

interface toggleDashboardTableProps {
    dashboard: React.ReactNode;
    table: React.ReactNode;
}

export const ToggleDashboardTable = ({ dashboard, table }: toggleDashboardTableProps) => {
    const [activeDashboard, setActiveDashboard] = useState(true)

    const toggleDashboard = () => setActiveDashboard(!activeDashboard)

    return (
        <>
            <div className="flex items-center gap-2">
                <Button
                    variant="link"
                    onClick={() => toggleDashboard()}
                    className={`${!activeDashboard && "opacity-50"} hover:opacity-100 transition-opacity duration-300 ease-in-out hover:no-underline`}
                >
                    Visão geral
                </Button>
                <Separator orientation="vertical" />
                <Button
                    variant="link"
                    onClick={() => toggleDashboard()}
                    className={`${activeDashboard && "opacity-50"} hover:opacity-100 transition-opacity duration-300 ease-in-out hover:no-underline`}
                >
                    Tabela
                </Button>
            </div>
            {activeDashboard ? dashboard : table}
        </>
    )
}