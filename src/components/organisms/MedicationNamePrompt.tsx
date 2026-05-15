"use client";

import React, { useState } from "react";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import Text from "@/components/atoms/Text";
import { updateUserProfileAction } from "@/app/actions/user";

interface MedicationNamePromptProps {
  uid: string;
  onComplete: () => void;
}

export default function MedicationNamePrompt({ uid, onComplete }: MedicationNamePromptProps) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    if (!name.trim()) {
      setError("Please enter a name, or skip.");
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
      hasSkippedMedPrompt: true,
    });
    setLoading(false);
    
    if (res.success) {
      onComplete();
    } else {
      setError(res.error || "Failed to skip");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-card border border-border rounded-2xl w-full max-w-sm p-6 shadow-2xl relative">
        <div className="text-center mb-5">
          <Text variant="h3" className="text-xl font-bold mb-1">
            Want more personal reminders? ✨
          </Text>
          <Text variant="body" className="text-sm text-text-secondary">
            Your first medication is set! Tell us what to call you in your reminders.
          </Text>
        </div>

        <div className="space-y-4">
          <Input
            id="med-prompt-name"
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

          <div className="flex flex-col gap-2">
            <Button
              variant="primary"
              className="w-full"
              onClick={handleSave}
              loading={loading}
            >
              Save name
            </Button>
            <Button
              variant="ghost"
              className="w-full text-text-muted hover:text-text-primary text-sm"
              onClick={handleSkip}
              disabled={loading}
            >
              Continue without it
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
