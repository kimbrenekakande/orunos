"use client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/platejs/dialog"

import { Button } from "@/components/ui/button"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/platejs/input"
import { Label } from "@/components/ui/label"
import { redirect } from "next/navigation"

export function Dialog4Payment() {
  async function mobileMoneyPayment() {
    const rq = await fetch("http://localhost:3000/api/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: 1500,
        currency: "UGX",
        paymentMethod: "mobile_money",
      }),
    })
    const results = await rq.json()
    console.log(results)
    if (results.authUrl) redirect(results.authUrl)
  }
  
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Open Dialog</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Recharge Your Wallet</DialogTitle>
            <DialogDescription>
              Reacharge your wallet here. Click pay when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
            </Field>
            <Field>
              <Label htmlFor="username-1">Phone Number</Label>
              <Input id="phoneNumber-1" name="phoneNumber" defaultValue="0705664501" />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={() => mobileMoneyPayment()}>Proceed</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
