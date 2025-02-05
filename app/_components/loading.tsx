"use client"

import Image from "next/image"

export function Loading() {
    return (
        <div className="flex flex-col items-center justify-center w-full h-screen gap-8 bg-background">
            <div className="flex items-center justify-center gap-2">
                <Image src="/logo.svg" alt="Logo" width={50} height={50} />
                <h1 className="text-2xl font-[family-name:var(--font-josefin-sans)] font-thin text-white">STRATIFY</h1>
            </div>
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-t-2 border-white rounded-full animate-spin" />
                <span className="text-sm font-[family-name:var(--font-josefin-sans)]">Carregando...</span>
            </div>
        </div>
    )
}
