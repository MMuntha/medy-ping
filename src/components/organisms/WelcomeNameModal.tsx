"use client";

import React, { useState } from "react";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import Text from "@/components/atoms/Text";
import { updateUserProfileAction } from "@/app/actions/user";

interface WelcomeNameModalProps {
  uid: string;
  onComplete: () => void;
}

export default function WelcomeNameModal({ uid, onComplete }: WelcomeNameModalProps) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    if (!name.trim()) {
      setError("Please enter a name, or skip for now.");
      return;
    }
    setLoading(true);
    setError("");

    const res = await updateUserProfileAction(uid, {
      preferredName: name.trim(),
    });

    setLoading(false);
    if (res.success) {
      onComplete();
    } else {
      setError(res.error || "Failed to save name");
    }
  };

  const handleSkip = async () => {
    setLoading(true);
    const res = await updateUserProfileAction(uid, {
      hasSkippedWelcomePrompt: true,
    });
    setLoading(false);
    
    if (res.success) {
      onComplete();
    } else {
      setError(res.error || "Failed to skip");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-card border border-border rounded-2xl w-full max-w-md p-8 shadow-2xl relative">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
            👋
          </div>
          <Text variant="h2" className="text-2xl font-bold mb-2">
            What should we call you?
          </Text>
          <Text variant="body" className="text-text-secondary">
            So your reminders feel a little more personal.
          </Text>
        </div>

        <div className="space-y-6">
          <Input
            id="welcome-name"
            placeholder="e.g. John"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError("");
            }}
            error={error}
            disabled={loading}
            autoFocus
          />

          <div className="flex flex-col gap-3">
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={handleSave}
              loading={loading}
            >
              Continue
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="w-full text-text-muted hover:text-text-primary"
              onClick={handleSkip}
              disabled={loading}
            >
              Skip for now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
