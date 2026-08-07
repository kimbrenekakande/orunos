"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/tiptapui/input";
import { Textarea } from "@/components/tiptapui/textarea";
import { Label } from "@/components/dashboard/label";

const contactInfo = [
	{
		icon: Mail,
		label: "Email",
		value: "support@orunos.com",
	},
	{
		icon: Phone,
		label: "Phone",
		value: "+256 705 664 501",
	},
	{
		icon: MapPin,
		label: "Office",
		value: "Kampala, Uganda",
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
			<div className="flex-1 flex items-center justify-center py-16 md:py-24">
				<div className="container px-4 md:px-6">
					<div className="mx-auto max-w-lg text-center">
						<div className="inline-flex items-center justify-center size-16 rounded-full bg-orange-500/10 mb-10">
							<CheckCircle2 className="size-7 text-orange-500" />
						</div>
						<h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl font-header mb-4">
							Message sent
						</h1>
						<p className="text-muted-foreground leading-relaxed mb-8">
							Thank you for reaching out. We&apos;ll get back to you within 24
							hours.
						</p>
						<Button onClick={() => setIsSubmitted(false)} variant="outline">
							Send another message
						</Button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="flex-1 py-16 md:py-24">
			<div className="container px-4 md:px-6">
				<div className="mx-auto max-w-3xl">
					{/* Header */}
					<div className="mb-16">
						<h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl font-header mb-6">
							Get in touch
						</h1>
						<p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
							Have questions about Orunos? We&apos;d love to hear from you. Send
							us a message and we&apos;ll respond as soon as possible.
						</p>
					</div>

					{/* Contact info */}
					<div className="mb-16">
						<h2 className="text-sm font-semibold text-orange-500 uppercase tracking-wider mb-6">
							Reach us directly
						</h2>
						<div className="grid gap-6 sm:grid-cols-3">
							{contactInfo.map((item) => (
								<div key={item.label} className="flex items-center gap-4">
									<div className="flex items-center justify-center size-10 rounded bg-black text-white dark:bg-white dark:text-black shrink-0">
										<item.icon className="size-4" />
									</div>
									<div>
										<p className="text-sm text-muted-foreground">
											{item.label}
										</p>
										<p className="font-medium">{item.value}</p>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Form */}
					<div className="border-t pt-16">
						<h2 className="text-sm font-semibold text-orange-500 uppercase tracking-wider mb-8">
							Send us a message
						</h2>
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
									className="min-h-32"
									required
								/>
							</div>
							<Button
								type="submit"
								className="w-full cursor-pointer"
								disabled={isLoading}
							>
								{isLoading ? (
									<span className="flex items-center gap-2">
										<span className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
										Sending...
									</span>
								) : (
									<span className="flex items-center gap-2">
										<Send className="h-4 w-4" />
										Send message
									</span>
								)}
							</Button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
