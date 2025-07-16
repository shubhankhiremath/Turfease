"use client";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const { user, logout, loading } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 min-h-[72px]">
          {/* Logo and Main Links */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/placeholder-logo.png" alt="TURFEASE Logo" width={56} height={56} className="rounded-lg" />
              <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">TURFEASE</span>
            </Link>
            <div className="hidden md:flex items-center gap-6 ml-8">
              <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors font-medium">Home</Link>
              <Link href="/turfs" className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors font-medium">Browse Turfs</Link>
              <Link href="/bookings" className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors font-medium">My Bookings</Link>
            </div>
          </div>

          {/* Mobile Hamburger */}
          <div className="flex md:hidden items-center">
            <button
              className="text-gray-700 dark:text-gray-300 focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            {!loading && !user && (
              <>
                <Link href="/login"><Button variant="outline">Login</Button></Link>
                <Link href="/signup"><Button className="bg-gradient-to-r from-green-500 to-blue-500 text-white">Sign Up</Button></Link>
              </>
            )}
            {!loading && user && (
              <div className="relative group">
                <Avatar className="cursor-pointer">
                  <AvatarFallback>{user.username?.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 group-hover:opacity-100 transition-opacity z-50">
                  <div className="px-4 py-2 text-gray-700 dark:text-gray-200 font-medium border-b border-gray-100 dark:border-gray-700">{user.username}</div>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-b-lg"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden flex flex-col gap-2 mt-2 pb-4 border-b border-gray-200 dark:border-gray-700">
            <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors font-medium" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link href="/turfs" className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors font-medium" onClick={() => setMenuOpen(false)}>Browse Turfs</Link>
            <Link href="/bookings" className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors font-medium" onClick={() => setMenuOpen(false)}>My Bookings</Link>
            <div className="flex items-center gap-2 mt-2">
              <ThemeToggle />
              {!loading && !user && (
                <>
                  <Link href="/login"><Button variant="outline" className="w-full">Login</Button></Link>
                  <Link href="/signup"><Button className="bg-gradient-to-r from-green-500 to-blue-500 text-white w-full">Sign Up</Button></Link>
                </>
              )}
              {!loading && user && (
                <>
                  <Avatar className="cursor-pointer">
                    <AvatarFallback>{user.username?.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <Button onClick={logout} className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white mt-2">Logout</Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 