import type { Metadata } from "next";
import { Josefin_Sans, Manrope } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "./_components/ui/sidebar";
import { MenuSidebar } from "./_components/menuSidebar";

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
  description: "Stratify - Gestão de Estoque",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${josefinSans.variable} ${manrope.variable} antialiased bg-background`}
      >
        <SidebarProvider className="font-[family-name:var(--font-josefin-sans)]">
          <MenuSidebar />
          {children}
        </SidebarProvider>
      </body>
    </html>
  );
}
