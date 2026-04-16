"use client"

import React, { useState } from "react"
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
import { Lock, Mail, User, FileText } from "lucide-react"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"
import { Textarea } from "@/components/ui/textarea"
import { Field } from "@/components/ui/field"

import baseUrl from "@/lib/base-url"
import { updateUploadHistory } from "@platejs/media/react"

export default function SettingsPage() {
  const { data: session, isPending, refetch } = authClient.useSession()
  const user = session?.user

  const [profileDP, setProfileDP] = useState("")
  const [name, setName] = useState("")
  const [style, setStyle] = useState("")
  const [isSavingStyle, setIsSavingStyle] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState("")

  React.useEffect(() => {
    if (user) {
      setProfileDP(user.image || "")
      setName(user.name || "")
      setStyle((user as any).style || "")
      setAvatarUrl(user.image || "")
    }
  }, [user])


  // Password change state
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [files, setFiles] = useState<File[]>([])


  const handleSaveProfile = async () => {
    setIsLoading(true)
    try {
      const { data, error } = await authClient.updateUser({
        image: profileDP,
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
  }

  const handleChangePassword = async () => {
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
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {

    if (e.target.files) {
      const allFiles = Array.from(e.target.files ?? [])
      setFiles(currentFiles => [...currentFiles, ...allFiles])
      console.log(allFiles)
    }

  }

  const handleSaveStyle = async () => {
    if (files.length === 0) {
      toast.error("Please upload files for analysis")
      return
    }

    setIsSavingStyle(true)
    try {
      const formData = new FormData()
      files.forEach((file) => formData.append("refs", file))

      const analyze = await fetch(`${baseUrl}/api/ai/stylometry`, {
        method: 'POST',
        body: formData,
      })

      if (!analyze.ok) {
        const r = await analyze.json()
        toast.error(r.error)
      } else {
        const r = await analyze.json()
        setStyle(r.style)

        const { error } = await authClient.updateUser({
          name: user?.name,
          image: user?.image,
          style: r.style,
        } as any)

        if (error) {
          toast.error("Failed to save style to profile")
        } else {
          toast.success("Style saved successfully")
          refetch()
        }
      }
    } catch (err) {
      toast.error("Failed to analyze style")
    } finally {
      setIsSavingStyle(false)
    }
  }

  return (
    <div className="flex flex-col gap-6 px-6 py-8 sm:p-8">
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
            <div className="flex items-center gap-4 hidden">
              <Avatar className="size-20">
                <AvatarImage src={avatarUrl || user?.image || "/images/tree.jpg"} alt={user?.name || "User"} />
                <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-2 cursor pointer">
                <Label>
                  <Input
                    id="avatar"
                    type="file"
                    accept="image/*"
                    className="sr-only"
                  />
                  <Button
                    type="button"
                    className="cursor-pointer"
                    onClick={() => document.getElementById("avatar")?.click()}
                  >
                    Change Avatar
                  </Button>
                </Label>
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
            <div className="grid gap-2">
              <Label htmlFor="profile-email">Email</Label>
              <Input
                id="profile-email"
                type="email"
                value={user?.email}
                disabled
                className="bg-muted/50"
              />
              <p className="text-xs text-muted-foreground">
                Email cannot be changed directly. Contact support to update your email.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleSaveProfile}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Profile"}
            </Button>
          </CardFooter>
        </Card>

        {/* Style & Analysis Section */}
        <Card className="bg-transparent rounded">
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileText className="size-5 text-muted-foreground" />
              <CardTitle>Stylometry</CardTitle>
            </div>
            <CardDescription>
              Describe your preferred style and upload documents for analysis.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-2">
              {/*<Label htmlFor="style-preferences">Style Preferences</Label>*/}
              <Textarea
                id="style-preferences"
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                placeholder="Describe your tone, examples of writing you like, or anything else that helps tailor analysis."
              />
            </div>

            <div className="grid gap-3">
              <Label>Upload Documents for Analysis</Label>
              <div className="flex flex-col gap-3 rounded border border-dashed border-muted-foreground/30 bg-muted/5 p-4">
                <input
                  id="file-upload"
                  multiple
                  type="file"
                  accept=".pdf,.doc,.docx,.txt"
                  className="sr-only"
                  onChange={handleFileChange}
                />
                {files.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 rounded bg-background px-2 py-1 text-xs"
                      >
                        <span>{file.name}</span>
                        <button
                          type="button"
                          className="text-muted-foreground hover:text-foreground"
                          onClick={() => setFiles(files.filter((_, i) => i !== index))}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-muted-foreground">
                    Supported formats: PDF, DOC, DOCX, TXT. Max size follows your workspace limits.
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById("file-upload")?.click()}
                  >
                    {files.length > 0 ? "Add More Files" : "Choose Files"}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleSaveStyle}
              disabled={isSavingStyle}
            >
              {isSavingStyle ? "Analyzing..." : "Analyze"}
            </Button>
          </CardFooter>
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

          </CardContent>
          <CardFooter>
            <Button
              onClick={handleChangePassword}
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
