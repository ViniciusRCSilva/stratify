import type { Metadata } from "next";
import { Josefin_Sans, Manrope } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/app/_components/ui/toaster";

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
        {children}
        <Toaster />
      </body>
    </html>
  );
}
