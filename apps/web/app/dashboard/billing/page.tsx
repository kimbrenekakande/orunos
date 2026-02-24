"use client"

import { useState } from "react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/dashboard/avatar"
import { Button } from "@/components/dashboard/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/dashboard/card"
import { Input } from "@/components/dashboard/input"
import { Label } from "@/components/dashboard/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/dashboard/select"
import { Separator } from "@/components/dashboard/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/dashboard/table"
import { Badge } from "@/components/dashboard/badge"
import {
  CreditCard,
  DollarSign,
  Download,
  Plus,
  TrendingUp,
  Wallet,
} from "lucide-react"

export default function BillingPage() {
  const [amount, setAmount] = useState("")

  return (
    <div className="flex flex-col gap-6 p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Billing & Wallet</h1>
        <p className="text-muted-foreground">
          Manage your wallet, billing, and payment methods
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Wallet Balance Card */}
        <Card className="lg:col-span-2">
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
            <div className="grid gap-6">
              <div className="flex flex-col gap-2 rounded-lg bg-gradient-to-r from-primary to-primary/80 p-6 text-primary-foreground">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium opacity-80">
                    Available Balance
                  </p>
                  <Wallet className="size-5 opacity-80" />
                </div>
                <p className="text-4xl font-bold">$2,450.00</p>
                <div className="flex items-center gap-2 text-sm opacity-80">
                  <TrendingUp className="size-4" />
                  <span>+ $350.00 this month</span>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <DollarSign className="size-4" />
                    <span className="text-sm">Total Spent</span>
                  </div>
                  <p className="mt-2 text-2xl font-bold">$1,230.50</p>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <TrendingUp className="size-4" />
                    <span className="text-sm">Total Added</span>
                  </div>
                  <p className="mt-2 text-2xl font-bold">$3,680.50</p>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CreditCard className="size-4" />
                    <span className="text-sm">Payment Methods</span>
                  </div>
                  <p className="mt-2 text-2xl font-bold">2</p>
                </div>
              </div>

              <Separator />

              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Quick Actions</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button className="gap-2">
                    <Plus className="size-4" />
                    Add Funds
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Download className="size-4" />
                    Withdraw
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <CreditCard className="size-4" />
                    Transfer
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Add Funds Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Plus className="size-5 text-muted-foreground" />
              <CardTitle>Add Funds</CardTitle>
            </div>
            <CardDescription>
              Add money to your wallet instantly
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="amount">Amount</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  className="pl-9"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {["$10", "$25", "$50", "$100", "$250", "$500"].map((value) => (
                <Button
                  key={value}
                  variant="outline"
                  size="sm"
                  onClick={() => setAmount(value.replace("$", ""))}
                >
                  {value}
                </Button>
              ))}
            </div>

            <Separator />

            <div className="grid gap-2">
              <Label>Payment Method</Label>
              <Select defaultValue="card-1">
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="card-1">
                    <div className="flex items-center gap-2">
                      <CreditCard className="size-4" />
                      •••• 4242
                    </div>
                  </SelectItem>
                  <SelectItem value="card-2">
                    <div className="flex items-center gap-2">
                      <CreditCard className="size-4" />
                      •••• 1234
                    </div>
                  </SelectItem>
                  <SelectItem value="bank">
                    <div className="flex items-center gap-2">
                      <Wallet className="size-4" />
                      Bank Transfer
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Add Funds Now</Button>
          </CardFooter>
        </Card>
      </div>

      {/* Payment Methods */}
      <Card>
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

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wallet className="size-5 text-muted-foreground" />
              <CardTitle>Transaction History</CardTitle>
            </div>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="credit">Credits</SelectItem>
                  <SelectItem value="debit">Debits</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="size-4" />
                Export
              </Button>
            </div>
          </div>
          <CardDescription>
            View all your wallet transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <div className="flex size-8 items-center justify-center rounded-full bg-green-500/10">
                    <Plus className="size-4 text-green-500" />
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">Wallet Top-up</p>
                    <p className="text-sm text-muted-foreground">
                      Added via Visa •••• 4242
                    </p>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  Feb 24, 2026
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-green-500/10 text-green-600">
                    Completed
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-medium text-green-600">
                  + $500.00
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="flex size-8 items-center justify-center rounded-full bg-red-500/10">
                    <DollarSign className="size-4 text-red-500" />
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">Service Payment</p>
                    <p className="text-sm text-muted-foreground">
                      Payment for API usage
                    </p>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  Feb 22, 2026
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-green-500/10 text-green-600">
                    Completed
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-medium text-red-600">
                  - $45.00
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="flex size-8 items-center justify-center rounded-full bg-green-500/10">
                    <Plus className="size-4 text-green-500" />
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">Refund Received</p>
                    <p className="text-sm text-muted-foreground">
                      Refund for order #12345
                    </p>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  Feb 20, 2026
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-green-500/10 text-green-600">
                    Completed
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-medium text-green-600">
                  + $120.00
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="flex size-8 items-center justify-center rounded-full bg-red-500/10">
                    <DollarSign className="size-4 text-red-500" />
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">Subscription Renewal</p>
                    <p className="text-sm text-muted-foreground">
                      Monthly Pro plan
                    </p>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  Feb 15, 2026
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-green-500/10 text-green-600">
                    Completed
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-medium text-red-600">
                  - $99.00
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="flex size-8 items-center justify-center rounded-full bg-red-500/10">
                    <DollarSign className="size-4 text-red-500" />
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">Withdrawal</p>
                    <p className="text-sm text-muted-foreground">
                      Transfer to bank account
                    </p>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  Feb 10, 2026
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600">
                    Pending
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-medium text-red-600">
                  - $200.00
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" size="sm">Previous</Button>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            Page 1 of 5
          </div>
          <Button variant="outline" size="sm">Next</Button>
        </CardFooter>
      </Card>

      {/* Billing Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CreditCard className="size-5 text-muted-foreground" />
            <CardTitle>Billing Settings</CardTitle>
          </div>
          <CardDescription>
            Configure your billing preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="currency">Currency</Label>
              <Select defaultValue="usd">
                <SelectTrigger id="currency">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usd">USD ($)</SelectItem>
                  <SelectItem value="eur">EUR (€)</SelectItem>
                  <SelectItem value="gbp">GBP (£)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="auto-reload">Auto Reload Threshold</Label>
              <Select defaultValue="disabled">
                <SelectTrigger id="auto-reload">
                  <SelectValue placeholder="Select threshold" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="disabled">Disabled</SelectItem>
                  <SelectItem value="100">$100</SelectItem>
                  <SelectItem value="250">$250</SelectItem>
                  <SelectItem value="500">$500</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="grid gap-1">
              <p className="text-sm font-medium">Auto-reload when balance is low</p>
              <p className="text-xs text-muted-foreground">
                Automatically add $100 when balance drops below threshold
              </p>
            </div>
            <Button variant="outline" size="sm">
              Configure
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Settings</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
