import React from "react";
import Link from "next/link";
import Text from "@/components/atoms/Text";
import Button from "@/components/atoms/Button";

export default function LandingNavbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bg/80 backdrop-blur-md border-b border-border">
      <div className="max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Brand & Logo Placeholder */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-white font-bold shadow-lg shadow-accent/20 group-hover:scale-105 transition-transform">
            {/* Replace this 'M' with an <img /> or <svg /> logo in the future */}
            M
          </div>
          <Text variant="h2" className="font-bold text-xl tracking-tight hidden sm:block">
            MedyPing
          </Text>
        </Link>

        {/* Auth Links */}
        <div className="flex items-center gap-4">
          <Link href="/auth" className="hidden sm:block text-text-muted hover:text-text-primary transition-colors font-medium">
            Sign In
          </Link>
          <Link href="/auth/signup">
            <Button variant="primary" className="px-6 py-2">
              Get Started
            </Button>
          </Link>
        </div>

      </div>
    </nav>
  );
}
