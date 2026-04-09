"use client"

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

export function VerifyEmailButton({ email }: { email: string }) {
  const [loading, setLoading] = useState(false);

  const handleSendVerification = async () => {
    setLoading(true);
    try {
      const { error } = await authClient.sendVerificationEmail({
        email,
        callbackURL: "/dashboard",
      });
      if (error) {
        console.error("Failed to send verification email:", error);
      }
    } catch (err) {
      console.error("Error sending verification email:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleSendVerification} disabled={loading} className="cursor-pointer">
      {loading ? "Sending..." : "Verify"}
    </Button>
  );
}
