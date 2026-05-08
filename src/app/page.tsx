import React from "react";
import LandingNavbar from "@/components/organisms/landing/LandingNavbar";
import LandingHero from "@/components/organisms/landing/LandingHero";
import LandingProblemSolution from "@/components/organisms/landing/LandingProblemSolution";
import LandingFeatures from "@/components/organisms/landing/LandingFeatures";
import LandingCTA from "@/components/organisms/landing/LandingCTA";
import LandingFooter from "@/components/organisms/landing/LandingFooter";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg flex flex-col">
      {/* 
        We use flex-grow to ensure the footer is pushed to the bottom 
        even if the content is short (though it won't be here).
      */}
      <LandingNavbar />
      <div className="flex-grow">
        <LandingHero />
        <LandingProblemSolution />
        <LandingFeatures />
        <LandingCTA />
      </div>
      <LandingFooter />
    </main>
  );
}
