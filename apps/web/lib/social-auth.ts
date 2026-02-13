"use client"
import { authClient } from "@/lib/auth-client";

export async function socialsignIn(platform : string) {
  await authClient.signIn.social({
    provider: platform,
    callbackURL : "/dashboard"
  });
}
