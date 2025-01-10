import type { Metadata } from "next";
import { Josefin_Sans, Manrope } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "./_components/ui/sidebar";
import { MenuSidebar } from "./_components/menu_sidebar";

const josefinSans = Josefin_Sans({
  variable: "--font-josefin-sans",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stratify",
  description: "Gerenciamento financeiro pessoal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${josefinSans.variable} ${manrope.variable} antialiased bg-background`}
      >
        <SidebarProvider className="font-[family-name:var(--font-josefin-sans)]">
          <MenuSidebar />
          <SidebarTrigger />
          {children}
        </SidebarProvider>
      </body>
    </html>
  );
}
