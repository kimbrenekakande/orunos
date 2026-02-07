"use client"

import { authClient } from "@/lib/auth-client";

export function verifyEmail(email:any) {
  authClient.sendVerificationEmail(email);
}
