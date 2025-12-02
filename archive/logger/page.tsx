'use client'
import { authClient } from "@/lib/auth-client"
import { useRouter} from "next/navigation"
import { useState } from "react"

export default function SignUp() {
  const router = useRouter()
  const [email, setEmail ] = useState("")
  const [password, setPassword ] = useState("")
  
  async function LongInNow(){
    const {error} = await authClient.signIn.email({ email,password})

    if (error) {;
      console.error("Log in error:", error.message);
      return;
    }
    router.push('/dashboard')
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-3">
      <form action={LongInNow} className="flex flex-col gap-1">
        <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} className="border border-white text-white placeholder:email placeholder-white" />
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
        <button type="submit" className="cursor-pointer">Sign In</button>
        
      </form>
    </div>
  )
}