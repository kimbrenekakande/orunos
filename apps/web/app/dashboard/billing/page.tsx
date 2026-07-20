"use client"

import { use, useEffect, useState } from "react"
import clientSession from "@/lib/client-session"
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
import { Coins, Download, FileText, Plus, Smartphone, TrendingUp, Wallet } from "lucide-react"
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
import baseUrl from "@/lib/base-url"
import { Transaction } from "@/lib/types"
import { useRouter } from 'next/navigation'



export default function BillingPage({ searchParams }: { searchParams: Promise<{ resp?: string }> }) {
  const session = clientSession
  // if (!session) redirect("/login")
  const user = session?.user;
  const [amount, setAmount] = useState<number>()
  const [processing, setProcessing] = useState(false)
  
  const params = use(searchParams);
  const [transactions, setTransactions] = useState<Array<Transaction>>([])
  
  const router = useRouter()

  useEffect(() => {
    const req = fetch(`${baseUrl}/api/transactions`)
    req.then((res) => {
      res.json().then((data) => {
        setTransactions(data)
        console.log(data)
      })
    })
  }, [])

  async function mobileMoneyPayment() {
    setProcessing(true)
    const rq = await fetch(`${baseUrl}/api/payments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        network: "MTN",
        phoneNumber: user?.phoneNumber,
        amount: amount,
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

        const req = await fetch(`${baseUrl}/api/transactions`, {
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
        if (!req.ok) throw new Error(`HTTP ${req.status}`)
        const text = await req.text()
        if (text) {
          const result = JSON.parse(text)
          if (result.error) throw new Error(result.error)
          const res = await fetch(`${baseUrl}/api/transactions`)
          const data = await res.json()
          setTransactions(data)
          router.replace('/dashboard/billing')
        }
      }
    }
    verifyTransaction();
  }, [params.resp, router]);

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
              <div className="flex flex-col justify-between gap-4 rounded bg-orange-500 p-6 text-white">
                <div className="flex items-start justify-between">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium opacity-80">
                      Available Balance
                    </p>
                    <p className="text-4xl font-bold font-mono tracking-tight">UGX {transactions[0]?.balanceAfter.toLocaleString('en-US')}</p>
                  </div>
                  <div className="flex size-12 items-center justify-center rounded-full bg-primary-foreground/15">
                    <Wallet className="size-6" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm opacity-80">
                    <TrendingUp className="size-4" />
                    <span>+ UGX {transactions.filter(t => t.type === 'DEPOSIT' && t.createdAt && new Date(t.createdAt).getMonth() === new Date().getMonth()).reduce((acc, t) => acc + t.amount, 0).toLocaleString('en-US')} this month</span>
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
                          <div className="flex justify-between gap-4 mt-4">
                            <div>
                              <p>Name</p>
                              <p>Method</p>
                              <p>Number</p>
                            </div>
                            <div className="text-right">
                              <h3>{user?.name}</h3>
                              <p>Mobile Money</p>
                              <p>+256705664501</p>
                            </div>
                          </div>
                          
                        </DialogHeader>
                        <FieldGroup className="mt-4">
                          <Field>
                            <Label htmlFor="username-1" className="hidden">Amout</Label>
                            <Input id="amount-1" name="amount" defaultValue="" onChange={e => setAmount(Number(e.target.value))} className="bg-transparent"/>
                          </Field>
                        </FieldGroup>
                        <DialogFooter>
                          <Button type="submit" onClick={() => mobileMoneyPayment()} className="w-full cursor-pointer">{processing ? "Processing..." : "Confirm"}</Button>
                        </DialogFooter>
                      </DialogContent>
                    </form>
                  </Dialog>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="rounded border p-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Coins className="size-4" />
                    <span className="text-sm">Total Spent</span>
                  </div>
                  <p className="mt-2 text-2xl font-mono font-bold">UGX {transactions.filter(t => t.type === 'WITHDRAWAL').reduce((acc, t) => acc + t.amount, 0).toLocaleString('en-US')}</p>
                </div>
                <div className="rounded border p-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <TrendingUp className="size-4" />
                    <span className="text-sm">Total Added</span>
                  </div>
                  <p className="mt-2 text-2xl font-mono font-bold">UGX {transactions.reduce((acc, t) => {
                    if (t.type !== "DEPOSIT") return acc
                    return acc + t.amount
                  }, 0).toLocaleString('en-US')}</p>
                </div>
                <div className="rounded border p-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Smartphone className="size-4" />
                    <span className="text-sm">Mobile Money</span>
                  </div>
                  <p className="mt-2 text-2xl font-bold font-mono">0705 664 501</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

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
              {transactions.map((transaction, index) => (
                <TableRow
                  key={index}
                  className="border-b border-border/50 [&:last-child]:border-0 hover:bg-muted/40 transition-colors duration-150"
                >
                  <TableCell className="py-3 text-sm text-muted-foreground">
                    {transaction.createdAt.slice(0, 10)}
                  </TableCell>
                  <TableCell className="py-3">
                    <span className="text-sm text-foreground/90">{transaction.description}</span>
                  </TableCell>
                  <TableCell className="py-3 text-center">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium border border-border/50 ${
                      transaction.type === "DEPOSIT" ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300": "bg-muted/80 text-muted-foreground"
                    }`}>
                      {transaction.type === "DEPOSIT" ? "Deposit" : "Withdrawal"}
                    </span>
                  </TableCell>
                  <TableCell className="py-3 text-right">
                    <span className={`text-sm font-medium ${
                      transaction.type === "DEPOSIT" ? "text-emerald-600 dark:text-emerald-400" : "text-foreground/90"
                    }`}>
                      {transaction.type === "DEPOSIT" ? "+" : "-"}{transaction.amount.toLocaleString('en-US')}
                    </span>
                  </TableCell>
                  <TableCell className="py-3 text-right">
                    <span className="text-sm text-muted-foreground">{transaction.balanceAfter.toLocaleString('en-US')}</span>
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
