import React from "react";
import Link from "next/link";
import Button from "@/components/atoms/Button";
import Text from "@/components/atoms/Text";

export default function LandingCTA() {
  return (
    <section className="py-24 bg-bg border-t border-border">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Vision Content */}
          <div>
            <Text variant="h2" className="text-3xl lg:text-4xl font-bold tracking-tight mb-6">
              Built for real-life medication routines
            </Text>
            <Text variant="body" className="text-lg text-text-muted mb-8">
              MedyPing is currently in early development. We are building a system that focuses purely on consistency—not complexity. 
              Designed for all age groups, it works beautifully whether you have a simple daily vitamin or a complex multi-drug schedule.
            </Text>
            
            <div className="p-6 bg-surface border border-border rounded-xl">
              <Text variant="h3" className="text-xl font-semibold mb-2">
                Interested in partnerships?
              </Text>
              <Text variant="body" className="text-text-muted mb-4">
                We are exploring collaborations with pharmacies, healthcare providers, and health-tech marketers to shape the future of medication adherence.
              </Text>
              <a href="mailto:contact@medyping.com" className="text-accent hover:underline font-medium inline-flex items-center gap-2">
                Get in touch
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </a>
            </div>
          </div>

          {/* CTA Box */}
          <div className="bg-accent text-white p-10 lg:p-14 rounded-3xl text-center shadow-xl shadow-accent/15">
            <Text variant="h2" className="text-3xl lg:text-4xl font-bold mb-4 text-white">
              We're just getting started
            </Text>
            <Text variant="body" className="text-lg text-white/90 mb-10 max-w-md mx-auto">
              Join early and help shape the product. Be among the first to experience distraction-free medication tracking.
            </Text>
            
            <Link href="/auth/signup">
              <button className="bg-white text-accent font-bold text-lg px-8 py-4 rounded-full w-full hover:scale-105 transition-transform duration-300 shadow-lg">
                Get Started Now
              </button>
            </Link>
            
            <p className="mt-6 text-white/80 text-sm">
              No credit card required. Start for free.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
