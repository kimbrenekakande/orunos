"use client"
import { useSession } from "next-auth/react"

export const { data: session, status } = useSession()
