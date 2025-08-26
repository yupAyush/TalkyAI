import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider,SignedIn } from "@clerk/nextjs";
import navbar from "@/components/navbar";
import Navbar from "@/components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Talky",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <ClerkProvider>
      <html lang="en">
        <body className="bg-gray-950 bg-[url('/pattern.png')] bg-cover bg-center">
          <Navbar/>
         

        
        {children}</body>
      </html>
    </ClerkProvider>

  );
}
