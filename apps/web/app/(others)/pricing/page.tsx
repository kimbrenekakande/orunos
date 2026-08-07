"use client";

import { Check } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const tiers = [
	{
		name: "Free",
		description: "Get started with essential citation tools",
		price: "$0",
		period: "forever",
		cta: "Get Started",
		href: "/signup",
		featured: false,
		features: [
			"Up to 50 citations per month",
			"5 citation styles (APA, MLA, Chicago, Harvard, IEEE)",
			"Basic literature search",
			"Export to BibTeX and plain text",
			"Community support",
		],
		missing: [
			"AI-powered synthesis",
			"Advanced citation management",
			"Priority support",
		],
	},
	{
		name: "Pro",
		description: "For serious researchers and PhD candidates",
		price: "$12",
		period: "per month",
		cta: "Start Free Trial",
		href: "/signup?plan=pro",
		featured: true,
		features: [
			"Unlimited citations",
			"10,000+ citation styles",
			"AI literature synthesis",
			"Document generation (LaTeX / Word)",
			"Reference manager integrations (Zotero, Mendeley)",
			"Plagiarism check assistant",
			"Priority email support",
			"Early access to new features",
		],
		missing: [],
	},
	{
		name: "Institutional",
		description: "For labs, departments, and research groups",
		price: "Custom",
		period: "",
		cta: "Contact Sales",
		href: "/contact",
		featured: false,
		features: [
			"Everything in Pro for your entire team",
			"Centralized billing and admin dashboard",
			"Dedicated account manager",
			"SSO / SAML integration",
			"Custom citation style templates",
			"API access for institutional workflows",
			"SLA and priority support",
			"Onboarding and training sessions",
		],
		missing: [],
	},
];

export default function PricingPage() {
	return (
		<div className="flex-1 py-16 md:py-24">
			<div className="container px-4 md:px-6">
				<div className="mx-auto max-w-5xl">
					{/* Header */}
					<div className="text-center mb-16">
						<h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl font-header mb-4">
							Simple, transparent pricing
						</h1>
						<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
							Choose the plan that fits your research needs. Upgrade anytime as
							your academic journey evolves.
						</p>
					</div>

					{/* Tiers */}
					<div className="grid gap-8 md:grid-cols-3">
						{tiers.map((tier) => (
							<div
								key={tier.name}
								className={cn(
									"relative flex flex-col rounded border bg-card p-8 shadow-sm",
									tier.featured &&
										"border-orange-500 ring-2 ring-orange-500 shadow-lg",
								)}
							>
								{tier.featured && (
									<span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-orange-500 px-4 py-1 text-xs font-semibold text-white">
										Most Popular
									</span>
								)}

								<div className="mb-6">
									<h3 className="text-xl font-bold font-header">{tier.name}</h3>
									<p className="mt-1 text-sm text-muted-foreground">
										{tier.description}
									</p>
								</div>

								<div className="mb-6">
									<span className="text-4xl font-bold font-header">
										{tier.price}
									</span>
									{tier.period && (
										<span className="text-sm text-muted-foreground ml-1">
											{tier.period}
										</span>
									)}
								</div>

								<Link
									href={tier.href}
									className={cn(
										"inline-flex items-center justify-center rounded px-4 py-2.5 text-sm font-medium transition-colors mb-8",
										tier.featured
											? "bg-orange-500 text-white hover:bg-orange-600"
											: "bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200",
									)}
								>
									{tier.cta}
								</Link>

								<ul className="space-y-3 flex-1">
									{tier.features.map((feature) => (
										<li key={feature} className="flex items-start gap-3">
											<Check className="h-5 w-5 shrink-0 text-orange-500 mt-0.5" />
											<span className="text-sm">{feature}</span>
										</li>
									))}
									{tier.missing?.map((feature) => (
										<li
											key={feature}
											className="flex items-start gap-3 text-muted-foreground/50"
										>
											<Check className="h-5 w-5 shrink-0 mt-0.5" />
											<span className="text-sm line-through">{feature}</span>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>

					{/* FAQ teaser */}
					<div className="mt-16 text-center">
						<p className="text-sm text-muted-foreground">
							Have questions?{" "}
							<Link
								href="/contact"
								className="text-orange-500 hover:underline font-medium"
							>
								Contact us
							</Link>{" "}
							— we&apos;re happy to help.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
