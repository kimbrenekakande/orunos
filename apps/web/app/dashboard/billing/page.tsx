"use client"

import { useState } from "react"
import axios from "axios"
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
import { Badge } from "@/components/dashboard/badge"
import {
  CreditCard,
  DollarSign,
  Download,
  Plus,
  TrendingUp,
  Wallet,
} from "lucide-react"
import { Dialog4Payment } from "@/components/paymentDialog"

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
            <div className="grid gap-6">
              <div className="flex flex-col gap-2 rounded-lg bg-linear-to-r from-primary to-primary/80 p-6 text-primary-foreground">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium opacity-80">
                    Available Balance
                  </p>
                  <Wallet className="size-5 opacity-80" />
                </div>
                <p className="text-4xl font-bold">UGX 2,450.00</p>
                <div className="flex items-center gap-2 text-sm opacity-80">
                  <TrendingUp className="size-4" />
                  <span>+ UGX 350.00 this month</span>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <DollarSign className="size-4" />
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
                    <CreditCard className="size-4" />
                    <span className="text-sm">Payment Methods</span>
                  </div>
                  <p className="mt-2 text-2xl font-bold">2</p>
                </div>
              </div>

              {/*<Separator />*/}

              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Quick Actions</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Dialog4Payment/>
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
      </div>

      {/* Payment Methods */}
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

      {/* Billing Settings */}
      <Card className="bg-transparent rounded">
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
        </CardContent>
        <CardFooter>
          <Button>Save Settings</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
