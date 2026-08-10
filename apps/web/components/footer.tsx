"use client";

import Link from "next/link";

const docTypes = [
	"Coursework",
	"Research Proposal",
	"Case Study",
	"Field Work",
	"Literature Review",
	"Research Paper",
	"Thesis",
	"Dissertation",
];

const footerLinks = [
	{
		title: "Company",
		links: [
			{ href: "/about", label: "About" },
			{ href: "/blog", label: "Blog" },
			{ href: "/careers", label: "Careers" },
			{ href: "/pricing", label: "Pricing" },
		],
	},
	{
		title: "Support",
		links: [
			{ href: "/contact", label: "Contact Us" },
			{ href: "/login", label: "Log In" },
			{ href: "/signup", label: "Sign Up" },
		],
	},
	{
		title: "Legal",
		links: [
			{ href: "/terms", label: "Terms & Conditions" },
			{ href: "/policy", label: "Privacy Policy" },
		],
	},
];

export function Footer() {
	return (
		<footer className="border-t">
			<div className="mx-8 py-8">
				<div className="flex flex-wrap justify-between gap-8">
					<div>
						<h3 className="mb-3 text-sm font-semibold text-foreground">
							Start Creating
						</h3>
						<ul className="space-y-1.5 text-muted-foreground text-sm">
							{docTypes.slice(0, 4).map((doc) => (
								<li key={doc}>
									<Link
										className="hover:text-foreground transition-colors"
										href="/signup"
									>
										{doc}
									</Link>
								</li>
							))}
						</ul>
					</div>
					{footerLinks.map((item, idx) => (
						<div
							key={item.title}
							className={idx === footerLinks.length - 1 ? "lg:text-right" : ""}
						>
							<h3 className="mb-3 text-sm font-semibold text-foreground">
								{item.title}
							</h3>
							<ul className="space-y-1.5 text-muted-foreground text-sm">
								{item.links.map((link) => (
									<li key={link.label}>
										<Link
											className="hover:text-foreground transition-colors"
											href={link.href}
										>
											{link.label}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</div>
			<div className="h-px bg-border" />
			<div className="py-4 text-center text-muted-foreground text-xs">
				<p>&copy; {new Date().getFullYear()} Orunos. All rights reserved.</p>
			</div>
		</footer>
	);
}
