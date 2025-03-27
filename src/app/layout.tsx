"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/provider/AuthProvider";
import { UserProvider } from "@/provider/UserProvider";
import { FoodProvider } from "@/provider/FoodProvider";
import { CategoryProvider } from "@/provider/CategoryProvider";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <AuthProvider>
          <UserProvider>
            <CategoryProvider>
              <FoodProvider>{children}</FoodProvider>
            </CategoryProvider>
          </UserProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
