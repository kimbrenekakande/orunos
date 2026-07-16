"use client"

import { use, useEffect, useState } from "react"
import { useClientSession } from "@/lib/client-session"
import { Button } from "@/components/dashboard/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/dashboard/card"
import { Badge } from "@/components/dashboard/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Coins, Download, FileText, Plus, Smartphone, TrendingUp, Wallet} from "lucide-react"
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
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/platejs/input"
import { Label } from "@/components/ui/label"
import { redirect } from "next/navigation"

export default function BillingPage({ searchParams }: { searchParams: Promise<{ resp?: string }> }) {
  const params = use(searchParams);
  const { data: sessionData } = useClientSession();
  const user = sessionData?.user;

  const [amount, setAmount] = useState(user?.balance)

  async function mobileMoneyPayment(money: number) {
    setAmount(amount + money)
    const rq = await fetch("http://localhost:3000/api/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phoneNumber: user?.phoneNumber,
        amount: money,
      }),
    })
    const results = await rq.json()
    if (results.authUrl) redirect(results.authUrl)
  }

  useEffect(() => {
    async function verifyTransaction() {
      if (params.resp) {
        const parsed = JSON.parse(decodeURIComponent(params.resp));

        console.log(`Verifying transaction`)
        console.log(parsed)
        
        const req = await fetch("http://localhost:3000/api/transactions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            paymentDetails: {
              id: parsed.data.id,
              txRef: parsed.data.txRef,
              orderRef: parsed.data.orderRef,
              flwRef: parsed.data.flwRef,
              amount: parsed.data.amount,
              chargedAmount: parsed.data.charged_amount,
              appfee: parsed.data.appfee,
              status: parsed.data.status,
              authModelUsed: parsed.data.authModelUsed,
              currency: parsed.data.currency,
              paymentType: parsed.data.paymentType,
              phoneNumber: parsed.data["customer.phone"],
              description: parsed.data.narration,
            },
          }),
        })
        const result = await req.json()
        if (result.error) throw new Error(result.error)
      }
    }
    verifyTransaction();
  }, [params.resp]);


  const billingHistory = [
    { date: "Jan 15, 2025", description: "Top-up", type: "Credit", amount: "UGX 5,000", balance: "UGX 2,450" },
    { date: "Jan 12, 2025", description: "Research Paper", type: "Debit", amount: "UGX 500", balance: "UGX -2,550" },
    { date: "Jan 10, 2025", description: "Literature Review", type: "Debit", amount: "UGX 350", balance: "UGX -2,050" },
    { date: "Jan 8, 2025", description: "Top-up", type: "Credit", amount: "UGX 3,000", balance: "UGX -1,700" },
    { date: "Jan 5, 2025", description: "Thesis Proposal", type: "Debit", amount: "UGX 750", balance: "UGX -4,700" },
    { date: "Jan 2, 2025", description: "Top-up", type: "Credit", amount: "UGX 2,000", balance: "UGX -3,950" },
  ]

  return (
    <div className="flex flex-col gap-6 p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Billing & Wallet</h1>
        <p className="text-muted-foreground">
          Manage your wallet, billing, and payment methods
        </p>
      </div>

      <div className="grid gap-6">
        {/* Wallet Balance Card */}
        <Card className="lg:col-span-2 bg-transparent rounded">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wallet className="size-5 text-muted-foreground" />
                <CardTitle>Wallet Balance</CardTitle>
              </div>
              <Badge variant="outline" className="bg-green-500/10 text-green-600">
                Active
              </Badge>
            </div>
            <CardDescription>
              Your current wallet balance and recent activity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex flex-col justify-between gap-4 rounded-lg bg-orange-500 p-6 text-white">
                <div className="flex items-start justify-between">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium opacity-80">
                      Available Balance
                    </p>
                    <p className="text-4xl font-bold tracking-tight">UGX {amount}</p>
                  </div>
                  <div className="flex size-12 items-center justify-center rounded-full bg-primary-foreground/15">
                    <Wallet className="size-6" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm opacity-80">
                    <TrendingUp className="size-4" />
                    <span>+ UGX 350.00 this month</span>
                  </div>
                  <Dialog>
                    <form>
                      <DialogTrigger asChild>
                        <Button size="sm"  className="gap-1.5 bg-black text-white hover:bg-primary-foreground/25 border-0 cursor-pointer">
                          <Plus className="size-4" />
                          Add Funds
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-sm">
                        <DialogHeader>
                          <DialogTitle>Recharge Your Wallet</DialogTitle>
                          <DialogDescription>
                            Recharge your wallet here. Click proceed when you are
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
                          <Button type="submit" onClick={() => mobileMoneyPayment(400)}>Proceed</Button>
                        </DialogFooter>
                      </DialogContent>
                    </form>
                  </Dialog>
                  <button onClick={() => setAmount(amount + 400)}>UPGRANDE</button>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Coins className="size-4" />
                    <span className="text-sm">Total Spent</span>
                  </div>
                  <p className="mt-2 text-2xl font-bold">UGX 1,230.50</p>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <TrendingUp className="size-4" />
                    <span className="text-sm">Total Added</span>
                  </div>
                  <p className="mt-2 text-2xl font-bold">UGX 3,680.50</p>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Smartphone className="size-4" />
                    <span className="text-sm">Mobile Money</span>
                  </div>
                  <p className="mt-2 text-2xl font-bold">0705 664 501</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Methods - Hidden for now
      <Card className="bg-transparent rounded">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CreditCard className="size-5 text-muted-foreground" />
              <CardTitle>Payment Methods</CardTitle>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Plus className="size-4" />
              Add Method
            </Button>
          </div>
          <CardDescription>
            Manage your saved payment methods
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-4">
                <div className="flex size-12 items-center justify-center rounded-lg bg-blue-500/10">
                  <CreditCard className="size-6 text-blue-500" />
                </div>
                <div>
                  <p className="font-medium">Visa ending in 4242</p>
                  <p className="text-sm text-muted-foreground">
                    Expires 12/2027
                  </p>
                </div>
              </div>
              <Badge>Default</Badge>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-4">
                <div className="flex size-12 items-center justify-center rounded-lg bg-purple-500/10">
                  <CreditCard className="size-6 text-purple-500" />
                </div>
                <div>
                  <p className="font-medium">Mastercard ending in 1234</p>
                  <p className="text-sm text-muted-foreground">
                    Expires 08/2026
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                Remove
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      */}

      {/* Billing History */}
      <Card className="bg-transparent rounded">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="size-5 text-muted-foreground" />
              <CardTitle>Billing History</CardTitle>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="size-4" />
              Export
            </Button>
          </div>
          <CardDescription>
            Your recent transactions and invoices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border/60 hover:bg-transparent">
                <TableHead className="h-10 text-[10px] uppercase tracking-[0.1em] text-muted-foreground font-semibold">Date</TableHead>
                <TableHead className="h-10 text-[10px] uppercase tracking-[0.1em] text-muted-foreground font-semibold">Description</TableHead>
                <TableHead className="h-10 text-[10px] uppercase tracking-[0.1em] text-muted-foreground font-semibold text-center">Type</TableHead>
                <TableHead className="h-10 text-[10px] uppercase tracking-[0.1em] text-muted-foreground font-semibold text-right">Amount</TableHead>
                <TableHead className="h-10 text-[10px] uppercase tracking-[0.1em] text-muted-foreground font-semibold text-right">Balance</TableHead>
                <TableHead className="h-10 text-[10px] uppercase tracking-[0.1em] text-muted-foreground font-semibold text-right pr-4">Invoice</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {billingHistory.map((item, index) => (
                <TableRow 
                  key={index} 
                  className="border-b border-border/50 [&:last-child]:border-0 hover:bg-muted/40 transition-colors duration-150"
                >
                  <TableCell className="py-3 text-sm text-muted-foreground">
                    {item.date}
                  </TableCell>
                  <TableCell className="py-3">
                    <span className="text-sm text-foreground/90">{item.description}</span>
                  </TableCell>
                  <TableCell className="py-3 text-center">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium border border-border/50 ${
                      item.type === "Credit" 
                        ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" 
                        : "bg-muted/80 text-muted-foreground"
                    }`}>
                      {item.type}
                    </span>
                  </TableCell>
                  <TableCell className="py-3 text-right">
                    <span className={`text-sm font-medium ${
                      item.type === "Credit" ? "text-emerald-600 dark:text-emerald-400" : "text-foreground/90"
                    }`}>
                      {item.type === "Credit" ? "+" : "-"}{item.amount}
                    </span>
                  </TableCell>
                  <TableCell className="py-3 text-right">
                    <span className="text-sm text-muted-foreground">{item.balance}</span>
                  </TableCell>
                  <TableCell className="py-3 text-right pr-4">
                    <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                      <Download className="h-3 w-3" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
