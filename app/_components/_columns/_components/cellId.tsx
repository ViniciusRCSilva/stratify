"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/app/_components/ui/tooltip"

import { copyToClipboard } from "@/app/_helper/copyToClipboard"

export const CellId = ({ row }: { row: { getValue: (value: string) => string; } }) => {
    const [tooltipContent, setTooltipContent] = useState<React.ReactNode>(
        <span className="flex items-center gap-2">
            Copiar ID
        </span>
    );
    const [isOpen, setIsOpen] = useState(false);

    const handleCopy = () => {
        copyToClipboard(row.getValue("id"));
        setTooltipContent(
            <span className="flex items-center gap-2">
                ID copiado! <Check size={16} className="text-success" />
            </span>
        );
        setIsOpen(true);
        setTimeout(() => {
            setTooltipContent(
                <span className="flex items-center gap-2">
                    Copiar ID
                </span>
            );
            setIsOpen(false);
        }, 2000);
    };

    return (
        <div className="flex items-center gap-2">
            <div className="w-20 truncate">
                #{row.getValue("id")}
            </div>
            <TooltipProvider>
                <Tooltip open={isOpen} onOpenChange={setIsOpen}>
                    <TooltipTrigger onClick={handleCopy}>
                        <Copy size={16} className="text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{tooltipContent}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    )
}