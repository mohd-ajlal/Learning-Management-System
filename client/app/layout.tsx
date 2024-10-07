import type { Metadata } from "next";
import "./globals.css";
import {Poppins} from "next/font/google";
import {Josefin_Sans} from "next/font/google";
import { ThemeProvider } from "./utils/theme-provider";

const poppins = Poppins({
  subsets:["latin"],
  weight:["400","500","600","700"],
  variable:"--font-Poppins",
})

const josefin = Josefin_Sans({
  subsets:["latin"],
  weight:["400","500","600","700"],
  variable:"--font-Josefin",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
     <body className={`${poppins.variable} ${josefin.variable} bg-gradient-to-b from-white to-[#a1c341] dark:bg-gradient-to-b dark:from-[#a1c341] dark:to-green-900 duration-300 min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}      
        </ThemeProvider>  
      </body>
    </html>
  );
}