'use client'
import { authClient } from "@/lib/auth-client"
import { redirect } from "next/navigation"
import { useState } from "react"

export default function SignUp() {
  const [email, setEmail ] = useState("")
  const [name, setName ] = useState("")
  const [password, setPassword ] = useState("")
  
  async function signUpNow(){
    const {error} = await authClient.signUp.email({ email, name, password})

    if (error) {
      console.error("Sign up error:", error.message);
      return;
    }
    console.log("User Created Successfully")
    redirect('/dashboard')

  }

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-3">
      <form action={signUpNow} className="flex flex-col gap-1">
        <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} className="border border-white text-white placeholder:email placeholder-white" />
        <input type="name" name="name" id="name" onChange={(e) => setName(e.target.value)} className="border border-white text-white placeholder:email placeholder-amber-500" />
        <input 
          type="password" 
          name="password" 
          id="password" 
          onChange={(e) => setPassword(e.target.value)} 
          className="border border-white text-white placeholder:email placeholder-amber-500" 
          minLength={8}
          required
          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
          title="Password must be at least 8 characters long and include uppercase, lowercase, number, and special character"
        />
        <button type="submit" className="cursor-pointer">Sign Up</button>
        
      </form>
    </div>
  )
}