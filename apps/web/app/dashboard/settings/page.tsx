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
import { Toggle } from "@/components/dashboard/toggle"
import { Lock, Mail, Shield, User } from "lucide-react"
import { authClient } from "@/lib/auth-client"

export default function SettingsPage() {
  const { data: session, isPending } = authClient.useSession()
  const user = session?.user

  // Derive profile from user - no effect needed
  const profile = user ? {
    id: user.id,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    email: user.email,
    emailVerified: user.emailVerified,
    name: user.name,
    image: user.image,
    wallet: user.wallet,
    institutionId: user.institutionId,
  } : null

  const [twoFactor, setTwoFactor] = useState(false)


  return (
    <div className="flex flex-col gap-6 p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid gap-6">
        {/* Profile Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="size-5 text-muted-foreground" />
              <CardTitle>Profile Information</CardTitle>
            </div>
            <CardDescription>
              Update your profile information and display picture
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="flex items-center gap-4">
              <Avatar className="size-20">
                <AvatarImage src="/images/tree.jpg" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-2">
                <Button variant="outline" size="sm">
                  Change Avatar
                </Button>
                <p className="text-xs text-muted-foreground">
                  JPG, GIF or PNG. Max size 2MB.
                </p>
              </div>
            </div>

            <Separator />

            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="firstName">Full Name</Label>
                <Input
                  id="firstName"
                  key={profile?.id || "firstName"}
                  defaultValue={profile?.name || ""}
                  placeholder="Enter your first name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastName">Institution</Label>
                <Input
                  id="lastName"
                  key={profile?.id || "lastName"}
                  defaultValue={profile?.institutionId || "" }
                  placeholder="Enter your Institution name"
                />
              </div>
            </div>

            {/*<div className="grid gap-2">
              <Label htmlFor="username">Institution</Label>
              <Input
                id="username"
                key={profile?.id || "institution"}
                defaultValue={profile?.institutionId?.toString() || ""}
                placeholder="Institution Name"
              />
              <p className="text-xs text-muted-foreground">
                This is your public display name.
              </p>
            </div>*/}

            <div className="grid gap-2">
              <Label htmlFor="bio">Rules</Label>
              <textarea
                id="bio"
                key={profile?.id || "bio"}
                rows={4}
                className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-shadow focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                placeholder="What rules would you like orunos to follow ?"
                defaultValue=""
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save Profile</Button>
          </CardFooter>
        </Card>

        {/* Account Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Mail className="size-5 text-muted-foreground" />
              <CardTitle>Account Settings</CardTitle>
            </div>
            <CardDescription>
              Manage your email and account preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <div className="flex gap-2">
                <Input
                  id="email"
                  key={profile?.id || "email"}
                  type="email"
                  defaultValue={profile?.email || ""}
                  className="flex-1"
                />
                <Button variant="outline">Change</Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Your email address is verified.
              </p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                key={profile?.id || "phone"}
                type="tel"
                defaultValue=""
                placeholder="Enter your phone number"
              />
            </div>



            {/*<div className="grid gap-2">
              <Label>Account Type</Label>
              <div className="flex flex-col gap-3 rounded-md border p-4 md:flex-row md:items-center md:justify-between">
                <div className="grid gap-1">
                  <p className="text-sm font-medium">Free Plan</p>
                  <p className="text-xs text-muted-foreground">
                    Basic features with limited storage
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Upgrade
                </Button>
              </div>
            </div>*/}
          </CardContent>
          <CardFooter>
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>

        {/* Security Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lock className="size-5 text-muted-foreground" />
              <CardTitle>Security</CardTitle>
            </div>
            <CardDescription>
              Manage your password and account security
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input
                  id="current-password"
                  type="password"
                  placeholder="Enter current password"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  placeholder="Enter new password"
                />
                <p className="text-xs text-muted-foreground">
                  Must be at least 8 characters with a number and symbol.
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm new password"
                />
              </div>
            </div>


            {/*<div className="flex flex-col gap-4 rounded-md border p-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <Shield className="size-10 text-primary" />
                <div className="grid gap-1">
                  <p className="text-sm font-medium">Two-Factor Authentication</p>
                  <p className="text-xs text-muted-foreground">
                    {twoFactor
                      ? "Enabled - Your account is protected"
                      : "Disabled - Recommended to enable"}
                  </p>
                </div>
              </div>
              <Toggle
                pressed={twoFactor}
                onPressedChange={setTwoFactor}
                aria-label="Toggle two-factor authentication"
                size="lg"
              />
            </div>*/}

            {twoFactor && (
              <div className="rounded-md bg-muted p-4">
                <p className="text-sm">
                  <strong>Backup Codes:</strong> You have 8 backup codes remaining.{" "}
                  <Button variant="link" className="h-auto p-0">
                    Generate new codes
                  </Button>
                </p>
              </div>
            )}


            <div className="grid gap-3">
              <Label>Active Sessions</Label>
              <div className="flex items-center justify-between rounded-md border p-3">
                <div className="flex items-center gap-3">
                  <div className="size-2 rounded-full bg-green-500" />
                  <div>
                    <p className="text-sm font-medium">Chrome on macOS</p>
                    <p className="text-xs text-muted-foreground">
                      Current device • Last active now
                    </p>
                  </div>
                </div>
                <Badge>Current</Badge>
              </div>
              <div className="flex items-center justify-between rounded-md border p-3">
                <div className="flex items-center gap-3">
                  <div className="size-2 rounded-full bg-gray-300" />
                  <div>
                    <p className="text-sm font-medium">Safari on iPhone</p>
                    <p className="text-xs text-muted-foreground">
                      Last active 2 hours ago
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  Sign Out
                </Button>
              </div>
              <div className="flex items-center justify-between rounded-md border p-3">
                <div className="flex items-center gap-3">
                  <div className="size-2 rounded-full bg-gray-300" />
                  <div>
                    <p className="text-sm font-medium">Firefox on Windows</p>
                    <p className="text-xs text-muted-foreground">
                      Last active 5 days ago
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  Sign Out
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3 sm:flex-row sm:justify-between">
            <Button variant="outline" className="w-full sm:w-auto">
              Sign Out of All Sessions
            </Button>
            <Button>Update Password</Button>
          </CardFooter>
        </Card>

        {/* Danger Zone */}
        <Card className="border-destructive/50">
          <CardHeader>
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
            <CardDescription>
              Irreversible actions related to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3 rounded-md border border-destructive/50 bg-destructive/5 p-4 md:flex-row md:items-center md:justify-between">
              <div className="grid gap-1">
                <p className="text-sm font-medium text-destructive">
                  Delete Account
                </p>
                <p className="text-xs text-muted-foreground">
                  Permanently delete your account and all data. This action cannot be undone.
                </p>
              </div>
              <Button variant="destructive" size="sm">
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-primary bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
      {children}
    </span>
  )
}
