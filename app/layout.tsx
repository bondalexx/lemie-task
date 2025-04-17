import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/NavBar";
import {HeroUIProvider} from "@heroui/react";

import { Roboto_Mono } from 'next/font/google';
import { MemeProvider } from "@/lib/MemeContext";

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'], 
  variable: '--font-roboto-mono',
});

export const metadata: Metadata = {
  title: "Meme Page",
  description: "This is a page where you can add and edit memes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <HeroUIProvider>
    <html lang="en">
      <body className="bg-gray-100 min-h-screen">
      <MemeProvider>
        <Navbar />
        <main className={`p-4 ${robotoMono.className}`}>{children}</main>
        </MemeProvider>
      </body>
    </html>
    </HeroUIProvider>
  );
}
