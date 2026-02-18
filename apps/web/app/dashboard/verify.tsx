"use client"

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

export function VerifyEmailButton(email:any) {
  return (
    <Button onClick={() => authClient.sendVerificationEmail(email)} className="cursor-pointer">Verify</Button>
  )
}
