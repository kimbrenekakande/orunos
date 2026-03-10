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
import { Separator } from "@/components/dashboard/separator"
import { Lock, Mail, User } from "lucide-react"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"

export default function SettingsPage() {
  const { data: session, isPending, refetch } = authClient.useSession()
  const user = session?.user

  const [name, setName] = useState(user?.name || "")
  const [isLoading, setIsLoading] = useState(false)

  // Password change state
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")


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
        <Card className="bg-transparent rounded">
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
                <AvatarImage src={user?.image || "/images/tree.jpg"} alt={user?.name || "User"} />
                <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
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

            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={async () => {
                setIsLoading(true)
                try {
                  const { data, error } = await authClient.updateUser({
                    name,
                  })

                  if (error) {
                    toast.error(error.message || "Failed to update profile")
                  } else {
                    toast.success("Profile updated successfully")
                    refetch()
                  }
                } catch (err) {
                  toast.error("Failed to update profile")
                } finally {
                  setIsLoading(false)
                }
              }}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Profile"}
            </Button>
          </CardFooter>
        </Card>

        {/* Account Section */}
        <Card className="bg-transparent rounded">
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
              <Input
                id="email"
                type="email"
                value={user?.email || ""}
                disabled
                className="bg-muted/50"
              />
              <p className="text-xs text-muted-foreground">
                Email cannot be changed directly. Contact support to update your email.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Security Section */}
        <Card className="bg-transparent rounded">
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
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
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
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                />
              </div>
            </div>

            <div className="grid gap-3">
              <Label>Active Sessions</Label>
              <div className="flex items-center justify-between rounded border p-3">
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
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3 sm:flex-row sm:justify-between">
            <Button
              onClick={async () => {
                if (newPassword !== confirmPassword) {
                  toast.error("Passwords do not match")
                  return
                }

                if (newPassword.length < 8) {
                  toast.error("Password must be at least 8 characters")
                  return
                }

                setIsLoading(true)
                try {
                  const { data, error } = await authClient.changePassword({
                    newPassword,
                    currentPassword,
                  })

                  if (error) {
                    toast.error(error.message || "Failed to change password")
                  } else {
                    toast.success("Password changed successfully")
                    setCurrentPassword("")
                    setNewPassword("")
                    setConfirmPassword("")
                  }
                } catch (err) {
                  toast.error("Failed to change password")
                } finally {
                  setIsLoading(false)
                }
              }}
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update Password"}
            </Button>
          </CardFooter>
        </Card>

        {/* Danger Zone */}
        <Card className="border-destructive/50 bg-transparent rounded">
          <CardHeader>
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
            <CardDescription>
              Irreversible actions related to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3 rounded border border-destructive/50 bg-destructive/5 p-4 md:flex-row md:items-center md:justify-between">
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
