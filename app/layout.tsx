import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/contexts/theme-context"
import { AuthProvider } from "@/contexts/auth-context";
import Navbar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TURFEASE - Book Your Perfect Turf in Kalaburgi",
  description:
    "Discover and book the best cricket and football turfs in Kalaburgi. Real-time availability, instant booking, and seamless experience.",
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider defaultTheme="system" storageKey="turfease-ui-theme">
          <AuthProvider>
            <Navbar />
          {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
