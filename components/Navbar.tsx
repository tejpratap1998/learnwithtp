"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl text-primary flex items-center gap-2">
          <span className="bg-primary text-primary-foreground px-2 py-1 rounded">TP</span>
          LearnWithTP
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/courses" className="text-muted-foreground hover:text-foreground transition-colors">Courses</Link>
          <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">About</Link>
          <Link href="/services" className="text-muted-foreground hover:text-foreground transition-colors">Services</Link>
          <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
          
          {status === "loading" ? (
            <div className="h-9 w-20 bg-muted animate-pulse rounded-md"></div>
          ) : session ? (
            <>
              <Link href="/dashboard" className="text-primary font-medium hover:underline">Dashboard</Link>
              <button onClick={() => signOut()} className="bg-muted text-foreground px-4 py-2 rounded-md font-medium hover:bg-muted/80 transition-colors">
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-primary font-medium hover:underline">Login</Link>
              <Link href="/signup" className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors">
                Sign Up
              </Link>
            </>
          )}
          
          <ThemeToggle />
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-foreground" onClick={toggleMenu}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-background px-4 py-4 space-y-4 shadow-lg absolute w-full">
          <Link href="/courses" className="block text-foreground hover:text-primary" onClick={toggleMenu}>Courses</Link>
          <Link href="/about" className="block text-foreground hover:text-primary" onClick={toggleMenu}>About</Link>
          <Link href="/services" className="block text-foreground hover:text-primary" onClick={toggleMenu}>Services</Link>
          <Link href="/contact" className="block text-foreground hover:text-primary" onClick={toggleMenu}>Contact</Link>
          <div className="pt-4 border-t border-border flex flex-col gap-2">
            {session ? (
              <>
                <Link href="/dashboard" className="block text-center bg-primary text-primary-foreground px-4 py-2 rounded-md" onClick={toggleMenu}>Dashboard</Link>
                <button onClick={() => { signOut(); toggleMenu(); }} className="block w-full text-center border border-border px-4 py-2 rounded-md">Sign Out</button>
              </>
            ) : (
              <>
                <Link href="/login" className="block text-center border border-border px-4 py-2 rounded-md" onClick={toggleMenu}>Login</Link>
                <Link href="/signup" className="block text-center bg-primary text-primary-foreground px-4 py-2 rounded-md" onClick={toggleMenu}>Sign Up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
