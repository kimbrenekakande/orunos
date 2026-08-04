"use client";

import { useState } from "react";
import { Mail, MapPin, Phone, Send, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/tiptapui/input";
import { Textarea } from "@/components/tiptapui/textarea";
import { Label } from "@/components/dashboard/label";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/tiptapui/card";

const contactInfo = [
	{
		icon: Mail,
		label: "Email",
		value: "support@orunos.com",
		description: "We'll reply within 24 hours",
	},
	{
		icon: Phone,
		label: "Phone",
		value: "+1 (555) 123-4567",
		description: "Mon-Fri from 9am to 6pm EST",
	},
	{
		icon: MapPin,
		label: "Office",
		value: "San Francisco, CA",
		description: "Come say hello at our office",
	},
];

export default function ContactPage() {
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);

		await new Promise((resolve) => setTimeout(resolve, 1000));

		setIsLoading(false);
		setIsSubmitted(true);
	};

	if (isSubmitted) {
		return (
			<div className="flex-1 flex items-center justify-center p-4">
				<Card className="w-full max-w-md text-center bg-transparent">
					<CardHeader>
						<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
							<CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
						</div>
						<CardTitle className="text-2xl font-nexa">Message Sent!</CardTitle>
						<CardDescription>
							Thank you for reaching out. We&apos;ll get back to you as soon as
							possible.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Button onClick={() => setIsSubmitted(false)} className="w-full">
							Send Another Message
						</Button>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<div className="flex-1 py-16 md:py-24">
			<div className="container px-4 md:px-6">
				<div className="mx-auto max-w-2xl text-center mb-12">
					<h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl font-nexa">
						Get in Touch
					</h1>
					<p className="mt-4 text-muted-foreground text-lg">
						Have questions about Orunos? We&apos;d love to hear from you. Send
						us a message and we&apos;ll respond as soon as possible.
					</p>
				</div>

				<div className="mx-auto max-w-5xl grid gap-8 md:grid-cols-2">
					<Card className="bg-transparent">
						<CardHeader>
							<CardTitle className="font-nexa">Send us a Message</CardTitle>
							<CardDescription>
								Fill out the form below and we&apos;ll get back to you within 24
								hours.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<form onSubmit={handleSubmit} className="space-y-6">
								<div className="grid gap-4 sm:grid-cols-2">
									<div className="space-y-2">
										<Label htmlFor="firstName">First name</Label>
										<Input id="firstName" placeholder="John" required />
									</div>
									<div className="space-y-2">
										<Label htmlFor="lastName">Last name</Label>
										<Input id="lastName" placeholder="Doe" required />
									</div>
								</div>
								<div className="space-y-2">
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										type="email"
										placeholder="john@example.com"
										required
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="subject">Subject</Label>
									<Input
										id="subject"
										placeholder="How can we help you?"
										required
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="message">Message</Label>
									<Textarea
										id="message"
										placeholder="Tell us more about what you need..."
										className="min-h-30"
										required
									/>
								</div>
								<Button type="submit" className="w-full" disabled={isLoading}>
									{isLoading ? (
										<span className="flex items-center gap-2">
											<span className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
											Sending...
										</span>
									) : (
										<span className="flex items-center gap-2">
											<Send className="h-4 w-4" />
											Send Message
										</span>
									)}
								</Button>
							</form>
						</CardContent>
					</Card>

					<div className="space-y-6">
						<Card className="bg-transparent">
							<CardHeader>
								<CardTitle className="font-nexa">Contact Information</CardTitle>
								<CardDescription>
									Prefer to reach out directly? Here&apos;s how you can contact
									us.
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-6">
								{contactInfo.map((item) => (
									<div key={item.label} className="flex gap-4">
										<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
											<item.icon className="h-5 w-5 text-muted-foreground" />
										</div>
										<div>
											<p className="font-medium">{item.label}</p>
											<p className="text-sm text-muted-foreground">
												{item.value}
											</p>
											<p className="text-xs text-muted-foreground">
												{item.description}
											</p>
										</div>
									</div>
								))}
							</CardContent>
						</Card>

						<Card className="bg-transparent">
							<CardHeader>
								<CardTitle className="font-nexa">
									Frequently Asked Questions
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div>
									<p className="font-medium text-sm">
										What are your support hours?
									</p>
									<p className="text-sm text-muted-foreground">
										Our support team is available Monday through Friday, 9am to
										6pm EST.
									</p>
								</div>
								<div>
									<p className="font-medium text-sm">
										How quickly do you respond?
									</p>
									<p className="text-sm text-muted-foreground">
										We typically respond within 24 hours during business days.
									</p>
								</div>
								<div>
									<p className="font-medium text-sm">
										Do you offer enterprise pricing?
									</p>
									<p className="text-sm text-muted-foreground">
										Yes! Contact us for custom enterprise solutions tailored to
										your organization&apos;s needs.
									</p>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}
