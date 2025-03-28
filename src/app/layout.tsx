"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/provider/AuthProvider";
import { UserProvider } from "@/provider/UserProvider";
import { FoodProvider } from "@/provider/FoodProvider";
import { CategoryProvider } from "@/provider/CategoryProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

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
            <QueryClientProvider client={queryClient}>
              <CategoryProvider>
                <FoodProvider>{children}</FoodProvider>
              </CategoryProvider>
            </QueryClientProvider>
          </UserProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
