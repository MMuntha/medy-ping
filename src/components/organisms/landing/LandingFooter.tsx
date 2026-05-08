import React from "react";
import Link from "next/link";
import Text from "@/components/atoms/Text";

export default function LandingFooter() {
  return (
    <footer className="bg-surface border-t border-border py-12">
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-white font-bold">
            M
          </div>
          <Text variant="h3" className="font-bold text-xl">
            MedyPing
          </Text>
        </div>

        <div className="flex items-center gap-8 text-sm text-text-muted">
          <a href="mailto:contact@medyping.com" className="hover:text-accent transition-colors">
            Contact Support
          </a>
          <Link href="/auth" className="hover:text-accent transition-colors">
            Sign In
          </Link>
        </div>

        <Text variant="caption" className="text-text-muted">
          © {new Date().getFullYear()} MedyPing. All rights reserved.
        </Text>

      </div>
    </footer>
  );
}
