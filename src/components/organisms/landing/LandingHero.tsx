"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

import Button from "@/components/atoms/Button";
import Text from "@/components/atoms/Text";
import { useAuth } from "@/components/providers/AuthProvider";

export default function LandingHero() {
  const imageRef = useRef(null);
  const { user, loading } = useAuth();

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start 0.8", "start 0.2"],
  });

  // Scroll animation (lying down → upright)
  const rotateX = useTransform(scrollYProgress, [0, 1], [25, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.6, 1]);

  return (
    <section className="relative pt-28 pb-16 md:pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center">
        {/* Heading */}
        <Text
          variant="h1"
          className="text-5xl lg:text-7xl font-bold mb-6 tracking-tight animate-slide-up opacity-0"
        >
          <span className="text-gradient block md:inline mb-2 md:mb-0">
            MedyPing:
          </span>{" "}
          Never miss a dose <span className="text-accent">again.</span>
        </Text>

        {/* Subtext */}
        <Text
          variant="body"
          className="text-xl lg:text-2xl text-text-muted max-w-2xl mx-auto mb-10"
        >
          MedyPing helps you stay consistent with your medication through smart,
          timely reminders designed for real life.
        </Text>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {!loading && (
            user ? (
              <Link href="/dashboard">
                <Button
                  variant="primary"
                  className="text-lg px-8 py-4 w-full sm:w-auto hover:scale-105 transition-transform duration-300 shadow-lg shadow-accent/20"
                >
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <Link href="/auth/signup">
                <Button
                  variant="primary"
                  className="text-lg px-8 py-4 w-full sm:w-auto hover:scale-105 transition-transform duration-300 shadow-lg shadow-accent/20"
                >
                  Get Started
                </Button>
              </Link>
            )
          )}
        </div>

        {/* HERO IMAGE SECTION */}
        <div
          ref={imageRef}
          className="mt-16 md:mt-20 relative mx-auto "
          style={{ perspective: 1200 }}
        >
          {/* Glow */}
          <div className="absolute inset-x-8 inset-y-8 bg-accent/12 rounded-full blur-[80px] pointer-events-none " />

          {/* Desktop Mockup */}
          <motion.div
            style={{
              rotateX,
              scale,
              opacity,
              transformPerspective: 1200,
            }}
            className="hidden md:block"
          >
            <Image
              src="/images/hero-desktop-v14.png"
              alt="MedyPing Dashboard on Desktop"
              width={1200}
              height={800}
              className="relative w-full h-auto object-contain drop-shadow-2xl rounded-2xl"
              priority
            />
          </motion.div>

          {/* Mobile Mockup - No animation */}
          <div className="md:hidden">
            <Image
              src="/images/hero-mobile-v3.png"
              alt="MedyPing Dashboard on Mobile"
              width={600}
              height={1200}
              className="relative w-full max-w-[320px] mx-auto h-auto object-contain drop-shadow-2xl"
              priority
              quality={85}
            />
          </div>
        </div>
      </div>

      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/8 rounded-full blur-[100px] -z-10 pointer-events-none" />
    </section>
  );
}
