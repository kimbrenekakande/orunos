"use client";

import { Check, FileText, PencilLine, Sparkles, Download } from "lucide-react";
import Link from "next/link";

const steps = [
	{
		number: "1",
		title: "Choose your document",
		description:
			"Pick from 8 academic categories — coursework, research, thesis, and more.",
		icon: FileText,
	},
	{
		number: "2",
		title: "Describe your needs",
		description:
			"Tell us your topic, research question, and any specific requirements.",
		icon: PencilLine,
	},
	{
		number: "3",
		title: "AI generates your draft",
		description:
			"A rigorous, citation-backed document is produced with academic precision.",
		icon: Sparkles,
	},
	{
		number: "4",
		title: "Review, pay, download",
		description:
			"Review the result, request revisions, and pay only when you're satisfied.",
		icon: Download,
	},
];

const individualFeatures = [
	"Generate any document type",
	"You see the price before generating",
	"No subscriptions or recurring charges",
	"Pay only when you're satisfied with the result",
	"Download in LaTeX, Word, or plain text",
];

const teamFeatures = [
	"Volume discounts for labs and research groups",
	"Centralized billing and admin dashboard",
	"Dedicated account manager",
	"SSO / SAML integration",
	"Priority support and SLA",
	"Onboarding and training included",
];

export default function PricingPage() {
	return (
		<div className="flex-1 py-16 md:py-24">
			<div className="container px-4 md:px-6">
				<div className="mx-auto max-w-5xl">
					{/* Header */}
					<div className="text-center mb-16">
						<h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl font-header mb-4">
							Pay per document, nothing more
						</h1>
						<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
							Every document is priced based on its type. Generate what you
							need, when you need it. No subscriptions, no recurring fees.
						</p>
					</div>

					{/* How It Works — steps */}
					<div className="mb-20">
						<h2 className="text-center text-2xl font-bold font-header mb-10">
							How it works
						</h2>
						<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
							{steps.map((step) => (
								<div
									key={step.number}
									className="flex flex-col items-center text-center"
								>
									<div className="flex items-center justify-center size-12 rounded-full bg-black text-white dark:bg-white dark:text-black mb-4">
										<step.icon className="size-5" />
									</div>
									<span className="text-xs font-semibold text-orange-500 mb-1">
										Step {step.number}
									</span>
									<h3 className="font-bold font-header mb-1">{step.title}</h3>
									<p className="text-sm text-muted-foreground">
										{step.description}
									</p>
								</div>
							))}
						</div>
					</div>

					{/* Two options */}
					<div className="grid gap-8 md:grid-cols-2">
						{/* Individual */}
						<div className="flex flex-col rounded border bg-card p-8 shadow-sm">
							<div className="mb-6">
								<h3 className="text-xl font-bold font-header">
									For Individuals
								</h3>
								<p className="mt-1 text-sm text-muted-foreground">
									Pay as you go. No subscriptions, no hidden fees.
								</p>
							</div>
							<ul className="space-y-3 flex-1 mb-8">
								{individualFeatures.map((feature) => (
									<li key={feature} className="flex items-start gap-3">
										<Check className="h-5 w-5 shrink-0 text-orange-500 mt-0.5" />
										<span className="text-sm">{feature}</span>
									</li>
								))}
							</ul>
							<Link
								href="/signup"
								className="inline-flex items-center justify-center rounded px-4 py-2.5 text-sm font-medium bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition-colors"
							>
								Get Started
							</Link>
						</div>

						{/* Teams */}
						<div className="flex flex-col rounded border bg-card p-8 shadow-sm">
							<div className="mb-6">
								<h3 className="text-xl font-bold font-header">
									For Teams & Institutions
								</h3>
								<p className="mt-1 text-sm text-muted-foreground">
									Volume pricing and dedicated support for labs, departments,
									and research groups.
								</p>
							</div>
							<ul className="space-y-3 flex-1 mb-8">
								{teamFeatures.map((feature) => (
									<li key={feature} className="flex items-start gap-3">
										<Check className="h-5 w-5 shrink-0 text-orange-500 mt-0.5" />
										<span className="text-sm">{feature}</span>
									</li>
								))}
							</ul>
							<Link
								href="/contact"
								className="inline-flex items-center justify-center rounded px-4 py-2.5 text-sm font-medium bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition-colors"
							>
								Contact Sales
							</Link>
						</div>
					</div>

					{/* Footer note */}
					<div className="mt-16 text-center">
						<p className="text-sm text-muted-foreground">
							Prices are one-time per document generation. No hidden fees, no
							surprises.{" "}
							<Link
								href="/contact"
								className="text-orange-500 hover:underline font-medium"
							>
								Contact us
							</Link>{" "}
							if you have questions.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
